import { Separator } from "~/components/ui/separator"

import {
    cambioLabels,
    combustivelLabels,
    currencyFormatter,
    kmFormatter,
} from "~/features/vehicles/types/vehicle-labels"
import type { Vehicle } from "~/features/vehicles/types/vehicle.types"

type VehicleDetailProps = {
    vehicle: Vehicle
}

type DetailItemProps = {
    label: string
    value: React.ReactNode
    mono?: boolean
}

function DetailItem({ label, value, mono = false }: DetailItemProps) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {label}
            </span>

            <span
                className={
                    mono
                        ? "font-mono text-sm text-foreground"
                        : "text-sm text-foreground"
                }
            >
                {value}
            </span>
        </div>
    )
}

export function VehicleDetail({ vehicle }: VehicleDetailProps) {
    console.log(vehicle)

    const cover =
        vehicle.images?.find((image) => image.is_cover) ?? vehicle.images?.[0]

    return (
        <div className="flex flex-col gap-6 rounded-xl border bg-card p-6 text-card-foreground">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold text-balance">
                        {vehicle.marca} {vehicle.modelo}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        {vehicle.versao}
                    </p>
                </div>

                <div className="flex flex-col sm:items-end">
                    <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        Valor de venda
                    </span>

                    <span className="text-2xl font-semibold text-primary">
                        {currencyFormatter.format(vehicle.valor_venda)}
                    </span>
                </div>
            </div>

            {cover && (
                <img
                    src={cover.url || "/placeholder.svg"}
                    alt={`Foto do veículo ${vehicle.marca} ${vehicle.modelo}`}
                    crossOrigin="anonymous"
                    className="aspect-video w-full rounded-lg border object-cover"
                />
            )}

            <Separator />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <DetailItem label="Placa" value={vehicle.placa} mono />

                <DetailItem label="Chassi" value={vehicle.chassi} mono />

                <DetailItem label="Cor" value={vehicle.cor} />

                <DetailItem
                    label="Quilometragem"
                    value={`${kmFormatter.format(vehicle.km)} km`}
                />

                <DetailItem
                    label="Câmbio"
                    value={cambioLabels[vehicle.cambio] ?? vehicle.cambio}
                />

                <DetailItem
                    label="Combustível"
                    value={
                        combustivelLabels[vehicle.combustivel] ??
                        vehicle.combustivel
                    }
                />
            </div>

            {vehicle.images?.length > 1 && (
                <>
                    <Separator />

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {vehicle.images.map((image) => (
                            <img
                                key={image.id}
                                src={image.url || "/placeholder.svg"}
                                alt={`Foto do veículo ${vehicle.marca} ${vehicle.modelo}`}
                                crossOrigin="anonymous"
                                className="aspect-square w-full rounded-md border object-cover"
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
