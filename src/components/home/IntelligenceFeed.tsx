import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const articles = [
  {
    id: 1,
    title: "Critical: RAG Pipeline Injection Vectors in Production LLM Systems",
    category: "VULNERABILITY",
    severity: "CRITICAL",
    date: "Apr 11, 2026",
    readTime: "8 min",
    excerpt: "New class of indirect prompt injection attacks targeting retrieval-augmented generation pipelines.",
    isPro: false,
    slug: "rag-injection-vectors",
  },
  {
    id: 2,
    title: "Agent-to-Agent Protocol Exploitation: OAuth Scope Escalation in MCP",
    category: "RESEARCH",
    severity: "HIGH",
    date: "Apr 10, 2026",
    readTime: "12 min",
    excerpt: "Model Context Protocol deployments expose lateral movement paths through misconfigured tool permissions.",
    isPro: true,
    slug: "mcp-oauth-exploitation",
  },
  {
    id: 3,
    title: "Defense Brief: Securing Agentic Workflows with Runtime Guardrails",
    category: "DEFENSE",
    severity: "INFO",
    date: "Apr 9, 2026",
    readTime: "6 min",
    excerpt: "Practical implementation guide for runtime monitoring and policy enforcement in multi-agent systems.",
    isPro: false,
    slug: "agentic-runtime-guardrails",
  },
  {
    id: 4,
    title: "Supply Chain Analysis: Backdoor Detection in Fine-Tuned Model Weights",
    category: "ANALYSIS",
    severity: "HIGH",
    date: "Apr 8, 2026",
    readTime: "15 min",
    excerpt: "Comprehensive methodology for detecting malicious modifications in open-weight models.",
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener("scroll", checkScroll, { passive: true });
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-mono text-primary tracking-widest mb-2">LATEST INTELLIGENCE</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Threat Briefings</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="p-2 rounded-lg border border-border/50 bg-card/60 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="p-2 rounded-lg border border-border/50 bg-card/60 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <Link to="/blog" className="hidden md:flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Horizontal carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.slug}`}
              className="group flex-shrink-0 w-[320px] md:w-[360px] glass-panel rounded-xl p-5 hover:border-primary/30 transition-all duration-300 cyber-border-hover snap-start flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className={`text-[10px] font-mono ${severityColors[article.severity]}`}>
                  {article.severity}
                </Badge>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  {article.category}
                </span>
                {article.isPro && (
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] ml-auto">PRO</Badge>
                )}
              </div>

              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-snug mb-3 line-clamp-2 flex-1">
                {article.isPro && <Lock className="inline h-3.5 w-3.5 mr-1.5 text-primary/60" />}
                {article.title}
              </h3>

              <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{article.excerpt}</p>

              <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/20">
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-mono">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                  <span>{article.date}</span>
                </div>
                <span className="text-xs text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 md:hidden text-center">
          <Link to="/blog" className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1">
            View all briefings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
