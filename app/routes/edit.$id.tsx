import type { MetaFunction } from "react-router";
import EditMeeting from "../../src/pages/EditMeeting";

export const meta: MetaFunction = () => {
  return [
    { title: "Edit Meeting - Meeting Management" },
    { name: "description", content: "Edit meeting details" },
  ];
}

export default function Edit() {
  return <EditMeeting />;
}