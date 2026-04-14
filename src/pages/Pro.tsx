import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Shield, Zap, ArrowRight, Lock, FileText, Filter, Flame, Users } from "lucide-react";

const benefits = [
  { icon: FileText, title: "Full Research Access", description: "Every briefing, analysis and deep-dive — fully readable on Free, with Pro tools to slice, export and act on the data faster." },
  { icon: Filter, title: "Advanced Matrix", description: "All filters, sorting, comparisons, tagging — plus CSV and PDF export of the full Stack Matrix for audits and internal briefings." },
  { icon: Flame, title: "Streak & Engagement", description: "Track your weekly intel engagement. Build your streak, keep your team current on AI threats." },
  { icon: Users, title: "Referral Credits", description: "Refer colleagues, both get 1 month Pro free. Build your security network." },
  { icon: Shield, title: "AI Readiness Score", description: "Comprehensive assessment of your organisation's AI security posture, with ongoing score tracking." },
  { icon: Zap, title: "Priority Intel", description: "Get critical briefings up to 48 hours before they hit the free feed. React before the crowd." },
];

export default function Pro() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title="Pro Access" description="Same independent intel. More power, more speed. Pro adds the tools, depth and early warnings your security team needs." path="/pro" />
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-mono text-primary mb-6">
              <Lock className="h-3 w-3" /> PRO ACCESS · Tools and depth for teams who ship AI
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Same independent intel.{" "}
              <span className="gradient-text">More power, more speed.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              The briefs and Stack Matrix stay open. Pro adds the tools, depth and early warnings your security team needs to move faster than the next incident.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/pricing">
                <Button variant="hero" size="lg" className="text-base px-8 h-12">
                  <Zap className="h-4 w-4" />
                  Start Pro — $33/mo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <span className="text-sm text-muted-foreground">One avoided incident pays for years of Pro. The upside is asymmetric — in your favour.</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((b) => (
              <div key={b.title} className="glass-panel rounded-xl p-6 cyber-border hover:border-primary/30 transition-all group">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 mb-4 group-hover:bg-primary/20 transition-colors">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
