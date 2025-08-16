import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/_index.tsx"),
    route("today", "routes/today.tsx"),
    route("upcoming", "routes/upcoming.tsx"),
    route("create", "routes/create.tsx"),
    route("meeting/:id", "routes/meeting.$id.tsx"),
    route("edit/:id", "routes/edit.$id.tsx"),
  ]),
  route("login", "routes/login.tsx"),
] satisfies RouteConfig;
