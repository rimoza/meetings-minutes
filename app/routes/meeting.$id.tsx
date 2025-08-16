import type { MetaFunction } from "react-router";
import MeetingDetailsPage from "../../src/pages/MeetingDetails";

export const meta: MetaFunction = () => {
  return [
    { title: "Meeting Details - Meeting Management" },
    { name: "description", content: "View meeting details" },
  ];
}

export default function MeetingDetails() {
  return <MeetingDetailsPage />;
}