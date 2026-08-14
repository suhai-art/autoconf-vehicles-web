import { useMutation, useQueryClient } from "@tanstack/react-query"

import { setVehicleImageCover } from "../api/vehicle.api"
import { vehicleKeys } from "../api/vehicle.keys"

export function useSetVehicleImageCover(vehicleId: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (imageId: number) =>
            setVehicleImageCover(vehicleId, imageId),

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
