import Navbar from "@/components/Navbar";
import { User, Shield, Key, Trophy, Star, Crown, Medal, Award } from "lucide-react";
import { useState } from "react";

const topContributors = [
  { rank: 1, name: "DragonSlayer99", spent: "45,200,000₫", tier: "Diamond", icon: Crown, color: "text-yellow-400" },
  { rank: 2, name: "BloxMaster_VN", spent: "38,100,000₫", tier: "Diamond", icon: Medal, color: "text-gray-300" },
  { rank: 3, name: "PetLord2024", spent: "31,500,000₫", tier: "Gold", icon: Award, color: "text-amber-600" },
  { rank: 4, name: "RobuxKing", spent: "25,800,000₫", tier: "Gold", icon: Star, color: "text-muted-foreground" },
  { rank: 5, name: "NightFury_X", spent: "19,200,000₫", tier: "Silver", icon: Star, color: "text-muted-foreground" },
];

const Profile = () => {
  const [activeSection, setActiveSection] = useState<"profile" | "security" | "ranking">("profile");

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="font-heading font-bold text-3xl text-foreground text-glow-cyan mb-6">Profile & Ranking</h1>

          {/* Tab Nav */}
          <div className="flex gap-2 mb-8">
            {[
              { id: "profile" as const, label: "Profile", icon: User },
              { id: "security" as const, label: "Security", icon: Shield },
              { id: "ranking" as const, label: "Leaderboard", icon: Trophy },
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
            <div className="glass-panel iridescent-border rounded-2xl p-8">
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-cyan shrink-0">
                  <span className="font-heading font-black text-2xl text-primary-foreground">VN</span>
                </div>
                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground">Guest User</h2>
                  <p className="text-sm text-muted-foreground">guest@holoshop.vn</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-primary/15 text-primary border border-primary/20">BRONZE</span>
                    <span className="text-xs text-muted-foreground">0 Loyalty Points</span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { label: "Display Name", value: "Guest User" },
                  { label: "Email", value: "guest@holoshop.vn" },
                  { label: "Member Since", value: "January 2024" },
                  { label: "Total Orders", value: "12" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-xs text-muted-foreground mb-1.5 block">{field.label}</label>
                    <div className="px-4 py-3 rounded-xl bg-muted/20 border border-glass-border text-sm text-foreground">
                      {field.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeSection === "security" && (
            <div className="space-y-4">
              {[
                { title: "Change Password", desc: "Update your account password", icon: Key, action: "Update" },
                { title: "Two-Factor Authentication", desc: "Add an extra layer of security", icon: Shield, action: "Enable" },
              ].map((item) => (
                <div key={item.title} className="glass-panel iridescent-border rounded-2xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <button className="px-5 py-2 rounded-xl bg-muted/30 border border-glass-border text-sm font-medium text-foreground hover:bg-muted/50 hover:border-primary/30 transition-all">
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Ranking Section */}
          {activeSection === "ranking" && (
            <div className="glass-panel iridescent-border rounded-2xl p-8">
              <h2 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-400" />
                Top Contributors
              </h2>
              <div className="space-y-3">
                {topContributors.map((c) => {
                  const maxSpent = 45200000;
                  const currentSpent = parseInt(c.spent.replace(/[₫,]/g, ""));
                  const pct = (currentSpent / maxSpent) * 100;

                  return (
                    <div key={c.rank} className="flex items-center gap-4 p-4 rounded-xl bg-muted/10 hover:bg-muted/20 transition-all group">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-sm ${
                        c.rank === 1 ? "bg-yellow-500/20 text-yellow-400" :
                        c.rank === 2 ? "bg-gray-400/20 text-gray-300" :
                        c.rank === 3 ? "bg-amber-600/20 text-amber-500" :
                        "bg-muted/30 text-muted-foreground"
                      }`}>
                        {c.rank}
                      </div>
                      <c.icon className={`w-5 h-5 ${c.color}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-medium text-sm text-foreground">{c.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/20">{c.tier}</span>
                            <span className="text-xs font-heading font-semibold text-primary">{c.spent}</span>
                          </div>
                        </div>
                        <div className="liquid-progress h-2">
                          <div
                            className="liquid-progress-bar"
                            style={{ width: `${pct}%`, transition: "width 1s ease" }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
