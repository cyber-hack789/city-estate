"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const leads = [
  { id: "1", buyer: "Rahul Sharma", property: "3BHK in Bandra", status: "new", date: "2 hours ago", phone: "98765xxxxx", email: "rahul@email.com" },
  { id: "2", buyer: "Priya Patel", property: "2BHK in Whitefield", status: "contacted", date: "1 day ago", phone: "87654xxxxx", email: "priya@email.com" },
  { id: "3", buyer: "Amit Kumar", property: "3BHK in Bandra", status: "interested", date: "3 days ago", phone: "76543xxxxx", email: "amit@email.com" },
  { id: "4", buyer: "Sneha Reddy", property: "Villa in Jubilee Hills", status: "new", date: "5 hours ago", phone: "65432xxxxx", email: "sneha@email.com" },
];

const statusMap: Record<string, "success" | "warning" | "info" | "neutral"> = {
  new: "warning", contacted: "info", interested: "success", converted: "success", closed: "neutral",
};

export default function ProviderLeadsPage() {
  return (
    <DashboardShell role="provider">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-slate-500 mt-1">Manage inquiries from potential buyers</p>
        </div>
        <div className="space-y-4">
          {leads.map((lead) => (
            <Card key={lead.id} hover>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {lead.buyer.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">{lead.buyer}</span>
                    <Badge variant={statusMap[lead.status]} size="sm">{lead.status}</Badge>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">Inquired about: {lead.property} · {lead.date}</div>
                  <div className="text-xs text-slate-400 mt-1">📧 {lead.email} · 📞 {lead.phone}</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-lg hover:bg-emerald-100 transition-colors">Contact</button>
                  <button className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors">View</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
