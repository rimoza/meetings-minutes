import type { Route } from "./+types/today";
import TodayMeetings from "../../src/pages/TodayMeetings";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Today's Meetings - Meeting Management" },
    { name: "description", content: "View today's scheduled meetings" },
  ];
}

export default function Today() {
  return <TodayMeetings />;
}