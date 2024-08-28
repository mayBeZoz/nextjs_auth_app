import { useAuth } from "@/contexts/AuthContext"
import { notify } from "@/lib/utils"
import { logoutRoute } from "@/services/api"
import { authService } from "@/services/authService"
import { useRouter } from "next/navigation"
import { useMutation } from "react-query"

export const useLogout = () => {
    const auth = useAuth()
    const router = useRouter()
    return useMutation({
        mutationFn:async () => {
            const res = await authService.get(logoutRoute)
            return res
        },
        onSuccess:(res) => {
            router.push('/auth/login')
            auth?.setAuth({
                isAuth:false,
                user:null
            })
            notify("Logged out successfully","success")
        },
        onError:(err) => {
            notify("Cannot log out ,Please try again",'error')
        },
        mutationKey:['logout']
    })
}