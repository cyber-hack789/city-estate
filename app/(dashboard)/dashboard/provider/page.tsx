"use client";

import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Link from "next/link";

const stats = [
  { label: "Total Listings", value: "8", icon: "🏠", color: "from-emerald-500 to-teal-500" },
  { label: "Approved", value: "5", icon: "✅", color: "from-green-500 to-emerald-500" },
  { label: "Pending Review", value: "2", icon: "⏳", color: "from-amber-500 to-orange-500" },
  { label: "Total Leads", value: "23", icon: "📩", color: "from-blue-500 to-indigo-500" },
];

const listings = [
  { id: "1", title: "3BHK Apartment in Bandra", status: "approved", views: 234, leads: 8, price: "₹2.5 Cr" },
  { id: "2", title: "2BHK Flat in Whitefield", status: "approved", views: 156, leads: 5, price: "₹45K/mo" },
  { id: "3", title: "Villa in Jubilee Hills", status: "pending", views: 0, leads: 0, price: "₹8.5 Cr" },
  { id: "4", title: "Studio in Koregaon Park", status: "kyc_hold", views: 0, leads: 0, price: "₹22K/mo" },
];

const statusVariant: Record<string, "success" | "warning" | "danger" | "info" | "neutral"> = {
  approved: "success", pending: "warning", kyc_hold: "danger", draft: "neutral", rejected: "danger",
};

export default function ProviderDashboard() {
  return (
    <DashboardShell role="provider">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Provider Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage your property listings and leads.</p>
          </div>
          <Link href="/dashboard/provider/listings/new">
            <Button>+ Add New Property</Button>
          </Link>
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

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">My Listings</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">Property</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">Status</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">Price</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">Views</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Leads</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="text-sm font-medium text-slate-700">{listing.title}</div>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge variant={statusVariant[listing.status]}>{listing.status.replace("_", " ")}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-sm text-slate-600">{listing.price}</td>
                    <td className="py-3 pr-4 text-sm text-slate-600">{listing.views}</td>
                    <td className="py-3 text-sm font-medium text-emerald-600">{listing.leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
