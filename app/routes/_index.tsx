import type { MetaFunction } from "react-router";
import Dashboard from "../../src/pages/Dashboard";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard - Meeting Management" },
    { name: "description", content: "View your meeting dashboard" },
  ];
}

export default function Index() {
  return <Dashboard />;
}