import { api } from "~/lib/axios"
import type {
    AuthResponse,
    LoginInput,
    RegisterInput,
    User,
} from "../types/auth.types"
import axios from "axios"

export async function getMe(): Promise<User> {
    const response = await api.get<User>("/api/auth/me")

    return response.data
}

export async function login(data: LoginInput) {
    try {
        const response = await api.post("/api/auth/login", data)

        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ??
                    "Não foi possível realizar o login."
            )
        }

        throw new Error("Ocorreu um erro inesperado.")
    }
}
export async function register(data: RegisterInput): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/api/auth/register", data)

    return response.data
}

export async function logout(): Promise<void> {
    await api.post("/api/auth/logout")
}
