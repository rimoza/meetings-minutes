import type { Route } from "./+types/home";
import { Navigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meeting Management App" },
    { name: "description", content: "Manage your meetings efficiently" },
  ];
}

export default function Home() {
  return <Navigate to="/" replace />;
}
