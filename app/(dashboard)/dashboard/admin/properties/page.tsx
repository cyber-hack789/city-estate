"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const properties = [
  { id: "1", title: "3BHK in Bandra", provider: "Premium Homes", status: "approved", views: 234, date: "2025-12-10" },
  { id: "2", title: "Villa in Jubilee Hills", provider: "Hyderabad Realtors", status: "pending", views: 0, date: "2026-01-05" },
  { id: "3", title: "2BHK in Whitefield", provider: "Bangalore Props", status: "approved", views: 156, date: "2025-11-20" },
  { id: "4", title: "Studio in Koregaon Park", provider: "Pune Homes", status: "kyc_hold", views: 0, date: "2026-01-12" },
];

const statusMap: Record<string, "success" | "warning" | "danger" | "neutral"> = {
  approved: "success", pending: "warning", kyc_hold: "danger", rejected: "danger", draft: "neutral",
};

export default function AdminPropertiesPage() {
  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Properties</h1>
          <p className="text-slate-500 mt-1">All property listings on the platform</p>
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Property</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Provider</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Status</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Views</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {properties.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="py-3 pr-4 text-sm font-medium text-slate-700">{p.title}</td>
                    <td className="py-3 pr-4 text-sm text-slate-500">{p.provider}</td>
                    <td className="py-3 pr-4"><Badge variant={statusMap[p.status]} size="sm">{p.status.replace("_", " ")}</Badge></td>
                    <td className="py-3 pr-4 text-sm text-slate-600">{p.views}</td>
                    <td className="py-3"><button className="text-xs text-emerald-600 font-semibold mr-2">View</button></td>
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
