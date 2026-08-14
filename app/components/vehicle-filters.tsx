"use client"

import { Search, X } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

export type VehicleTableFilters = {
    q: string
    marca: string
    modelo: string
    placa: string
}

export const emptyFilters: VehicleTableFilters = {
    q: "",
    marca: "",
    modelo: "",
    placa: "",
}

type VehicleFiltersProps = {
    filters: VehicleTableFilters
    onChange: (filters: VehicleTableFilters) => void
}

export function VehicleFilters({ filters, onChange }: VehicleFiltersProps) {
    const hasActiveFilters = Object.values(filters).some(
        (value) => value.trim() !== ""
    )

    function setField(field: keyof VehicleTableFilters, value: string) {
        onChange({ ...filters, [field]: value })
    }

    return (
        <div className="flex flex-col gap-4 rounded-lg border p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-1.5 lg:col-span-4 xl:col-span-1">
                    <Label htmlFor="filter-q">Busca geral</Label>
                    <div className="relative">
                        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="filter-q"
                            value={filters.q}
                            onChange={(e) => setField("q", e.target.value)}
                            placeholder="Marca, modelo, placa..."
                            className="pl-9"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="filter-marca">Marca</Label>
                    <Input
                        id="filter-marca"
                        value={filters.marca}
                        onChange={(e) => setField("marca", e.target.value)}
                        placeholder="Ex.: Toyota"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="filter-modelo">Modelo</Label>
                    <Input
                        id="filter-modelo"
                        value={filters.modelo}
                        onChange={(e) => setField("modelo", e.target.value)}
                        placeholder="Ex.: Corolla"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="filter-placa">Placa</Label>
                    <Input
                        id="filter-placa"
                        value={filters.placa}
                        onChange={(e) => setField("placa", e.target.value)}
                        placeholder="ABC-1D23"
                        className="uppercase"
                    />
                </div>
            </div>
        </div>
    )
}
