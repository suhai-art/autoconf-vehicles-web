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
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "./ui/spinner"
import { useLogin } from "~/features/auth"
import { Alert } from "./ui/alert"

const loginSchema = z.object({
    email: z.email("informe um email válido"),
    password: z.string(),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const { mutateAsync: login, isPending, isError, error } = useLogin()

    async function onSubmit(data: LoginFormData) {
        await login(data)
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
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            type="email"
                            id="email"
                            placeholder="admin@example.com"
                            required
                            {...register("email")}
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
                            required
                            {...register("password")}
                        />
                        {errors.password && (
                            <FieldDescription className="text-destrutive">
                                {errors.password.message}
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
                                    <Spinner /> Entrando
                                </>
                            ) : (
                                "Entrar"
                            )}
                        </Button>
                        <FieldDescription>
                            Ainda não tem uma conta?{" "}
                            <a href="/register">registrar</a>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}
