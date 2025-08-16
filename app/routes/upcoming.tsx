import type { MetaFunction } from "react-router";
import UpcomingMeetings from "../../src/pages/UpcomingMeetings";

export const meta: MetaFunction = () => {
  return [
    { title: "Upcoming Meetings - Meeting Management" },
    { name: "description", content: "View your upcoming meetings" },
  ];
}

export default function Upcoming() {
  return <UpcomingMeetings />;
}