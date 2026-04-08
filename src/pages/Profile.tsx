import Navbar from "@/components/Navbar";
import { User, Shield, Copy, Check, Phone, Mail, Calendar, Wallet, Gamepad2, Link2 } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";

const recentCards = [
  { id: "TC-001", serial: "1234****5678", code: "9876****3210", value: "50,000₫", status: "Thành công", date: "08/04/2026", statusColor: "text-green-400 bg-green-400/10" },
  { id: "TC-002", serial: "5678****1234", code: "3210****9876", value: "100,000₫", status: "Đang xử lý", date: "07/04/2026", statusColor: "text-yellow-400 bg-yellow-400/10" },
  { id: "TC-003", serial: "9012****3456", code: "6543****2109", value: "200,000₫", status: "Thất bại", date: "06/04/2026", statusColor: "text-destructive bg-destructive/10" },
  { id: "TC-004", serial: "3456****7890", code: "0987****6543", value: "50,000₫", status: "Thành công", date: "05/04/2026", statusColor: "text-green-400 bg-green-400/10" },
];

const Profile = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "security" ? "security" : "profile";
  const [activeSection, setActiveSection] = useState<"profile" | "security" | "history">(initialTab as any);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("https://holoshop.vn/ref/HoloGamer123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-heading font-bold text-3xl text-foreground text-glow-cyan mb-6">Tài khoản</h1>

          {/* Tab Nav */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {[
              { id: "profile" as const, label: "Thông tin chung", icon: User },
              { id: "security" as const, label: "Đổi mật khẩu", icon: Shield },
              { id: "history" as const, label: "Lịch sử nạp thẻ", icon: Wallet },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === tab.id
                    ? "bg-primary/15 text-primary border border-primary/30 glow-cyan"
                    : "glass-panel text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className="glass-panel iridescent-border rounded-2xl p-6 sm:p-8">
              {/* Avatar & name */}
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-cyan shrink-0">
                  <span className="font-heading font-black text-2xl text-primary-foreground">🎮</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-heading font-bold text-xl text-foreground">HoloGamer</h2>
                  <p className="text-sm text-muted-foreground">user@holoshop.vn</p>
                </div>
              </div>

              {/* Balances */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="glass-panel p-4 rounded-xl text-center">
                  <Wallet className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Số dư VND</p>
                  <p className="font-heading font-bold text-lg text-foreground text-glow-cyan">1,250,000₫</p>
                </div>
                <div className="glass-panel p-4 rounded-xl text-center">
                  <Gamepad2 className="w-5 h-5 text-secondary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Số dư Robux</p>
                  <p className="font-heading font-bold text-lg text-foreground text-glow-violet">3,200 R$</p>
                </div>
              </div>

              {/* Info grid */}
              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 px-4 py-3 rounded-xl bg-muted/20 border border-glass-border text-sm text-foreground">
                      user@holoshop.vn
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-primary/15 text-primary text-sm font-medium border border-primary/20 hover:bg-primary/25 transition-colors">
                      Update
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                    <Phone className="w-3.5 h-3.5" /> Số điện thoại
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 px-4 py-3 rounded-xl bg-muted/20 border border-glass-border text-sm text-muted-foreground italic">
                      Chưa cập nhật
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-primary/15 text-primary text-sm font-medium border border-primary/20 hover:bg-primary/25 transition-colors">
                      Update
                    </button>
                  </div>
                </div>

                {/* Referral Link */}
                <div>
                  <label className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                    <Link2 className="w-3.5 h-3.5" /> Referrer Link
                  </label>
                  <div className="flex gap-2">
                    <input
                      readOnly
                      value="https://holoshop.vn/ref/HoloGamer123"
                      className="flex-1 px-4 py-3 rounded-xl bg-muted/20 border border-glass-border text-sm text-foreground cursor-default focus:outline-none"
                    />
                    <button
                      onClick={handleCopy}
                      className="px-4 py-2 rounded-xl bg-primary/15 text-primary text-sm font-medium border border-primary/20 hover:bg-primary/25 transition-colors flex items-center gap-1.5"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Join Date */}
                <div>
                  <label className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Ngày tham gia
                  </label>
                  <div className="px-4 py-3 rounded-xl bg-muted/20 border border-glass-border text-sm text-foreground">
                    01/01/2024
                  </div>
                </div>
              </div>

              {/* Logout */}
              <button className="mt-8 w-full py-3 rounded-xl bg-destructive/15 border border-destructive/20 text-destructive font-heading font-semibold text-sm hover:bg-destructive/25 transition-colors">
                Đăng xuất
              </button>
            </div>
          )}

          {/* Security Section */}
          {activeSection === "security" && (
            <div className="glass-panel iridescent-border rounded-2xl p-6 sm:p-8">
              <h2 className="font-heading font-bold text-xl text-foreground mb-6">Đổi mật khẩu</h2>
              <div className="space-y-5 max-w-md">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Mật khẩu cũ</label>
                  <Input type="password" placeholder="Nhập mật khẩu cũ" className="glass-panel bg-transparent border-glass-border focus:border-primary/40" />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Mật khẩu mới</label>
                  <Input type="password" placeholder="Nhập mật khẩu mới" className="glass-panel bg-transparent border-glass-border focus:border-primary/40" />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Xác nhận mật khẩu mới</label>
                  <Input type="password" placeholder="Nhập lại mật khẩu mới" className="glass-panel bg-transparent border-glass-border focus:border-primary/40" />
                </div>
                <button className="w-full btn-glow py-3 rounded-xl bg-gradient-to-r from-primary to-secondary font-heading font-bold text-primary-foreground hover:scale-[1.02] transition-transform">
                  Cập nhật mật khẩu
                </button>
              </div>
            </div>
          )}

          {/* Card History Section */}
          {activeSection === "history" && (
            <div className="glass-panel iridescent-border rounded-2xl p-6 sm:p-8">
              <h2 className="font-heading font-bold text-xl text-foreground mb-6">Thẻ Nạp Gần Nhất</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-glass-border">
                      <th className="text-left text-xs text-muted-foreground font-medium py-3 px-2">ID</th>
                      <th className="text-left text-xs text-muted-foreground font-medium py-3 px-2">Serial</th>
                      <th className="text-left text-xs text-muted-foreground font-medium py-3 px-2">Mã thẻ</th>
                      <th className="text-left text-xs text-muted-foreground font-medium py-3 px-2">Mệnh giá</th>
                      <th className="text-left text-xs text-muted-foreground font-medium py-3 px-2">Trạng thái</th>
                      <th className="text-left text-xs text-muted-foreground font-medium py-3 px-2">Ngày</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCards.map((card) => (
                      <tr key={card.id} className="border-b border-glass-border/50 hover:bg-muted/10 transition-colors">
                        <td className="py-3 px-2 font-mono text-xs text-muted-foreground">{card.id}</td>
                        <td className="py-3 px-2 font-mono text-xs">{card.serial}</td>
                        <td className="py-3 px-2 font-mono text-xs">{card.code}</td>
                        <td className="py-3 px-2 font-heading font-semibold text-foreground">{card.value}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${card.statusColor}`}>
                            {card.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-xs text-muted-foreground">{card.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
