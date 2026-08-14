import { Navigate, Outlet } from "react-router"
import { useAuth } from "~/features/auth"

export default function PublicLayout() {
    const { data: user, isLoading } = useAuth()

    if (isLoading) {
        return <div>Carregando...</div>
    }

    if (user) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}
