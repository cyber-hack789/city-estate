"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const pendingApprovals = [
  { id: "1", title: "Villa in Jubilee Hills", provider: "Hyderabad Realtors", type: "villa", price: "₹8.5 Cr", submitted: "2 days ago" },
  { id: "2", title: "Commercial Space in BKC", provider: "Mumbai Realty", type: "commercial", price: "₹15 Cr", submitted: "5 hours ago" },
  { id: "3", title: "PG in HSR Layout", provider: "PG World", type: "pg", price: "₹8K/mo", submitted: "1 day ago" },
];

export default function AdminApprovalsPage() {
  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pending Approvals</h1>
          <p className="text-slate-500 mt-1">Review and approve property listings</p>
        </div>
        <div className="space-y-4">
          {pendingApprovals.map((p) => (
            <Card key={p.id} hover>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">🏠</div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{p.title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">By {p.provider} · {p.type} · {p.price} · Submitted {p.submitted}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">✅ Approve</Button>
                  <Button size="sm" variant="secondary">❌ Reject</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
