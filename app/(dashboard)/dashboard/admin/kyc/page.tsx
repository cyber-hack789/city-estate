"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const kycRequests = [
  { id: "1", provider: "Premium Homes", email: "info@premiumhomes.com", status: "submitted", docs: 2, submitted: "1 day ago" },
  { id: "2", provider: "Pune Properties", email: "contact@puneprop.com", status: "submitted", docs: 1, submitted: "3 hours ago" },
  { id: "3", provider: "Chennai Realty", email: "admin@chennai.com", status: "pending", docs: 0, submitted: "5 days ago" },
];

export default function AdminKycPage() {
  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">KYC Requests</h1>
          <p className="text-slate-500 mt-1">Verify provider identities</p>
        </div>
        <div className="space-y-4">
          {kycRequests.map((k) => (
            <Card key={k.id} hover>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">{k.provider.charAt(0)}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{k.provider}</h3>
                  <p className="text-xs text-slate-500">{k.email} · {k.docs} documents uploaded · {k.submitted}</p>
                </div>
                <Badge variant={k.status === "submitted" ? "info" : "warning"}>{k.status}</Badge>
                <div className="flex gap-2">
                  <Button size="sm">✅ Verify</Button>
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
