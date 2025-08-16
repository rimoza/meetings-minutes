import type { MetaFunction } from "react-router";
import CreateMeeting from "../../src/pages/CreatingMeeting";

export const meta: MetaFunction = () => {
  return [
    { title: "Create Meeting - Meeting Management" },
    { name: "description", content: "Create a new meeting" },
  ];
}

export default function Create() {
  return <CreateMeeting />;
}