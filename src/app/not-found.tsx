import Link from 'next/link'
import React from 'react'

function NotFound() {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className="text-center">
                <h2 className='text-[9em] font-bold mb-2 text-primary'>404</h2>
                <h6 className='text-2xl font-medium'>
                    <span>Page Not Found, </span>
                    <Link href='/' className='text-primary'>Go To Home Page</Link>
                </h6>
            </div>
        </div>
    )
}

export default NotFound