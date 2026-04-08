import { useState } from "react";
import { usePaymentStore } from "@/stores/paymentStore";
import { ScratchCardPayload, PaymentMethod } from "@/types/payment";
import {
  validateScratchCard,
  getCardProviders,
  formatCardAmount,
} from "@/services/scratchCardService";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

export default function ScratchCardPayment() {
  const [provider, setProvider] = useState<"vina" | "mobi" | "viettel">("vina");
  const [serial, setSerial] = useState("");
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState(50000);
  const { setLoading, setError, setTransaction, loading } = usePaymentStore();
  const [status, setStatus] = useState<
    "form" | "processing" | "success" | "error"
  >("form");
  const [result, setResult] = useState<any>(null);

  const cardProviders = getCardProviders();
  const currentProvider = cardProviders.find((p) => p.id === provider);

  const formatSerial = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(" ").slice(0, 19);
  };

  const formatPin = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(" ").slice(0, 11);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serial.replace(/\s/g, "") || !pin.replace(/\s/g, "")) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setStatus("processing");
    setLoading(true);

    const payload: ScratchCardPayload = {
      provider,
      serial: serial.replace(/\s/g, ""),
      pin: pin.replace(/\s/g, ""),
      amount,
    };

    const response = await validateScratchCard(payload);

    if (response.success) {
      setStatus("success");
      setResult(response);
      setTransaction({
        id: response.transactionId!,
        orderId: `ORD-${Date.now()}`,
        userId: "user-123",
        method: "scratch-card",
        amount: response.amount!,
        currency: "VND",
        status: "completed",
        transactionId: response.transactionId!,
        metadata: { provider },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    } else {
      setStatus("error");
      setResult(response);
      setError(response.message);
    }

    setLoading(false);
  };

  if (status === "success") {
    return (
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-600">
          Nạp tiền thành công!
        </h3>
        <div className="bg-green-50 p-4 rounded-lg space-y-2 text-left">
          <p>
            <span className="text-gray-600">Mã giao dịch:</span>{" "}
            <span className="font-mono font-bold text-green-600">
              {result.transactionId}
            </span>
          </p>
          <p>
            <span className="text-gray-600">Số tiền:</span>{" "}
            <span className="font-bold text-green-600 text-lg">
              {formatCardAmount(result.amount)}
            </span>
          </p>
        </div>
        <button
          onClick={() => {
            setStatus("form");
            setSerial("");
            setPin("");
          }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
        >
          Nạp thêm
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-400 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-red-600">Lỗi xác thực thẻ</h3>
            <p className="text-sm text-red-600">{result.message}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setStatus("form");
            setSerial("");
            setPin("");
          }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Provider Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Chọn nhà mạng
        </label>
        <div className="grid grid-cols-3 gap-3">
          {cardProviders.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setProvider(p.id as any)}
              className={`p-3 rounded-lg border-2 transition-all ${
                provider === p.id
                  ? "border-cyan-500 bg-cyan-50 shadow-glow-cyan"
                  : "border-gray-200 bg-white hover:border-cyan-300"
              }`}
            >
              <div className="text-2xl mb-1">{p.icon}</div>
              <div className="text-xs font-semibold">{p.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Serial Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Serial (mặt trước thẻ)
        </label>
        <input
          type="password"
          value={serial}
          onChange={(e) => setSerial(formatSerial(e.target.value))}
          placeholder="0000 0000 0000 0000"
          maxLength={19}
          className="w-full border-2 border-gray-300 rounded-lg p-3 font-mono text-lg tracking-widest focus:border-cyan-500 focus:outline-none transition-colors"
        />
        <p className="text-xs text-gray-500 mt-1">
          Nhập 16 chữ số mặt trước thẻ cào
        </p>
      </div>

      {/* PIN Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Mã PIN (mặt sau thẻ)
        </label>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(formatPin(e.target.value))}
          placeholder="0000 0000"
          maxLength={11}
          className="w-full border-2 border-gray-300 rounded-lg p-3 font-mono text-lg tracking-widest focus:border-cyan-500 focus:outline-none transition-colors"
        />
        <p className="text-xs text-gray-500 mt-1">
          Nhập 8 chữ số mã PIN mặt sau thẻ cào
        </p>
      </div>

      {/* Amount Display */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-lg p-4">
        <p className="text-xs text-gray-600 uppercase tracking-wider">
          Giá trị nạp
        </p>
        <p className="text-3xl font-bold text-cyan-600 mt-1">
          {formatCardAmount(amount)}
        </p>
      </div>

      {/* Amount Selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Hoặc chọn mệnh giá
        </label>
        <div className="grid grid-cols-2 gap-2">
          {currentProvider?.denominations.map((denom) => (
            <button
              key={denom}
              type="button"
              onClick={() => setAmount(denom)}
              className={`p-2 rounded-lg border-2 font-semibold transition-all text-sm ${
                amount === denom
                  ? "border-cyan-500 bg-cyan-100 text-cyan-700"
                  : "border-gray-300 bg-white text-gray-700 hover:border-cyan-300"
              }`}
            >
              {formatCardAmount(denom)}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !serial || !pin}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Đang xác thực thẻ...
          </>
        ) : (
          "Xác Nhận Thanh Toán"
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        ✓ Đây là demo. Thẻ của bạn không bị trừ tiền thực.
      </p>
    </form>
  );
}
