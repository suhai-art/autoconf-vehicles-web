import { Outlet, redirect } from "react-router"

export async function loader() {
    // TODO: Fazer req. para CRSF-COOKIES
    // TODO: Fazer req. /me

    const authenticated = false

    if (!authenticated) {
        throw redirect("/login")
    }

    return null
}

export default function ProtectedLayour() {
    return <Outlet />
}
