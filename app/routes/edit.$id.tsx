import type { Route } from "./+types/edit.$id";
import EditMeeting from "../../src/pages/EditMeeting";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Edit Meeting - Meeting Management" },
    { name: "description", content: "Edit meeting details" },
  ];
}

export default function Edit() {
  return <EditMeeting />;
}