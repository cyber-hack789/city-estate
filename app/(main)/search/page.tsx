import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Search Properties",
  description: "Search verified properties across India with advanced filters.",
};

const suggestedSearches = [
  "3BHK in Mumbai under 1Cr",
  "Rent in Bangalore Whitefield",
  "Villa in Hyderabad", 
  "2BHK Furnished Pune",
  "Commercial Space Delhi",
  "PG in Koramangala",
];

export default function SearchPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900">
              Find Your Perfect Property
            </h1>
            <p className="text-slate-500 mt-2">
              Use our advanced search to find exactly what you&apos;re looking for
            </p>
          </div>

          {/* Search Form */}
          <form action="/properties" method="GET" className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                name="city"
                placeholder="Enter city, locality, or project name..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <select name="listingType" className="px-3 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white">
                <option value="">Buy / Rent</option>
                <option value="sale">Buy</option>
                <option value="rent">Rent</option>
              </select>
              <select name="propertyType" className="px-3 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white">
                <option value="">Property Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="plot">Plot</option>
                <option value="commercial">Commercial</option>
              </select>
              <select name="bhk" className="px-3 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white">
                <option value="">BHK</option>
                {[1, 2, 3, 4, 5].map((b) => (
                  <option key={b} value={b}>{b} BHK</option>
                ))}
              </select>
              <select name="furnishing" className="px-3 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white">
                <option value="">Furnishing</option>
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input type="number" name="minPrice" placeholder="Min Budget (₹)" className="px-3 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
              <input type="number" name="maxPrice" placeholder="Max Budget (₹)" className="px-3 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
            </div>

            <Button type="submit" fullWidth size="lg">
              Search Properties
            </Button>
          </form>

          {/* Suggestions */}
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Popular Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {suggestedSearches.map((s) => (
                <Link
                  key={s}
                  href={`/properties?city=${s.split(" ").pop()?.toLowerCase()}`}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
