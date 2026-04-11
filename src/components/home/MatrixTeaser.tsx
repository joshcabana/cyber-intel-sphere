import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Grid3X3, Filter, Download } from "lucide-react";

const categories = [
  { name: "LLM Security", count: 24 },
  { name: "Agent Frameworks", count: 18 },
  { name: "Prompt Defense", count: 15 },
  { name: "Model Scanning", count: 12 },
  { name: "AI Firewalls", count: 9 },
  { name: "Red Teaming", count: 11 },
];

export default function MatrixTeaser() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="container mx-auto px-4 relative">
        <div className="glass-panel rounded-xl p-8 md:p-12 cyber-border">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <p className="text-xs font-mono text-primary tracking-widest">AI SECURITY STACK MATRIX</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Every AI security tool.{" "}
                <span className="gradient-text">Analyzed & ranked.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The most comprehensive, independently curated database of AI security tools, frameworks, and platforms. Searchable, filterable, and brutally honest.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Grid3X3 className="h-4 w-4 text-primary/60" /> 89+ Tools</span>
                <span className="flex items-center gap-1.5"><Filter className="h-4 w-4 text-primary/60" /> 12 Categories</span>
                <span className="flex items-center gap-1.5"><Download className="h-4 w-4 text-primary/60" /> CSV/PDF Export</span>
              </div>
              <Link to="/matrix">
                <Button variant="hero" size="lg">
                  Explore the Matrix
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className="glass-panel rounded-lg p-4 hover:border-primary/30 transition-all cursor-default group"
                >
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{cat.name}</p>
                  <p className="text-2xl font-bold font-mono text-primary/80 mt-1">{cat.count}</p>
                  <p className="text-[10px] text-muted-foreground font-mono mt-1">TOOLS ANALYZED</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
