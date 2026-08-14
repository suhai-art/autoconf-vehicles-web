import { useMutation, useQueryClient } from "@tanstack/react-query"

import { login } from "../api/auth.api"
import { authKeys } from "../api/auth.keys"
import type { LoginInput } from "../types/auth.types"

export function useLogin() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: LoginInput) => login(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: authKeys.me(),
            })
        },
    })
}
