import type { VehicleCambio } from "./vehicle-cambio.enum.types"
import type { VehicleCombustivel } from "./vehicle-combustivel.enum.types"
import type { VehicleImage } from "./vehicle-image.types"

export type Vehicle = {
    id: number
    placa: string
    chassi: string
    marca: string
    modelo: string
    versao: string
    valor_venda: number
    cor: string
    km: number
    cambio: VehicleCambio
    combustivel: VehicleCombustivel
    images: VehicleImage[]
    created_at: string
    updated_at: string
}

export type CreateVehicleInput = {
    placa: string
    chassi: string
    marca: string
    modelo: string
    versao: string
    valor_venda: number
    cor: string
    km: number
    cambio: Vehicle["cambio"]
    combustivel: Vehicle["combustivel"]
}

export type UpdateVehicleInput = Partial<CreateVehicleInput>

export type VehicleFilters = {
    q?: string
    marca?: string
    modelo?: string
    placa?: string
    sort?: string
    page?: number
    per_page?: number
}

export type PaginatedResponse<T> = {
    data: T[]
    current_page: number
    last_page: number
    per_page: number
    total: number
}
