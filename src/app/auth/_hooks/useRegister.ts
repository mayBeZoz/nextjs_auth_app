import { IUser, Response } from "@/lib/types"
import { notify } from "@/lib/utils"
import { registerRoute } from "@/services/api"
import { authService } from "@/services/authService"
import { AxiosError, AxiosResponse } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useMutation } from "react-query"
import { TCreateUserPayload } from "../register/page"


type TInvalidField = {
    message:string,
    fieldName:string
}

export const useRegister = (userData:TCreateUserPayload) => {
    const [invalidFields,setInvalidFields] = useState<TInvalidField[]>([])
    const router = useRouter()
    const {mutate,isLoading} = useMutation({
        mutationFn:async () => {
            const res = await authService.post(registerRoute,userData)
            return res
        },
        onSuccess:(res:AxiosResponse<{data:IUser}>) => {
            const userId = res.data.data._id
            notify('Your account is Created Successfully , Continue to activate it','success')
            router.push(`/auth/account-verification/${userId}`)
        },
        onError: (err:AxiosError<Response<null>>) => {
            console.log(err)
            const status = err.response?.status
            if (status === 400){
                const errorFields:{
                    message:string,
                    path: ['body', string]
                }[] = err.response?.data.error
    
                setInvalidFields(
                    errorFields.map(field =>  ({
                        message:field.message,
                        fieldName:field.path[1]
                    }))
                )
            }else if (status === 409) {
                setInvalidFields([])
                notify('User with this email already exists','error')
            }
        },
        mutationKey:['login']
    })
    return {
        register:() => mutate(),
        isLoading,
        invalidFields
    }
}