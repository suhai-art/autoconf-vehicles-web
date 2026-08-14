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

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-2", className)} {...props}>
            <form>
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
                            id="email"
                            type="email"
                            placeholder="admin@example.com"
                            required
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                        <Input
                            id="password"
                            type="password"
                            placeholder="password"
                            required
                        />
                    </Field>
                    <Field>
                        <Button type="submit">Entrar</Button>
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
