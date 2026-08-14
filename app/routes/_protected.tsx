import { Outlet, redirect } from "react-router"
import { getMe } from "~/features/auth"

export async function loader() {
    try {
        await getMe()

        return null
    } catch {
        throw redirect("/login")
    }
}

export default function ProtectedLayout() {
    return <Outlet />
}
