"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Alert } from "~/components/ui/alert"
import { Spinner } from "~/components/ui/spinner"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "~/components/ui/field"

import { VehicleCambio } from "~/features/vehicles/types/vehicle-cambio.enum.types"
import { VehicleCombustivel } from "~/features/vehicles/types/vehicle-combustivel.enum.types"
import {
    cambioOptions,
    combustivelOptions,
} from "~/features/vehicles/types/vehicle-labels"

import type { CreateVehicleInput } from "~/features/vehicles/types/vehicle.types"

const vehicleSchema = z.object({
    marca: z.string().trim().min(1, "Informe a marca"),

    modelo: z.string().trim().min(1, "Informe o modelo"),

    versao: z.string().trim().min(1, "Informe a versão"),

    placa: z
        .string()
        .trim()
        .toUpperCase()
        .regex(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, "Informe uma placa válida"),

    chassi: z
        .string()
        .trim()
        .toUpperCase()
        .length(17, "O chassi deve possuir 17 caracteres")
        .regex(/^[A-HJ-NPR-Z0-9]{17}$/, "Informe um chassi válido"),

    cor: z.string().trim().min(1, "Informe a cor"),

    km: z
        .number({
            error: "Informe o KM",
        })
        .int("O KM deve ser um número inteiro")
        .min(0, "KM inválido"),

    valor_venda: z
        .number({
            error: "Informe o valor",
        })
        .min(0.01, "O valor deve ser maior que zero"),

    cambio: z.nativeEnum(VehicleCambio),

    combustivel: z.nativeEnum(VehicleCombustivel),
})

export type VehicleFormData = z.infer<typeof vehicleSchema>

const selectClassName =
    "h-9 w-full min-w-0 appearance-none rounded-3xl border border-transparent bg-input/50 px-3 py-1 text-base outline-none transition-[color,box-shadow,background-color] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"

type VehicleFormProps = {
    defaultValues?: Partial<CreateVehicleInput>
    onSubmit: (data: VehicleFormData) => Promise<void>
    isPending: boolean
    isError?: boolean
    error?: Error | null
    submitLabel: string
    pendingLabel: string
    onCancel?: () => void
}

export function VehicleForm({
    defaultValues,
    onSubmit,
    isPending,
    isError = false,
    error,
    submitLabel,
    pendingLabel,
    onCancel,
}: VehicleFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VehicleFormData>({
        resolver: zodResolver(vehicleSchema),

        defaultValues: {
            marca: defaultValues?.marca ?? "",
            modelo: defaultValues?.modelo ?? "",
            versao: defaultValues?.versao ?? "",
            placa: defaultValues?.placa ?? "",
            chassi: defaultValues?.chassi ?? "",
            cor: defaultValues?.cor ?? "",
            km: defaultValues?.km ?? 0,
            valor_venda: defaultValues?.valor_venda ?? 0,
            cambio: defaultValues?.cambio ?? VehicleCambio.MANUAL,
            combustivel: defaultValues?.combustivel ?? VehicleCombustivel.FLEX,
        },
    })

    async function submit(data: VehicleFormData) {
        await onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit(submit)} noValidate>
            <FieldGroup>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor="marca">Marca</FieldLabel>
                        <Input
                            id="marca"
                            placeholder="Ex.: Toyota"
                            {...register("marca")}
                        />
                        {errors.marca && (
                            <FieldDescription className="text-destructive">
                                {errors.marca.message}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="modelo">Modelo</FieldLabel>
                        <Input
                            id="modelo"
                            placeholder="Ex.: Corolla"
                            {...register("modelo")}
                        />
                        {errors.modelo && (
                            <FieldDescription className="text-destructive">
                                {errors.modelo.message}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="versao">Versão</FieldLabel>
                        <Input
                            id="versao"
                            placeholder="Ex.: XEi 2.0"
                            {...register("versao")}
                        />
                        {errors.versao && (
                            <FieldDescription className="text-destructive">
                                {errors.versao.message}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="cor">Cor</FieldLabel>
                        <Input
                            id="cor"
                            placeholder="Ex.: Prata"
                            {...register("cor")}
                        />
                        {errors.cor && (
                            <FieldDescription className="text-destructive">
                                {errors.cor.message}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="placa">Placa</FieldLabel>
                        <Input
                            id="placa"
                            placeholder="ABC1D23"
                            maxLength={7}
                            className="uppercase"
                            {...register("placa")}
                        />
                        {errors.placa && (
                            <FieldDescription className="text-destructive">
                                {errors.placa.message}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="chassi">Chassi</FieldLabel>
                        <Input
                            id="chassi"
                            placeholder="9BWZZZ377VT004251"
                            maxLength={17}
                            className="uppercase"
                            {...register("chassi")}
                        />
                        {errors.chassi && (
                            <FieldDescription className="text-destructive">
                                {errors.chassi.message}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="km">KM</FieldLabel>
                        <Input
                            id="km"
                            type="number"
                            min={0}
                            step={1}
                            placeholder="0"
                            {...register("km", {
                                valueAsNumber: true,
                            })}
                        />
                        {errors.km && (
                            <FieldDescription className="text-destructive">
                                {errors.km.message}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="valor_venda">
                            Valor de venda (R$)
                        </FieldLabel>

                        <Input
                            id="valor_venda"
                            type="number"
                            min={0}
                            step="0.01"
                            placeholder="0,00"
                            {...register("valor_venda", {
                                valueAsNumber: true,
                            })}
                        />

                        {errors.valor_venda && (
                            <FieldDescription className="text-destructive">
                                {errors.valor_venda.message}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="cambio">Câmbio</FieldLabel>

                        <select
                            id="cambio"
                            className={selectClassName}
                            {...register("cambio")}
                        >
                            {cambioOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        {errors.cambio && (
                            <FieldDescription className="text-destructive">
                                {errors.cambio.message}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="combustivel">
                            Combustível
                        </FieldLabel>

                        <select
                            id="combustivel"
                            className={selectClassName}
                            {...register("combustivel")}
                        >
                            {combustivelOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        {errors.combustivel && (
                            <FieldDescription className="text-destructive">
                                {errors.combustivel.message}
                            </FieldDescription>
                        )}
                    </Field>
                </div>

                {isError && (
                    <Alert variant="destructive">
                        {error?.message ?? "Não foi possível salvar o veículo."}
                    </Alert>
                )}

                <div className="flex items-center justify-end gap-2">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={isPending}
                        >
                            Cancelar
                        </Button>
                    )}

                    <Button type="submit" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Spinner />
                                {pendingLabel}
                            </>
                        ) : (
                            submitLabel
                        )}
                    </Button>
                </div>
            </FieldGroup>
        </form>
    )
}
