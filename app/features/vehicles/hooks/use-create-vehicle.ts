import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createVehicle } from "../api/vehicle.api"
import { vehicleKeys } from "../api/vehicle.keys"
import type { CreateVehicleInput } from "../types/vehicle.types"

export function useCreateVehicle() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateVehicleInput) => createVehicle(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: vehicleKeys.lists(),
            })
        },
    })
}
