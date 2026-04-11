import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, ArrowRight, Zap, Building2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const tiers = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    description: "Essential intelligence for individual practitioners",
    cta: "Get Started Free",
    ctaVariant: "hero-outline" as const,
    priceId: null,
    features: [
      { text: "Weekly threat briefings (summary)", included: true },
      { text: "Stack Matrix (basic view)", included: true },
      { text: "Community access", included: true },
      { text: "Full article access", included: false },
      { text: "Advanced Matrix filters", included: false },
      { text: "CSV/PDF export", included: false },
      { text: "Streak & referral system", included: false },
      { text: "Priority briefings", included: false },
    ],
  },
  {
    name: "Pro",
    price: { monthly: 39, annual: 390 },
    description: "Full intelligence access for security professionals",
    cta: "Start Pro Trial",
    ctaVariant: "hero" as const,
    popular: true,
    priceId: { monthly: "pro_monthly", annual: "pro_yearly" },
    features: [
      { text: "Everything in Free", included: true },
      { text: "Full article & research access", included: true },
      { text: "Advanced Matrix with all filters", included: true },
      { text: "CSV/PDF data export", included: true },
      { text: "Streak counter & referral credits", included: true },
      { text: "Priority briefings (48h early)", included: true },
      { text: "Saved briefs library", included: true },
      { text: "AI Readiness Assessment", included: true },
    ],
  },
  {
    name: "Enterprise",
    price: { monthly: null, annual: null },
    description: "Custom intelligence for security organizations",
    cta: "Contact Sales",
    ctaVariant: "hero-outline" as const,
    priceId: null,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Team seats & SSO", included: true },
      { text: "Custom threat feeds", included: true },
      { text: "API access", included: true },
      { text: "Dedicated analyst briefings", included: true },
      { text: "Custom integrations", included: true },
      { text: "SLA & priority support", included: true },
      { text: "On-demand research requests", included: true },
    ],
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [loading, setLoading] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async (tierName: string, priceId: { monthly: string; annual: string } | null) => {
    if (!priceId) {
      if (tierName === "Free") navigate("/login");
      else toast.info("Contact us at sales@aithreatbrief.com for enterprise pricing");
      return;
    }
    if (!user) {
      navigate("/login");
      return;
    }
    setLoading(tierName);
    try {
      const { data, error } = await supabase.functions.invoke("stripe-checkout", {
        body: { priceType: annual ? priceId.annual : priceId.monthly },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (err: any) {
      toast.error(err.message || "Failed to start checkout");
    }
    setLoading(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-mono text-primary tracking-widest mb-3">PRICING</p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Intelligence that <span className="gradient-text">pays for itself.</span>
            </h1>
            <p className="text-muted-foreground">
              One prevented incident pays for years of Pro access. Choose your level.
            </p>

            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={`text-sm ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-12 h-6 rounded-full transition-colors ${annual ? "bg-primary" : "bg-secondary"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-primary-foreground transition-transform ${annual ? "left-6" : "left-0.5"}`} />
              </button>
              <span className={`text-sm ${annual ? "text-foreground" : "text-muted-foreground"}`}>
                Annual <Badge className="bg-success/20 text-success border-success/30 text-[10px] ml-1">SAVE 20%</Badge>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`glass-panel rounded-xl p-6 relative ${
                  tier.popular ? "cyber-border cyber-glow-strong" : "border border-border/30"
                }`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4">
                    MOST POPULAR
                  </Badge>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    {tier.name === "Enterprise" ? (
                      <Building2 className="h-5 w-5 text-primary" />
                    ) : (
                      <Zap className="h-5 w-5 text-primary" />
                    )}
                    <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>

                <div className="mb-6">
                  {tier.price.monthly !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        ${annual ? Math.round((tier.price.annual || 0) / 12) : tier.price.monthly}
                      </span>
                      {tier.price.monthly > 0 && (
                        <span className="text-sm text-muted-foreground">/mo</span>
                      )}
                      {annual && tier.price.annual && tier.price.annual > 0 && (
                        <span className="text-xs text-muted-foreground ml-2">
                          (${tier.price.annual}/yr)
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-foreground">Custom</span>
                  )}
                </div>

                <Button
                  variant={tier.ctaVariant}
                  className="w-full mb-6"
                  onClick={() => handleCheckout(tier.name, tier.priceId)}
                  disabled={loading === tier.name}
                >
                  {loading === tier.name ? "Loading..." : tier.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <div className="space-y-3">
                  {tier.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm">
                      {f.included ? (
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground/30 shrink-0 mt-0.5" />
                      )}
                      <span className={f.included ? "text-foreground/80" : "text-muted-foreground/40"}>
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground/60 mt-10 max-w-lg mx-auto">
            <span className="text-primary/60">⚑</span> Independence disclosure: Pricing reflects the cost of independent research. AI Threat Brief accepts no vendor sponsorship for rankings or reviews.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
