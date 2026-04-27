"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function AddPropertyPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <DashboardShell role="provider">
      <div className="max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add New Property</h1>
          <p className="text-slate-500 mt-1">Fill in the details to list your property</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <Input label="Property Title" placeholder="e.g. 3BHK Luxury Apartment in Bandra West" required />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Property Type</label>
                  <select className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white">
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="plot">Plot</option>
                    <option value="commercial">Commercial</option>
                    <option value="pg">PG</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Listing Type</label>
                  <select className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white">
                    <option value="sale">Sale</option>
                    <option value="rent">Rent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                <textarea rows={4} placeholder="Describe your property..." className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none" />
              </div>
            </div>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Details</h2>
            <div className="grid grid-cols-3 gap-4">
              <Input label="Price (₹)" type="number" placeholder="2500000" required />
              <Input label="BHK" type="number" placeholder="3" required />
              <Input label="Area (sq.ft)" type="number" placeholder="1200" required />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Furnishing</label>
              <select className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white">
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Location</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="City" placeholder="Mumbai" required />
                <Input label="Area / Locality" placeholder="Bandra West" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="State" placeholder="Maharashtra" required />
                <Input label="Pincode" placeholder="400050" required />
              </div>
              <Input label="Full Address" placeholder="14th Floor, Sea View Tower, Bandstand" required />
            </div>
          </Card>
          <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
            Submit Property for Review
          </Button>
        </form>
      </div>
    </DashboardShell>
  );
}
