import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Flame, Copy, Users, Bookmark, Shield, ArrowRight,
  TrendingUp, Clock, CheckCircle2
} from "lucide-react";

const streakCount = 7;
const referralCode = "OPSEC-X4K9";
const referralCount = 3;

const savedBriefs = [
  { title: "RAG Pipeline Injection Vectors", date: "Apr 11" },
  { title: "Securing Agentic Workflows", date: "Apr 9" },
];

export default function Dashboard() {
  const copyReferral = () => {
    navigator.clipboard.writeText(`https://aithreatbrief.com/r/${referralCode}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Command Center</h1>
              <p className="text-sm text-muted-foreground">Your personalized intelligence dashboard</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
              <Shield className="h-3.5 w-3.5 mr-1" /> PRO
            </Badge>
          </div>

          {/* Widget grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Streak */}
            <div className="glass-panel rounded-xl p-5 cyber-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Intel Streak</span>
                <Flame className="h-5 w-5 text-warning" />
              </div>
              <p className="text-4xl font-bold font-mono text-foreground">{streakCount}</p>
              <p className="text-xs text-muted-foreground mt-1">consecutive weeks</p>
            </div>

            {/* Referrals */}
            <div className="glass-panel rounded-xl p-5 cyber-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Referrals</span>
                <Users className="h-5 w-5 text-primary" />
              </div>
              <p className="text-4xl font-bold font-mono text-foreground">{referralCount}</p>
              <button
                onClick={copyReferral}
                className="mt-2 flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
              >
                <Copy className="h-3 w-3" /> Copy link: /r/{referralCode}
              </button>
            </div>

            {/* Readiness */}
            <div className="glass-panel rounded-xl p-5 cyber-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Readiness</span>
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <p className="text-4xl font-bold font-mono text-foreground">72<span className="text-lg text-muted-foreground">/100</span></p>
              <Link to="/assessment" className="mt-2 flex items-center gap-1 text-xs text-primary hover:text-primary/80">
                Take assessment <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Saved */}
            <div className="glass-panel rounded-xl p-5 cyber-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Saved Briefs</span>
                <Bookmark className="h-5 w-5 text-primary/60" />
              </div>
              <p className="text-4xl font-bold font-mono text-foreground">{savedBriefs.length}</p>
              <p className="text-xs text-muted-foreground mt-1">briefs bookmarked</p>
            </div>
          </div>

          {/* Feed + Saved */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Latest Briefings
              </h2>
              {[
                { title: "Critical: RAG Pipeline Injection Vectors in Production LLM Systems", severity: "CRITICAL", time: "2h ago" },
                { title: "Agent-to-Agent Protocol Exploitation: OAuth Scope Escalation", severity: "HIGH", time: "1d ago" },
                { title: "Defense Brief: Securing Agentic Workflows with Runtime Guardrails", severity: "INFO", time: "2d ago" },
              ].map((item, i) => (
                <div key={i} className="glass-panel rounded-lg p-4 hover:border-primary/30 transition-all cyber-border-hover cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-foreground text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                    </div>
                    <Badge variant="outline" className={`text-[10px] font-mono shrink-0 ${
                      item.severity === "CRITICAL" ? "bg-destructive/20 text-destructive border-destructive/30" :
                      item.severity === "HIGH" ? "bg-warning/20 text-warning border-warning/30" :
                      "bg-primary/20 text-primary border-primary/30"
                    }`}>
                      {item.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-primary" /> Saved
              </h2>
              {savedBriefs.map((brief, i) => (
                <div key={i} className="glass-panel rounded-lg p-4 cyber-border">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary/60 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{brief.title}</p>
                      <p className="text-xs text-muted-foreground">{brief.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
