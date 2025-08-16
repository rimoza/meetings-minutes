import type { MetaFunction } from "react-router";
import Login from "../../src/pages/Login";

export const meta: MetaFunction = () => {
  return [
    { title: "Login - Meeting Management" },
    { name: "description", content: "Login to your account" },
  ];
}

export default function LoginPage() {
  return <Login />;
}