import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Zap, Building2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { generateFAQSchema } from "@/lib/seo";

const tiers = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    description: "Core intelligence for individual practitioners.",
    forWhom: "For security engineers who want high-signal AI threat intel and the Stack Matrix, without yet needing the Pro tooling.",
    cta: "Get Started Free",
    ctaVariant: "hero-outline" as const,
    priceId: null,
    features: [
      "Weekly AI Threat Briefs — full narrative and sources",
      "Open access to the Stack Matrix (core views)",
      "Public blog and methodology access",
      "Basic dashboard and email alerts",
    ],
  },
  {
    name: "Pro",
    price: { monthly: 39, annual: 390 },
    description: "Tools and depth for teams running AI in production.",
    forWhom: "For security teams who live with AI systems in prod and need faster workflows, deeper analysis and better evidence for decisions.",
    cta: "Start Pro",
    ctaVariant: "hero" as const,
    popular: true,
    priceId: { monthly: "price_1TLiOCC1O032lUHcBIWVdoNn", annual: "price_1TLiOfC1O032lUHcsWxc2nkY" },
    features: [
      "All core briefs and Stack Matrix entries (no content paywalls)",
      "Advanced Matrix filters, comparisons and tagging",
      "CSV / PDF export for audits and internal briefings",
      "Saved views and saved briefs library per user",
      "AI Readiness Assessment and ongoing score tracking",
      "Priority intel: critical findings up to 48 hours early",
      "Streaks and referral credits to keep the team engaged",
    ],
  },
  {
    name: "Enterprise",
    price: { monthly: null, annual: null },
    description: "Dedicated AI threat intelligence for your organisation.",
    forWhom: "For security and risk teams that need multi-seat access, private feeds and direct analyst support.",
    cta: "Contact Sales",
    ctaVariant: "hero-outline" as const,
    priceId: null,
    features: [
      "Everything in Pro, for your whole team",
      "SSO and role-based access",
      "Private, organisation-specific threat feeds and reports",
      "API access to Matrix and intel data",
      "Dedicated analyst sessions and on-demand research",
      "Integration support and SLAs",
    ],
  },
];

const faqs = [
  {
    question: "What's free vs Pro?",
    answer: "Every threat brief and Stack Matrix entry is fully readable on the Free plan — no truncation, no paywalls. Pro adds workflow tools: advanced filters, CSV/PDF export, saved views, the AI Readiness Assessment, and priority alerts up to 48 hours before the free feed.",
  },
  {
    question: "Do you sell rankings or sponsorships?",
    answer: "No. AI Threat Brief is entirely independent. We do not accept pay-to-play placements in our Matrix, and we do not run sponsored guest posts. Where affiliate links exist, they are disclosed and never influence rankings or analysis.",
  },
  {
    question: "How does billing and cancellation work?",
    answer: "Pro is billed monthly or annually via Stripe. You can cancel any time from your dashboard — no lock-in, no cancellation fees. If you cancel, you keep Pro access until the end of your current billing period.",
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
        body: { priceId: annual ? priceId.annual : priceId.monthly },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (err: any) {
      toast.error(err.message || "Failed to start checkout");
    }
    setLoading(null);
  };

  const faqSchema = generateFAQSchema(faqs);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Pricing"
        description="Core briefs and Stack Matrix entries stay free and open. Pro adds tools, depth and early warnings for security teams."
        path="/pricing"
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
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
                  <p className="text-xs text-muted-foreground/70 mt-1">{tier.forWhom}</p>
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
                      {annual && (tier.price.annual ?? 0) > 0 && (
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
                  {tier.features.map((text, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-10 max-w-lg mx-auto">
            Core briefs and Stack Matrix entries stay free and open. Pro adds tools, depth and early warnings.
          </p>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto mt-16">
            <h2 className="text-xl font-bold text-foreground text-center mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-foreground text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
