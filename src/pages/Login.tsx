import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const refApplied = searchParams.get("ref") === "applied";

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + "/dashboard" },
    });

    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      // Store referral code from cookie into referred_by on next login
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative intelligence-grid">
      <SEOHead title="Sign In" description="Access your AI Threat Brief intelligence dashboard with a passwordless magic link." path="/login" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-md mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-bold text-foreground text-lg">AI THREAT BRIEF</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Access Your Intelligence</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Sign in with a magic link — no password needed.
          </p>
          {refApplied && (
            <p className="text-xs text-primary mt-2 font-mono">✓ Referral applied — sign up to activate</p>
          )}
        </div>

        <div className="glass-panel rounded-xl p-6 cyber-border">
          {sent ? (
            <div className="text-center space-y-4 py-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success/10 border border-success/20">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <h2 className="font-semibold text-foreground">Check your inbox</h2>
              <p className="text-sm text-muted-foreground">
                We sent a magic link to <span className="text-foreground">{email}</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="operator@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-secondary border-border/50 h-11"
                    required
                  />
                </div>
              </div>
              <Button variant="hero" type="submit" className="w-full h-11" disabled={loading}>
                {loading ? "Sending..." : "Send Magic Link"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground/60 mt-6">
          By signing in you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
