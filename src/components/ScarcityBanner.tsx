import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function ScarcityBanner() {
  return (
    <Link
      to="/pricing"
      className="block bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-primary/20 py-2 text-center group hover:from-primary/15 hover:to-primary/15 transition-colors"
    >
      <span className="text-xs font-mono text-primary tracking-wide">
        <Zap className="h-3 w-3 inline mr-1" />
        Founding Pro members get lifetime 20% off — limited spots
        <span className="ml-2 text-primary/60 group-hover:text-primary transition-colors">→</span>
      </span>
    </Link>
  );
}
