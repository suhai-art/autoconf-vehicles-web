import { useRef, useState } from "react"
import { ImagePlus, Star, Trash2, Upload } from "lucide-react"

import { Alert } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { Spinner } from "~/components/ui/spinner"

import {
    useDeleteVehicleImage,
    useSetVehicleImageCover,
    useUploadVehicleImages,
} from "~/features/vehicles"
import type { VehicleImage } from "~/features/vehicles/types/vehicle-image.types"

const MAX_FILE_SIZE = 2048 * 1024 // 2048 KB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

type VehicleGalleryProps = {
    vehicleId: number
    images: VehicleImage[]
    vehicleName: string
}

function validateFiles(files: File[]): string | null {
    for (const file of files) {
        if (!file.type.startsWith("image/")) {
            return "Envie apenas arquivos de imagem."
        }

        if (ACCEPTED_TYPES.length && !ACCEPTED_TYPES.includes(file.type)) {
            return "Formato inválido. Use JPG, PNG, WEBP ou GIF."
        }

        if (file.size > MAX_FILE_SIZE) {
            return "Cada imagem deve ter no máximo 2 MB."
        }
    }

    return null
}

export function VehicleGallery({
    vehicleId,
    images,
    vehicleName,
}: VehicleGalleryProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [validationError, setValidationError] = useState<string | null>(null)

    const upload = useUploadVehicleImages(vehicleId)
    const remove = useDeleteVehicleImage(vehicleId)
    const setCover = useSetVehicleImageCover(vehicleId)

    const sortedImages = [...images].sort((a, b) => {
        if (a.is_cover === b.is_cover) return 0
        return a.is_cover ? -1 : 1
    })

    async function handleFiles(fileList: FileList | null) {
        if (!fileList || fileList.length === 0) return

        const files = Array.from(fileList)
        const error = validateFiles(files)

        if (error) {
            setValidationError(error)
            return
        }

        setValidationError(null)

        try {
            await upload.mutateAsync(files)
        } finally {
            if (inputRef.current) {
                inputRef.current.value = ""
            }
        }
    }

    const isBusy = upload.isPending || remove.isPending || setCover.isPending

    const mutationError =
        (upload.error as Error | null)?.message ??
        (remove.error as Error | null)?.message ??
        (setCover.error as Error | null)?.message ??
        null

    return (
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-6 text-card-foreground">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                    <h3 className="text-base font-semibold">
                        Galeria de imagens
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {images.length > 0
                            ? `${images.length} ${images.length === 1 ? "imagem" : "imagens"} cadastradas.`
                            : "Nenhuma imagem cadastrada ainda."}
                    </p>
                </div>

                <Button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={isBusy}
                >
                    {upload.isPending ? (
                        <>
                            <Spinner />
                            Enviando
                        </>
                    ) : (
                        <>
                            <Upload className="size-4" />
                            Adicionar imagens
                        </>
                    )}
                </Button>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(event) => handleFiles(event.target.files)}
            />

            {validationError && (
                <Alert variant="destructive">{validationError}</Alert>
            )}

            {mutationError && (
                <Alert variant="destructive">{mutationError}</Alert>
            )}

            {sortedImages.length === 0 ? (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={isBusy}
                    className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-10 text-sm text-muted-foreground transition-colors hover:bg-muted/50 disabled:pointer-events-none disabled:opacity-50"
                >
                    <ImagePlus className="size-6" />
                    <span>Clique para enviar as primeiras imagens</span>
                    <span className="text-xs">
                        JPG, PNG, WEBP ou GIF · até 2 MB cada
                    </span>
                </button>
            ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {sortedImages.map((image) => (
                        <figure
                            key={image.id}
                            className="group relative overflow-hidden rounded-lg border bg-muted"
                        >
                            <img
                                src={image.url || "/placeholder.svg"}
                                alt={`Foto do veículo ${vehicleName}`}
                                className="aspect-square w-full object-cover"
                            />

                            {image.is_cover && (
                                <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                                    <Star className="size-3 fill-current" />
                                    Capa
                                </span>
                            )}

                            <div className="absolute inset-x-0 bottom-0 flex items-center justify-end gap-1.5 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                                {!image.is_cover && (
                                    <Button
                                        type="button"
                                        size="icon-sm"
                                        variant="secondary"
                                        aria-label="Definir como capa"
                                        title="Definir como capa"
                                        disabled={isBusy}
                                        onClick={() =>
                                            setCover.mutate(image.id)
                                        }
                                    >
                                        <Star className="size-4" />
                                    </Button>
                                )}

                                <Button
                                    type="button"
                                    size="icon-sm"
                                    variant="destructive"
                                    aria-label="Remover imagem"
                                    title="Remover imagem"
                                    disabled={isBusy}
                                    onClick={() => remove.mutate(image.id)}
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </figure>
                    ))}
                </div>
            )}
        </div>
    )
}
