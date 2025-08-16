import { Users, CheckCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface DashboardStatsProps {
  totalMeetings: number;
  completedMeetings: number;
  todayMeetings: number;
}

export const DashboardStats = ({ 
  totalMeetings, 
  completedMeetings,
  todayMeetings
}: DashboardStatsProps) => {
  const completionRate = totalMeetings > 0 ? Math.round((completedMeetings / totalMeetings) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards - Mobile First Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="p-3 md:p-4 bg-gradient-subtle border-l-4 border-l-primary hover:shadow-medium transition-all duration-300 md:hover:scale-105">
          <div className="flex items-center gap-2 md:gap-3">
            <Users className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground truncate">Total</p>
              <p className="text-xl md:text-2xl font-bold text-primary">{totalMeetings}</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 md:p-4 bg-gradient-subtle border-l-4 border-l-accent hover:shadow-medium transition-all duration-300 md:hover:scale-105">
          <div className="flex items-center gap-2 md:gap-3">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-accent flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground truncate">Today</p>
              <p className="text-xl md:text-2xl font-bold text-accent">{todayMeetings}</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 md:p-4 bg-gradient-subtle border-l-4 border-l-success hover:shadow-medium transition-all duration-300 md:hover:scale-105">
          <div className="flex items-center gap-2 md:gap-3">
            <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-success flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground truncate">Done</p>
              <p className="text-xl md:text-2xl font-bold text-success">{completedMeetings}</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 md:p-4 bg-gradient-subtle border-l-4 border-l-destructive hover:shadow-medium transition-all duration-300 md:hover:scale-105">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-accent flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] md:text-xs font-bold text-accent-foreground">%</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground truncate">Progress</p>
              <p className="text-xl md:text-2xl font-bold text-destructive">{completionRate}%</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};