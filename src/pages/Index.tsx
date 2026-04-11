import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import IntelligenceFeed from "@/components/home/IntelligenceFeed";
import MatrixTeaser from "@/components/home/MatrixTeaser";
import LeadMagnet from "@/components/home/LeadMagnet";
import ScarcityBanner from "@/components/ScarcityBanner";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <ScarcityBanner />
        <HeroSection />
        <IntelligenceFeed />
        <MatrixTeaser />
        <LeadMagnet />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
