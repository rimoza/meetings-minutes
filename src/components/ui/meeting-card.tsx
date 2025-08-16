import { useNavigate } from "react-router";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users, Edit, Trash2, Eye, Phone, Video, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Meeting } from "@/types/meeting";

interface MeetingCardProps {
  meeting: Meeting;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: "border-l-success",
  medium: "border-l-accent",
  high: "border-l-destructive",
};

const typeIcons = {
  meeting: Users,
  call: Phone,
  conference: Video,
  interview: UserCheck,
};

export const MeetingCard = ({ meeting, onToggleComplete, onDelete }: MeetingCardProps) => {
  const navigate = useNavigate();
  const TypeIcon = typeIcons[meeting.type];

  return (
    <Card className={cn(
      "p-4 md:p-6 transition-all duration-300 hover:shadow-medium group cursor-pointer animate-fade-in",
      "border-l-4 md:hover:scale-[1.02]",
      meeting.isCompleted 
        ? "bg-success-light border-l-success opacity-75" 
        : `bg-card ${priorityColors[meeting.priority]} hover:bg-gradient-subtle`
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          {/* Header with ID, type and checkbox */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              <TypeIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-xs md:text-sm font-medium text-muted-foreground">{meeting.id}</span>
              <span className={cn(
                "px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium",
                meeting.priority === 'high' && "bg-destructive/10 text-destructive",
                meeting.priority === 'medium' && "bg-accent/10 text-accent",
                meeting.priority === 'low' && "bg-success/10 text-success"
              )}>
                {meeting.priority.toUpperCase()}
              </span>
            </div>
            <Checkbox
              checked={meeting.isCompleted}
              onCheckedChange={() => onToggleComplete(meeting.id)}
              className="data-[state=checked]:bg-success data-[state=checked]:border-success"
            />
          </div>

          {/* Attendee name */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm flex-shrink-0">
              <Users className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary-foreground" />
            </div>
            <h3 className={cn(
              "font-bold text-base md:text-lg transition-colors tracking-tight",
              meeting.isCompleted ? "text-muted-foreground line-through" : "text-foreground"
            )}>
              {meeting.attendee}
            </h3>
          </div>

          {/* Description */}
          {meeting.description && (
            <p className="text-sm md:text-base text-muted-foreground line-clamp-2 font-medium">
              {meeting.description}
            </p>
          )}

          {/* Time and location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
            <div className="flex items-center gap-2 md:gap-3">
              <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent flex-shrink-0" />
              <span className={cn(
                "text-xs md:text-sm font-semibold",
                meeting.isCompleted ? "text-muted-foreground" : "text-foreground"
              )}>
                {meeting.time}
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent flex-shrink-0" />
              <span className={cn(
                "text-xs md:text-sm truncate font-medium",
                meeting.isCompleted ? "text-muted-foreground" : "text-muted-foreground"
              )}>
                {meeting.location}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons - visible on mobile, hover on desktop */}
        <div className="flex md:flex-col gap-1 md:gap-2 ml-2 md:ml-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/meeting/${meeting.id}`);
            }}
            className="h-8 w-8 md:h-9 md:w-9 p-0"
          >
            <Eye className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit/${meeting.id}`);
            }}
            className="h-8 w-8 md:h-9 md:w-9 p-0"
          >
            <Edit className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(meeting.id);
            }}
            className="h-8 w-8 md:h-9 md:w-9 p-0 hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};