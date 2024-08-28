import { notify } from "@/lib/utils"
import { submitAccountVerificationOTPRoute } from "@/services/api"
import { authService } from "@/services/authService"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useMutation } from "react-query"

export const useSubmitVerificationOTP = (userId:string,otp:string) => {
    const router = useRouter()

    const mutationResult = useMutation({
        mutationFn:async () => {
            const res = await authService.post(`${submitAccountVerificationOTPRoute}/${userId}`,{
                accountVerificationOTP:otp
            })
            return res
        },

        onError:(err:AxiosError)=>{
            const status = err.response?.status
            if (status === 400) {
                notify('Invalid Verification Code, Please try again','error')
            }else if (status === 403) {
                notify('User is Already Verified','error')
                router.push('/auth/login')
            }else if (status === 404) {
                notify('User not found, Please try again','error')
                router.push('/auth/register')
            }
        },

        onSuccess:() => {
            notify('Your Account is verified successfully','success')
            router.push('/auth/login')
        },

        mutationKey:['submit-account-verification-code',userId]
    }) 
    return {...mutationResult}
}