import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteVehicle } from "../api/vehicle.api"
import { vehicleKeys } from "../api/vehicle.keys"

export function useDeleteVehicle() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => deleteVehicle(id),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: vehicleKeys.lists(),
            })

            queryClient.removeQueries({
                queryKey: vehicleKeys.detail(id),
            })
        },
    })
}
