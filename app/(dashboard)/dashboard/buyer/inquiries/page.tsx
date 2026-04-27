"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const inquiries = [
  { id: "1", property: "3BHK in Bandra West", provider: "Premium Homes", status: "contacted", date: "2 days ago" },
  { id: "2", property: "Villa in Jubilee Hills", provider: "Hyderabad Realtors", status: "new", date: "5 hours ago" },
  { id: "3", property: "2BHK in Whitefield", provider: "Bangalore Properties", status: "interested", date: "1 week ago" },
];

const statusMap: Record<string, "success" | "warning" | "info" | "neutral"> = {
  new: "warning", contacted: "info", interested: "success", converted: "success", closed: "neutral",
};

export default function BuyerInquiriesPage() {
  return (
    <DashboardShell role="buyer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Inquiries</h1>
          <p className="text-slate-500 mt-1">Track your property inquiries</p>
        </div>
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <Card key={inq.id} hover>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📩</div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-900">{inq.property}</h3>
                  <p className="text-xs text-slate-500">Provider: {inq.provider} · {inq.date}</p>
                </div>
                <Badge variant={statusMap[inq.status]}>{inq.status}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
