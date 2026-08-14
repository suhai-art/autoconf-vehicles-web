import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteVehicleImage } from "../api/vehicle.api"
import { vehicleKeys } from "../api/vehicle.keys"

export function useDeleteVehicleImage(vehicleId: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (imageId: number) => deleteVehicleImage(vehicleId, imageId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: vehicleKeys.detail(vehicleId),
            })

            queryClient.invalidateQueries({
                queryKey: vehicleKeys.lists(),
            })
        },
    })
}
