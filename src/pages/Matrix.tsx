import { useState, useMemo } from "react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Download, ExternalLink, ArrowUpDown, Shield } from "lucide-react";
import UpgradeWall from "@/components/UpgradeWall";
import { getAffiliate } from "@/lib/affiliate-links";

export type Tool = {
  name: string;
  category: string;
  pricing: string;
  rating: number;
  description: string;
  tags: string[];
  affiliate?: string; // affiliate code key
};

export const tools: Tool[] = [
  // ── LLM Security ──────────────────────────────────────
  { name: "Protect AI", category: "LLM Security", pricing: "Enterprise", rating: 4.5, description: "End-to-end AI/ML security platform covering the full lifecycle", tags: ["lifecycle", "supply-chain", "enterprise"], affiliate: "protect-ai" },
  { name: "LLM Guard", category: "LLM Security", pricing: "Open Source", rating: 4.1, description: "Input/output sanitization toolkit for LLM interactions", tags: ["sanitization", "input-output", "open-source"], affiliate: "llm-guard" },

  // ── Prompt Defense ────────────────────────────────────
  { name: "Prompt Armor", category: "Prompt Defense", pricing: "Freemium", rating: 4.5, description: "Real-time prompt injection detection and filtering for LLM applications", tags: ["injection", "defense", "runtime"], affiliate: "prompt-armor" },
  { name: "Rebuff", category: "Prompt Defense", pricing: "Open Source", rating: 3.9, description: "Self-hardening prompt injection detector using multi-layer defense", tags: ["injection", "self-hardening", "open-source"], affiliate: "rebuff" },

  // ── AI Firewall ───────────────────────────────────────
  { name: "Lakera Guard", category: "AI Firewall", pricing: "Enterprise", rating: 4.6, description: "Enterprise-grade AI content firewall with real-time threat detection", tags: ["firewall", "enterprise", "api"], affiliate: "lakera-guard" },

  // ── Agent Frameworks ──────────────────────────────────
  { name: "NeMo Guardrails", category: "Agent Frameworks", pricing: "Open Source", rating: 4.4, description: "NVIDIA's programmable guardrails for LLM-based conversational systems", tags: ["nvidia", "guardrails", "conversational"], affiliate: "nemo-guardrails" },
  { name: "Guardrails AI", category: "Agent Frameworks", pricing: "Freemium", rating: 4.3, description: "Open-source guardrails framework for validating LLM outputs", tags: ["validation", "output", "open-source"], affiliate: "guardrails-ai" },

  // ── Red Teaming ───────────────────────────────────────
  { name: "Garak", category: "Red Teaming", pricing: "Open Source", rating: 4.3, description: "LLM vulnerability scanner with 500+ probe types for automated red teaming", tags: ["scanning", "testing", "open-source"], affiliate: "garak" },

  // ── Model Scanning ────────────────────────────────────
  { name: "HiddenLayer", category: "Model Scanning", pricing: "Enterprise", rating: 4.7, description: "ML model security platform for adversarial attack detection", tags: ["adversarial", "detection", "enterprise"], affiliate: "hiddenlayer" },
  { name: "Calypso AI", category: "Model Scanning", pricing: "Enterprise", rating: 4.2, description: "AI model risk assessment and continuous monitoring platform", tags: ["risk", "monitoring", "compliance"], affiliate: "calypso-ai" },

  // ── Identity & Auth ───────────────────────────────────
  { name: "Permit.io", category: "Identity & Auth", pricing: "Freemium", rating: 4.4, description: "Fine-grained authorization for AI agents and MCP tool permissions", tags: ["authorization", "rbac", "abac"], affiliate: "permit-io" },

  // ── Code Security ─────────────────────────────────────
  { name: "Snyk", category: "Code Security", pricing: "Freemium", rating: 4.5, description: "Developer-first security for scanning LLM-generated code and dependencies", tags: ["sast", "sca", "developer"], affiliate: "snyk" },

  // ── Privacy & VPN ─────────────────────────────────────
  { name: "NordVPN", category: "Privacy & VPN", pricing: "Subscription", rating: 4.7, description: "Industry-leading VPN with Threat Protection, dark web monitoring, and Meshnet for secure OPSEC", tags: ["vpn", "privacy", "threat-protection", "meshnet"], affiliate: "nordvpn" },
  { name: "ProtonVPN", category: "Privacy & VPN", pricing: "Freemium", rating: 4.6, description: "Swiss-based no-logs VPN with Secure Core routing and open-source clients", tags: ["vpn", "privacy", "open-source", "swiss"], affiliate: "protonvpn" },
  { name: "Surfshark", category: "Privacy & VPN", pricing: "Subscription", rating: 4.4, description: "Unlimited-device VPN with CleanWeb ad/malware blocker and MultiHop chains", tags: ["vpn", "privacy", "unlimited-devices", "cleanweb"], affiliate: "surfshark" },
  { name: "Incogni", category: "Privacy & VPN", pricing: "Subscription", rating: 4.3, description: "Automated personal data removal service — reduces OSINT attack surface for security professionals", tags: ["privacy", "data-removal", "osint-defense"], affiliate: "incogni" },
  { name: "PureVPN", category: "Privacy & VPN", pricing: "Subscription", rating: 4.1, description: "VPN with dedicated IPs, port forwarding, and split tunneling for security labs", tags: ["vpn", "privacy", "dedicated-ip", "lab"], affiliate: "purevpn" },
  { name: "Proton", category: "Privacy & VPN", pricing: "Freemium", rating: 4.6, description: "Full privacy ecosystem — ProtonMail, ProtonDrive, ProtonVPN, and Pass for end-to-end encrypted OPSEC", tags: ["privacy", "email", "storage", "ecosystem"], affiliate: "proton" },
];

