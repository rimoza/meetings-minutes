import type { Route } from "./+types/_index";
import Dashboard from "../../src/pages/Dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Meeting Management" },
    { name: "description", content: "View your meeting dashboard" },
  ];
}

export default function Index() {
  return <Dashboard />;
}