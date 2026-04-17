import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/property/PropertyCard";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Properties",
  description: "Browse verified properties across India — apartments, houses, villas, and more.",
};

// Mock data for initial UI (will be replaced with real API data)
const mockProperties = [
  {
    _id: "1", title: "Luxury 3BHK Apartment in Bandra West", slug: "luxury-3bhk-apartment-bandra-west",
    propertyType: "apartment", listingType: "sale", price: 25000000, bhk: 3, area: 1850,
    location: { city: "Mumbai", area: "Bandra West" }, furnishing: "furnished", isFeatured: true, views: 342,
    media: [{ url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop" }],
  },
  {
    _id: "2", title: "Modern 2BHK Flat Near Metro Station", slug: "modern-2bhk-flat-metro",
    propertyType: "apartment", listingType: "rent", price: 45000, bhk: 2, area: 1100,
    location: { city: "Bangalore", area: "Whitefield" }, furnishing: "semi-furnished", views: 128,
    media: [{ url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop" }],
  },
  {
    _id: "3", title: "Spacious Villa with Private Garden", slug: "spacious-villa-private-garden",
    propertyType: "villa", listingType: "sale", price: 85000000, bhk: 5, area: 4500,
    location: { city: "Hyderabad", area: "Jubilee Hills" }, furnishing: "furnished", isFeatured: true, views: 567,
    media: [{ url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop" }],
  },
  {
    _id: "4", title: "Cozy 1BHK Studio Apartment", slug: "cozy-1bhk-studio",
    propertyType: "apartment", listingType: "rent", price: 22000, bhk: 1, area: 550,
    location: { city: "Pune", area: "Koregaon Park" }, furnishing: "furnished", views: 89,
    media: [{ url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop" }],
  },
  {
    _id: "5", title: "Premium 4BHK Penthouse with Terrace", slug: "premium-4bhk-penthouse",
    propertyType: "apartment", listingType: "sale", price: 42000000, bhk: 4, area: 3200,
    location: { city: "Delhi", area: "Greater Kailash" }, furnishing: "semi-furnished", isFeatured: true, views: 234,
    media: [{ url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop" }],
  },
  {
    _id: "6", title: "Independent House with Parking", slug: "independent-house-parking",
    propertyType: "house", listingType: "sale", price: 15000000, bhk: 3, area: 2100,
    location: { city: "Chennai", area: "Anna Nagar" }, furnishing: "unfurnished", views: 176,
    media: [{ url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop" }],
  },
];

export default function PropertiesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Page Header */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-slate-900">Properties</h1>
            <p className="text-slate-500 mt-1">Showing {mockProperties.length} verified listings</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border-b border-slate-100 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {["All", "Apartment", "House", "Villa", "Plot", "Commercial", "PG"].map((type) => (
                <Link
                  key={type}
                  href={type === "All" ? "/properties" : `/properties?propertyType=${type.toLowerCase()}`}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                >
                  {type}
                </Link>
              ))}
              <div className="flex-shrink-0 border-l border-slate-200 mx-2" />
              {["Buy", "Rent"].map((lt) => (
                <Link
                  key={lt}
                  href={`/properties?listingType=${lt === "Buy" ? "sale" : "rent"}`}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                >
                  {lt}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Properties
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
