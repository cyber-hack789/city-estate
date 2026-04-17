import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "City Estate — Premium Real Estate Platform",
    template: "%s | City Estate",
  },
  description:
    "Discover your dream property with City Estate. Browse apartments, houses, villas & more across India with advanced search, verified listings, and trusted providers.",
  keywords: [
    "real estate",
    "property",
    "buy",
    "rent",
    "apartments",
    "houses",
    "villas",
    "India",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
