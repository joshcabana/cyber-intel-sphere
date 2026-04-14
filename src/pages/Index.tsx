import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import IntelligenceFeed from "@/components/home/IntelligenceFeed";
import HowItWorks from "@/components/home/HowItWorks";
import SocialProof from "@/components/home/SocialProof";
import MatrixTeaser from "@/components/home/MatrixTeaser";
import LeadMagnet from "@/components/home/LeadMagnet";
import ScarcityBanner from "@/components/ScarcityBanner";
import ExitIntentModal from "@/components/ExitIntentModal";


const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="AI Threat Brief — Independent AI Security Intelligence"
        description="Actionable intelligence on AI-powered threats, prompt injection, agent exploits, and defensive strategies for security teams."
        path="/"
      />
      <Navbar />
      <main className="flex-1 pt-16">
        <ScarcityBanner />
        <HeroSection />
        <IntelligenceFeed />
        <HowItWorks />
        <SocialProof />
        <MatrixTeaser />
        <LeadMagnet />
      </main>
      <Footer />
      <ExitIntentModal />
    </div>
  );
};

export default Index;
