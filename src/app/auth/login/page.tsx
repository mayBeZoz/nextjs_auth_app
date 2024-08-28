'use client'

import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { useEffect, useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import Link from "next/link"
import { useLogin } from "../_hooks/useLogin"

function LoginPage() {
    
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const [showPassword,setShowPassword] = useState<boolean>(false)

    const {login,isLoading} = useLogin(email,password)

    return (
        <div className="w-full h-screen">
            <div className="container h-full flex flex-col items-center justify-center ">
                <h3 className=" text-5xl font-bold mb-10">Welcome back!</h3>
                <div className="sm:w-[500px] w-full flex-col gap-6 flex justify-center items-center ">
                    <Input 
                        label="Email" 
                        type="email"
                        placeholder="Enter your email"
                        size="lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input 
                        label="Password" 
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        size="lg"
                        endContent={
                            <button className="h-full flex items-center text-2xl text-zinc-500 hover:text-zinc-600" onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? <AiFillEye /> : <AiFillEyeInvisible />
                                }
                            </button>
                        }
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        
                    />
                    <p className=" flex justify-between w-full mb-8 mt-3">
                        <span>
                            <span>Don't Have an account? </span> 
                            <Link href='/auth/register' className="text-primary">Register here</Link>
                        </span>
                        <Link href='/auth/forgot-password' className="text-primary block">Forgot Password?</Link>
                    </p>
                </div>

                <Button 
                    onClick={login} 
                    className="font-medium" 
                    color="primary" 
                    disabled={isLoading} 
                    size="lg"
                >
                    Login
                </Button>
            </div>
        </div>
    )
}

export default LoginPage