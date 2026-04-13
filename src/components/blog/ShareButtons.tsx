import { Link2, Twitter, Linkedin } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Share</span>
      <button
        onClick={copyLink}
        className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
        title="Copy link"
      >
        <Link2 className="h-4 w-4" />
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
        title="Share on X"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
        title="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
    </div>
  );
}
