export interface Meeting {
  id: string;
  attendee: string;
  time: string;
  location: string;
  date: Date;
  isCompleted: boolean;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  type: 'meeting' | 'call' | 'conference' | 'interview';
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingFilters {
  search: string;
  status: 'all' | 'completed' | 'pending';
  priority: 'all' | 'low' | 'medium' | 'high';
  type: 'all' | 'meeting' | 'call' | 'conference' | 'interview';
}