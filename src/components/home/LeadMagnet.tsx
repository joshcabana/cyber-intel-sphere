import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    const { error } = await supabase.from("leads").insert({ email, source: "checklist" } as any);
    setLoading(false);
    if (error) {
      toast.error("Something went wrong — please try again.");
      return;
    }
    setSubmitted(true);
    toast.success("Check your inbox!");
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center glass-panel rounded-xl p-8 md:p-12 cyber-border animate-pulse-glow">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 mb-6">
            <FileText className="h-7 w-7 text-primary" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Free: AI Security Readiness Checklist
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            47-point checklist used by security teams at Fortune 500 companies to audit their AI deployments. No signup wall, no BS.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-success font-medium">
              <CheckCircle2 className="h-5 w-5" />
              Check your inbox — downloading now.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary border-border/50 h-11 text-foreground placeholder:text-muted-foreground"
                required
              />
              <Button variant="hero" type="submit" className="h-11 px-6 shrink-0" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Get the PDF <ArrowRight className="h-4 w-4" /></>}
              </Button>
            </form>
          )}

          <p className="text-[10px] text-muted-foreground/60 mt-4 font-mono">
            NO SPAM. UNSUBSCRIBE ANYTIME. YOUR DATA IS NEVER SOLD.
          </p>
        </div>
      </div>
    </section>
  );
}
