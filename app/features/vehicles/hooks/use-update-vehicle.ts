import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateVehicle } from "../api/vehicle.api"
import { vehicleKeys } from "../api/vehicle.keys"
import type { UpdateVehicleInput } from "../types/vehicle.types"

type UpdateVehicleVariables = {
    id: number
    data: UpdateVehicleInput
}

export function useUpdateVehicle() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: UpdateVehicleVariables) =>
            updateVehicle(id, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: vehicleKeys.lists(),
            })

            queryClient.invalidateQueries({
                queryKey: vehicleKeys.detail(variables.id),
            })
        },
    })
}
