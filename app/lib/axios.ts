import axios from "axios"

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
})

let csrfPromise: Promise<void> | null = null

async function ensureCsrfCookie() {
    if (!csrfPromise) {
        csrfPromise = api
            .get("/sanctum/csrf-cookie")
            .then(() => undefined)
            .finally(() => {
                csrfPromise = null
            })
    }

    return csrfPromise
}

api.interceptors.request.use(async (config) => {
    const method = config.method?.toUpperCase()

    const needsCsrf = ["POST", "PUT", "PATCH", "DELETE"].includes(method ?? "")

    if (needsCsrf && !config.url?.includes("/sanctum/csrf-cookie")) {
        await ensureCsrfCookie()
    }

    return config
})
