import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
import { getAllArticles, getArticleCategories } from "@/lib/articles";
import { severityColors } from "@/lib/constants";

export default function Blog() {
  const allArticles = useMemo(() => getAllArticles(), []);
  const categories = useMemo(() => ["All", ...getArticleCategories()], []);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = useMemo(
    () =>
      selectedCategory === "All"
        ? allArticles
        : allArticles.filter((a) => a.category === selectedCategory),
    [allArticles, selectedCategory],
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Threat Briefings & Research"
        description="Independent analysis of AI security threats, vulnerabilities, and defense strategies from AI Threat Brief."
        path="/blog"
      />
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-10">
            <p className="text-xs font-mono text-primary tracking-widest mb-2">INTELLIGENCE ARCHIVE</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Threat Briefings & Research</h1>
            <p className="text-muted-foreground mt-2">
              Independent analysis of AI security threats, vulnerabilities, and defense strategies.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap mb-8">
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

          <p className="text-xs text-muted-foreground mb-4 font-mono">
            {filtered.length} briefing{filtered.length !== 1 ? "s" : ""}
          </p>

          <div className="space-y-4">
            {filtered.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group block glass-panel rounded-lg p-5 hover:border-primary/30 transition-all cyber-border-hover"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="outline" className={`text-[10px] font-mono ${severityColors[article.severity] ?? ""}`}>
                    {article.severity}
                  </Badge>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{article.category}</span>
                  {article.isPro && <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">PRO</Badge>}
                </div>
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {article.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-3">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
                    <span>{article.date}</span>
                    {article.author && <span className="hidden sm:inline">· {article.author}</span>}
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
