import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Lock, Zap, ArrowRight } from "lucide-react";

type Props = {
  children: React.ReactNode;
  feature?: string;
};

export default function UpgradeWall({ children, feature = "this feature" }: Props) {
  const { isPro, loading, user } = useAuth();

  if (loading) return <>{children}</>;
  if (isPro) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-sm opacity-40">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="glass-panel rounded-xl p-8 cyber-border cyber-glow text-center max-w-md mx-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">Pro Tool</h3>
          <p className="text-sm text-muted-foreground mb-6">
            {feature} is a Pro workflow feature. Core intel stays free and open — Pro adds the tools your team needs to move faster.
          </p>
          <Link to={user ? "/pricing" : "/login"}>
            <Button variant="hero" className="w-full">
              <Zap className="h-4 w-4" />
              {user ? "Upgrade to Pro" : "Sign In to Upgrade"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
