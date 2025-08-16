import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, MapPin, User, FileText, Edit, Trash2, Eye, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Meeting } from "@/types/meeting";

interface MeetingTableProps {
  meetings: Meeting[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-accent/10 text-accent border-accent/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
};

const typeIcons = {
  meeting: User,
  call: Clock,
  conference: User,
  interview: FileText,
};

export const MeetingTable = ({ meetings, onToggleComplete, onDelete }: MeetingTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-auto rounded-md border bg-card">
      <Table className="min-w-[640px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 md:w-12">Status</TableHead>
            <TableHead className="min-w-[180px]">Meeting</TableHead>
            <TableHead className="hidden sm:table-cell">Date & Time</TableHead>
            <TableHead className="hidden md:table-cell">Location</TableHead>
            <TableHead className="hidden lg:table-cell">Type</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meetings.map((meeting) => {
            const TypeIcon = typeIcons[meeting.type];
            
            return (
              <TableRow 
                key={meeting.id}
                className={cn(
                  "cursor-pointer transition-colors hover:bg-muted/50",
                  meeting.isCompleted && "opacity-75 bg-success/5"
                )}
                onClick={() => navigate(`/meeting/${meeting.id}`)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={meeting.isCompleted}
                    onCheckedChange={() => onToggleComplete(meeting.id)}
                    className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                  />
                </TableCell>
                
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <TypeIcon className="h-4 w-4 text-muted-foreground" />
                      <span className={cn(
                        "font-medium",
                        meeting.isCompleted ? "line-through text-muted-foreground" : "text-foreground"
                      )}>
                        {meeting.attendee}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">ID: {meeting.id}</div>
                    {meeting.description && (
                      <div className="text-sm text-muted-foreground line-clamp-1 max-w-xs">
                        {meeting.description}
                      </div>
                    )}
                  </div>
                </TableCell>
                
                <TableCell className="hidden sm:table-cell">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span>{meeting.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{meeting.time}</span>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="max-w-[150px] truncate">{meeting.location}</span>
                  </div>
                </TableCell>
                
                <TableCell className="hidden lg:table-cell">
                  <span className="capitalize text-sm">{meeting.type}</span>
                </TableCell>
                
                <TableCell>
                  <Badge className={cn("text-xs font-medium", priorityColors[meeting.priority])}>
                    {meeting.priority.toUpperCase()}
                  </Badge>
                </TableCell>
                
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-0.5">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/meeting/${meeting.id}`);
                      }}
                      className="h-7 w-7 p-0 hidden sm:inline-flex"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/edit/${meeting.id}`);
                      }}
                      className="h-7 w-7 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(meeting.id);
                      }}
                      className="h-7 w-7 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};