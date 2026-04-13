import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export interface Tool {
  name: string;
  description: string;
  highlight: string;
  price: string;
  url?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline";
}

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="glass-panel rounded-xl p-5 cyber-border flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-semibold text-foreground">{tool.name}</h3>
          {tool.badge && (
            <Badge variant={tool.badgeVariant ?? "default"} className="text-[10px]">
              {tool.badge}
            </Badge>
          )}
        </div>
        <p className="text-sm text-foreground/70 mb-3">{tool.description}</p>
        <p className="text-xs text-muted-foreground font-mono mb-2">{tool.highlight}</p>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
        <span className="text-sm font-medium text-foreground">{tool.price}</span>
        {tool.url && (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            Visit <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}
