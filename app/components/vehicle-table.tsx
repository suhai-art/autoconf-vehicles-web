"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Eye, ImageOff, Trash2 } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { Alert } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { Spinner } from "~/components/ui/spinner"
import {
    VehicleFilters,
    emptyFilters,
    type VehicleTableFilters,
} from "~/components/vehicle-filters"
import { useVehicles } from "~/features/vehicles"
import type { Vehicle } from "~/features/vehicles/types/vehicle.types"
import type { VehicleImage } from "~/features/vehicles/types/vehicle-image.types"

const PER_PAGE = 10

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
})

const kmFormatter = new Intl.NumberFormat("pt-BR")

const cambioLabels: Record<string, string> = {
    manual: "Manual",
    automatico: "Automático",
}

const combustivelLabels: Record<string, string> = {
    gasolina: "Gasolina",
    alcool: "Álcool",
    flex: "Flex",
    diesel: "Diesel",
    hibrido: "Híbrido",
    eletrico: "Elétrico",
}

function getCoverImage(images: VehicleImage[]): VehicleImage | undefined {
    return images?.find((image) => image.is_cover === true)
}

function VehicleCover({ vehicle }: { vehicle: Vehicle }) {
    const cover = getCoverImage(vehicle.images ?? [])

    if (!cover) {
        return (
            <div className="flex size-16 items-center justify-center rounded-md border bg-muted text-muted-foreground">
                <ImageOff className="size-5" />
                <span className="sr-only">Sem imagem de capa</span>
            </div>
        )
    }

    return (
        <img
            src={cover.url || "https://placehold.co/600x400?text=Image"}
            alt={`Capa do veículo ${vehicle.marca} ${vehicle.modelo}`}
            className="size-16 rounded-md border object-cover"
            crossOrigin="anonymous"
            loading="lazy"
        />
    )
}

function useDebouncedValue<T>(value: T, delay = 400): T {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debounced
}

export function VehicleTable() {
    const [filters, setFilters] = useState<VehicleTableFilters>(emptyFilters)
    const [page, setPage] = useState(1)

    const debouncedFilters = useDebouncedValue(filters)

    useEffect(() => {
        setPage(1)
    }, [debouncedFilters])

    const queryFilters = useMemo(
        () => ({
            q: debouncedFilters.q.trim() || undefined,
            marca: debouncedFilters.marca.trim() || undefined,
            modelo: debouncedFilters.modelo.trim() || undefined,
            placa: debouncedFilters.placa.trim() || undefined,
            page,
            per_page: 5,
        }),
        [debouncedFilters, page]
    )

    const { data, isLoading, isError, error, isFetching } =
        useVehicles(queryFilters)

    const vehicles = data?.data ?? []
    const total = data?.meta.total ?? 0
    const lastPage = data?.meta.last_page ?? 1
    const currentPage = data?.meta.current_page ?? page

    return (
        <div className="flex w-full flex-col gap-2">
            <VehicleFilters filters={filters} onChange={setFilters} />

            {isError ? (
                <Alert variant="destructive">
                    {error?.message ?? "Não foi possível carregar os veículos."}
                </Alert>
            ) : (
                <>
                    <div className="relative w-full overflow-x-auto rounded-lg border">
                        {isFetching ? (
                            <div className="absolute inset-x-0 top-0 flex justify-center py-2">
                                <Spinner className="text-muted-foreground" />
                            </div>
                        ) : null}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Capa</TableHead>
                                    <TableHead>Marca</TableHead>
                                    <TableHead>Modelo</TableHead>
                                    <TableHead>Placa</TableHead>
                                    <TableHead>Chassi</TableHead>
                                    <TableHead>Cor</TableHead>
                                    <TableHead className="text-right">
                                        KM
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Valor de venda
                                    </TableHead>
                                    <TableHead>Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={11}
                                            className="h-24 text-center text-muted-foreground"
                                        >
                                            <span className="inline-flex items-center gap-2">
                                                <Spinner /> Carregando
                                                veículos...
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ) : vehicles.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={11}
                                            className="h-24 text-center text-muted-foreground"
                                        >
                                            Nenhum veículo encontrado.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    vehicles.map((vehicle) => (
                                        <TableRow key={vehicle.id}>
                                            <TableCell>
                                                <VehicleCover
                                                    vehicle={vehicle}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {vehicle.marca}
                                            </TableCell>
                                            <TableCell>
                                                {vehicle.modelo}
                                            </TableCell>
                                            <TableCell className="uppercase">
                                                {vehicle.placa}
                                            </TableCell>
                                            <TableCell className="font-mono text-xs text-muted-foreground">
                                                {vehicle.chassi}
                                            </TableCell>
                                            <TableCell>{vehicle.cor}</TableCell>
                                            <TableCell className="text-right tabular-nums">
                                                {kmFormatter.format(vehicle.km)}{" "}
                                                km
                                            </TableCell>
                                            <TableCell className="text-right font-medium tabular-nums">
                                                {currencyFormatter.format(
                                                    vehicle.valor_venda
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost">
                                                    <Eye />
                                                </Button>
                                                <Button
                                                    disabled={
                                                        !vehicle.is_delete
                                                    }
                                                    variant={
                                                        !vehicle.is_delete
                                                            ? "secondary"
                                                            : "ghost"
                                                    }
                                                >
                                                    <Trash2 className="text-destructive" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-sm text-muted-foreground">
                            {total > 0
                                ? `${total} veículo(s) encontrado(s) · Página ${currentPage} de ${lastPage}`
                                : "Nenhum resultado"}
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setPage((prev) => Math.max(1, prev - 1))
                                }
                                disabled={currentPage <= 1 || isFetching}
                            >
                                <ChevronLeft />
                                Anterior
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setPage((prev) =>
                                        Math.min(lastPage, prev + 1)
                                    )
                                }
                                disabled={currentPage >= lastPage || isFetching}
                            >
                                Próxima
                                <ChevronRight />
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
