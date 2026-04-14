import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, ArrowRight, CheckCircle2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const refApplied = searchParams.get("ref") === "applied";

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      if (error.message.includes("Invalid login")) {
        toast.error("Invalid email or password");
      } else if (error.message.includes("Email not confirmed")) {
        toast.error("Please verify your email before signing in. Check your inbox.");
      } else {
        toast.error(error.message);
      }
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) return;

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + "/dashboard" },
    });

    if (error) {
      toast.error(error.message);
    } else {
      setSignupSuccess(true);
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });

    if (error) {
      toast.error(error.message);
    } else {
      setForgotSent(true);
    }
    setLoading(false);
  };

  const SuccessMessage = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
    <div className="text-center space-y-4 py-4">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success/10 border border-success/20">
        {icon}
      </div>
      <h2 className="font-semibold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center relative intelligence-grid">
      <SEOHead title="Sign In" description="Access your AI Threat Brief intelligence dashboard." path="/login" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-md mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-bold text-foreground text-lg">AI THREAT BRIEF</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Access Your Intelligence</h1>
          <p className="text-sm text-muted-foreground mt-2">Free access to briefings, Stack Matrix, and your saved intelligence.</p>
          {refApplied && (
            <p className="text-xs text-primary mt-2 font-mono">✓ Referral applied — sign up to activate</p>
          )}
        </div>

        <div className="glass-panel rounded-xl p-6 cyber-border">
          {forgotMode ? (
            forgotSent ? (
              <SuccessMessage
                icon={<Mail className="h-6 w-6 text-success" />}
                title="Check your inbox"
                text={`We sent a password reset link to ${email}`}
              />
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="text-center mb-2">
                  <h2 className="font-semibold text-foreground">Reset Password</h2>
                  <p className="text-xs text-muted-foreground mt-1">Enter your email to receive a reset link</p>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="email" placeholder="operator@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 bg-secondary border-border/50 h-11" required />
                  </div>
                </div>
                <Button variant="hero" type="submit" className="w-full h-11" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Link"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <button type="button" onClick={() => setForgotMode(false)} className="w-full text-xs text-primary hover:underline">
                  Back to sign in
                </button>
              </form>
            )
          ) : signupSuccess ? (
            <SuccessMessage
              icon={<CheckCircle2 className="h-6 w-6 text-success" />}
              title="Verify your email"
              text={`We sent a confirmation link to ${email}. Click it to activate your account.`}
            />
          ) : (
            <Tabs defaultValue="signin" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="email" placeholder="operator@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 bg-secondary border-border/50 h-11" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 bg-secondary border-border/50 h-11" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button variant="hero" type="submit" className="w-full h-11" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <button type="button" onClick={() => setForgotMode(true)} className="w-full text-xs text-primary hover:underline">
                    Forgot password?
                  </button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="email" placeholder="operator@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 bg-secondary border-border/50 h-11" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 bg-secondary border-border/50 h-11" required minLength={8} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type={showPassword ? "text" : "password"} placeholder="Re-enter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 bg-secondary border-border/50 h-11" required minLength={8} />
                    </div>
                  </div>
                  <Button variant="hero" type="submit" className="w-full h-11" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground/60 mt-6">
          By signing in you agree to our{" "}
          <Link to="/terms" className="underline hover:text-foreground">Terms</Link> &{" "}
          <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
