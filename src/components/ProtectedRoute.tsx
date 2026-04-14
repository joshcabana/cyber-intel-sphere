import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Shield, Mail, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isEmailVerified } = useAuth();
  const [resending, setResending] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (!isEmailVerified) {
    const handleResend = async () => {
      setResending(true);
      const { error } = await supabase.auth.resend({ type: "signup", email: user.email! });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Verification email sent! Check your inbox.");
      }
      setResending(false);
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-background intelligence-grid">
        <div className="w-full max-w-md mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-bold text-foreground text-lg">AI THREAT BRIEF</span>
          </div>
          <div className="glass-panel rounded-xl p-6 cyber-border space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-warning/10 border border-warning/20 mx-auto">
              <Mail className="h-6 w-6 text-warning" />
            </div>
            <h2 className="font-semibold text-foreground text-lg">Verify Your Email</h2>
            <p className="text-sm text-muted-foreground">
              We sent a verification link to <span className="text-foreground">{user.email}</span>. 
              Please check your inbox and click the link to access your dashboard.
            </p>
            <Button variant="outline" onClick={handleResend} disabled={resending} className="w-full">
              {resending ? "Sending..." : "Resend Verification Email"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
