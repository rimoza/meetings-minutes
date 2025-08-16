import type { Route } from "./+types/upcoming";
import UpcomingMeetings from "../../src/pages/UpcomingMeetings";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Upcoming Meetings - Meeting Management" },
    { name: "description", content: "View your upcoming meetings" },
  ];
}

export default function Upcoming() {
  return <UpcomingMeetings />;
}