import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { MeetingFilters } from "@/types/meeting";

interface MeetingFiltersProps {
  filters: MeetingFilters;
  onFiltersChange: (filters: MeetingFilters) => void;
}

export const MeetingFiltersComponent = ({ filters, onFiltersChange }: MeetingFiltersProps) => {
  return (
    <Card className="p-4 mb-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search meetings..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>
        
        <Select
          value={filters.status}
          onValueChange={(value) => onFiltersChange({ ...filters, status: value as any })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={filters.priority}
          onValueChange={(value) => onFiltersChange({ ...filters, priority: value as any })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={filters.type}
          onValueChange={(value) => onFiltersChange({ ...filters, type: value as any })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="meeting">Meeting</SelectItem>
            <SelectItem value="call">Call</SelectItem>
            <SelectItem value="conference">Conference</SelectItem>
            <SelectItem value="interview">Interview</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};