"use client"

import { AuthProviderData, Children, Response, UserTokenPayload } from '@/lib/types'
import { refreshTokenRoute } from '@/services/api'
import { authService } from '@/services/authService'
import { httpService } from '@/services/httpService'
import { AxiosError } from 'axios'
import { getCookie } from 'cookies-next'
import React, { createContext, useContext, useLayoutEffect, useState } from 'react'
import { useJwt } from 'react-jwt'



const Context = createContext<AuthProviderData>(undefined)

function AuthContext({children}:Children) {
    const [token,setToken] = useState<string|null>(null)
    const [auth,setAuth] = useState<AuthProviderData>({
        isAuth:false,
        user:null
    }) 

    const {isExpired,decodedToken} = useJwt(getCookie('token') || '');

    useLayoutEffect(()=>{
        if (!isExpired && decodedToken) {
            setAuth({
                isAuth:true,
                user:decodedToken as UserTokenPayload
            })
        }
    },[isExpired,decodedToken])

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
                return Promise.reject(error);
            }
        )
        return () => {
            httpService.interceptors.response.eject(responseInterceptor)
        }
    },[])
    return (
        <Context.Provider value={auth}>
            {children}
        </Context.Provider>
    )
}

export default AuthContext


export const useAuth = () => useContext(Context)