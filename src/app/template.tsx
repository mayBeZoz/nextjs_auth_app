'use client'
import AuthContext from "@/contexts/AuthContext"
import { Children } from "@/lib/types"
import { QueryClient, QueryClientProvider } from "react-query"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Header from "./_layout/Header"

const client = new QueryClient()

function RootTemplate({children}:Children) {
    return (
        <>
            <QueryClientProvider client={client}>
                <AuthContext>
                    <Header/>
                    {children}              
                </AuthContext>
            </QueryClientProvider>
            <ToastContainer 
                className='h-[80vh]' 
                newestOnTop={true}
            />
        </>
    )
}

export default RootTemplate