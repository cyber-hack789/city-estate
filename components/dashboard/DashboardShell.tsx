"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ReactNode, useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "buyer" | "provider" | "admin";
}

const menuItems = {
  buyer: [
    { icon: "📊", label: "Overview", href: "/dashboard/buyer" },
    { icon: "❤️", label: "Saved Properties", href: "/dashboard/buyer/saved" },
    { icon: "📩", label: "My Inquiries", href: "/dashboard/buyer/inquiries" },
    { icon: "💬", label: "Messages", href: "/dashboard/buyer/messages" },
    { icon: "⚙️", label: "Settings", href: "/dashboard/buyer/settings" },
  ],
  provider: [
    { icon: "📊", label: "Overview", href: "/dashboard/provider" },
    { icon: "🏠", label: "My Listings", href: "/dashboard/provider/listings" },
    { icon: "➕", label: "Add Property", href: "/dashboard/provider/listings/new" },
    { icon: "📩", label: "Leads", href: "/dashboard/provider/leads" },
    { icon: "💬", label: "Messages", href: "/dashboard/provider/messages" },
    { icon: "📑", label: "KYC", href: "/dashboard/provider/kyc" },
    { icon: "💳", label: "Subscription", href: "/dashboard/provider/subscription" },
    { icon: "⚙️", label: "Settings", href: "/dashboard/provider/settings" },
  ],
  admin: [
    { icon: "📊", label: "Overview", href: "/dashboard/admin" },
    { icon: "👥", label: "Users", href: "/dashboard/admin/users" },
    { icon: "🏠", label: "Properties", href: "/dashboard/admin/properties" },
    { icon: "✅", label: "Approvals", href: "/dashboard/admin/approvals" },
    { icon: "📑", label: "KYC Requests", href: "/dashboard/admin/kyc" },
    { icon: "📩", label: "Leads", href: "/dashboard/admin/leads" },
    { icon: "🔔", label: "Notifications", href: "/dashboard/admin/notifications" },
    { icon: "📋", label: "Audit Logs", href: "/dashboard/admin/logs" },
    { icon: "⚙️", label: "Settings", href: "/dashboard/admin/settings" },
  ],
};

export default function DashboardShell({ children, role }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const items = menuItems[role];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:flex lg:flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              City Estate
            </span>
          </Link>
        </div>

        {/* Role Badge */}
        <div className="px-6 py-4">
          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 capitalize">
            {role} Dashboard
          </span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "bg-emerald-50 text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold">
              {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-700 truncate">{session?.user?.name}</div>
              <div className="text-xs text-slate-400 truncate">{session?.user?.email}</div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full mt-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors text-left"
          >
            ← Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center px-4 sm:px-6 gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1" />
          <Link href="/" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">
            ← Back to Site
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
