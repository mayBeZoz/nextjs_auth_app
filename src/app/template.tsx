'use client'
import AuthContext from "@/contexts/AuthContext"
import { Children } from "@/lib/types"
import { QueryClient, QueryClientProvider } from "react-query"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const client = new QueryClient()

function RootTemplate({children}:Children) {
    return (
        <>
            <QueryClientProvider client={client}>
                <AuthContext>
                    {children}              
                </AuthContext>
            </QueryClientProvider>
            <ToastContainer />
        </>
    )
}

export default RootTemplate