"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";

const logs = [
  { id: "1", admin: "Admin", action: "APPROVE_PROPERTY", entity: "Property", detail: "Approved '3BHK in Bandra'", time: "2 hours ago", ip: "103.xx.xx.12" },
  { id: "2", admin: "Admin", action: "VERIFY_KYC", entity: "User", detail: "Verified KYC for Premium Homes", time: "5 hours ago", ip: "103.xx.xx.12" },
  { id: "3", admin: "Admin", action: "REJECT_PROPERTY", entity: "Property", detail: "Rejected 'Flat in Andheri' — incomplete info", time: "1 day ago", ip: "103.xx.xx.12" },
  { id: "4", admin: "Admin", action: "BAN_USER", entity: "User", detail: "Deactivated user spam_account@email.com", time: "3 days ago", ip: "103.xx.xx.15" },
];

const actionColor: Record<string, string> = {
  APPROVE_PROPERTY: "text-emerald-600 bg-emerald-50",
  VERIFY_KYC: "text-blue-600 bg-blue-50",
  REJECT_PROPERTY: "text-red-600 bg-red-50",
  BAN_USER: "text-red-600 bg-red-50",
};

export default function AdminLogsPage() {
  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Audit Logs</h1>
          <p className="text-slate-500 mt-1">Track all admin actions</p>
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Action</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Entity</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Details</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">IP</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logs.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50">
                    <td className="py-3 pr-4"><span className={`text-xs font-bold px-2 py-1 rounded-lg ${actionColor[l.action] || "text-slate-600 bg-slate-50"}`}>{l.action}</span></td>
                    <td className="py-3 pr-4 text-sm text-slate-500">{l.entity}</td>
                    <td className="py-3 pr-4 text-sm text-slate-700">{l.detail}</td>
                    <td className="py-3 pr-4 text-xs text-slate-400 font-mono">{l.ip}</td>
                    <td className="py-3 text-xs text-slate-400">{l.time}</td>
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
