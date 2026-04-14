import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";

export default function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !sessionStorage.getItem("exit_shown")) {
      sessionStorage.setItem("exit_shown", "1");
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseout", handleMouseLeave);
    return () => document.removeEventListener("mouseout", handleMouseLeave);
  }, [handleMouseLeave]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md border-primary/30 bg-card">
        <DialogHeader className="text-center items-center">
          <Shield className="h-10 w-10 text-primary mb-2" />
          <DialogTitle className="text-xl">
            Before you go — are you briefed on this week's AI threats?
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2">
            Get concise, independent AI security intelligence delivered weekly. No vendor spin, no filler — just the threats that matter to your stack.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 pt-2">
          <Button
            variant="hero"
            className="w-full"
            onClick={() => { setOpen(false); navigate("/newsletter"); }}
          >
            Get free threat briefs
            <ArrowRight className="h-4 w-4" />
          </Button>
          <button
            onClick={() => setOpen(false)}
            className="w-full text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            I'll catch up later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
