import { Button } from "@/components/ui/button";
import { LayoutGrid, Table } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewType = "cards" | "table";

interface ViewToggleProps {
  view: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center bg-muted rounded-lg p-0.5 md:p-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("cards")}
        className={cn(
          "h-7 md:h-8 px-2 md:px-3 rounded-md transition-all text-xs md:text-sm",
          view === "cards" 
            ? "bg-background shadow-sm text-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <LayoutGrid className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1 md:mr-2" />
        <span className="hidden sm:inline">Cards</span>
        <span className="sm:hidden">Cards</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("table")}
        className={cn(
          "h-7 md:h-8 px-2 md:px-3 rounded-md transition-all text-xs md:text-sm",
          view === "table" 
            ? "bg-background shadow-sm text-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Table className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1 md:mr-2" />
        <span className="hidden sm:inline">Table</span>
        <span className="sm:hidden">Table</span>
      </Button>
    </div>
  );
};