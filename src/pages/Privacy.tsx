import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Privacy Policy"
        description="Privacy policy for AI Threat Brief, covering data collection, cookies, newsletter subscriptions, and affiliate link disclosures."
        path="/privacy"
      />
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Legal</span>
          <h1 className="text-3xl font-bold text-foreground mt-2 mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: March 2026</p>

          <div className="prose-custom space-y-6 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Overview</h2>
              <p>AI Threat Brief is an independent publication covering AI-powered cybersecurity threats, privacy tools, and defence strategies. This policy explains what data we collect, how we use it, and your rights under Australian law. We are based in Australia and operate under the Privacy Act 1988 (Cth), including the Australian Privacy Principles (APPs).</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Information we collect</h2>
              <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Newsletter subscriptions</h3>
              <p>When you subscribe to our newsletter, we collect your email address. Newsletter delivery and subscriber management is handled by Beehiiv. Your email is stored on Beehiiv's servers and is subject to their privacy policy. We do not sell or share subscriber email addresses with third parties.</p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Analytics</h3>
              <p>We use privacy-focused analytics that do not collect personal data, do not use cookies, and do not track users across websites. All data is aggregated and no individual visitor profiles are created.</p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Abuse prevention</h3>
              <p>We use server-side rate limiting on newsletter signup and lead-capture requests. IP-derived rate-limit identifiers and related request timing data are used strictly to throttle abuse and protect availability. We do not use this data for audience analytics or advertising profiles.</p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Cookies</h3>
              <p>We do not use analytics or advertising cookies on this site. Beehiiv may set cookies if you interact directly with its hosted newsletter pages or email preference flows.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Affiliate links</h2>
              <p>Some links on this site are affiliate links. When you click an affiliate link and make a purchase, we may earn a commission at no additional cost to you. Affiliate partners may use cookies or tracking pixels to attribute referrals. We recommend tools based on documented security capabilities, independent audit results, and practitioner relevance. Affiliate commissions do not determine our rankings or conclusions. For details on how we select and evaluate tools, see our <Link to="/methodology" className="text-primary hover:underline">Methodology page</Link>.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">How we use your information</h2>
              <ul className="list-disc ml-6 space-y-2">
                <li>To deliver newsletter issues and updates you have subscribed to</li>
                <li>To understand which briefings and tools pages are useful without building individual visitor profiles</li>
                <li>To improve the site and editorial direction based on readership patterns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Your rights</h2>
              <p>Under the Privacy Act 1988 and the Australian Privacy Principles, you have the right to access, correct, or request deletion of any personal information we hold about you. You can unsubscribe from the newsletter at any time using the unsubscribe link included in every email. For data access or deletion requests, contact us using the details below.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Third-party services</h2>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong className="text-foreground">Beehiiv</strong> — newsletter delivery and subscriber management</li>
                <li><strong className="text-foreground">Stripe</strong> — payment processing for Pro subscriptions and advisory services</li>
                <li><strong className="text-foreground">Vercel</strong> — website hosting and content delivery</li>
                <li><strong className="text-foreground">Lovable Cloud</strong> — application backend, authentication, and data storage</li>
                <li><strong className="text-foreground">GitHub</strong> — source code hosting</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Changes to this policy</h2>
              <p>We may update this privacy policy from time to time. Material changes will be noted on this page with an updated revision date.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Contact</h2>
              <p>If you have questions about this privacy policy or wish to exercise your rights under Australian privacy law, you can reach us via the contact details published on this site or by replying to any newsletter email.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
