import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Lock } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Critical: RAG Pipeline Injection Vectors in Production LLM Systems",
    category: "VULNERABILITY",
    severity: "CRITICAL",
    date: "2026-04-11",
    readTime: "8 min",
    excerpt: "New class of indirect prompt injection attacks targeting retrieval-augmented generation pipelines. Affects major frameworks including LangChain, LlamaIndex.",
    isPro: false,
    slug: "rag-injection-vectors",
  },
  {
    id: 2,
    title: "Agent-to-Agent Protocol Exploitation: OAuth Scope Escalation in MCP",
    category: "RESEARCH",
    severity: "HIGH",
    date: "2026-04-10",
    readTime: "12 min",
    excerpt: "Model Context Protocol deployments expose lateral movement paths through misconfigured tool permissions. We break down the attack surface.",
    isPro: true,
    slug: "mcp-oauth-exploitation",
  },
  {
    id: 3,
    title: "Defense Brief: Securing Agentic Workflows with Runtime Guardrails",
    category: "DEFENSE",
    severity: "INFO",
    date: "2026-04-09",
    readTime: "6 min",
    excerpt: "Practical implementation guide for runtime monitoring and policy enforcement in multi-agent systems. Includes reference architecture.",
    isPro: false,
    slug: "agentic-runtime-guardrails",
  },
  {
    id: 4,
    title: "Supply Chain Analysis: Backdoor Detection in Fine-Tuned Model Weights",
    category: "ANALYSIS",
    severity: "HIGH",
    date: "2026-04-08",
    readTime: "15 min",
    excerpt: "Comprehensive methodology for detecting malicious modifications in open-weight models. New tooling benchmarks and red team findings.",
    isPro: true,
    slug: "model-supply-chain-backdoors",
  },
];

const severityColors: Record<string, string> = {
  CRITICAL: "bg-destructive/20 text-destructive border-destructive/30",
  HIGH: "bg-warning/20 text-warning border-warning/30",
  INFO: "bg-primary/20 text-primary border-primary/30",
};

export default function IntelligenceFeed() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-mono text-primary tracking-widest mb-2">LATEST INTELLIGENCE</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Threat Briefings</h2>
          </div>
          <Link to="/blog" className="hidden md:flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors">
            View all briefings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.slug}`}
              className="group glass-panel rounded-lg p-5 hover:border-primary/30 transition-all duration-300 cyber-border-hover"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant="outline" className={`text-[10px] font-mono ${severityColors[article.severity]}`}>
                    {article.severity}
                  </Badge>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {article.isPro && <Lock className="inline h-3.5 w-3.5 mr-1.5 text-primary/60" />}
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{article.excerpt}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-xs text-muted-foreground font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                  <span>{article.date}</span>
                  {article.isPro && (
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">PRO</Badge>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
