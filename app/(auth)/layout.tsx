import { Suspense } from "react";

// Force dynamic rendering for auth pages.
// NextAuth's internal CSRF/callback flow may POST to /login.
// Static pages on Vercel (prerendered at build) return 405 on POST.
// Making these dynamic ensures they are server-rendered on demand.
export const dynamic = "force-dynamic";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
