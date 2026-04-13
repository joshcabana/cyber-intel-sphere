import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Terms of Service"
        description="Terms of service for AI Threat Brief, including disclaimers, affiliate disclosure, and limitations of liability."
        path="/terms"
      />
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Legal</span>
          <h1 className="text-3xl font-bold text-foreground mt-2 mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: March 2026</p>

          <div className="prose-custom space-y-6 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Acceptance of terms</h2>
              <p>By accessing and using AI Threat Brief, you agree to be bound by these terms of service. If you do not agree with any part of these terms, please discontinue use of this site.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Content disclaimer</h2>
              <p>All content published on AI Threat Brief is for informational and educational purposes only. It does not constitute professional cybersecurity advice, legal advice, or any other form of professional counsel. You should not act or refrain from acting based solely on the information provided on this site. Always consult qualified professionals for advice specific to your situation.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Accuracy of information</h2>
              <p>We make reasonable efforts to ensure the accuracy and timeliness of the information published on this site. However, the cybersecurity landscape evolves rapidly. We do not warrant that all content is complete, current, or free from error. Security briefings, tool recommendations, and security strategies may change without notice.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Affiliate disclosure</h2>
              <p>This site contains affiliate links to third-party products and services. When you click these links and make a purchase, we may receive a commission at no additional cost to you. Affiliate relationships are clearly disclosed where applicable. These relationships do not influence our editorial judgements or recommendations. For full details, see our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Third-party links</h2>
              <p>This site links to external websites, products, and services that we do not own or control. We are not responsible for the content, privacy practices, or availability of any third-party sites. Following external links is at your own risk.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Limitation of liability</h2>
              <p>To the fullest extent permitted by law, AI Threat Brief and its contributors shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use this site, including any reliance on content published here. This applies to damages of any kind, whether based on warranty, contract, tort, or any other legal theory.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Intellectual property</h2>
              <p>All original content on AI Threat Brief, including articles, analysis, and design, is the intellectual property of AI Threat Brief unless otherwise stated. You may share and reference our content with proper attribution but may not reproduce it in full without written permission.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Newsletter terms</h2>
              <p>By subscribing to our newsletter, you consent to receiving periodic emails containing articles, tool recommendations, and related content. You can unsubscribe at any time using the link provided in every email. Newsletter delivery is managed by Beehiiv and is subject to their terms of service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Governing law</h2>
              <p>These terms are governed by and construed in accordance with the laws of Australia. Any disputes arising from these terms or your use of this site shall be subject to the exclusive jurisdiction of the courts of Australia.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Changes to these terms</h2>
              <p>We reserve the right to update these terms at any time. Material changes will be reflected on this page with an updated revision date. Continued use of the site after changes are published constitutes acceptance of the revised terms.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
