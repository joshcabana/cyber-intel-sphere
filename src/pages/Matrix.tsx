import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Download, Lock, ExternalLink, ArrowUpDown } from "lucide-react";
import UpgradeWall from "@/components/UpgradeWall";

type Tool = {
  name: string;
  category: string;
  pricing: string;
  rating: number;
  description: string;
  tags: string[];
  affiliate?: boolean;
};

const tools: Tool[] = [
  { name: "Prompt Armor", category: "Prompt Defense", pricing: "Freemium", rating: 4.5, description: "Real-time prompt injection detection and filtering for LLM applications", tags: ["injection", "defense", "runtime"], affiliate: true },
  { name: "Garak", category: "Red Teaming", pricing: "Open Source", rating: 4.3, description: "LLM vulnerability scanner with 500+ probe types for automated red teaming", tags: ["scanning", "testing", "open-source"] },
  { name: "Lakera Guard", category: "AI Firewall", pricing: "Enterprise", rating: 4.6, description: "Enterprise-grade AI content firewall with real-time threat detection", tags: ["firewall", "enterprise", "api"] },
  { name: "Rebuff", category: "Prompt Defense", pricing: "Open Source", rating: 3.9, description: "Self-hardening prompt injection detector using multi-layer defense", tags: ["injection", "self-hardening", "open-source"] },
  { name: "NeMo Guardrails", category: "Agent Frameworks", pricing: "Open Source", rating: 4.4, description: "NVIDIA's programmable guardrails for LLM-based conversational systems", tags: ["nvidia", "guardrails", "conversational"] },
  { name: "Calypso AI", category: "Model Scanning", pricing: "Enterprise", rating: 4.2, description: "AI model risk assessment and continuous monitoring platform", tags: ["risk", "monitoring", "compliance"], affiliate: true },
  { name: "HiddenLayer", category: "Model Scanning", pricing: "Enterprise", rating: 4.7, description: "ML model security platform for adversarial attack detection", tags: ["adversarial", "detection", "enterprise"] },
  { name: "Protect AI", category: "LLM Security", pricing: "Enterprise", rating: 4.5, description: "End-to-end AI/ML security platform covering the full lifecycle", tags: ["lifecycle", "supply-chain", "enterprise"] },
  { name: "LLM Guard", category: "LLM Security", pricing: "Open Source", rating: 4.1, description: "Input/output sanitization toolkit for LLM interactions", tags: ["sanitization", "input-output", "open-source"] },
];

const categories = ["All", ...Array.from(new Set(tools.map(t => t.category)))];

export default function Matrix() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortField, setSortField] = useState<"name" | "rating">("rating");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    return tools
      .filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase()) ||
          t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
        const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const mult = sortDir === "asc" ? 1 : -1;
        if (sortField === "name") return mult * a.name.localeCompare(b.name);
        return mult * (a.rating - b.rating);
      });
  }, [search, selectedCategory, sortField, sortDir]);

  const toggleSort = (field: "name" | "rating") => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <p className="text-xs font-mono text-primary tracking-widest mb-2">AI SECURITY STACK MATRIX</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Every tool. <span className="gradient-text">Independently analyzed.</span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              The most comprehensive AI security tool database. Searchable, filterable, and brutally honest. No pay-for-play rankings.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tools, categories, or tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-secondary border-border/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-secondary text-muted-foreground hover:text-foreground border border-transparent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Pro export bar */}
          <div className="glass-panel rounded-lg p-3 mb-6 flex items-center justify-between cyber-border">
            <span className="text-xs text-muted-foreground">
              Showing {filtered.length} of {tools.length} tools
            </span>
            <UpgradeWall feature="CSV/PDF export">
              <div className="flex items-center gap-2">
                <Button variant="cyber" size="sm">
                  <Download className="h-3 w-3 mr-1" /> Export CSV
                </Button>
                <Button variant="cyber" size="sm">
                  <Download className="h-3 w-3 mr-1" /> Export PDF
                </Button>
              </div>
            </UpgradeWall>
          </div>

          {/* Table */}
          <div className="glass-panel rounded-xl overflow-hidden cyber-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left p-4">
                      <button onClick={() => toggleSort("name")} className="flex items-center gap-1 text-xs font-mono text-muted-foreground uppercase tracking-wider hover:text-foreground">
                        Tool <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">Category</th>
                    <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">Pricing</th>
                    <th className="text-left p-4">
                      <button onClick={() => toggleSort("rating")} className="flex items-center gap-1 text-xs font-mono text-muted-foreground uppercase tracking-wider hover:text-foreground">
                        Rating <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((tool) => (
                    <tr key={tool.name} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground text-sm">{tool.name}</span>
                          <ExternalLink className="h-3 w-3 text-muted-foreground/40" />
                          {tool.affiliate && (
                            <span className="text-[9px] text-muted-foreground/50 font-mono">[AFFILIATE]</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="text-[10px] font-mono bg-primary/5 text-primary border-primary/20">
                          {tool.category}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{tool.pricing}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${(tool.rating / 5) * 100}%` }} />
                          </div>
                          <span className="text-xs font-mono text-foreground">{tool.rating}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground max-w-xs truncate hidden lg:table-cell">{tool.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground/60 mt-6">
            <span className="text-primary/60">⚑</span> Independence disclosure: Tools marked [AFFILIATE] include referral links. This never influences rankings or analysis scores.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
