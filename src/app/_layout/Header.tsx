'use client'

import { Button } from '@nextui-org/button'
import React from 'react'
import { useLogout } from '../auth/_hooks/useLogout'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { AuthProviderData } from '@/lib/types'
import { navLinks } from '@/lib/constants'

function Header() {
    const {mutate,isLoading} = useLogout()
    const authData:AuthProviderData = useAuth()
    return (
        <header className='w-full h-[80px] fixed top-0 left-0 px-5 flex items-center justify-between'>
            <Link href='/'>
                <h1 className='text-2xl font-medium'>
                    <span className='text-primary'>prebuilt</span>
                    <span className='font-bold'>Auth</span>
                </h1>
            </Link>

            <nav className='flex'>
                <ul className='flex gap-6 items-center mr-10'>
                    {
                        navLinks.map((link,idx) => (
                            <li key={idx}>
                                <Link className='font-medium capitalize' href={link.href}>{link.name}</Link>
                            </li>
                        ))
                    }
                </ul>
                {
                    authData?.auth?.isAuth ? (
                        <Button 
                            color='primary' 
                            onClick={() => mutate()} 
                            disabled={isLoading}
                        >
                            Logout
                        </Button>
                    ) : null
                }
            </nav>
            
        </header>
    )
}

export default Header