"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function ProviderKycPage() {
  const kycStatus: any = "pending";

  return (
    <DashboardShell role="provider">
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">KYC Verification</h1>
          <p className="text-slate-500 mt-1">Complete identity verification to publish your listings</p>
        </div>
        <Card>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl">📑</div>
            <div>
              <h2 className="font-bold text-slate-900">Verification Status</h2>
              <Badge variant={kycStatus === "verified" ? "success" : kycStatus === "submitted" ? "info" : "warning"}>
                {kycStatus}
              </Badge>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            ⚠️ Your KYC is pending. Properties you submit will be held until your identity is verified by our admin team.
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Upload Documents</h2>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors cursor-pointer">
              <div className="text-3xl mb-2">📤</div>
              <p className="text-sm font-medium text-slate-700">Aadhaar Card / PAN Card</p>
              <p className="text-xs text-slate-400 mt-1">Upload a clear photo or scan (JPG, PNG, PDF — max 5MB)</p>
            </div>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors cursor-pointer">
              <div className="text-3xl mb-2">📤</div>
              <p className="text-sm font-medium text-slate-700">Company Registration / Trade License</p>
              <p className="text-xs text-slate-400 mt-1">Required for business providers (JPG, PNG, PDF — max 5MB)</p>
            </div>
          </div>
          <Button fullWidth size="lg" className="mt-6">Submit for Verification</Button>
        </Card>
      </div>
    </DashboardShell>
  );
}
