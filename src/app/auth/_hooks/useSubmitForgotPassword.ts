import { Response } from "@/lib/types"
import { notify } from "@/lib/utils"
import { submitForgotPasswordOTPRoute } from "@/services/api"
import { authService } from "@/services/authService"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useMutation } from "react-query"

type TParams = {
    otp:string,
    newPassword:string,
    userEmail:string
}

export const useSubmitForgotPassword = ({newPassword,otp,userEmail}:TParams) => {
    const router = useRouter()
    const mutationRes = useMutation({
        mutationFn:async () => {
            const res = await authService.post(`${submitForgotPasswordOTPRoute}/${userEmail}`,{
                resetPasswordOTP:otp,
                newPassword
            })
            return res
        },
        onSuccess:() => {
            notify('Your account password has changed successfully','success')
            router.push('/auth/login')
        },
        onError:(err:AxiosError)=>{
            const status = err.response?.status 
            console.log(status)
            if (status === 400) {
                notify('Invalid password, Password must be at least 6 characters long and include at least one capital letter, one number and special character ','error')
            }else if (status === 409) {
                notify('Invalid Code Sent','error')
            }
        },
        mutationKey:['submit-forgot-password-otp',userEmail]
    }) 

    return mutationRes
}