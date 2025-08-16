import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, FileText } from "lucide-react";
import { useMeetings } from "@/hooks/use-meetings";
import { toast } from "sonner";
import type { Meeting } from "@/types/meeting";

const EditMeeting = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { meetings, updateMeeting } = useMeetings();

  const meeting = meetings.find(m => m.id === id);

  const [formData, setFormData] = useState({
    attendee: "",
    time: "",
    location: "",
    date: "",
    description: "",
    priority: "medium" as Meeting['priority'],
    type: "meeting" as Meeting['type'],
  });

  useEffect(() => {
    if (meeting) {
      setFormData({
        attendee: meeting.attendee,
        time: meeting.time,
        location: meeting.location,
        date: meeting.date.toISOString().split('T')[0],
        description: meeting.description || "",
        priority: meeting.priority,
        type: meeting.type,
      });
    }
  }, [meeting]);

  if (!meeting) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-6">
          <div className="text-center space-y-4">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
            <h2 className="text-xl font-semibold">Meeting Not Found</h2>
            <p className="text-muted-foreground">
              The meeting you're trying to edit doesn't exist.
            </p>
            <Button onClick={() => navigate("/")} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.attendee || !formData.time || !formData.location || !formData.date) {
      toast.error("Missing fields", {
        description: "Please fill in all required fields.",
      });
      return;
    }

    updateMeeting(meeting.id, {
      ...formData,
      date: new Date(formData.date),
    });

    toast.success("Meeting updated!", {
      description: `Meeting with ${formData.attendee} has been updated.`,
    });

    navigate(`/meeting/${meeting.id}`);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={() => navigate(`/meeting/${meeting.id}`)} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Details
            </Button>
            <div className="flex items-center gap-3">
              <Save className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Edit Meeting
                </h1>
                <p className="text-muted-foreground">Update meeting details</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="p-8 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="attendee">Attendee Name *</Label>
                <Input
                  id="attendee"
                  value={formData.attendee}
                  onChange={(e) => handleInputChange('attendee', e.target.value)}
                  placeholder="Enter attendee name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter meeting location"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => handleInputChange('priority', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Meeting Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Add meeting description or agenda..."
                rows={4}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1 gap-2">
                <Save className="h-4 w-4" />
                Update Meeting
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(`/meeting/${meeting.id}`)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditMeeting;