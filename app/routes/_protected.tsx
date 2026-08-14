import { Navigate, Outlet, useNavigate } from "react-router"
import { useAuth, useLogout } from "~/features/auth"
import { Button } from "~/components/ui/button"
import { LogOut } from "lucide-react"

export default function ProtectedLayout() {
    const navigate = useNavigate()
    const { data: user, isLoading } = useAuth()
    const logout = useLogout()

    if (isLoading) {
        return <div>Carregando...</div>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    async function handleLogout() {
        await logout.mutateAsync()
        navigate("/login", { replace: true })
    }

    return (
        <>
            <header className="flex h-16 shrink-0 items-center justify-between border-b px-6">
                <div className="flex items-center gap-2">
                    <img src="/logo_icon.png" alt="Logo" className="h-8 w-8" />

                    <span className="text-lg font-semibold">Autoconf</span>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleLogout}
                    disabled={logout.isPending}
                    aria-label="Sair"
                >
                    <LogOut className="size-4" />
                </Button>
            </header>

            <Outlet />
        </>
    )
}
