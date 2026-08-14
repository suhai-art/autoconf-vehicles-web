import {
    type RouteConfig,
    index,
    route,
    layout,
} from "@react-router/dev/routes"

export default [
    layout("routes/_protected.tsx", [index("routes/home.tsx")]),
    layout("routes/_public.tsx", [
        route("login", "routes/login.tsx"),
        route("register", "routes/register.tsx"),
    ]),
] satisfies RouteConfig
