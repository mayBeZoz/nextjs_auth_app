import { IUser, Response } from "@/lib/types"
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
            notify('Logged In Successfully',"success")
            router.push('/')
        },
        onError:(err:AxiosError<Response<IUser>>) => {
            const status = err.response?.status
            if (status === 404) {
                notify('No user exists with this email','error')
            }else if (status === 400) {
                notify('Invalid Password','error')
            }else if (status === 403) {
                notify('Your Account is not verified ,Please verify your account','error')
                const userId = err.response?.data.data._id
                router.push(`/auth/account-verification/${userId}`)
            }
        },
        mutationKey:['login']
    })

    return {
        login:() => mutate(),
        isLoading,
    }
}