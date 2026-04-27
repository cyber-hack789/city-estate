"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const leads = [
  { id: "1", buyer: "Rahul Sharma", provider: "Premium Homes", property: "3BHK in Bandra", status: "new", date: "2 hours ago" },
  { id: "2", buyer: "Priya Patel", provider: "Bangalore Props", property: "2BHK in Whitefield", status: "contacted", date: "1 day ago" },
  { id: "3", buyer: "Amit Kumar", provider: "Premium Homes", property: "3BHK in Bandra", status: "interested", date: "3 days ago" },
];

const statusMap: Record<string, "success" | "warning" | "info" | "neutral"> = {
  new: "warning", contacted: "info", interested: "success", closed: "neutral",
};

export default function AdminLeadsPage() {
  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Leads</h1>
          <p className="text-slate-500 mt-1">Platform-wide lead tracking</p>
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Buyer</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Property</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Provider</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Status</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50">
                    <td className="py-3 pr-4 text-sm font-medium text-slate-700">{l.buyer}</td>
                    <td className="py-3 pr-4 text-sm text-slate-600">{l.property}</td>
                    <td className="py-3 pr-4 text-sm text-slate-500">{l.provider}</td>
                    <td className="py-3 pr-4"><Badge variant={statusMap[l.status]} size="sm">{l.status}</Badge></td>
                    <td className="py-3 text-xs text-slate-400">{l.date}</td>
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
