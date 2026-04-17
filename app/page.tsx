import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

const popularCities = [
  { name: "Mumbai", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop", count: "12,000+" },
  { name: "Delhi", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop", count: "9,500+" },
  { name: "Bangalore", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&h=300&fit=crop", count: "8,200+" },
  { name: "Hyderabad", image: "https://images.unsplash.com/photo-1572883454114-efda9d5d963a?w=400&h=300&fit=crop", count: "6,100+" },
  { name: "Chennai", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop", count: "5,300+" },
  { name: "Pune", image: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=400&h=300&fit=crop", count: "4,800+" },
];

const stats = [
  { value: "50K+", label: "Properties Listed" },
  { value: "10K+", label: "Happy Customers" },
  { value: "200+", label: "Cities Covered" },
  { value: "99%", label: "Verified Listings" },
];

const propertyTypes = [
  { icon: "🏢", label: "Apartments", type: "apartment" },
  { icon: "🏠", label: "Houses", type: "house" },
  { icon: "🏡", label: "Villas", type: "villa" },
  { icon: "📐", label: "Plots", type: "plot" },
  { icon: "🏬", label: "Commercial", type: "commercial" },
  { icon: "🛏️", label: "PG / Hostel", type: "pg" },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* ===== HERO SECTION ===== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
          {/* Abstract BG Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-300 text-sm font-medium">
                  Trusted by 10,000+ homebuyers across India
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
                Find Your
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  {" "}Dream Home{" "}
                </span>
                With Confidence
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Discover verified properties across India&apos;s top cities. From cozy apartments to luxury villas — your perfect space is just a search away.
              </p>

              {/* Search Bar */}
              <div className="mt-10 max-w-2xl mx-auto">
                <form action="/properties" method="GET" className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      name="city"
                      placeholder="Search by city, area, or project..."
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-base"
                    />
                  </div>
                  <select
                    name="listingType"
                    defaultValue=""
                    className="px-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none cursor-pointer sm:w-36"
                  >
                    <option value="" className="text-slate-900">Buy / Rent</option>
                    <option value="sale" className="text-slate-900">Buy</option>
                    <option value="rent" className="text-slate-900">Rent</option>
                  </select>
                  <Button type="submit" size="lg" className="px-8 py-4 rounded-2xl">
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STATS BAR ===== */}
        <section className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROPERTY TYPES ===== */}
        <section className="bg-slate-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">
                Explore by Property Type
              </h2>
              <p className="text-slate-500 mt-3 max-w-lg mx-auto">
                Whether you&apos;re looking for a cozy apartment or a spacious villa, we have it all.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {propertyTypes.map((type) => (
                <Link
                  key={type.type}
                  href={`/properties?propertyType=${type.type}`}
                  className="group bg-white rounded-2xl p-6 text-center border border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {type.icon}
                  </div>
                  <div className="text-sm font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">
                    {type.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== POPULAR CITIES ===== */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">
                Popular Cities
              </h2>
              <p className="text-slate-500 mt-3 max-w-lg mx-auto">
                Explore properties in India&apos;s most sought-after cities
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {popularCities.map((city) => (
                <Link
                  key={city.name}
                  href={`/properties?city=${city.name.toLowerCase()}`}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
                >
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{city.name}</h3>
                    <p className="text-sm text-white/70">{city.count} properties</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY CHOOSE US ===== */}
        <section className="bg-slate-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">
                Why Choose City Estate?
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🔒",
                  title: "Verified Listings",
                  description: "Every property goes through KYC verification. Only approved, legitimate listings appear on our platform.",
                },
                {
                  icon: "🤝",
                  title: "Direct Contact",
                  description: "Connect directly with property owners and verified providers. No hidden fees or middlemen charges.",
                },
                {
                  icon: "🔍",
                  title: "Smart Search",
                  description: "Advanced filters for city, budget, BHK, amenities, and more. Find exactly what you're looking for.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 text-center"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to List Your Property?
            </h2>
            <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join thousands of property providers on City Estate. Reach genuine buyers and renters with our verified platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?role=provider">
                <Button variant="secondary" size="lg" className="bg-white text-emerald-700 hover:bg-slate-50">
                  List Your Property — Free
                </Button>
              </Link>
              <Link href="/properties">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Browse Properties
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
