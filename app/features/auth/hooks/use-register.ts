import { useMutation, useQueryClient } from "@tanstack/react-query"

import { register } from "../api/auth.api"
import { authKeys } from "../api/auth.keys"
import type { RegisterInput } from "../types/auth.types"

export function useRegister() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: RegisterInput) => register(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: authKeys.me(),
            })
        },
    })
}
