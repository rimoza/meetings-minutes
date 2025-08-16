import { useState } from "react";
import { MeetingCard } from "@/components/ui/meeting-card";
import { MeetingTable } from "@/components/ui/meeting-table";
import { MeetingFiltersComponent } from "@/components/meeting-filters";
import { ViewToggle } from "@/components/view-toggle";
import type { ViewType } from "@/components/view-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarClock, PlusCircle, ArrowLeft } from "lucide-react";
import { useMeetings } from "@/hooks/use-meetings";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const UpcomingMeetings = () => {
  const { 
    upcomingMeetings, 
    filters, 
    setFilters, 
    toggleMeetingCompletion, 
    deleteMeeting 
  } = useMeetings();
  const navigate = useNavigate();
  const [view, setView] = useState<ViewType>("table");

  const handleDelete = (id: string) => {
    const meeting = upcomingMeetings.find(m => m.id === id);
    deleteMeeting(id);
    toast.success("Meeting deleted", {
      description: `Meeting with ${meeting?.attendee} has been removed.`,
    });
  };

  const handleToggleComplete = (id: string) => {
    const meeting = upcomingMeetings.find(m => m.id === id);
    toggleMeetingCompletion(id);
    toast.success(meeting?.isCompleted ? "Meeting marked as pending" : "Meeting completed!", {
      description: `${meeting?.attendee} - ${meeting?.time}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 max-w-7xl">
        <div className="mb-4 md:mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <Button variant="outline" onClick={() => navigate('/')} className="gap-2 w-fit">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-md">
                <CalendarClock className="h-5 w-5 md:h-6 md:w-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
                  Upcoming Meetings
                </h1>
                <p className="text-sm md:text-base text-muted-foreground font-medium">Future scheduled meetings</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <span className="text-sm md:text-lg font-medium">
                {upcomingMeetings.length} upcoming meeting{upcomingMeetings.length !== 1 ? 's' : ''}
              </span>
              <span className="px-2 md:px-3 py-0.5 md:py-1 bg-accent/10 text-accent rounded-full text-xs md:text-sm">
                {upcomingMeetings.filter(m => m.priority === 'high').length} high priority
              </span>
            </div>
            <Button onClick={() => navigate('/create')} className="gap-2 w-full sm:w-auto" size="default">
              <PlusCircle className="h-4 w-4" />
              <span className="font-medium sm:hidden">New</span>
              <span className="font-medium hidden sm:inline">Schedule Meeting</span>
            </Button>
          </div>
        </div>

        <MeetingFiltersComponent filters={filters} onFiltersChange={setFilters} />
        
        {/* View Toggle below filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Meeting List</h3>
          <ViewToggle view={view} onViewChange={setView} />
        </div>
        
        <div>
          {upcomingMeetings.length === 0 ? (
            <Card className="p-8 text-center animate-fade-in">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <CalendarClock className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No upcoming meetings</h3>
              <p className="text-muted-foreground mb-4">
                You have no meetings scheduled for the future. Your calendar is clear!
              </p>
              <Button onClick={() => navigate('/create')} size="lg">
                <PlusCircle className="h-4 w-4 mr-2" />
                Schedule a Meeting
              </Button>
            </Card>
          ) : view === "cards" ? (
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <MeetingTable
              meetings={upcomingMeetings}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingMeetings;