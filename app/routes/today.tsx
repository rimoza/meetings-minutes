import type { MetaFunction } from "react-router";
import TodayMeetings from "../../src/pages/TodayMeetings";

export const meta: MetaFunction = () => {
  return [
    { title: "Today's Meetings - Meeting Management" },
    { name: "description", content: "View today's scheduled meetings" },
  ];
}

export default function Today() {
  return <TodayMeetings />;
}