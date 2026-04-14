import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield } from "lucide-react";

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
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">What We Cover</h2>
              <ul className="list-disc ml-6 space-y-2">
                <li>AI-powered attack techniques and real-world exploit chains</li>
                <li>Prompt injection, jailbreaks, and agent manipulation</li>
                <li>Model supply-chain risks and dependency vulnerabilities</li>
                <li>MLSecOps tooling evaluations and stack architecture reviews</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">How We Source and Vet Intel</h2>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong className="text-foreground">Primary research:</strong> hands-on red-teaming, reverse engineering, and production testing</li>
                <li><strong className="text-foreground">Trusted public feeds:</strong> CVE databases, vendor advisories, academic pre-prints, MITRE ATLAS</li>
                <li><strong className="text-foreground">Practitioner network:</strong> verified reports from security engineers in the field</li>
                <li>Every claim cross-referenced against at least two independent sources before publication</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">How We Handle Corrections and Retractions</h2>
              <ul className="list-disc ml-6 space-y-2">
                <li>Errors are corrected in-place with a visible correction notice and timestamp</li>
                <li>Material retractions are published as standalone corrections linked from the original</li>
                <li>All corrections logged on the <Link to="/corrections" className="text-primary hover:underline">/corrections</Link> page</li>
              </ul>
            </section>

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
                <Link to="/pricing" className="text-primary hover:underline font-medium">Learn about Pro access →</Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
