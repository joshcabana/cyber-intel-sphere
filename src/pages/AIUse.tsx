import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AIUse() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="AI Use Policy"
        description="AI Threat Brief AI Use Policy — how AI is used to accelerate research, with safeguards ensuring human judgment and editorial integrity."
        path="/ai-use"
      />
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Transparency</span>
          <h1 className="text-3xl font-bold text-foreground mt-2 mb-2">AI Use Policy</h1>
          <p className="text-foreground/70 mb-8">AI is a research accelerator, not a substitute for judgment. We disclose where it's used and maintain editorial accountability.</p>

          <div className="prose-custom space-y-6 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">How we use AI</h2>
              <p>AI accelerates our research workflow where it adds genuine value. It helps us process volumes of technical documentation, distill complexity, and draft frameworks for human review. But it never replaces the judgment calls that define editorial integrity: selecting what matters, verifying facts, and deciding what's safe to publish.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Where AI may be used</h2>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Summarising source material</h3>
              <p>Condensing long vendor advisories, research papers, and threat reports to extract core security claims. A human reviewer always verifies the summary against the original source.</p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Drafting first-pass copy</h3>
              <p>Generating initial article structure and prose from verified facts and outlines. All copy undergoes editorial review, fact-checking, and rewrite before publication.</p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Generating metadata</h3>
              <p>Creating article summaries, social media descriptions, and technical tags. A human editor validates these match the content and are accurate.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Non-negotiable rules</h2>
              <p><strong className="text-foreground">No publishing without human review.</strong> Every article is read, fact-checked, and approved by a human editor before it goes live. AI-generated content never bypasses this gate.</p>
              <p className="mt-3"><strong className="text-foreground">No invented sources, statistics, or CVEs.</strong> Every fact is traced back to a primary source. If a source doesn't exist, it doesn't appear in our coverage.</p>
              <p className="mt-3"><strong className="text-foreground">Primary sources take priority.</strong> We cite official vendor advisories, CISA/CERT/CC documentation, and academic research before secondary journalism or commentary.</p>
              <p className="mt-3"><strong className="text-foreground">Unverified claims are labeled.</strong> If we report something we cannot independently confirm, we say so clearly. Speculation is marked as opinion.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Disclosure</h2>
              <p>When an article is AI-assisted, we state it clearly. We tell you what was AI-assisted (research summaries, first drafts, metadata) and what a human reviewer independently validated (fact claims, source accuracy, technical detail, editorial judgment). This transparency lets you assess the work based on where human oversight applied.</p>
              <p className="mt-3">You can always reach out if you spot an error or want to know more about our process. Email us at <a href="mailto:hello@aisecuritybrief.com" className="text-primary hover:underline">hello@aisecuritybrief.com</a>.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Questions?</h2>
              <p>If you'd like to understand more about how we use AI, how we verify facts, or how our review process works, we're happy to explain. Transparency is part of our editorial practice, not a compliance checkbox.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
