import type { Route } from "./+types/meeting.$id";
import MeetingDetailsPage from "../../src/pages/MeetingDetails";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meeting Details - Meeting Management" },
    { name: "description", content: "View meeting details" },
  ];
}

export default function MeetingDetails() {
  return <MeetingDetailsPage />;
}