import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, FileSearch, Shield, Zap } from "lucide-react";

const deliverables = [
  "Threat map across your agent, copilot, and LLM workflow surfaces",
  "Top 5 risks ranked by exploitability and business impact",
  "Remediation memo with fast, concrete fixes your team can apply",
  "60-minute readout with implementation priorities and next actions",
];

const fitSignals = [
  "Shipping agents, copilots, or LLM workflows into production.",
  "Need a fixed-scope threat map before launch, rollout, or expansion.",
  "Want concrete remediation priorities within 7 business days.",
];

const offerLadder = [
  {
    title: "AI Agent Security Readiness Review",
    price: "$4,500 USD",
    description: "Best first step for teams that need an opinionated risk review before shipping or expanding AI features.",
  },
  {
    title: "Prompt Injection / Agent Risk Workshop",
    price: "$2,500 USD",
    description: "Focused workshop for teams that want shared language, threat modeling, and concrete hardening priorities.",
  },
  {
    title: "Fractional AI Security Advisor",
    price: "From $3,000/mo",
    description: "Ongoing support for roadmap review, architecture guidance, and follow-through after the initial diagnostic.",
  },
];

const processSteps = [
  "Free 15-minute fit call to confirm scope and urgency.",
  "Proposal or payment link issued only for the fixed-scope review.",
  "Payment collected before delivery; proposal terms expire after 7 days.",
  "Review delivered within 7 business days, then covered in a 60-minute readout.",
];

const contactEmail = "hello@aithreatbrief.com";

export default function Assessment() {
  const contactHref = `mailto:${contactEmail}?subject=${encodeURIComponent("AI Agent Security Readiness Review")}`;

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="AI Agent Security Readiness Review"
        description="Fixed-scope AI application security review for teams shipping agents, copilots, and LLM workflows."
        path="/assessment"
      />
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-primary uppercase tracking-widest">Primary Offer</span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 leading-tight">
              AI Agent Security<br />Readiness Review
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              A fixed-scope review for teams shipping agents, copilots, and LLM workflows that need a sharp threat map before problems become incidents.
            </p>
            <div className="flex flex-col items-center gap-2 mb-6">
              <span className="text-2xl font-bold text-foreground">$4,500 USD</span>
              <span className="text-sm text-muted-foreground">Delivery in 7 business days</span>
              <span className="text-xs text-primary font-mono">Free 15-minute fit call</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={contactHref}>
                <Button variant="hero" size="lg">Email to discuss</Button>
              </a>
              <Link to="/pro">
                <Button variant="outline" size="lg">Start with the report preview</Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-4 max-w-md mx-auto">
              No unpaid custom audits. Payment is collected before delivery via invoice or payment link.
            </p>
          </div>

          {/* Deliverables */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-panel rounded-xl p-6 cyber-border">
              <div className="flex items-center gap-2 mb-4">
                <FileSearch className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Engagement summary</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-4 font-mono uppercase tracking-wider">Best for AI product, platform, and security teams</p>
              <ul className="space-y-3">
                {deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel rounded-xl p-6 cyber-border">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Best fit</h2>
              </div>
              <ul className="space-y-3">
                {fitSignals.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Offer Ladder */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-2">Start with a diagnostic, then deepen support only if needed</h2>
            <p className="text-sm text-muted-foreground mb-6">The point of the first engagement is speed and clarity. You leave with a prioritized risk picture, not a vague consulting retainer.</p>
            <div className="grid gap-4 md:grid-cols-3">
              {offerLadder.map((offer) => (
                <div key={offer.title} className="glass-panel rounded-xl p-5 cyber-border">
                  <h3 className="font-semibold text-foreground mb-1">{offer.title}</h3>
                  <p className="text-primary font-bold text-sm mb-2">{offer.price}</p>
                  <p className="text-sm text-foreground/70">{offer.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6">Simple commercial rules, fast delivery</h2>
            <div className="space-y-4">
              {processSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{i + 1}</span>
                  <p className="text-sm text-foreground/80 pt-1">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="glass-panel rounded-xl p-8 cyber-border text-center">
            <h2 className="text-lg font-bold text-foreground mb-3">Ready to move now?</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Use email directly to discuss scope and confirm the review is the right fit.
            </p>
            <a href={contactHref}>
              <Button variant="hero" size="lg">Email {contactEmail}</Button>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
