"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const plans = [
  { name: "Free", price: "₹0", period: "/forever", features: ["5 Listings", "Basic Support", "Standard Visibility"], current: true },
  { name: "Basic", price: "₹999", period: "/month", features: ["25 Listings", "Lead Access", "Priority Support", "Featured Badge"], current: false },
  { name: "Premium", price: "₹2,499", period: "/month", features: ["Unlimited Listings", "5 Featured Listings", "Analytics Dashboard", "Priority Support", "Lead Access"], current: false },
  { name: "Enterprise", price: "₹4,999", period: "/month", features: ["Everything in Premium", "API Access", "Dedicated Manager", "Custom Branding", "Bulk Upload"], current: false },
];

export default function ProviderSubscriptionPage() {
  return (
    <DashboardShell role="provider">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Subscription</h1>
          <p className="text-slate-500 mt-1">Choose a plan that fits your needs</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <Card key={plan.name} hover>
              <div className="text-center">
                {plan.current && <Badge variant="success" size="sm">Current Plan</Badge>}
                <h3 className="text-lg font-bold text-slate-900 mt-2">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-sm text-slate-400">{plan.period}</span>
                </div>
                <ul className="mt-4 space-y-2 text-left">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="text-emerald-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Button fullWidth variant={plan.current ? "secondary" : "primary"} className="mt-6">
                  {plan.current ? "Current" : "Upgrade"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
