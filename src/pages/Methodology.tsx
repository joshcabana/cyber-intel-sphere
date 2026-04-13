import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Search, Lock } from "lucide-react";

export default function Methodology() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Research Methodology & Editorial Independence"
        description="How we evaluate MLSecOps tooling, define threat severity, and maintain strict editorial independence from vendors."
        path="/methodology"
      />
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Research Methodology</h1>
          <p className="text-foreground/70 mb-8">We are practitioners, not analysts. Our tooling recommendations and threat evaluations are based on production constraints, not marketing sheets.</p>

          <div className="prose-custom space-y-6 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">How We Evaluate Tools</h2>
              <p>The AI Security Stack Matrix is built over hundreds of hours of hands-on testing, red-teaming, and architectural review. To be included, a tool must solve a tangible problem in the MLSecOps lifecycle.</p>
              <ul className="list-disc ml-6 space-y-2 mt-3">
                <li><strong className="text-foreground">Deployment Friction:</strong> Does it require a highly-invasive kernel agent, or does it utilize modern eBPF/sidecar patterns?</li>
                <li><strong className="text-foreground">False Positives:</strong> In prompt-injection filtering, what is the impact on legitimate LLM operations?</li>
                <li><strong className="text-foreground">Architecture:</strong> Can the solution run air-gapped on-premise, or does it enforce a SaaS-only model transmitting PII to vendor APIs?</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Affiliate Transparency</h2>
              <p>AI Threat Brief operates completely independent of vendor influence. We do not accept "pay-to-play" placements in our Matrix, and we do not do sponsored "guest posts" written by PR agencies.</p>
              <p className="mt-3">To fund the significant infrastructure and research time required to run the intelligence feed, we use affiliate links. When you purchase a tool through a link in our Matrix, we may receive a commission. <strong className="text-foreground">Crucially, this does not affect rankings.</strong> If a vendor's product deteriorates, it will be downgraded or removed, regardless of affiliate status.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Pro Subscriber Promise</h2>
              <p>Our Pro tier completely strips all affiliate and sponsorship noise from the briefings. When you pay for intelligence, you are paying for an uncompromised raw signal. Pro members receive neutral architectural reviews stripped of all tracking parameters.</p>
              <div className="mt-4">
                <Link to="/pro" className="text-primary hover:underline font-medium">Learn about Pro access →</Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
