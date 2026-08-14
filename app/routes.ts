import {
    type RouteConfig,
    index,
    route,
    layout,
} from "@react-router/dev/routes"

export default [
    layout("routes/_protected.tsx", [
        index("routes/protected/home.tsx"),
        route("/vehicles/new", "routes/protected/vehicle-page.tsx"),
        route("/vehicles/:id", "routes/protected/vehicle-page.tsx"),
    ]),
    layout("routes/_public.tsx", [
        route("login", "routes/public/login.tsx"),
        route("register", "routes/public/register.tsx"),
    ]),
] satisfies RouteConfig
