"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ProviderSettingsPage() {
  return (
    <DashboardShell role="provider">
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 mt-1">Manage your account and profile</p>
        </div>
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Profile Information</h2>
          <div className="space-y-4">
            <Input label="Full Name" placeholder="Your name" defaultValue="Premium Homes" />
            <Input label="Email" type="email" placeholder="email@example.com" disabled />
            <Input label="Phone" type="tel" placeholder="9876543210" />
            <Input label="Company Name" placeholder="Your company" />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio</label>
              <textarea rows={3} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none" placeholder="Tell buyers about yourself..." />
            </div>
          </div>
          <Button className="mt-4">Save Changes</Button>
        </Card>
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Change Password</h2>
          <div className="space-y-4">
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <Input label="New Password" type="password" placeholder="••••••••" />
            <Input label="Confirm Password" type="password" placeholder="••••••••" />
          </div>
          <Button variant="secondary" className="mt-4">Update Password</Button>
        </Card>
      </div>
    </DashboardShell>
  );
}
