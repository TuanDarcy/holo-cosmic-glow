import Navbar from "@/components/Navbar";
import { CreditCard, Landmark, Smartphone, Copy, Check, QrCode } from "lucide-react";
import { useState } from "react";

const methods = [
  { id: "card", label: "Visa / MasterCard", icon: CreditCard, desc: "International cards accepted" },
  { id: "atm", label: "ATM / Bank Transfer", icon: Landmark, desc: "All Vietnamese banks" },
  { id: "momo", label: "MoMo Wallet", icon: Smartphone, desc: "Instant confirmation" },
];

const amounts = [50000, 100000, 200000, 500000, 1000000, 2000000];

const DepositPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("momo");
  const [selectedAmount, setSelectedAmount] = useState(200000);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("HOLOSHOP-VN-2024-ABCDEF");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="font-heading font-bold text-3xl text-foreground mb-2 text-glow-cyan">Deposit</h1>
          <p className="text-muted-foreground text-sm mb-8">Top up your balance to start shopping</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left — Methods */}
            <div className="space-y-4">
              <h2 className="font-heading font-semibold text-lg text-foreground mb-3">Payment Method</h2>
              {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id)}
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
                  {selectedMethod === m.id && (
                    <div className="ml-auto w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
                  )}
                </button>
              ))}

              {/* Amount selection */}
              <h2 className="font-heading font-semibold text-lg text-foreground mt-6 mb-3">Amount</h2>
              <div className="grid grid-cols-3 gap-3">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelectedAmount(amt)}
                    className={`glass-panel p-3 rounded-xl text-center transition-all font-heading font-semibold text-sm ${
                      selectedAmount === amt
                        ? "border-primary/50 text-primary glow-cyan"
                        : "text-foreground hover:border-primary/20"
                    }`}
                  >
                    {amt.toLocaleString()}₫
                  </button>
                ))}
              </div>
            </div>

            {/* Right — QR Code */}
            <div className="glass-panel iridescent-border rounded-2xl p-6 flex flex-col items-center justify-center glow-violet">
              <h2 className="font-heading font-semibold text-lg text-foreground mb-6">Scan to Pay</h2>
              
              {/* QR placeholder */}
              <div className="w-48 h-48 rounded-2xl bg-foreground/90 p-3 mb-6 relative">
                <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                  <QrCode className="w-28 h-28 text-foreground/80" />
                </div>
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-lg" />
              </div>

              <p className="text-sm text-muted-foreground mb-2">Transfer Content</p>
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
                <p className="text-xs text-muted-foreground mt-1">Amount will be credited within 5 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DepositPage;
