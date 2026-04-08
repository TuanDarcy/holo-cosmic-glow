import { useState, useEffect } from "react";
import { usePaymentStore } from "@/stores/paymentStore";
import { BankQRPayload } from "@/types/payment";
import {
  generateBankQR,
  checkBankQRStatus,
  getSupportedBanks,
  formatAccountNumber,
} from "@/services/bankQRService";
import { AlertCircle, CheckCircle, Loader2, Copy, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function BankQRPayment() {
  const [bankCode, setBankCode] = useState("MB");
  const [amount, setAmount] = useState(100000);
  const banks = getSupportedBanks();
  const { setLoading, setError, setTransaction, loading } = usePaymentStore();
  const [status, setStatus] = useState<
    "form" | "qr" | "checking" | "success" | "timeout"
  >("form");
  const [qrData, setQrData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState<
    "pending" | "paid" | "timeout"
  >("pending");

  // Auto-check payment status
  useEffect(() => {
    if (status !== "qr") return;

    const interval = setInterval(async () => {
      const result = await checkBankQRStatus(qrData.reference);
      if (result.status === "paid") {
        setCheckingStatus("paid");
        setStatus("success");
        clearInterval(interval);
      }
    }, 3000);

    // Timeout after 5 minutes
    const timeout = setTimeout(() => {
      setCheckingStatus("timeout");
      setStatus("timeout");
      clearInterval(interval);
    }, 300000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [status, qrData]);

  const handleGenerateQR = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const payload: BankQRPayload = {
      bankCode,
      amount,
      description: `Nap tien HOLO - ${Date.now()}`,
    };

    const response = await generateBankQR(payload);

    if (response.success) {
      setQrData(response);
      setStatus("qr");
    } else {
      setError(response.message || "Lỗi tạo mã QR");
    }

    setLoading(false);
  };

  const handleCopy = () => {
    if (qrData?.accountNumber) {
      navigator.clipboard.writeText(qrData.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (status === "success") {
    return (
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-600">
          Thanh toán thành công!
        </h3>
        <div className="bg-green-50 p-4 rounded-lg space-y-2 text-left">
          <p>
            <span className="text-gray-600">Mã giao dịch:</span>{" "}
            <span className="font-mono font-bold text-green-600">
              {qrData.reference}
            </span>
          </p>
          <p>
            <span className="text-gray-600">Số tiền:</span>{" "}
            <span className="font-bold text-green-600 text-lg">
              {qrData.amount?.toLocaleString("vi-VN")}₫
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (status === "timeout") {
    return (
      <div className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-yellow-600">
              Chưa nhận được thanh toán
            </h3>
            <p className="text-sm text-yellow-600">
              Hết thời gian chờ. Bạn có thể thử lại hoặc liên hệ hỗ trợ.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setStatus("form");
            setQrData(null);
          }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
        >
          Tạo mã QR mới
        </button>
      </div>
    );
  }

  if (status === "qr") {
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-center mb-4">
            Quét mã QR để thanh toán
          </h3>

          {/* QR Code Display */}
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-lg border-2 border-cyan-300">
              <QRCodeSVG
                value={
                  qrData.qrCode ||
                  `https://example.com/payment/${qrData.reference}`
                }
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>

          {/* Account Info */}
          <div className="space-y-3 bg-white p-3 rounded-lg">
            <div>
              <p className="text-xs text-gray-500 uppercase">
                Tên chủ tài khoản
              </p>
              <p className="font-bold text-gray-800">{qrData.accountName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Số tài khoản</p>
              <div className="flex items-center gap-2">
                <p className="font-mono font-bold text-gray-800">
                  {formatAccountNumber(qrData.accountNumber)}
                </p>
                <button
                  onClick={handleCopy}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Số tiền</p>
              <p className="text-2xl font-bold text-cyan-600">
                {qrData.amount?.toLocaleString("vi-VN")}₫
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Nội dung chuyển</p>
              <p className="font-mono text-sm text-gray-800">
                {qrData.reference}
              </p>
            </div>
          </div>
        </div>

        {/* Status Checking */}
        {checkingStatus === "pending" && (
          <div className="bg-blue-100 border border-blue-400 rounded-lg p-4 flex items-center gap-2">
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            <p className="text-blue-700">
              Đang chờ thanh toán... (tối đa 5 phút)
            </p>
          </div>
        )}

        <button
          onClick={() => {
            setStatus("form");
            setQrData(null);
          }}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-lg"
        >
          Hủy
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleGenerateQR} className="space-y-4">
      {/* Bank Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Chọn ngân hàng
        </label>
        <select
          value={bankCode}
          onChange={(e) => setBankCode(e.target.value)}
          className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-cyan-500 focus:outline-none transition-colors"
        >
          {banks.map((bank) => (
            <option key={bank.code} value={bank.code}>
              {bank.icon} {bank.name}
            </option>
          ))}
        </select>
      </div>

      {/* Amount Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Số tiền cần nạp
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Math.max(10000, +e.target.value))}
          min={10000}
          step={10000}
          className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-cyan-500 focus:outline-none transition-colors"
        />
        <p className="text-xs text-gray-500 mt-1">Tối thiểu: 10,000₫</p>
      </div>

      {/* Presets */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Hoặc chọn mệnh giá
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[100000, 200000, 500000, 1000000, 2000000].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset)}
              className={`p-2 rounded-lg border-2 font-semibold transition-all text-sm ${
                amount === preset
                  ? "border-cyan-500 bg-cyan-100 text-cyan-700"
                  : "border-gray-300 bg-white text-gray-700 hover:border-cyan-300"
              }`}
            >
              {(preset / 1000).toFixed(0)}K
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Tạo mã QR...
          </>
        ) : (
          "Tạo Mã QR"
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        ✓ Đây là demo. Hãy quét mã QR này bằng app ngân hàng để thanh toán.
      </p>
    </form>
  );
}
