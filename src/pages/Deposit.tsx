import Navbar from "@/components/Navbar";
import TopRechargeMarquee from "@/components/TopRechargeMarquee";
import { Landmark, CreditCard, Copy, Check, QrCode } from "lucide-react";
import { useState } from "react";

const methods = [
  { id: "atm", label: "ATM / Chuyển khoản", icon: Landmark, desc: "Tất cả ngân hàng Việt Nam" },
  { id: "scratch", label: "Thẻ cào", icon: CreditCard, desc: "Viettel, Mobifone, Vinaphone..." },
];

const amounts = [50000, 100000, 200000, 500000, 1000000, 2000000];

const providers = ["Viettel", "Mobifone", "Vinaphone", "Vietnamobile", "Zing"];
const cardAmounts = [10000, 20000, 50000, 100000, 200000, 500000];

const DepositPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("atm");
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  // Scratch card state
  const [provider, setProvider] = useState("");
  const [cardAmount, setCardAmount] = useState(0);
  const [serial, setSerial] = useState("");
  const [pin, setPin] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText("HOLOSHOP-VN-2024-ABCDEF");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateQR = () => {
    if (selectedAmount > 0) setShowQR(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="fixed top-16 left-0 right-0 z-40">
        <TopRechargeMarquee />
      </div>
      <main className="pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="font-heading font-bold text-3xl text-foreground mb-2 text-glow-cyan">Nạp tiền</h1>
          <p className="text-muted-foreground text-sm mb-8">Nạp số dư để bắt đầu mua sắm</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left — Methods */}
            <div className="space-y-4">
              <h2 className="font-heading font-semibold text-lg text-foreground mb-3">Phương thức</h2>
              {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => { setSelectedMethod(m.id); setShowQR(false); }}
                  className={`w-full glass-panel iridescent-border p-4 rounded-xl flex items-center gap-4 transition-all text-left ${
                    selectedMethod === m.id ? "border-primary/50 glow-cyan" : "hover:border-primary/20"
                  }`}
                >
                  <div className={`p-3 rounded-xl ${selectedMethod === m.id ? "bg-primary/20" : "bg-muted/50"}`}>
                    <m.icon className={`w-5 h-5 ${selectedMethod === m.id ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-foreground">{m.label}</p>
                    <p className="text-xs text-muted-foreground">{m.desc}</p>
                  </div>
                  {selectedMethod === m.id && <div className="ml-auto w-3 h-3 rounded-full bg-primary animate-pulse-glow" />}
                </button>
              ))}

              {/* ATM: Amount selection */}
              {selectedMethod === "atm" && (
                <>
                  <h2 className="font-heading font-semibold text-lg text-foreground mt-6 mb-3">Số tiền</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {amounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => { setSelectedAmount(amt); setShowQR(false); }}
                        className={`glass-panel p-3 rounded-xl text-center transition-all font-heading font-semibold text-sm ${
                          selectedAmount === amt ? "border-primary/50 text-primary glow-cyan" : "text-foreground hover:border-primary/20"
                        }`}
                      >
                        {amt.toLocaleString()}₫
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleGenerateQR}
                    disabled={selectedAmount === 0}
                    className="w-full mt-4 btn-glow py-3 rounded-xl bg-gradient-to-r from-primary to-secondary font-heading font-bold text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform"
                  >
                    Tạo mã QR
                  </button>
                </>
              )}

              {/* Scratch card form */}
              {selectedMethod === "scratch" && (
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-heading font-semibold text-foreground mb-2">Nhà mạng</label>
                    <div className="grid grid-cols-3 gap-2">
                      {providers.map((p) => (
                        <button
                          key={p}
                          onClick={() => setProvider(p)}
                          className={`glass-panel p-2.5 rounded-xl text-center text-xs font-semibold transition-all ${
                            provider === p ? "border-primary/50 text-primary glow-cyan" : "text-foreground hover:border-primary/20"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold text-foreground mb-2">Mệnh giá</label>
                    <div className="grid grid-cols-3 gap-2">
                      {cardAmounts.map((a) => (
                        <button
                          key={a}
                          onClick={() => setCardAmount(a)}
                          className={`glass-panel p-2.5 rounded-xl text-center text-xs font-semibold transition-all ${
                            cardAmount === a ? "border-primary/50 text-primary glow-cyan" : "text-foreground hover:border-primary/20"
                          }`}
                        >
                          {a.toLocaleString()}₫
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold text-foreground mb-2">Số Serial</label>
                    <input
                      value={serial}
                      onChange={(e) => setSerial(e.target.value)}
                      placeholder="Nhập số serial"
                      className="w-full glass-panel px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground border border-glass-border focus:outline-none focus:border-primary/40 transition-all bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold text-foreground mb-2">Mã PIN</label>
                    <input
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="Nhập mã PIN"
                      className="w-full glass-panel px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground border border-glass-border focus:outline-none focus:border-primary/40 transition-all bg-transparent"
                    />
                  </div>
                  <button className="w-full btn-glow py-3 rounded-xl bg-gradient-to-r from-primary to-secondary font-heading font-bold text-primary-foreground hover:scale-[1.02] transition-transform">
                    Nạp thẻ
                  </button>
                </div>
              )}
            </div>

            {/* Right — QR Code (ATM only) */}
            {selectedMethod === "atm" && (
              <div className={`glass-panel iridescent-border rounded-2xl p-6 flex flex-col items-center justify-center transition-all ${showQR ? "glow-violet" : "opacity-60"}`}>
                {!showQR ? (
                  <div className="text-center py-12">
                    <QrCode className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Chọn số tiền và nhấn "Tạo mã QR"</p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-heading font-semibold text-lg text-foreground mb-6">Quét để thanh toán</h2>
                    <div className="w-48 h-48 rounded-2xl bg-foreground/90 p-3 mb-6 relative">
                      <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                        <QrCode className="w-28 h-28 text-foreground/80" />
                      </div>
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-lg" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Nội dung chuyển khoản</p>
                    <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-xl">
                      <code className="text-sm text-primary font-mono">HOLOSHOP-VN-2024</code>
                      <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                      </button>
                    </div>
                    <div className="mt-6 text-center">
                      <p className="font-heading font-bold text-2xl text-foreground text-glow-cyan">
                        {selectedAmount.toLocaleString()}₫
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Số dư sẽ được cộng trong 5 phút</p>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Right — Scratch card info */}
            {selectedMethod === "scratch" && (
              <div className="glass-panel iridescent-border rounded-2xl p-6">
                <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Hướng dẫn nạp thẻ cào</h2>
                <div className="space-y-3">
                  {[
                    "Chọn nhà mạng và mệnh giá phù hợp",
                    "Nhập chính xác số Serial và mã PIN",
                    "Nhấn 'Nạp thẻ' và chờ xác nhận",
                    "Số dư sẽ được cộng trong 1-5 phút",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3 glass-panel p-3 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-primary-foreground">{i + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                  <p className="text-xs text-destructive font-medium">⚠️ Lưu ý: Nạp sai mệnh giá sẽ mất thẻ. Vui lòng kiểm tra kỹ trước khi nạp.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DepositPage;
