import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Corrections() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Corrections"
        description="AI Threat Brief Corrections — our process for requesting corrections and a public log of substantive updates to published articles."
        path="/corrections"
      />
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Accountability</span>
          <h1 className="text-3xl font-bold text-foreground mt-2 mb-2">Corrections</h1>
          <p className="text-foreground/70 mb-8">We make errors. When we do, we correct them quickly and transparently. This page explains our process.</p>

          <div className="prose-custom space-y-6 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">How to request a correction</h2>
              <p>Spotted an error? We appreciate you pointing it out. You can request a correction in two ways:</p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Reply to the newsletter email</h3>
              <p>If you receive our weekly briefing, hit reply and describe what you think needs correcting. Your email goes straight to our editorial team.</p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Contact us directly</h3>
              <p>Email <a href="mailto:hello@aithreatbrief.com" className="text-primary hover:underline">hello@aithreatbrief.com</a> with the article title, the claim you believe is inaccurate, and what the correct information should be.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">What happens next</h2>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-2">1. Acknowledge within 3 business days</h3>
              <p>We'll confirm receipt of your report and let you know we're looking into it.</p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-2">2. Investigate</h3>
              <p>We verify your claim against our sources and determine if a correction is warranted.</p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-2">3. Update the article</h3>
              <p>If your report is valid, we'll update the article and add a visible correction note explaining what changed and why.</p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-2">4. Log it publicly</h3>
              <p>Substantive corrections appear in the log below. This creates a transparent record of our errors and our accountability.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Corrections log</h2>
              <div className="glass-panel rounded-xl p-6 cyber-border text-center">
                <p className="text-muted-foreground italic">No corrections issued yet.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Why transparency matters</h2>
              <p>Publishing corrections publicly isn't fun, but it's essential. It shows we take accuracy seriously, we listen to our readers, and we're willing to admit when we get things wrong. Trust isn't built by pretending perfection — it's built by acknowledging mistakes and fixing them quickly.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
