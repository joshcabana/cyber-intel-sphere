import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Finally, AI security intel I can actually trust — no vendor spin, just signal.",
    role: "CISO, Fortune-500 FinTech",
  },
  {
    quote: "The only briefing my team reads end-to-end. Concise, opinionated, and sourced.",
    role: "Head of AI Security, Major Bank",
  },
  {
    quote: "Stack Matrix + weekly briefs replaced three paid feeds for us.",
    role: "Principal Security Engineer, SaaS Unicorn",
  },
  {
    quote: "One caught RAG injection already paid for years of Pro. The upside is asymmetric.",
    role: "Director of Security, AI Startup",
  },
];

export default function SocialProof() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-mono text-primary tracking-widest mb-3">WHAT SECURITY LEADERS SAY</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Trusted by teams that <span className="gradient-text">can't afford blind spots.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.role}
              className="glass-panel rounded-xl p-6 border-l-2 border-l-warning space-y-4"
            >
              <Quote className="h-5 w-5 text-warning/60" />
              <p className="text-foreground font-medium leading-relaxed">"{t.quote}"</p>
              <p className="text-xs font-mono text-muted-foreground tracking-wide">— {t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
