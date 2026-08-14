import { redirect, Outlet } from "react-router"
import { getMe } from "~/features/auth"

export async function loader() {
    try {
        await getMe()

        throw redirect("/")
    } catch (error) {
        if (error instanceof Response) {
            throw error
        }

        return null
    }
}

export default function PublicLayout() {
    return <Outlet />
}
