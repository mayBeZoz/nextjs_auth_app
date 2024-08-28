import { isValidEmail } from '@/lib/utils'
import { redirect } from 'next/navigation'
import React from 'react'
import OtpFields from './_components/OtpFields'

type TParams = {
    params:{
        email:string
    }
}


async function ForgotPasswordPageWrapper({params}:TParams) {

    const decodedEmail = decodeURIComponent(params.email)
    if (!isValidEmail(decodedEmail)) {
        return redirect('/auth/forgot-password')
    }

    return (
        <OtpFields/>
    )
}

export default ForgotPasswordPageWrapper