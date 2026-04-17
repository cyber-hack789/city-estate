"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register } = useAuth();
  const defaultRole = searchParams.get("role") || "buyer";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: defaultRole,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await register(form);
      router.push(`/dashboard/${form.role}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
        <div className="relative text-center text-white max-w-md">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold mb-4">Start Your Property Journey</h2>
          <p className="text-emerald-200 text-lg leading-relaxed">
            Join India&apos;s fastest-growing real estate platform. Whether you&apos;re buying, renting, or listing — we&apos;ve got you covered.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 text-left">
            {[
              "Free listings",
              "Verified leads",
              "KYC protection",
              "24/7 support",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-emerald-200">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                City Estate
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Create your account</h1>
            <p className="text-slate-500 mt-2">
              Get started in under a minute. It&apos;s completely free.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Toggle */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                I want to
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "buyer", label: "🏠 Buy / Rent" },
                  { value: "provider", label: "📋 List Property" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField("role", option.value)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                      form.role === option.value
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Full Name"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
            <Input
              label="Phone (Optional)"
              type="tel"
              placeholder="9876543210"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              helperText="10-digit Indian number"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Min 8 characters"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              required
              helperText="Must include uppercase, lowercase, and a digit"
            />

            <Button type="submit" fullWidth isLoading={isLoading} size="lg">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-600 font-semibold hover:text-emerald-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
