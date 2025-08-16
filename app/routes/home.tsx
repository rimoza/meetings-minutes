import type { Route } from "./+types/home";
import App from "../../src/App";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meeting Management App" },
    { name: "description", content: "Manage your meetings efficiently" },
  ];
}

export default function Home() {
  return <App />;
}
