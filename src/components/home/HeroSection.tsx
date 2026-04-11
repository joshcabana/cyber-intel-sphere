import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 intelligence-grid opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/3 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-mono text-primary animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            LIVE THREAT INTELLIGENCE • UPDATED WEEKLY
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Get the briefing that{" "}
            <span className="gradient-text">actually matters.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Actionable threat intel, vulnerability research, and defense strategies for teams navigating AI risks in production.{" "}
            <span className="text-foreground/80">Independent analysis for security teams.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/pricing">
              <Button variant="hero" size="lg" className="text-base px-8 h-12">
                <Zap className="h-4 w-4" />
                Start Pro Trial — $39/mo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant="hero-outline" size="lg" className="text-base px-8 h-12">
                Read Free Intelligence
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-muted-foreground font-mono animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-primary/60" />
              <span>100% Independent</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-primary/40" />
              <span>No Vendor Influence</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-primary/40" />
              <span>Trusted by 2,400+ Security Teams</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