const categories = ["All", ...Array.from(new Set(tools.map((t) => t.category)))];

export default function Matrix() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortField, setSortField] = useState<"name" | "rating">("rating");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    return tools
      .filter((t) => {
        const q = search.toLowerCase();
        const matchesSearch =
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.includes(q));
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
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="AI Security Stack Matrix"
        description="The most comprehensive AI security tool database. Searchable, filterable, and independently analyzed. No pay-for-play rankings."
        path="/matrix"
      />
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <p className="text-xs font-mono text-primary tracking-widest mb-2">AI SECURITY STACK MATRIX</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Every tool. <span className="gradient-text">Independently analyzed.</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              The most comprehensive AI security tool database. Searchable, filterable, and brutally honest. No pay-for-play rankings. Every entry is open to all users — Pro unlocks advanced filters, CSV/PDF exports, and saved views for teams.
            </p>
            <div className="flex items-center gap-4 mt-3">
              <p className="text-xs font-mono text-muted-foreground/70">
                18 tools currently live — 89+ more in active onboarding (updated weekly)
              </p>
              <span className="text-[10px] font-mono text-muted-foreground/40">Last updated: April 12, 2026</span>
            </div>
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
              {categories.map((cat) => (
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
                      <button
                        onClick={() => toggleSort("name")}
                        className="flex items-center gap-1 text-xs font-mono text-muted-foreground uppercase tracking-wider hover:text-foreground"
                      >
                        Tool <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">Category</th>
                    <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">Pricing</th>
                    <th className="text-left p-4">
                      <button
                        onClick={() => toggleSort("rating")}
                        className="flex items-center gap-1 text-xs font-mono text-muted-foreground uppercase tracking-wider hover:text-foreground"
                      >
                        Rating <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((tool) => {
                    const affiliateEntry = tool.affiliate ? getAffiliate(tool.affiliate) : null;
                    return (
                    <tr key={tool.name} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {affiliateEntry ? (
                            <a href={affiliateEntry.url} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground text-sm hover:text-primary transition-colors">
                              {tool.name}
                            </a>
                          ) : (
                            <span className="font-medium text-foreground text-sm">{tool.name}</span>
                          )}
                          {affiliateEntry && <ExternalLink className="h-3 w-3 text-muted-foreground/40" />}
                          {tool.affiliate && (
                            <span className="text-[9px] text-muted-foreground/50 font-mono">[AF]</span>
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground/60 mt-6">
            <Shield className="inline h-3 w-3 text-primary/60 mr-1" />
            Independence disclosure: Tools marked [AF] include referral links. This never influences rankings or analysis scores.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
