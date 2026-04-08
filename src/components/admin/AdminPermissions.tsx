import { Shield, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const roles = ["Staff", "Moderator"];
const permissionGroups = [
  {
    group: "Orders",
    permissions: [
      { id: "orders.view", label: "View Orders" },
      { id: "orders.approve", label: "Approve Orders" },
      { id: "orders.reject", label: "Reject Orders" },
      { id: "orders.delete", label: "Delete Orders" },
    ],
  },
  {
    group: "Members",
    permissions: [
      { id: "members.view", label: "View Members" },
      { id: "members.edit_role", label: "Edit Roles" },
      { id: "members.ban", label: "Ban/Unban Users" },
    ],
  },
  {
    group: "Catalog",
    permissions: [
      { id: "catalog.view", label: "View Categories" },
      { id: "catalog.create", label: "Create Categories" },
      { id: "catalog.edit", label: "Edit Categories" },
      { id: "catalog.delete", label: "Delete Categories" },
    ],
  },
  {
    group: "Analytics",
    permissions: [
      { id: "analytics.view", label: "View Analytics" },
      { id: "analytics.export", label: "Export Reports" },
    ],
  },
];

const defaultPerms: Record<string, Record<string, boolean>> = {
  Staff: {
    "orders.view": true, "orders.approve": false, "orders.reject": false, "orders.delete": false,
    "members.view": true, "members.edit_role": false, "members.ban": false,
    "catalog.view": true, "catalog.create": false, "catalog.edit": false, "catalog.delete": false,
    "analytics.view": true, "analytics.export": false,
  },
  Moderator: {
    "orders.view": true, "orders.approve": true, "orders.reject": true, "orders.delete": false,
    "members.view": true, "members.edit_role": false, "members.ban": true,
    "catalog.view": true, "catalog.create": true, "catalog.edit": true, "catalog.delete": false,
    "analytics.view": true, "analytics.export": true,
  },
};

export default function AdminPermissions() {
  const [permissions, setPermissions] = useState(defaultPerms);
  const [selectedRole, setSelectedRole] = useState("Staff");
  const { toast } = useToast();

  const togglePerm = (permId: string) => {
    setPermissions({
      ...permissions,
      [selectedRole]: {
        ...permissions[selectedRole],
        [permId]: !permissions[selectedRole][permId],
      },
    });
  };

  const handleSave = () => {
    toast({ title: "Permissions saved", description: `Updated permissions for ${selectedRole}` });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-xl text-foreground flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Role Permissions
        </h2>
        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-medium btn-glow transition-all hover:opacity-90">
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>

      {/* Role Tabs */}
      <div className="flex gap-2">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              selectedRole === role
                ? "bg-primary/15 text-primary border border-primary/30 glow-cyan"
                : "glass-panel text-muted-foreground hover:text-foreground"
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Permission Groups */}
      <div className="space-y-4">
        {permissionGroups.map((group) => (
          <div key={group.group} className="glass-panel iridescent-border rounded-2xl p-5">
            <h3 className="font-heading font-semibold text-foreground mb-4">{group.group}</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {group.permissions.map((perm) => (
                <label
                  key={perm.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer group"
                >
                  <div
                    onClick={() => togglePerm(perm.id)}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${
                      permissions[selectedRole][perm.id]
                        ? "bg-primary border-primary"
                        : "border-glass-border group-hover:border-primary/40"
                    }`}
                  >
                    {permissions[selectedRole][perm.id] && (
                      <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-foreground">{perm.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
