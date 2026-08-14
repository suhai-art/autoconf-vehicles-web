import {
    type RouteConfig,
    index,
    route,
    layout,
} from "@react-router/dev/routes"

export default [
    layout("routes/_protected.tsx", [index("routes/protected/home.tsx")]),
    layout("routes/_public.tsx", [
        route("login", "routes/public/login.tsx"),
        route("register", "routes/public/register.tsx"),
    ]),
] satisfies RouteConfig
