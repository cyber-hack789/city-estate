"use client";

import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const stats = [
  { label: "Total Users", value: "1,245", icon: "👥", color: "from-blue-500 to-indigo-500" },
  { label: "Total Properties", value: "3,892", icon: "🏠", color: "from-emerald-500 to-teal-500" },
  { label: "Pending Approvals", value: "18", icon: "⏳", color: "from-amber-500 to-orange-500" },
  { label: "KYC Requests", value: "7", icon: "📑", color: "from-purple-500 to-violet-500" },
  { label: "Active Leads", value: "456", icon: "📩", color: "from-rose-500 to-pink-500" },
  { label: "Revenue (MTD)", value: "₹4.2L", icon: "💰", color: "from-green-500 to-emerald-500" },
];

const recentActivity = [
  { action: "New user registered", user: "Rahul Sharma", time: "2 min ago", type: "info" as const },
  { action: "Property submitted for review", user: "Premium Homes", time: "15 min ago", type: "warning" as const },
  { action: "KYC verified", user: "Skyline Realty", time: "1 hour ago", type: "success" as const },
  { action: "Property approved", user: "Admin", time: "2 hours ago", type: "success" as const },
  { action: "New lead generated", user: "Buyer → Villa #234", time: "3 hours ago", type: "info" as const },
];

export default function AdminDashboard() {
  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Platform overview and management.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} hover>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl shadow-lg`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pending Approvals */}
          <Card>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Pending Approvals</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-10 bg-slate-200 rounded-lg flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-slate-700">{i}BHK in Sector {i * 10}</div>
                      <div className="text-xs text-slate-400">by Provider #{i}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-lg hover:bg-emerald-100 transition-colors">
                      Approve
                    </button>
                    <button className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 p-3">
                  <Badge variant={activity.type} size="sm">{activity.type}</Badge>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-slate-700">{activity.action}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{activity.user} · {activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
