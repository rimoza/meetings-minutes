import type { Route } from "./+types/login";
import Login from "../../src/pages/Login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - Meeting Management" },
    { name: "description", content: "Login to your account" },
  ];
}

export default function LoginPage() {
  return <Login />;
}