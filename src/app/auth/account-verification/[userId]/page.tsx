'use client'

import { useParams } from "next/navigation"
import { Spinner } from "@nextui-org/spinner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useEffect, useState } from "react"
import { Button } from "@nextui-org/button"
import { useGetVerificationOTP } from "../../_hooks/useGetVerificationOTP"
import { useSubmitVerificationOTP } from "../../_hooks/useSubmitVerificationOTP"


function AccountVerification() {
    const {userId} = useParams()
    const [otp,setOtp] = useState<string>('')
    const [isOtpValid,setIsOtpValid] = useState<boolean>(true)

    const {isLoading:isSendingOtpLoading,refetch} = useGetVerificationOTP(userId as string)

    const {mutate,isLoading:isSubmitOtpLoading} = useSubmitVerificationOTP(userId as string,otp)

    useEffect(() => {
        setOtp('')
        setIsOtpValid(true)
    },[isSendingOtpLoading])

    const submitOtp = () => {
        if (otp.length === 6) {
            setIsOtpValid(false)
        }else {
            setIsOtpValid(true)
            mutate()
        }
    }

    return (
        <div className="w-full h-screen">
            <div className="container flex h-full flex-col justify-center items-center">
                    
                <div className="flex flex-col items-center">
                    <h2 className="text-5xl font-bold mb-5">Verify your account</h2>
                    <p className="text-lg text-primary mb-10 font-medium">Account verification code is sent to your email</p>
                    <>
                        {
                            isSubmitOtpLoading||isSendingOtpLoading ? (
                                <div>
                                    <Spinner
                                        key={1}
                                        color="primary"
                                        classNames={{
                                            circle1:'w-[100px] h-[100px]',
                                            circle2:'w-[100px] h-[100px]',
                                            wrapper:'w-[100px] h-[100px]'
                                        }}
                                    />
                                </div>
                            ) : (
                                
                                <div>
                                    <InputOTP 
                                        value={otp} 
                                        onChange={(e)=> setOtp(e)} 
                                        maxLength={6}
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot className="otp_slot" index={0} />
                                            <InputOTPSlot className="otp_slot" index={1} />
                                            <InputOTPSlot className="otp_slot" index={2} />
                                            <InputOTPSlot className="otp_slot" index={3} />
                                            <InputOTPSlot className="otp_slot" index={4} />
                                            <InputOTPSlot className="otp_slot" index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                            )
                        }
                        {
                            !isOtpValid && (
                                <p className="text-red-600 mt-5">
                                    Account verification OTP must be 6 numbers
                                </p>
                            )
                        }
                        {
                            !isSendingOtpLoading && (
                                <p className=" mt-5">
                                    <span>Get a new OTP? </span>
                                    <span onClick={refetch} className="text-primary cursor-pointer">Resend new OTP</span>
                                </p>
                            )
                        }
                    </>
                    {
                        (!isSendingOtpLoading || !isSubmitOtpLoading) && (
                            <Button
                                onClick={submitOtp} 
                                className="font-medium mt-10" 
                                color="primary" 
                                size="lg"
                            >
                                Submit
                            </Button>
                        )
                    }
                    
                </div>
                    
            </div>
        </div>
    )
}

export default AccountVerification