import { useMutation, useQueryClient } from "@tanstack/react-query"

import { uploadVehicleImages } from "../api/vehicle.api"
import { vehicleKeys } from "../api/vehicle.keys"

export function useUploadVehicleImages(vehicleId: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (files: File[]) => uploadVehicleImages(vehicleId, files),

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
