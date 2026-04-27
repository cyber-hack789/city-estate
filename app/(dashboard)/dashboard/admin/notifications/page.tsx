"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";

export default function AdminNotificationsPage() {
  const notifications = [
    { id: "1", title: "New Property Submitted", message: "Premium Homes submitted 'Villa in Jubilee Hills' for review", time: "2 hours ago", read: false },
    { id: "2", title: "KYC Documents Submitted", message: "Pune Properties uploaded 2 KYC documents", time: "5 hours ago", read: false },
    { id: "3", title: "New User Registered", message: "Sneha Reddy registered as a buyer", time: "1 day ago", read: true },
    { id: "4", title: "Property Approved", message: "3BHK in Bandra was approved by Admin", time: "2 days ago", read: true },
  ];

  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 mt-1">System alerts and updates</p>
        </div>
        <div className="space-y-3">
          {notifications.map((n) => (
            <Card key={n.id} hover>
              <div className="flex items-start gap-3">
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${n.read ? "bg-slate-200" : "bg-emerald-500"}`} />
                <div className="flex-1">
                  <h3 className={`text-sm font-semibold ${n.read ? "text-slate-600" : "text-slate-900"}`}>{n.title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{n.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
