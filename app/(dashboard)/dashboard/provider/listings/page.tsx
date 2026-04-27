"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Link from "next/link";

const listings = [
  { id: "1", title: "3BHK Apartment in Bandra", status: "approved", views: 234, leads: 8, price: "₹2.5 Cr", type: "apartment", date: "2025-12-10" },
  { id: "2", title: "2BHK Flat in Whitefield", status: "approved", views: 156, leads: 5, price: "₹45K/mo", type: "apartment", date: "2025-11-20" },
  { id: "3", title: "Villa in Jubilee Hills", status: "pending", views: 0, leads: 0, price: "₹8.5 Cr", type: "villa", date: "2026-01-05" },
  { id: "4", title: "Studio in Koregaon Park", status: "kyc_hold", views: 0, leads: 0, price: "₹22K/mo", type: "apartment", date: "2026-01-12" },
  { id: "5", title: "Plot in Electronic City", status: "draft", views: 0, leads: 0, price: "₹1.2 Cr", type: "plot", date: "2026-02-01" },
];

const statusMap: Record<string, "success" | "warning" | "danger" | "info" | "neutral"> = {
  approved: "success", pending: "warning", kyc_hold: "danger", draft: "neutral", rejected: "danger",
};

export default function MyListingsPage() {
  return (
    <DashboardShell role="provider">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Listings</h1>
            <p className="text-slate-500 mt-1">Manage all your property listings</p>
          </div>
          <Link href="/dashboard/provider/listings/new">
            <Button>+ Add New Property</Button>
          </Link>
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">Property</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">Type</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">Price</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">Status</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">Views</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">Leads</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {listings.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-4"><span className="text-sm font-medium text-slate-700">{l.title}</span></td>
                    <td className="py-3 pr-4 text-sm text-slate-500 capitalize">{l.type}</td>
                    <td className="py-3 pr-4 text-sm font-semibold text-slate-700">{l.price}</td>
                    <td className="py-3 pr-4"><Badge variant={statusMap[l.status]}>{l.status.replace("_", " ")}</Badge></td>
                    <td className="py-3 pr-4 text-sm text-slate-600">{l.views}</td>
                    <td className="py-3 pr-4 text-sm font-medium text-emerald-600">{l.leads}</td>
                    <td className="py-3"><button className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold">Edit</button></td>
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
