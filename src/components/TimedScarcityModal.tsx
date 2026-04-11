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
    }, 45_000); // 45 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md border-primary/30 bg-card">
        <DialogHeader className="text-center items-center">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-8 w-8 text-primary" />
            <Zap className="h-6 w-6 text-yellow-400" />
          </div>
          <DialogTitle className="text-xl">
            Only 47 Founding Pro spots remain
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2">
            Founding members lock in <span className="text-primary font-semibold">20% off for life</span>.
            Once they're gone, full price applies — no exceptions.
            The threat landscape won't wait for your budget cycle.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 pt-2">
          <Button
            variant="hero"
            className="w-full"
            onClick={() => { setOpen(false); navigate("/pricing"); }}
          >
            Claim my Founding Pro spot
          </Button>
          <button
            onClick={() => setOpen(false)}
            className="w-full text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            I'll pay full price later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
