"use client"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"

import { useForm } from "react-hook-form"
import { z, type infer } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "./ui/spinner"
import { useRegister } from "~/features/auth"
import { Alert } from "./ui/alert"

const registerSchema = z
    .object({
        name: z.string(),
        email: z.email("Informe um email válido"),
        password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "As senhas não coincidem",
        path: ["password_confirmation"],
    })

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    })

    const {
        mutateAsync: registerMutate,
        isPending,
        isError,
        error,
    } = useRegister()

    async function onSubmit(data: RegisterFormData) {
        await registerMutate(data)
    }

    return (
        <div className={cn("flex flex-col gap-2", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <img src="/logo_icon.png" className="size-15" />
                        <h1 className="text-xl font-bold">
                            Bem vindo ao Sistema de Veiculos Autoconf
                        </h1>
                    </div>

                    <Field>
                        <FieldLabel htmlFor="name">Nome</FieldLabel>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Maria da silva"
                            {...register("name")}
                            required
                        />
                        {errors.name && (
                            <FieldDescription className="text-destrutive">
                                {errors.name.message}
                            </FieldDescription>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            placeholder="admin@example.com"
                            {...register("email")}
                            required
                        />
                        {errors.email && (
                            <FieldDescription className="text-destrutive">
                                {errors.email.message}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                        <Input
                            id="password"
                            type="password"
                            placeholder="password"
                            {...register("password")}
                            required
                        />
                        {errors.password && (
                            <FieldDescription className="text-destrutive">
                                {errors.password.message}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="password_confirmation">
                            Confirme sua senha
                        </FieldLabel>
                        <Input
                            id="password_confirmation"
                            type="password"
                            placeholder="password"
                            {...register("password_confirmation")}
                            required
                        />
                        {errors.password_confirmation && (
                            <FieldDescription className="text-destrutive">
                                {errors.password_confirmation.message}
                            </FieldDescription>
                        )}
                    </Field>
                    <Field>
                        {isError && (
                            <Alert variant="destructive">
                                {error?.message}
                            </Alert>
                        )}
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Spinner /> Criando conta
                                </>
                            ) : (
                                "Criar conta"
                            )}
                        </Button>
                        <FieldDescription>
                            Já tem uma conta? <a href="/login">logar</a>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}
