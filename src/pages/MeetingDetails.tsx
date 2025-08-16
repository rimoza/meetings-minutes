import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, MapPin, User, FileText, Edit, Calendar } from "lucide-react";
import { useMeetings } from "@/hooks/use-meetings";
import { cn } from "@/lib/utils";

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

const MeetingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { meetings } = useMeetings();
  
  const meeting = meetings.find(m => m.id === id);
  
  if (!meeting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
              <h2 className="text-xl font-semibold">Meeting Not Found</h2>
              <p className="text-muted-foreground">
                The meeting you're looking for doesn't exist.
              </p>
              <Button onClick={() => navigate("/")} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const TypeIcon = typeIcons[meeting.type];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          size="sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={() => navigate(`/edit/${meeting.id}`)}
          size="sm"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Meeting
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-3">
              <TypeIcon className="h-6 w-6" />
              {meeting.attendee}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={cn("uppercase font-semibold", priorityColors[meeting.priority])}>
                {meeting.priority}
              </Badge>
              {meeting.isCompleted && (
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-muted-foreground">
                    {meeting.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-muted-foreground">{meeting.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">{meeting.location}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">Meeting ID</p>
                <p className="text-muted-foreground">{meeting.id}</p>
              </div>
              
              <div>
                <p className="font-medium mb-2">Type</p>
                <p className="text-muted-foreground capitalize">{meeting.type}</p>
              </div>
              
              <div>
                <p className="font-medium mb-2">Status</p>
                <p className={cn(
                  "font-medium",
                  meeting.isCompleted ? "text-success" : "text-accent"
                )}>
                  {meeting.isCompleted ? "Completed" : "Pending"}
                </p>
              </div>
            </div>
          </div>

          {meeting.description && (
            <>
              <Separator />
              <div>
                <p className="font-medium mb-3">Description</p>
                <p className="text-muted-foreground leading-relaxed">
                  {meeting.description}
                </p>
              </div>
            </>
          )}

          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <p className="font-medium mb-1">Created</p>
              <p>{meeting.createdAt.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-medium mb-1">Last Updated</p>
              <p>{meeting.updatedAt.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingDetails;