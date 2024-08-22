import { notify } from "@/lib/utils"
import { loginRoute } from "@/services/api"
import { authService } from "@/services/authService"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useMutation } from "react-query"

export const useLogin = (email:string,password:string) => {
    const router = useRouter()
    const {isLoading,mutate} = useMutation({
        mutationFn:async () => {
            return await authService.post(loginRoute,{
                email,
                password
            })
        },
        onSuccess:(res) => {
            if (!(res instanceof AxiosError) && Boolean(res)) {
                notify('Logged In Successfully')
                router.push('/')
            }else {
                notify('Invalid Email or Password')
            }
        },
        mutationKey:['login']
    })
    return {
        login:() => mutate(),
        isLoading
    }
}