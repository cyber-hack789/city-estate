"use client";

import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";

const stats = [
  { label: "Saved Properties", value: "12", icon: "❤️", color: "from-rose-500 to-pink-500" },
  { label: "Active Inquiries", value: "5", icon: "📩", color: "from-blue-500 to-indigo-500" },
  { label: "Messages", value: "3", icon: "💬", color: "from-emerald-500 to-teal-500" },
  { label: "Profile Views", value: "28", icon: "👁️", color: "from-amber-500 to-orange-500" },
];

export default function BuyerDashboard() {
  return (
    <DashboardShell role="buyer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back! 👋</h1>
          <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening with your property search.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <Card>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Inquiries</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-16 h-12 bg-slate-200 rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-700 truncate">3BHK in Bandra West</div>
                    <div className="text-xs text-slate-400">Inquiry sent 2 days ago</div>
                  </div>
                  <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">Active</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Recommended For You</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-16 h-12 bg-slate-200 rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-700 truncate">{i}BHK Apartment in Pune</div>
                    <div className="text-xs text-slate-400">₹{15 + i * 5}L · {800 + i * 200} sq.ft.</div>
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
