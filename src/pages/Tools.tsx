import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToolCard from "@/components/tools/ToolCard";
import { toolCategories } from "@/components/tools/toolData";

function ToolsJsonLd() {
  const items = toolCategories.flatMap((cat) => cat.tools);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Security Tools & Resources",
    description:
      "Curated security tools for AI-era defence: VPNs, password managers, encrypted email, and endpoint protection.",
    numberOfItems: items.length,
    itemListElement: items.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      description: tool.description,
      url: tool.url || undefined,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}

export default function Tools() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Security Tools & Resources — Vetted VPNs, Password Managers & More"
        description="Curated security tools for AI-era defence: VPNs, password managers, encrypted email, and endpoint protection — with clear affiliate disclosure."
        path="/tools"
      />
      <ToolsJsonLd />
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Security Tools & Resources
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Curated security tools for AI-era defence. Every recommendation is based on documented
              capabilities and independent audits — not vendor influence.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-3 font-mono">
              ⚑ Tools marked "Affiliate partner" include affiliate links. This never influences
              rankings.
            </p>
          </div>

          <div className="space-y-12">
            {toolCategories.map((category) => (
              <section key={category.id} id={category.id}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-xl font-bold text-foreground">{category.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                  {category.description}
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {category.tools.map((tool) => (
                    <ToolCard key={tool.name} tool={tool} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
