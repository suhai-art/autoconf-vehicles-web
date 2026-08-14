import type { VehicleFilters } from "../types/vehicle.types"

export const vehicleKeys = {
    all: ["vehicles"] as const,

    lists: () => [...vehicleKeys.all, "list"] as const,

    list: (filters: VehicleFilters) =>
        [...vehicleKeys.lists(), filters] as const,

    details: () => [...vehicleKeys.all, "detail"] as const,

    detail: (id: number) => [...vehicleKeys.details(), id] as const,
}
