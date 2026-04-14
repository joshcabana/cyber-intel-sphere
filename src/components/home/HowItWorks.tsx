import { FileText, Shield, Zap } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Weekly AI Threat Briefs",
    description: "Concise, opinionated analysis of the AI threats that matter — no filler, no vendor spin.",
  },
  {
    icon: Shield,
    title: "Stack Matrix",
    description: "AI tooling risk and fit overview — evaluate vendors on architecture, deployment friction and false-positive rates.",
  },
  {
    icon: Zap,
    title: "Pro Tools",
    description: "Advanced filters, CSV/PDF exports, saved views, readiness assessment and early alerts for security teams.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <p className="text-xs font-mono text-primary tracking-widest text-center mb-3">HOW IT WORKS</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Three layers of AI security intelligence
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.title}
              className="glass-panel rounded-xl p-6 cyber-border hover:border-primary/30 transition-all group text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 mb-4 group-hover:bg-primary/20 transition-colors">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
