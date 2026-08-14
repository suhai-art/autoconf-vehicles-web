import { useMatch } from "react-router"

interface VehiclePageRouteResult {
    isCreate: boolean
    id: number
}

export function useVehiclePageRoute(): VehiclePageRouteResult {
    const createMatch = useMatch("/vehicles/new")
    const viewMatch = useMatch("/vehicles/:id")

    if (!createMatch && viewMatch) {
        return { isCreate: false, id: Number(viewMatch.params.id) }
    }

    return { isCreate: true, id: NaN }
}
