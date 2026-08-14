import { useQuery } from "@tanstack/react-query"

import { getMe } from "../api/auth.api"
import { authKeys } from "../api/auth.keys"

export function useAuth() {
    return useQuery({
        queryKey: authKeys.me(),
        queryFn: getMe,
        retry: false,
        staleTime: 1000 * 60 * 5,
    })
}
