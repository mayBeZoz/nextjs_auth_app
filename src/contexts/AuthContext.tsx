"use client"

import { AuthProviderData, Children, Response } from '@/lib/types'
import { refreshTokenRoute } from '@/services/api'
import { authService } from '@/services/authService'
import { httpService } from '@/services/httpService'
import { AxiosError } from 'axios'
import React, { createContext, useContext, useLayoutEffect, useState } from 'react'



const Context = createContext<AuthProviderData>(undefined)

function AuthContext({children}:Children) {
    const [token,setToken] = useState<string|null>(null)

    const refreshToken = async () => {
        try {
            const {data} = await authService.get<{},{data:Response<{token:string}>}>(refreshTokenRoute)
            const token = data.data.token
            setToken(token)
        }catch (err) {
            setToken(null)
        }
    }

    useLayoutEffect(()=>{
        const authInterceptor = httpService.interceptors.request.use((config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        })

        return () => {
            httpService.interceptors.request.eject(authInterceptor)
        }
    },[token])

    useLayoutEffect(()=>{
        const responseInterceptor = httpService.interceptors.response.use(
            (config) => config,
            (error:AxiosError) => {
                if (error.response?.status === 401){
                    refreshToken()
                }
            }
        )
        return () => {
            httpService.interceptors.response.eject(responseInterceptor)
        }
    },[])
    return (
        <Context.Provider value={{
            token,
            setToken
        }}>
            {children}
        </Context.Provider>
    )
}

export default AuthContext


export const useAuth = () => useContext(Context)