import { useQuery } from "@tanstack/react-query"

import { getVehicle } from "../api/vehicle.api"
import { vehicleKeys } from "../api/vehicle.keys"

export function useVehicle(id: number) {
    return useQuery({
        queryKey: vehicleKeys.detail(id),
        queryFn: () => getVehicle(id),
        enabled: !!id,
    })
}
