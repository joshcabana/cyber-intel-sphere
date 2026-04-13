import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { getArticleBySlug, resolveAffiliateLinks, type Article } from "@/lib/articles";
import {
  Clock, ArrowLeft, Share2, Twitter, Linkedin, Link2, Copy,
  Shield, Lock, ArrowRight, ChevronRight, Lightbulb
} from "lucide-react";
import { toast } from "sonner";

const severityColors: Record<string, string> = {
  CRITICAL: "bg-destructive/20 text-destructive border-destructive/30",
  HIGH: "bg-warning/20 text-warning border-warning/30",
  INFO: "bg-primary/20 text-primary border-primary/30",
};

function MarkdownRenderer({ content }: { content: string }) {
  const resolved = resolveAffiliateLinks(content);

  const renderLine = (line: string, i: number) => {
    // Headings
    const h2Match = line.match(/^## (.+?)(?:\s*\{#([\w-]+)\})?$/);
    if (h2Match) return <h2 key={i} id={h2Match[2] || ""} className="text-xl font-bold text-foreground mt-8 mb-4 scroll-mt-24">{h2Match[1]}</h2>;
    const h3Match = line.match(/^### (.+?)(?:\s*\{#([\w-]+)\})?$/);
    if (h3Match) return <h3 key={i} id={h3Match[2] || ""} className="text-lg font-semibold text-foreground mt-6 mb-3 scroll-mt-24">{h3Match[1]}</h3>;

    // List items
    if (line.match(/^- /)) {
      return <li key={i} className="text-foreground/80 ml-4 list-disc">{renderInline(line.slice(2))}</li>;
    }
    if (line.match(/^\d+\. /)) {
      return <li key={i} className="text-foreground/80 ml-4 list-decimal">{renderInline(line.replace(/^\d+\.\s/, ""))}</li>;
    }

    if (line.trim() === "") return <div key={i} className="h-3" />;
    return <p key={i} className="text-foreground/80 leading-relaxed mb-3">{renderInline(line)}</p>;
  };

  const renderInline = (text: string) => {
    const parts: (string | JSX.Element)[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Links
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

      const boldIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity;
      const linkIdx = linkMatch ? remaining.indexOf(linkMatch[0]) : Infinity;

      if (boldIdx === Infinity && linkIdx === Infinity) {
        parts.push(remaining);
        break;
      }

      if (boldIdx <= linkIdx && boldMatch) {
        parts.push(remaining.slice(0, boldIdx));
        parts.push(<strong key={key++} className="text-foreground font-semibold">{boldMatch[1]}</strong>);
        remaining = remaining.slice(boldIdx + boldMatch[0].length);
      } else if (linkMatch) {
        parts.push(remaining.slice(0, linkIdx));
        const isInternal = linkMatch[2].startsWith("/");
        if (isInternal) {
          parts.push(<Link key={key++} to={linkMatch[2]} className="text-primary hover:underline">{linkMatch[1]}</Link>);
        } else {
          parts.push(<a key={key++} href={linkMatch[2]} target="_blank" rel="noopener noreferrer sponsored" className="text-primary hover:underline">{linkMatch[1]}</a>);
        }
        remaining = remaining.slice(linkIdx + linkMatch[0].length);
      }
    }

    return <>{parts}</>;
  };

  return <div>{resolved.split("\n").map(renderLine)}</div>;
}

function TableOfContents({ headings, activeId }: { headings: Article["headings"]; activeId: string }) {
  return (
    <nav className="sticky top-24 space-y-1">
      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">On this page</p>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={`block text-sm transition-colors py-1 ${
            h.level === 3 ? "pl-4" : ""
          } ${activeId === h.id ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}

export default function BlogArticle() {
  const { slug } = useParams();
  const { isPro, user } = useAuth();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState("");

  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (!article) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    article.headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Briefing not found</h1>
            <Link to="/blog" className="text-primary hover:underline">← Back to archive</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isGated = article.isPro && !isPro;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = article.title;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={article.title}
        description={article.excerpt}
        path={`/blog/${article.slug}`}
        type="article"
        publishedTime={new Date(article.date).toISOString()}
        author={article.author}
      />
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-6">
            <Link to="/blog" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Intelligence Archive
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground/60 truncate">{article.title}</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_220px] gap-10">
            {/* Main content */}
            <div>
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className={`text-[10px] font-mono ${severityColors[article.severity]}`}>
                    {article.severity}
                  </Badge>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{article.category}</span>
                  {article.isPro && <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">PRO</Badge>}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">{article.title}</h1>
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="glass-panel rounded-xl p-5 cyber-border mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Key Takeaways</span>
                </div>
                <ul className="space-y-2">
                  {article.takeaways.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Shield className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Body */}
              {isGated ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10 flex items-end justify-center pb-12">
                    <div className="text-center max-w-md">
                      <Lock className="h-8 w-8 text-primary mx-auto mb-3" />
                      <h3 className="text-lg font-bold text-foreground mb-2">Pro Access Required</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        This full research briefing is available exclusively to Pro members.
                      </p>
                      <Button variant="hero" onClick={() => navigate("/pricing")}>
                        Upgrade to Pro <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="blur-sm select-none pointer-events-none max-h-[300px] overflow-hidden">
                    <MarkdownRenderer content={article.body} />
                  </div>
                </div>
              ) : (
                <div className="prose-custom">
                  <MarkdownRenderer content={article.body} />
                </div>
              )}

              {/* Share */}
              <div className="mt-10 pt-6 border-t border-border/30">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Share</span>
                  <button onClick={copyLink} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Copy link">
                    <Link2 className="h-4 w-4" />
                  </button>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Share on X">
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Share on LinkedIn">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar TOC — desktop only */}
            <aside className="hidden lg:block">
              <TableOfContents headings={article.headings} activeId={activeId} />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
