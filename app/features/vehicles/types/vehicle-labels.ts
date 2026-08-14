import { VehicleCambio } from "../types/vehicle-cambio.enum.types"
import { VehicleCombustivel } from "../types/vehicle-combustivel.enum.types"

export const cambioLabels: Record<string, string> = {
    [VehicleCambio.MANUAL]: "Manual",
    [VehicleCambio.AUTOMATICO]: "Automático",
}

export const combustivelLabels: Record<string, string> = {
    [VehicleCombustivel.GASOLINA]: "Gasolina",
    [VehicleCombustivel.ALCOOL]: "Álcool",
    [VehicleCombustivel.FLEX]: "Flex",
    [VehicleCombustivel.DIESEL]: "Diesel",
    [VehicleCombustivel.HIBRIDO]: "Híbrido",
    [VehicleCombustivel.ELETRICO]: "Elétrico",
}

export const cambioOptions = Object.values(VehicleCambio).map((value) => ({
    value,
    label: cambioLabels[value] ?? value,
}))

export const combustivelOptions = Object.values(VehicleCombustivel).map(
    (value) => ({
        value,
        label: combustivelLabels[value] ?? value,
    })
)

export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
})

export const kmFormatter = new Intl.NumberFormat("pt-BR")
