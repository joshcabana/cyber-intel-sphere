import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Zap } from "lucide-react";

export default function TimedScarcityModal() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("timed_shown")) return;
    const timer = setTimeout(() => {
      sessionStorage.setItem("timed_shown", "1");
      setOpen(true);
    }, 45_000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md border-primary/30 bg-card">
        <DialogHeader className="text-center items-center">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-8 w-8 text-primary" />
            <Zap className="h-6 w-6 text-warning" />
          </div>
          <DialogTitle className="text-xl">
            Stay ahead of AI threats — subscribe free
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2">
            Get independent, vendor-neutral AI security intelligence delivered weekly.
            Concise briefings your team can actually act on.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 pt-2">
          <Button
            variant="hero"
            className="w-full"
            onClick={() => { setOpen(false); navigate("/newsletter"); }}
          >
            Get free threat briefs
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
