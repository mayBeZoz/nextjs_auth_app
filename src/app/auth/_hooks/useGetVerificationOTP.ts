import { IUser, Response } from "@/lib/types"
import { notify } from "@/lib/utils"
import { accountVerificationOTPRoute } from "@/services/api"
import { authService } from "@/services/authService"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export const useGetVerificationOTP = (userId:string) => {
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const router = useRouter()
    const fetchAccountVerificationOTP = async () => {
        setIsLoading(true)
        try {
            const res = await authService.get<{},{data:Response<null>}>(`${accountVerificationOTPRoute}/${userId}`)
            setIsLoading(false)
            if (res.data.status === "success") {
                notify('account verification code is sent to your email')
            }
            return res
        }catch (err) {
            if (err instanceof AxiosError) {
                const status = err.response?.status;
                if (status === 404) {
                    notify('User is not found, Please try again');
                    router.push('/auth/register')
                } else if (status === 403) {
                    notify('User is already verified');
                    router.push('/auth/login')
                }
            } else {
                notify('Error occur, Please try again')
            }
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        fetchAccountVerificationOTP()
    },[])

    return ({
        isLoading,
        refetch:()=>{
            fetchAccountVerificationOTP()
        }
    })
    
    
}

