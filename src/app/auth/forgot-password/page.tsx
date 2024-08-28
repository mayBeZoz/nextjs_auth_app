'use client'

import { isValidEmail, notify } from '@/lib/utils'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import React, { useEffect, useState } from 'react'
import { useGetForgotPasswordOTP } from "@/app/auth/_hooks/useGetForgotPasswordOTP"

function ForgotPassword() {

    const [email,setEmail] = useState<string>('')
    const [isEmailValid,setIsEmailValid] = useState<boolean>(false)
    const {sendOtp,isLoading} = useGetForgotPasswordOTP(email)

    useEffect(()=>{
        setIsEmailValid(isValidEmail(email))
    },[email])

    const handleSubmit = () => {
        if (isEmailValid) {
            sendOtp()
        }else {
            notify('Invalid Email, Please submit a valid one','error')
        }
    }

    return (
        <div className='w-full h-screen'>
            <div className="container flex-col h-full flex justify-center items-center">
                <h3 className=" text-5xl font-bold mb-10">Forgot Password !</h3>

                <div className='sm:w-[500px] w-full flex-col gap-6 mb-8 flex justify-center items-center '>
                    <Input 
                        label="Email" 
                        type="email"
                        placeholder="Enter your email"
                        size="lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <Button
                    className="font-medium" 
                    color="primary" 
                    onClick={handleSubmit}
                    size="lg"
                    isLoading={isLoading}
                >
                    Send Verification Code
                </Button>
                
            </div>
        </div>
    )
}

export default ForgotPassword