'use client'

import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { ChangeEvent, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useRegister } from "../_hooks/useRegister"

export type TCreateUserPayload = {
    firstName:string,
    lastName:string,
    password:string,
    confirmPassword:string,
    email:string
}

type TRegisterInputs = {
    label:string,
    type:"text"|"password"|"email",
    placeholder:string,
    size:"lg"|"sm"|"md",
    name:keyof TCreateUserPayload
}[]

function Register() {

    const [userData,setUserData] = useState<TCreateUserPayload>({
        email:"",
        firstName:"",
        lastName:"",
        password:"",
        confirmPassword:""
    })

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => ({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const {
        register,
        invalidFields,
        isLoading
    } = useRegister(userData)

    const inputs:TRegisterInputs = [
        {
            label:"First Name",
            type:"text",
            placeholder:"Enter First Name",
            size:"lg",
            name:"firstName"
        },
        {
            label:"Last Name",
            type:"text",
            placeholder:"Enter Last Name",
            size:"lg",
            name:"lastName"
        },
        {
            label:"Password",
            type:"password",
            placeholder:"Enter your password",
            size:"lg",
            name:"password"
        },
        {
            label:"Confirm Password",
            type:"password",
            placeholder:"Enter confirm password",
            size:"lg",
            name:"confirmPassword"
        },
        {
            label:"Email",
            type:"email",
            placeholder:"Enter your email",
            size:"lg",
            name:"email"
        },
    ]

    return (
        <div className="w-full h-screen ">
            <div className="container h-full flex-col flex justify-center items-center">
                <h3 className=" text-5xl font-bold mb-10">Create Account</h3>
                <div className="sm:w-[500px] w-full flex-col gap-6 flex justify-center items-center ">
                    {
                        inputs.map(input => {
                            const invalidMessage = invalidFields.find(field => field.fieldName === input.name)?.message
                            return (
                                <div key={input.name} className="flex-col w-full flex gap-2">
                                    <Input
                                        label={input.label}
                                        onChange={handleInputChange}
                                        name={input.name}
                                        value={userData[input.name]}
                                        placeholder={input.placeholder}
                                        type={input.type}
                                        size={input.size}
                                    />
                                    <AnimatePresence>
                                        {
                                            invalidMessage && (
                                                <motion.p 
                                                    className="text-red-500"
                                                    initial={{opacity:0}}
                                                    animate={{opacity:1}}
                                                    exit={{opacity:0}}
                                                >
                                                    {invalidMessage}
                                                </motion.p>
                                            )
                                        }
                                    </AnimatePresence>
                                </div>
                            )
                        })
                    }
                 
                </div>
                <p className="sm:w-[500px] w-full mb-8 mt-3">
                    <span>Have an account? </span> 
                    <Link href='/auth/login' className="text-primary">Login here</Link>
                </p>
                <Button 
                    onClick={register} 
                    className="font-medium" 
                    color="primary" 
                    disabled={isLoading} 
                    size="lg"
                >
                    Register
                </Button>
            </div>
        </div>
    )
}

export default Register