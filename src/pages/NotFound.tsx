import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Page Not Found" description="The page you're looking for doesn't exist." path={location.pathname} />
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-24 pb-20">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary/40 mx-auto mb-4" />
          <h1 className="mb-2 text-5xl font-bold font-mono text-foreground">404</h1>
          <p className="mb-6 text-lg text-muted-foreground">This page doesn't exist or has been moved.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
