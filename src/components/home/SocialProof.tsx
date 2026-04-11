import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Finally, independent analysis I can actually trust.",
    role: "CISO, Fortune-500 FinTech",
  },
  {
    quote: "The only briefing that matters for agentic AI risks.",
    role: "Head of AI Security, Major Bank",
  },
  {
    quote: "Matrix + briefings = my new daily workflow.",
    role: "Principal Security Engineer, SaaS unicorn",
  },
  {
    quote: "One prevented RAG injection already paid for the whole year.",
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
              className="glass-panel rounded-xl p-6 border-l-2 border-l-[hsl(25,95%,53%)] space-y-4"
            >
              <Quote className="h-5 w-5 text-[hsl(25,95%,53%)]/60" />
              <p className="text-foreground font-medium leading-relaxed">"{t.quote}"</p>
              <p className="text-xs font-mono text-muted-foreground tracking-wide">— {t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
