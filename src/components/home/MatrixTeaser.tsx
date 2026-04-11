import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Grid3X3, Filter, Download, ExternalLink } from "lucide-react";

const previewTools = [
  { name: "NordVPN", category: "Privacy & VPN", rating: 4.7 },
  { name: "HiddenLayer", category: "Model Scanning", rating: 4.7 },
  { name: "Lakera Guard", category: "AI Firewall", rating: 4.6 },
  { name: "ProtonVPN", category: "Privacy & VPN", rating: 4.6 },
];

export default function MatrixTeaser() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="container mx-auto px-4 relative">
        <div className="glass-panel rounded-xl p-8 md:p-12 cyber-border">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left: copy */}
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
                <span className="flex items-center gap-1.5"><Grid3X3 className="h-4 w-4 text-primary/60" /> 18 Tools Live</span>
                <span className="flex items-center gap-1.5"><Filter className="h-4 w-4 text-primary/60" /> 12 Categories</span>
                <span className="flex items-center gap-1.5"><Download className="h-4 w-4 text-primary/60" /> CSV/PDF Export (Pro)</span>
              </div>
              <Link to="/matrix">
                <Button variant="hero" size="lg">
                  Explore the Matrix
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Right: interactive mini table */}
            <div className="glass-panel rounded-xl overflow-hidden border border-border/30">
              <div className="px-4 py-3 border-b border-border/20 flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Top Rated</span>
                <Link to="/matrix" className="text-[10px] text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="text-left px-4 py-2.5 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Tool</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-mono text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Category</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {previewTools.map((tool) => (
                    <tr key={tool.name} className="border-b border-border/10 last:border-0 hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3">
                        <Link to="/matrix" className="flex items-center gap-1.5 group">
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{tool.name}</span>
                          <ExternalLink className="h-3 w-3 text-muted-foreground/30 group-hover:text-primary/60 transition-colors" />
                        </Link>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <Badge variant="outline" className="text-[9px] font-mono bg-primary/5 text-primary/70 border-primary/15">
                          {tool.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-14 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${(tool.rating / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-foreground">{tool.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
