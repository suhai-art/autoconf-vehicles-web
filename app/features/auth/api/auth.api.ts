import { api } from "~/lib/axios"
import type {
    AuthResponse,
    LoginInput,
    RegisterInput,
    User,
} from "../types/auth.types"

export async function getMe(): Promise<User> {
    const response = await api.get<User>("/api/auth/me")

    return response.data
}

export async function login(data: LoginInput): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/api/auth/login", data)

    return response.data
}

export async function register(data: RegisterInput): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/api/auth/register", data)

    return response.data
}

export async function logout(): Promise<void> {
    await api.post("/api/auth/logout")
}
