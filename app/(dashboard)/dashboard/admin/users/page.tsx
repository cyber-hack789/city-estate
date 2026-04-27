"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const users = [
  { id: "1", name: "Rahul Sharma", email: "rahul@email.com", role: "buyer", status: "active", joined: "2025-11-10" },
  { id: "2", name: "Premium Homes", email: "info@premiumhomes.com", role: "provider", status: "active", joined: "2025-10-05" },
  { id: "3", name: "Priya Patel", email: "priya@email.com", role: "buyer", status: "active", joined: "2025-12-15" },
  { id: "4", name: "Hyderabad Realtors", email: "contact@hydrealtors.com", role: "provider", status: "inactive", joined: "2025-09-20" },
];

export default function AdminUsersPage() {
  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="text-slate-500 mt-1">Manage all registered users</p>
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">User</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Role</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Status</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Joined</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xs">{u.name.charAt(0)}</div>
                        <div><div className="text-sm font-medium text-slate-700">{u.name}</div><div className="text-xs text-slate-400">{u.email}</div></div>
                      </div>
                    </td>
                    <td className="py-3 pr-4"><Badge variant={u.role === "admin" ? "danger" : u.role === "provider" ? "warning" : "info"} size="sm">{u.role}</Badge></td>
                    <td className="py-3 pr-4"><Badge variant={u.status === "active" ? "success" : "neutral"} size="sm">{u.status}</Badge></td>
                    <td className="py-3 pr-4 text-sm text-slate-500">{u.joined}</td>
                    <td className="py-3"><button className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
