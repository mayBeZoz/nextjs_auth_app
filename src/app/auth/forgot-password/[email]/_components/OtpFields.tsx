'use client'

import { useParams } from "next/navigation"
import { useState } from "react"
import OtpInput from "./OtpInput"
import { Input } from "@nextui-org/input"
import { useSubmitForgotPassword } from "@/app/auth/_hooks/useSubmitForgotPassword"
import { Button } from "@nextui-org/button"

export type TForgotPasswordStages = 'otp' | 'password'

function OtpFields() {
    const {email} = useParams()
    const [otp,setOtp] = useState<string>('')
    const [newPassword,setNewPassword] = useState<string>('')
    const [stage,setStage] = useState<TForgotPasswordStages>('otp')
    const {mutate,isLoading} = useSubmitForgotPassword({
        newPassword,
        otp,
        userEmail:email as string
    })
  

    return (
        <div className='w-full h-screen'>
            <div className="container flex justify-center items-center flex-col w-full h-full">
                <h3 className=" text-5xl font-bold mb-10">Forgot Password !</h3>

                {
                    stage === "otp" && <OtpInput setStage={setStage} otp={otp} setOtp={setOtp}/>
                }
                {
                    stage === "password" && (
                        <div className="sm:w-[500px] w-full flex-col gap-6 flex justify-center items-center "> 
                            <button className="w-fi mr-auto text-xl font-medium" onClick={()=> setStage('otp')}>
                                Go back
                            </button>
                            <Input
                                label="Password" 
                                type="password"
                                placeholder="Enter your new password"
                                size="lg"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <Button
                                onClick={()=> mutate()} 
                                className="font-medium mt-5" 
                                color="primary" 
                                size="lg"
                                isLoading={isLoading}
                            >
                                Submit
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default OtpFields