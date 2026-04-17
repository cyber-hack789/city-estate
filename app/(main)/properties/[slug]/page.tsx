import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatPrice, formatArea } from "@/utils/helpers";

// This will be replaced with real data fetching via params
const mockProperty = {
  _id: "1", title: "Luxury 3BHK Apartment in Bandra West", slug: "luxury-3bhk-apartment-bandra-west",
  description: "A stunning 3BHK apartment located in the heart of Bandra West, Mumbai. This premium residence offers breathtaking sea views, modern amenities, and world-class finishes. The spacious living area flows into a private balcony, while the kitchen features imported Italian marble countertops. Each bedroom is en-suite with premium fixtures. Located near Bandstand, with easy access to restaurants, shopping, and the iconic Bandra-Worli Sea Link.",
  propertyType: "apartment", listingType: "sale" as string, price: 25000000, bhk: 3, area: 1850,
  location: { city: "Mumbai", area: "Bandra West", state: "Maharashtra", pincode: "400050", address: "14th Floor, Sea View Tower, Bandstand, Bandra West" },
  amenities: ["parking", "gym", "swimming_pool", "security", "power_backup", "lift", "cctv", "garden"],
  furnishing: "furnished", isFeatured: true, views: 342, isVerified: true, availableFrom: new Date("2025-06-01"),
  media: [
    { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop", type: "image" },
    { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop", type: "image" },
    { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop", type: "image" },
  ],
  provider: { name: "Premium Homes Realty", phone: "9876543210", profile: { company: "Premium Homes Pvt. Ltd." } },
};

export const metadata: Metadata = {
  title: "Property Details",
};

export default function PropertyDetailPage() {
  const property = mockProperty;
  const amenityLabels: Record<string, string> = {
    parking: "🚗 Parking", gym: "💪 Gym", swimming_pool: "🏊 Pool", security: "🔒 Security",
    power_backup: "⚡ Power Backup", lift: "🛗 Lift", cctv: "📹 CCTV", garden: "🌳 Garden",
    club_house: "🏛️ Club House", playground: "🎪 Playground",
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Image Gallery */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:aspect-[3/1]">
              <div className="md:col-span-2 relative overflow-hidden">
                <img src={property.media[0].url} alt={property.title} className="w-full h-full object-cover min-h-[300px]" />
                {property.isFeatured && (
                  <div className="absolute top-4 left-4"><Badge variant="warning">⭐ Featured</Badge></div>
                )}
                {property.isVerified && (
                  <div className="absolute top-4 right-4"><Badge variant="success">✅ Verified</Badge></div>
                )}
              </div>
              <div className="hidden md:grid grid-rows-2 gap-1">
                <img src={property.media[1]?.url} alt="" className="w-full h-full object-cover" />
                <div className="relative">
                  <img src={property.media[2]?.url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-semibold">+{property.media.length} Photos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={property.listingType === "sale" ? "success" : "info"}>
                        For {property.listingType === "sale" ? "Sale" : "Rent"}
                      </Badge>
                      <Badge variant="neutral">{property.propertyType}</Badge>
                      <Badge variant="neutral">{property.furnishing}</Badge>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">{property.title}</h1>
                    <p className="text-slate-500 mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {property.location.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      {formatPrice(property.price)}
                    </div>
                    {property.listingType === "rent" && <span className="text-sm text-slate-500">/month</span>}
                    <div className="text-xs text-slate-400 mt-1">{property.views} views</div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
                  {[
                    { label: "BHK", value: `${property.bhk} BHK`, icon: "🏠" },
                    { label: "Area", value: formatArea(property.area), icon: "📐" },
                    { label: "Furnishing", value: property.furnishing, icon: "🪑" },
                    { label: "Available", value: property.availableFrom ? new Date(property.availableFrom).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "Immediately", icon: "📅" },
                  ].map((info) => (
                    <div key={info.label} className="text-center">
                      <div className="text-2xl mb-1">{info.icon}</div>
                      <div className="text-sm font-semibold text-slate-900 capitalize">{info.value}</div>
                      <div className="text-xs text-slate-400">{info.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-3">About This Property</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl text-sm text-slate-700">
                      {amenityLabels[a] || a}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Contact */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-100 sticky top-24">
                <h3 className="font-bold text-slate-900 mb-4">Contact Provider</h3>
                <div className="flex items-center gap-3 mb-6 p-3 bg-slate-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                    {property.provider.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{property.provider.name}</div>
                    <div className="text-xs text-slate-500">{property.provider.profile.company}</div>
                  </div>
                </div>

                <form className="space-y-3">
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500" />
                  <input type="email" placeholder="Your Email" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500" />
                  <input type="tel" placeholder="Your Phone" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500" />
                  <textarea placeholder="I'm interested in this property..." rows={3} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none" />
                  <Button type="submit" fullWidth size="lg">Send Inquiry</Button>
                </form>

                <div className="mt-4 text-center">
                  <a href={`tel:${property.provider.phone}`} className="text-sm text-emerald-600 font-semibold hover:text-emerald-700">
                    📞 Call {property.provider.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
