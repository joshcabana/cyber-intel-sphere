import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-card/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
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
            <div className="flex flex-col gap-2">
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Research</Link>
              <Link to="/matrix" className="text-sm text-muted-foreground hover:text-primary transition-colors">Stack Matrix</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
              <a href="https://github.com/joshcabana/cyber-intel-sphere" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">GitHub</a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Product</h4>
            <div className="flex flex-col gap-2">
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link to="/pro" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pro Access</Link>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Legal</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Privacy Policy</span>
              <span className="text-sm text-muted-foreground">Terms of Service</span>
              <span className="text-sm text-muted-foreground">Independence Policy</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} AI Threat Brief. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/60 max-w-md text-center md:text-right">
              <span className="text-primary/60">⚑</span> Independence disclosure: AI Threat Brief operates independently. Some tool links may include affiliate codes, clearly marked with [AFFILIATE]. This never influences our analysis or rankings.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
