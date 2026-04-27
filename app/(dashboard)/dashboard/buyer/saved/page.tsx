"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";

const savedProperties = [
  { id: "1", title: "3BHK Apartment in Bandra West", price: "₹2.5 Cr", city: "Mumbai", bhk: 3, area: 1450 },
  { id: "2", title: "Luxury Villa in Whitefield", price: "₹4.8 Cr", city: "Bangalore", bhk: 4, area: 3200 },
  { id: "3", title: "2BHK in Koregaon Park", price: "₹35K/mo", city: "Pune", bhk: 2, area: 980 },
];

export default function SavedPropertiesPage() {
  return (
    <DashboardShell role="buyer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Saved Properties</h1>
          <p className="text-slate-500 mt-1">Properties you&apos;ve bookmarked</p>
        </div>
        {savedProperties.length === 0 ? (
          <Card><p className="text-center text-slate-400 py-8">No saved properties yet. Start exploring!</p></Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedProperties.map((p) => (
              <Card key={p.id} hover>
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🏠</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{p.title}</h3>
                    <p className="text-lg font-extrabold text-emerald-600 mt-1">{p.price}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{p.bhk} BHK · {p.area} sq.ft · {p.city}</p>
                  </div>
                  <button className="text-red-400 hover:text-red-500 text-lg flex-shrink-0">❤️</button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
