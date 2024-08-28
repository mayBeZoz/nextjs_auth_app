import { Response } from "@/lib/types"
import { notify } from "@/lib/utils"
import { forgotPasswordOTPRoute } from "@/services/api"
import { authService } from "@/services/authService"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"


export const useGetForgotPasswordOTP = (userEmail:string) => {
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const fetchForgotPasswordOTP = async () => {
        setIsLoading(true)
        try {
            const res = await authService.get<{},{data:Response<null>}>(`${forgotPasswordOTPRoute}/${userEmail}`)  
            setIsLoading(false)
            if (res.data.status === "success") {
                router.push(`/auth/forgot-password/${userEmail}`)
                notify('Reset password code is sent to your email','success')
            }
            return res
        }catch(err) {
            setIsLoading(false)
            if (err instanceof AxiosError) {
                const status = err.response?.status;
                if (status === 404) {
                    notify('User With this email is not found in our records, Please try again','error');
                    router.push('/auth/register')
                }else if (status === 403) {
                    notify('Your account is not verified','error');
                    router.push('/auth/login')
                }
            } else {
                notify('Error occur, Please try again','error')
            }
        }
    }


    return {
        sendOtp:fetchForgotPasswordOTP,
        isLoading
    }
}

