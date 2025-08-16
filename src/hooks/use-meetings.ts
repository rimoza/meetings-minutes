import { useState, useCallback, useMemo } from 'react';
import type { Meeting, MeetingFilters } from '@/types/meeting';

const initialMeetings: Meeting[] = [
  {
    id: "0001-2025",
    attendee: "Suldaan Yuusuf Cabdi Cawed",
    time: "7:00 AM",
    location: "Home - New Hargeysa",
    date: new Date(),
    isCompleted: false,
    description: "Strategic planning discussion for Q4 initiatives",
    priority: 'high',
    type: 'meeting',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "0002-2025",
    attendee: "Sheikh Almis Sh. Yaxye",
    time: "9:10 AM",
    location: "Gulf Star Hotel",
    date: new Date(),
    isCompleted: false,
    description: "Project review and milestone assessment",
    priority: 'medium',
    type: 'meeting',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "0003-2025",
    attendee: "Xiidhibaan Siciid Sokeeye",
    time: "11:20 AM",
    location: "WADDANI Office - New Hargeysa",
    date: new Date(),
    isCompleted: false,
    description: "Team coordination and resource allocation",
    priority: 'high',
    type: 'conference',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "0004-2025",
    attendee: "Ganacsade Xaaji Dahabashiil",
    time: "1:10 PM",
    location: "Damal Hotel",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    isCompleted: false,
    description: "Business partnership discussion",
    priority: 'high',
    type: 'meeting',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "0005-2025",
    attendee: "Agaasime Siciid Xaashi",
    time: "5:15 PM",
    location: "WADDANI Office - Shacabka",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
    isCompleted: false,
    description: "Administrative review and updates",
    priority: 'medium',
    type: 'call',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const useMeetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
  const [filters, setFilters] = useState<MeetingFilters>({
    search: '',
    status: 'all',
    priority: 'all',
    type: 'all',
  });

  const addMeeting = useCallback((meeting: Omit<Meeting, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newMeeting: Meeting = {
      ...meeting,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setMeetings(prev => [...prev, newMeeting]);
    return newMeeting;
  }, []);

  const updateMeeting = useCallback((id: string, updates: Partial<Meeting>) => {
    setMeetings(prev =>
      prev.map(meeting =>
        meeting.id === id
          ? { ...meeting, ...updates, updatedAt: new Date() }
          : meeting
      )
    );
  }, []);

  const deleteMeeting = useCallback((id: string) => {
    setMeetings(prev => prev.filter(meeting => meeting.id !== id));
  }, []);

  const toggleMeetingCompletion = useCallback((id: string) => {
    setMeetings(prev =>
      prev.map(meeting =>
        meeting.id === id
          ? { ...meeting, isCompleted: !meeting.isCompleted, updatedAt: new Date() }
          : meeting
      )
    );
  }, []);

  const filteredMeetings = useMemo(() => {
    return meetings.filter(meeting => {
      const matchesSearch = meeting.attendee.toLowerCase().includes(filters.search.toLowerCase()) ||
                           meeting.location.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = filters.status === 'all' ||
                           (filters.status === 'completed' && meeting.isCompleted) ||
                           (filters.status === 'pending' && !meeting.isCompleted);
      
      const matchesPriority = filters.priority === 'all' || meeting.priority === filters.priority;
      const matchesType = filters.type === 'all' || meeting.type === filters.type;

      return matchesSearch && matchesStatus && matchesPriority && matchesType;
    });
  }, [meetings, filters]);

  const todayMeetings = useMemo(() => {
    const today = new Date();
    return filteredMeetings.filter(meeting => {
      const meetingDate = new Date(meeting.date);
      return meetingDate.toDateString() === today.toDateString();
    });
  }, [filteredMeetings]);

  const upcomingMeetings = useMemo(() => {
    const today = new Date();
    return filteredMeetings.filter(meeting => {
      const meetingDate = new Date(meeting.date);
      return meetingDate > today;
    });
  }, [filteredMeetings]);

  return {
    meetings: filteredMeetings,
    todayMeetings,
    upcomingMeetings,
    filters,
    setFilters,
    addMeeting,
    updateMeeting,
    deleteMeeting,
    toggleMeetingCompletion,
  };
};