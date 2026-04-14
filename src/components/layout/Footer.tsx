import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-card/50 mt-auto" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="font-bold text-foreground text-sm">AI THREAT BRIEF</span>
            </div>
            <p className="text-xs text-muted-foreground font-mono tracking-wider">
              INTELLIGENCE FOR THE AGENTIC ERA
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Independent AI security intelligence. No vendor influence. No sponsored rankings.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Intelligence</h4>
            <nav aria-label="Intelligence links" className="flex flex-col gap-2">
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Threat Briefs</Link>
              <Link to="/matrix" className="text-sm text-muted-foreground hover:text-primary transition-colors">Stack Matrix</Link>
              <Link to="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tools</Link>
              <Link to="/newsletter" className="text-sm text-muted-foreground hover:text-primary transition-colors">Newsletter</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link to="/methodology" className="text-sm text-muted-foreground hover:text-primary transition-colors">Methodology</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Product</h4>
            <nav aria-label="Product links" className="flex flex-col gap-2">
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pro Access</Link>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Legal</h4>
            <nav aria-label="Legal links" className="flex flex-col gap-2">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/ai-use" className="text-sm text-muted-foreground hover:text-primary transition-colors">AI Use Policy</Link>
              <Link to="/corrections" className="text-sm text-muted-foreground hover:text-primary transition-colors">Corrections</Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} AI Threat Brief. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/60 max-w-md text-center md:text-right">
              <span className="h-3 w-3 inline-block" aria-hidden="true">⚑</span> Independence disclosure: AI Threat Brief operates independently. Some tool links may include affiliate codes, clearly marked with [AFFILIATE]. This never influences our analysis or rankings.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
