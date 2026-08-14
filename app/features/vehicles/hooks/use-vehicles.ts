import { useQuery } from "@tanstack/react-query"

import { getVehicles } from "../api/vehicle.api"
import { vehicleKeys } from "../api/vehicle.keys"
import type { VehicleFilters } from "../types/vehicle.types"

export function useVehicles(filters?: VehicleFilters) {
    return useQuery({
        queryKey: vehicleKeys.list(filters ?? {}),
        queryFn: () => getVehicles(filters),
    })
}
