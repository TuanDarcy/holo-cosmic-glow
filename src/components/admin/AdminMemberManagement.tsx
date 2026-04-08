import { Shield, Ban, UserCheck, Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockMembers = [
  { id: "1", name: "DragonSlayer99", email: "dragon@mail.com", role: "member", status: "active", joined: "2024-01-01" },
  { id: "2", name: "BloxMaster_VN", email: "blox@mail.com", role: "staff", status: "active", joined: "2024-01-05" },
  { id: "3", name: "PetLord2024", email: "pet@mail.com", role: "member", status: "banned", joined: "2024-01-10" },
  { id: "4", name: "RobuxKing", email: "robux@mail.com", role: "admin", status: "active", joined: "2024-01-12" },
  { id: "5", name: "NightFury_X", email: "night@mail.com", role: "member", status: "active", joined: "2024-01-15" },
];

const roleColors = {
  admin: "bg-red-500/15 text-red-400 border-red-500/20",
  staff: "bg-secondary/15 text-secondary border-secondary/20",
  member: "bg-primary/15 text-primary border-primary/20",
};

export default function AdminMemberManagement() {
  const [members, setMembers] = useState(mockMembers);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const handleRoleChange = (id: string, newRole: string) => {
    setMembers(members.map((m) => m.id === id ? { ...m, role: newRole } : m));
    toast({ title: "Role updated", description: `User role changed to ${newRole}` });
  };

  const handleBanToggle = (id: string) => {
    setMembers(members.map((m) => m.id === id ? { ...m, status: m.status === "banned" ? "active" : "banned" } : m));
    const member = members.find((m) => m.id === id);
    toast({
      title: member?.status === "banned" ? "User unbanned" : "User banned",
      description: `${member?.name} has been ${member?.status === "banned" ? "unbanned" : "banned"}`,
    });
  };

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <h2 className="font-heading font-bold text-xl text-foreground">Member Management</h2>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border border-glass-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
        />
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">User</th>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Email</th>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Role</th>
                <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Status</th>
                <th className="text-right py-3 px-4 text-xs text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-border/30 hover:bg-muted/10 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary-foreground">{m.name.slice(0, 2).toUpperCase()}</span>
                      </div>
                      <span className="text-foreground font-medium">{m.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{m.email}</td>
                  <td className="py-3 px-4">
                    <select
                      value={m.role}
                      onChange={(e) => handleRoleChange(m.id, e.target.value)}
                      className="px-3 py-1 rounded-lg bg-muted/20 border border-glass-border text-xs text-foreground focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
                    >
                      <option value="member">Member</option>
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      m.status === "active" ? "bg-green-500/15 text-green-400 border-green-500/20" : "bg-red-500/15 text-red-400 border-red-500/20"
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleBanToggle(m.id)}
                        className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium ${
                          m.status === "banned"
                            ? "hover:bg-green-500/15 text-green-400"
                            : "hover:bg-red-500/15 text-red-400"
                        }`}
                        title={m.status === "banned" ? "Unban" : "Ban"}
                      >
                        {m.status === "banned" ? <UserCheck className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
