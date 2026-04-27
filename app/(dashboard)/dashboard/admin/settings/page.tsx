"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function AdminSettingsPage() {
  return (
    <DashboardShell role="admin">
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Settings</h1>
          <p className="text-slate-500 mt-1">Platform configuration</p>
        </div>
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Admin Profile</h2>
          <div className="space-y-4">
            <Input label="Name" placeholder="Admin" />
            <Input label="Email" type="email" disabled />
          </div>
          <Button className="mt-4">Save</Button>
        </Card>
        <Card>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Platform Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-sm text-slate-700">Auto-approve properties for verified providers</span>
              <div className="w-10 h-6 bg-emerald-500 rounded-full relative cursor-pointer"><div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" /></div>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-sm text-slate-700">Email notifications for new registrations</span>
              <div className="w-10 h-6 bg-emerald-500 rounded-full relative cursor-pointer"><div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" /></div>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-sm text-slate-700">Require KYC for property listing</span>
              <div className="w-10 h-6 bg-emerald-500 rounded-full relative cursor-pointer"><div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" /></div>
            </div>
          </div>
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
