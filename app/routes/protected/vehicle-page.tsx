import { useState } from "react"
import { useNavigate } from "react-router"

import { Alert } from "~/components/ui/alert"
import { Spinner } from "~/components/ui/spinner"
import { VehicleForm } from "~/components/vehicle-form"
import { VehicleDetail } from "~/components/vehicle-detail"
import { VehicleGallery } from "~/components/vehicle-gallery"

import {
    useCreateVehicle,
    useUpdateVehicle,
    useVehicle,
} from "~/features/vehicles"
import { useVehiclePageRoute } from "~/features/vehicles/hooks/use-vehicle-page-mode"
import type { CreateVehicleInput } from "~/features/vehicles/types/vehicle.types"
import { ArrowLeft, Pencil, X } from "lucide-react"
import { Button } from "~/components/ui/button"

interface VehiclePageHeaderProps {
    title: string
    subtitle: string
    isEditing: boolean
    canToggleEdit: boolean
    onBack: () => void
    onToggleEdit: () => void
}

function VehiclePageHeader({
    title,
    subtitle,
    isEditing,
    canToggleEdit,
    onBack,
    onToggleEdit,
}: VehiclePageHeaderProps) {
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onBack}
                    aria-label="Voltar"
                >
                    <ArrowLeft className="size-4" />
                </Button>
                <div>
                    <h1 className="text-xl font-semibold">{title}</h1>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                </div>
            </div>

            {canToggleEdit && (
                <Button
                    variant={isEditing ? "outline" : "default"}
                    onClick={onToggleEdit}
                >
                    {isEditing ? (
                        <>
                            <X className="size-4" />
                            Cancelar edição
                        </>
                    ) : (
                        <>
                            <Pencil className="size-4" />
                            Editar
                        </>
                    )}
                </Button>
            )}
        </div>
    )
}
export const VEHICLE_PAGE_TEXTS = {
    create: {
        title: "Novo veículo",
        subtitle: "Preencha os dados para cadastrar um novo veículo.",
    },
    view: {
        title: "Detalhes do veículo",
        subtitle: "Visualize as informações do veículo.",
    },
    edit: {
        title: "Editar veículo",
        subtitle: "Atualize os dados do veículo.",
    },
} as const

export default function VehiclePage() {
    const navigate = useNavigate()
    const { isCreate, id } = useVehiclePageRoute()
    const [isEditing, setIsEditing] = useState(false)

    const { data: vehicle, isLoading, isError, error } = useVehicle(id)

    const create = useCreateVehicle()
    const update = useUpdateVehicle()

    const mutation = isEditing ? update : create
    const texts = getVehiclePageTexts(isCreate, isEditing)

    async function handleSubmit(data: CreateVehicleInput) {
        if (isCreate) {
            const created = await create.mutateAsync(data)
            navigate(`/vehicles/${created.id}`)
            return
        }

        await update.mutateAsync({ id, data })
        setIsEditing(false)
    }

    function handleBack() {
        navigate(isCreate ? "/" : "/")
    }

    function handleToggleEdit() {
        setIsEditing((current) => !current)
    }

    function handleCancelEdit() {
        setIsEditing(false)
    }

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
            <VehiclePageHeader
                title={texts.title}
                subtitle={texts.subtitle}
                isEditing={isEditing}
                canToggleEdit={!isCreate && Boolean(vehicle)}
                onBack={handleBack}
                onToggleEdit={handleToggleEdit}
            />

            {!isCreate && isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Spinner /> Carregando veículo...
                </div>
            )}

            {!isCreate && !isLoading && (isError || !vehicle) && (
                <Alert variant="destructive">
                    {error?.message ?? "Veículo não encontrado."}
                </Alert>
            )}

            {!isCreate && vehicle && !isEditing && (
                <>
                    <VehicleDetail vehicle={vehicle} />

                    <VehicleGallery
                        vehicleId={vehicle.id}
                        images={vehicle.images ?? []}
                        vehicleName={`${vehicle.marca} ${vehicle.modelo}`}
                    />
                </>
            )}

            {(isCreate || (vehicle && isEditing)) && (
                <VehicleForm
                    defaultValues={isCreate ? undefined : vehicle}
                    onSubmit={handleSubmit}
                    isPending={mutation.isPending}
                    isError={mutation.isError}
                    error={mutation.error as Error | null}
                    submitLabel={
                        isCreate ? "Cadastrar veículo" : "Salvar alterações"
                    }
                    pendingLabel={isCreate ? "Cadastrando" : "Salvando"}
                    onCancel={isCreate ? handleBack : handleCancelEdit}
                />
            )}
        </div>
    )
}

function getVehiclePageTexts(isCreate: boolean, isEditing: boolean) {
    if (isCreate) {
        return VEHICLE_PAGE_TEXTS.create
    }

    return isEditing ? VEHICLE_PAGE_TEXTS.edit : VEHICLE_PAGE_TEXTS.view
}
