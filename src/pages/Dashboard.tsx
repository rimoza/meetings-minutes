import { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardStats } from "@/components/dashboard-header";
import { MeetingCard } from "@/components/ui/meeting-card";
import { MeetingTable } from "@/components/ui/meeting-table";
import { MeetingFiltersComponent } from "@/components/meeting-filters";
import { ViewToggle } from "@/components/view-toggle";
import type { ViewType } from "@/components/view-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useMeetings } from "@/hooks/use-meetings";
import { toast } from "sonner";

const Dashboard = () => {
  const { 
    meetings, 
    todayMeetings, 
    // upcomingMeetings, 
    filters, 
    setFilters, 
    toggleMeetingCompletion, 
    deleteMeeting 
  } = useMeetings();
  const navigate = useNavigate();
  const [view, setView] = useState<ViewType>("table");

  const handleDelete = (id: string) => {
    const meeting = meetings.find(m => m.id === id);
    deleteMeeting(id);
    toast.success("Meeting deleted", {
      description: `Meeting with ${meeting?.attendee} has been removed.`,
    });
  };

  const handleToggleComplete = (id: string) => {
    const meeting = meetings.find(m => m.id === id);
    toggleMeetingCompletion(id);
    toast.success(meeting?.isCompleted ? "Meeting marked as pending" : "Meeting completed!", {
      description: `${meeting?.attendee} - ${meeting?.time}`,
    });
  };

  const totalMeetings = meetings.length;
  const completedMeetings = meetings.filter(m => m.isCompleted).length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
        <DashboardStats
          totalMeetings={totalMeetings}
          completedMeetings={completedMeetings}
          todayMeetings={todayMeetings.length}
        />
        
        <div className="mt-4 md:mt-8 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Meeting Overview</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage and track all your meetings</p>
          </div>
          <Button onClick={() => navigate('/create')} className="gap-2 w-full sm:w-auto" size="lg">
            <PlusCircle className="h-5 w-5" />
            <span className="font-semibold">New Meeting</span>
          </Button>
        </div>

        <MeetingFiltersComponent filters={filters} onFiltersChange={setFilters} />

        {/* View Toggle and All Meetings Header */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-foreground">All Meetings</h3>
          <ViewToggle view={view} onViewChange={setView} />
        </div>

        {/* All Meetings */}
        <div>
          {meetings.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No meetings found matching your filters.</p>
              <Button onClick={() => navigate('/create')}>Create Your First Meeting</Button>
            </Card>
          ) : view === "cards" ? (
            <div className="space-y-4">
              {meetings.map((meeting) => (
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
              meetings={meetings}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;