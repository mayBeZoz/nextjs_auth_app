'use client'

import { useGetForgotPasswordOTP } from '@/app/auth/_hooks/useGetForgotPasswordOTP'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { Spinner } from "@nextui-org/spinner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { TForgotPasswordStages } from './OtpFields';
import { Button } from '@nextui-org/button';

type OtpInputProps = {
    otp:string,
    setOtp:(state:string) => void,
    setStage:(state:TForgotPasswordStages) => void
}


function OtpInput({otp,setOtp,setStage}:OtpInputProps) {

    const {email} = useParams()
    const {isLoading,sendOtp} = useGetForgotPasswordOTP(email as string)
    const [isOtpValid,setIsOtpValid] = useState<boolean>(true)

    const handleNextStage = () => {
        if (otp.length === 6) {
            setIsOtpValid(true)
            setStage('password')
        }else {
            setIsOtpValid(false)
        }
    }

    return (
        <div className="sm:w-[500px] w-full flex-col gap-6 flex justify-center items-center ">        
            {
                isLoading ? (
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
                !isLoading && (
                    <p className="mt-5">
                        <span>Get a new OTP? </span>
                        <span onClick={sendOtp} className="text-primary cursor-pointer">Resend new OTP</span>
                    </p>
                )
            }
            <Button
                onClick={handleNextStage} 
                className="font-medium mt-5" 
                color="primary" 
                size="lg"
            >
                Continue
            </Button>
        </div>
    )
}

export default OtpInput