import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formatPrice, formatArea } from "@/utils/helpers";

interface PropertyCardProps {
  property: {
    _id: string;
    title: string;
    slug: string;
    propertyType: string;
    listingType: string;
    price: number;
    bhk: number;
    area: number;
    location: {
      city: string;
      area: string;
    };
    media?: { url: string; caption?: string }[];
    isFeatured?: boolean;
    furnishing: string;
    views?: number;
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const imageUrl =
    property.media?.[0]?.url ||
    `https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop`;

  return (
    <Link href={`/properties/${property.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={imageUrl}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Overlays */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={property.listingType === "sale" ? "success" : "info"}>
              {property.listingType === "sale" ? "For Sale" : "For Rent"}
            </Badge>
            {property.isFeatured && (
              <Badge variant="warning">⭐ Featured</Badge>
            )}
          </div>
          <div className="absolute bottom-3 right-3">
            <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-bold">
              {formatPrice(property.price)}
              {property.listingType === "rent" && (
                <span className="text-xs font-normal opacity-80">/mo</span>
              )}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-slate-900 text-sm line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {property.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.location.area}, {property.location.city}
          </p>

          {/* Features Strip */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {property.bhk} BHK
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {formatArea(property.area)}
            </span>
            <span className="capitalize">{property.furnishing}</span>
            <span className="capitalize text-emerald-600 font-medium ml-auto">
              {property.propertyType}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
