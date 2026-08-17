import { api } from "~/lib/axios"
import type {
    CreateVehicleInput,
    PaginatedResponse,
    UpdateVehicleInput,
    Vehicle,
    VehicleFilters,
} from "../types/vehicle.types"
import type { VehicleImage } from "../types/vehicle-image.types"
import axios from "axios"

function buildParams(
    filters?: VehicleFilters
): Record<string, string | number> {
    if (!filters) return {}

    return Object.fromEntries(
        Object.entries(filters).filter(
            ([, value]) => value !== undefined && value !== null && value !== ""
        )
    ) as Record<string, string | number>
}

export async function getVehicles(
    filters?: VehicleFilters
): Promise<PaginatedResponse<Vehicle>> {
    try {
        const response = await api.get<PaginatedResponse<Vehicle>>(
            "/api/vehicles",
            { params: buildParams(filters) }
        )
        const payload = response.data

        return payload
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ??
                    "Não foi possível realizar a busca."
            )
        }

        throw new Error("Ocorreu um erro inesperado.")
    }
}

export async function getVehicle(id: number): Promise<Vehicle> {
    try {
        const response = await api.get<Vehicle>(`/api/vehicles/${id}`)
        return response.data.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ??
                    "Não foi possível realizar a busca."
            )
        }

        throw new Error("Ocorreu um erro inesperado.")
    }
}

export async function createVehicle(
    data: CreateVehicleInput
): Promise<Vehicle> {
    try {
        const response = await api.post<Vehicle>("/api/vehicles", data)
        return response.data.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ??
                    "Não foi possível realizar criar o veiculo."
            )
        }

        throw new Error("Ocorreu um erro inesperado.")
    }
}

export async function updateVehicle(
    id: number,
    data: UpdateVehicleInput
): Promise<Vehicle> {
    try {
        const response = await api.put<Vehicle>(`/api/vehicles/${id}`, data)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ??
                    "Não foi possível atualizar o veiculo."
            )
        }

        throw new Error("Ocorreu um erro inesperado.")
    }
}

export async function deleteVehicle(id: number): Promise<void> {
    try {
        await api.delete(`/api/vehicles/${id}`)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ??
                    "Não foi possível deletar o veiculo."
            )
        }

        throw new Error("Ocorreu um erro inesperado.")
    }
}

export async function uploadVehicleImages(
    vehicleId: number,
    files: File[]
): Promise<VehicleImage[]> {
    try {
        const formData = new FormData()

        files.forEach((file) => {
            formData.append("files[]", file)
        })

        const response = await api.post<{ data?: VehicleImage[] }>(
            `/api/vehicles/${vehicleId}/images`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )

        return response.data?.data ?? []
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ??
                    "Não foi possível enviar as imagens."
            )
        }

        throw new Error("Ocorreu um erro inesperado.")
    }
}

export async function deleteVehicleImage(
    vehicleId: number,
    imageId: number
): Promise<void> {
    try {
        await api.delete(`/api/vehicles/${vehicleId}/images/${imageId}`)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ??
                    "Não foi possível remover a imagem."
            )
        }

        throw new Error("Ocorreu um erro inesperado.")
    }
}

export async function setVehicleImageCover(
    vehicleId: number,
    imageId: number
): Promise<void> {
    try {
        await api.patch(`/api/vehicles/${vehicleId}/images/${imageId}/cover`)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ??
                    "Não foi possível definir a imagem de capa."
            )
        }

        throw new Error("Ocorreu um erro inesperado.")
    }
}
