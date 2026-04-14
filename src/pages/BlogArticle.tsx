import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { getArticleBySlug, resolveAffiliateLinks, type Article } from "@/lib/articles";
import {
  Clock, ArrowLeft, Shield, Lock, ArrowRight, ChevronRight, Lightbulb, Bookmark, BookmarkCheck
} from "lucide-react";
import ShareButtons from "@/components/blog/ShareButtons";
import { toast } from "sonner";

const severityColors: Record<string, string> = {
  CRITICAL: "bg-destructive/20 text-destructive border-destructive/30",
  HIGH: "bg-warning/20 text-warning border-warning/30",
  INFO: "bg-primary/20 text-primary border-primary/30",
};

function MarkdownRenderer({ content }: { content: string }) {
  const resolved = resolveAffiliateLinks(content);

  const renderLine = (line: string, i: number) => {
    const h2Match = line.match(/^## (.+?)(?:\s*\{#([\w-]+)\})?$/);
    if (h2Match) return <h2 key={i} id={h2Match[2] || ""} className="text-xl font-bold text-foreground mt-8 mb-4 scroll-mt-24">{h2Match[1]}</h2>;
    const h3Match = line.match(/^### (.+?)(?:\s*\{#([\w-]+)\})?$/);
    if (h3Match) return <h3 key={i} id={h3Match[2] || ""} className="text-lg font-semibold text-foreground mt-6 mb-3 scroll-mt-24">{h3Match[1]}</h3>;

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
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
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
  const [isSaved, setIsSaved] = useState(false);
  const [savingBrief, setSavingBrief] = useState(false);

  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (!user || !article) return;
    supabase
      .from("saved_briefs")
      .select("id")
      .eq("user_id", user.id)
      .eq("slug", article.slug)
      .then(({ data }) => {
        if (data && data.length > 0) setIsSaved(true);
      });
  }, [user, article]);

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

  const toggleSave = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!article) return;
    setSavingBrief(true);
    try {
      if (isSaved) {
        await supabase
          .from("saved_briefs")
          .delete()
          .eq("user_id", user.id)
          .eq("slug", article.slug);
        setIsSaved(false);
        toast.success("Brief removed from saved");
      } else {
        await supabase
          .from("saved_briefs")
          .insert({ user_id: user.id, title: article.title, slug: article.slug });
        setIsSaved(true);
        toast.success("Brief saved!");
      }
    } catch {
      toast.error("Failed to update saved briefs");
    }
    setSavingBrief(false);
  };

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

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = article.title;

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
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-6">
            <Link to="/blog" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Intelligence Archive
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground/60 truncate">{article.title}</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_220px] gap-10">
            <div>
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
                  <button
                    onClick={toggleSave}
                    disabled={savingBrief}
                    className="ml-auto flex items-center gap-1.5 text-xs transition-colors hover:text-primary"
                    title={isSaved ? "Remove from saved" : "Save brief"}
                  >
                    {isSaved ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
                    {isSaved ? "Saved" : "Save"}
                  </button>
                </div>
              </div>

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

              <div className="prose-custom">
                <MarkdownRenderer content={article.body} />
              </div>

              {/* Tier-aware CTA after article */}
              {!isPro && (
                <div className="glass-panel rounded-xl p-6 cyber-border mt-8 text-center">
                  <h3 className="font-bold text-foreground mb-2">
                    {user ? "Upgrade to Pro" : "Get free AI threat briefs"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {user
                      ? "Unlock advanced Matrix filters, CSV/PDF exports, saved views and priority alerts."
                      : "Independent AI security intelligence — delivered weekly. No vendor spin."}
                  </p>
                  <Button variant="hero" onClick={() => navigate(user ? "/pricing" : "/newsletter")}>
                    {user ? "See Pro plans" : "Subscribe free"} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="mt-10 pt-6 border-t border-border/30">
                <ShareButtons url={shareUrl} title={shareTitle} />
              </div>
            </div>

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
