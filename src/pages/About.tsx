import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield } from "lucide-react";

const philosophyRules = [
  "Every claim must trace to a primary source or reproducible test.",
  "No vendor may pay for placement, ranking, or editorial influence.",
  "Affiliate links are always disclosed — they never affect analysis.",
  "Human accountability on every briefing — no unsupervised AI publish.",
  "We cover threats that matter, not threats that trend.",
  "Corrections are published openly, not quietly edited.",
  "Reader trust is the product — everything else is a feature.",
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="About AI Threat Brief"
        description="Independent AI security intelligence platform. Human-reviewed, primary-source grounded. No vendor sponsorship."
        path="/about"
      />
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-10">
            <p className="text-xs font-mono text-primary tracking-widest mb-2">ABOUT</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              About <span className="gradient-text">AI Threat Brief</span>
            </h1>
          </div>

          <div className="glass-panel rounded-xl p-8 cyber-border space-y-6 text-muted-foreground leading-relaxed">
            <p>
              AI Threat Brief is an independent intelligence platform built for security teams navigating the Agentic Era — where AI agents, LLM pipelines and model supply chains create attack surfaces that legacy tooling doesn't cover.
            </p>
            <p>
              Founded by Josh Cabana, every briefing, tool rating and matrix entry is human-reviewed and primary-source grounded. We exist because security teams deserve signal, not spin.
            </p>
            <p>
              We accept no sponsorships or pay-for-play. Some links are affiliate-marked and transparently disclosed — this never affects our analysis. Core intelligence is always free and open.
            </p>
            <p className="text-foreground font-medium">
              Our measure of success: one prevented incident that pays for years of intelligence.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Who's Behind It</h2>
            <div className="glass-panel rounded-xl p-8 cyber-border space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Josh Cabana</strong> — Founder & Editor
              </p>
              <p>
                Josh is a cybersecurity practitioner and researcher focused on the intersection of AI systems and adversarial risk. He built AI Threat Brief to give security teams the signal they were not getting from vendor marketing or hype-cycle coverage.
              </p>
              <p>
                Every briefing, tool rating, and matrix entry is either written or reviewed by Josh before publication.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Editorial Philosophy
            </h2>
            <div className="glass-panel rounded-xl p-8 cyber-border">
              <ol className="space-y-4">
                {philosophyRules.map((rule, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <span className="text-primary font-mono text-sm font-bold mt-0.5">{i + 1}.</span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
