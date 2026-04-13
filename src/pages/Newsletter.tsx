import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Shield,
  BookOpen,
  Target,
  BellOff,
  Wrench,
  UserCheck,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { importedArticles } from "@/lib/imported-articles";

const benefits = [
  {
    icon: BookOpen,
    title: "Curated Briefings",
    description: "Daily intelligence on AI threats, model vulnerabilities, and emerging attack patterns — distilled from dozens of sources.",
  },
  {
    icon: Wrench,
    title: "Tool Reviews",
    description: "Hands-on evaluations of security tools, frameworks, and defensive technologies with transparent methodology.",
  },
  {
    icon: Target,
    title: "Threat Actor Analysis",
    description: "Deep dives into adversary TTPs targeting AI systems — from prompt injection campaigns to supply-chain attacks.",
  },
  {
    icon: BellOff,
    title: "Low Noise",
    description: "No fluff, no sponsored listicles. Every briefing is scored for trust and relevance before it reaches your inbox.",
  },
  {
    icon: Shield,
    title: "Practical Context",
    description: "Actionable takeaways you can apply to your own stack — not abstract threat landscape overviews.",
  },
  {
    icon: UserCheck,
    title: "Editor Reviewed",
    description: "Every piece is reviewed by a human editor for accuracy, bias, and completeness before publication.",
  },
];

function SubscribeForm({ source }: { source: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    const { error } = await supabase.functions.invoke("submit-lead", {
      body: { email, source },
    });
    setLoading(false);
    if (error) {
      const status = (error as any)?.context?.status;
      if (status === 429) {
        toast.error("Too many attempts — please wait a minute and try again.");
      } else {
        toast.error("Something went wrong — please try again.");
      }
      return;
    }
    setSubmitted(true);
    toast.success("You're in! Check your inbox.");
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-2 text-primary font-medium py-3">
        <CheckCircle2 className="h-5 w-5" />
        You're subscribed — check your inbox.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-secondary border-border/50 h-11 text-foreground placeholder:text-muted-foreground"
        required
      />
      <Button variant="hero" type="submit" className="h-11 px-6 shrink-0" disabled={loading}>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Subscribe <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

export default function Newsletter() {
  const recentArticles = importedArticles.slice(0, 6);
  const articleCount = importedArticles.length;

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="AI Threat Brief Newsletter — Free Weekly Intelligence"
        description="Free weekly AI security intelligence: curated briefings, tool reviews, and threat analysis delivered to your inbox. No spam, no fluff."
        path="/newsletter"
      />
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 max-w-3xl text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            AI Security Intelligence,
            <br />
            <span className="text-primary">Delivered Weekly</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Join security professionals who start their week with curated threat intelligence,
            tool reviews, and actionable analysis — free, no spam, unsubscribe anytime.
          </p>
          <SubscribeForm source="newsletter-hero" />
          <p className="text-[10px] text-muted-foreground/60 mt-4 font-mono">
            NO SPAM. UNSUBSCRIBE ANYTIME. YOUR DATA IS NEVER SOLD.
          </p>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 max-w-3xl mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: `${articleCount}+`, label: "Articles published" },
              { value: "5", label: "Editorial tracks" },
              { value: "Weekly", label: "Delivery cadence" },
              { value: "Free", label: "Forever" },
            ].map((stat) => (
              <div key={stat.label} className="glass-panel rounded-xl p-4 cyber-border">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 max-w-4xl mb-16">
          <h2 className="text-xl font-bold text-foreground text-center mb-8">
            What you get every week
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="glass-panel rounded-xl p-5 cyber-border">
                <b.icon className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Articles */}
        <section className="container mx-auto px-4 max-w-4xl mb-16">
          <h2 className="text-xl font-bold text-foreground text-center mb-8">
            Recent briefings
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentArticles.map((a) => (
              <a
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="glass-panel rounded-xl p-5 cyber-border hover:border-primary/40 transition-colors"
              >
                <div className="text-xs text-muted-foreground font-mono mb-2">{a.category}</div>
                <h3 className="font-semibold text-foreground text-sm leading-snug">{a.title}</h3>
              </a>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container mx-auto px-4 max-w-2xl text-center">
          <div className="glass-panel rounded-xl p-8 md:p-12 cyber-border animate-pulse-glow">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Don't miss the next briefing
            </h2>
            <p className="text-muted-foreground mb-6">
              Subscribe now and get the latest AI security intelligence before it hits the news cycle.
            </p>
            <SubscribeForm source="newsletter-bottom" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
