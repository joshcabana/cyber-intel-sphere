import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Clock, Lock, ArrowRight } from "lucide-react";

const articles = [
  { slug: "rag-injection-vectors", title: "Critical: RAG Pipeline Injection Vectors in Production LLM Systems", category: "VULNERABILITY", severity: "CRITICAL", date: "Apr 11, 2026", readTime: "8 min", excerpt: "New class of indirect prompt injection attacks targeting retrieval-augmented generation pipelines.", isPro: false },
  { slug: "mcp-oauth-exploitation", title: "Agent-to-Agent Protocol Exploitation: OAuth Scope Escalation in MCP", category: "RESEARCH", severity: "HIGH", date: "Apr 10, 2026", readTime: "12 min", excerpt: "Model Context Protocol deployments expose lateral movement paths through misconfigured tool permissions.", isPro: true },
  { slug: "agentic-runtime-guardrails", title: "Defense Brief: Securing Agentic Workflows with Runtime Guardrails", category: "DEFENSE", severity: "INFO", date: "Apr 9, 2026", readTime: "6 min", excerpt: "Practical implementation guide for runtime monitoring and policy enforcement in multi-agent systems.", isPro: false },
  { slug: "model-supply-chain-backdoors", title: "Supply Chain Analysis: Backdoor Detection in Fine-Tuned Model Weights", category: "ANALYSIS", severity: "HIGH", date: "Apr 8, 2026", readTime: "15 min", excerpt: "Comprehensive methodology for detecting malicious modifications in open-weight models.", isPro: true },
  { slug: "llm-output-weaponization", title: "LLM Output Weaponization: When AI Generates Exploit Code", category: "VULNERABILITY", severity: "CRITICAL", date: "Apr 7, 2026", readTime: "10 min", excerpt: "Analysis of emerging attacks where LLM outputs are crafted to exploit downstream systems.", isPro: false },
];

const severityColors: Record<string, string> = {
  CRITICAL: "bg-destructive/20 text-destructive border-destructive/30",
  HIGH: "bg-warning/20 text-warning border-warning/30",
  INFO: "bg-primary/20 text-primary border-primary/30",
};

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-10">
            <p className="text-xs font-mono text-primary tracking-widest mb-2">INTELLIGENCE ARCHIVE</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Threat Briefings & Research</h1>
            <p className="text-muted-foreground mt-2">Independent analysis of AI security threats, vulnerabilities, and defense strategies.</p>
          </div>

          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group block glass-panel rounded-lg p-5 hover:border-primary/30 transition-all cyber-border-hover"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="outline" className={`text-[10px] font-mono ${severityColors[article.severity]}`}>
                    {article.severity}
                  </Badge>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{article.category}</span>
                  {article.isPro && <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">PRO</Badge>}
                </div>
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {article.isPro && <Lock className="inline h-4 w-4 mr-1.5 text-primary/60" />}
                  {article.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-3">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
                    <span>{article.date}</span>
                  </div>
                  <span className="text-xs text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read briefing <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
