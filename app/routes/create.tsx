import type { Route } from "./+types/create";
import CreateMeeting from "../../src/pages/CreatingMeeting";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create Meeting - Meeting Management" },
    { name: "description", content: "Create a new meeting" },
  ];
}

export default function Create() {
  return <CreateMeeting />;
}