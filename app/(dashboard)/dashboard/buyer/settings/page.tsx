"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function BuyerSettingsPage() {
  return (
    <DashboardShell role="buyer">
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 mt-1">Manage your account and preferences</p>
        </div>
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Profile</h2>
          <div className="space-y-4">
            <Input label="Full Name" placeholder="Your name" />
            <Input label="Email" type="email" disabled />
            <Input label="Phone" type="tel" placeholder="9876543210" />
          </div>
          <Button className="mt-4">Save Changes</Button>
        </Card>
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Min Budget (₹)" type="number" placeholder="500000" />
              <Input label="Max Budget (₹)" type="number" placeholder="10000000" />
            </div>
            <Input label="Preferred Cities" placeholder="Mumbai, Pune, Bangalore" helperText="Comma separated" />
          </div>
          <Button className="mt-4">Update Preferences</Button>
        </Card>
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Change Password</h2>
          <div className="space-y-4">
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <Input label="New Password" type="password" placeholder="••••••••" />
          </div>
          <Button variant="secondary" className="mt-4">Update Password</Button>
        </Card>
      </div>
    </DashboardShell>
  );
}
