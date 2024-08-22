import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server"
import { decodeToken } from "react-jwt";
import { isAdminProtectedRoute, isAuthRoute, isUserProtectedRoute } from "./lib/routes";
import { UserTokenPayload } from "./lib/types";

export async function middleware (req:NextRequest) {
    const token = cookies().get('token')?.value as (string|undefined)

    const pathname = req.nextUrl.pathname
    if (!token) {
        if (isAdminProtectedRoute(pathname) || isUserProtectedRoute(pathname)) {
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }
    }else {
        const decodedToken:(UserTokenPayload|null) = decodeToken(token)
        if (decodedToken) {
            // ===========             CASE OF VALID TOKEN             ===========
            if (isAuthRoute(pathname)){
                return NextResponse.redirect(new URL('/', req.url))
            }else if (decodedToken.role === "user" && isAdminProtectedRoute(pathname)) {
                return NextResponse.redirect(new URL('/', req.url))
            }
        }else {
            // ===========             CASE OF INVALID TOKEN             ===========
            if (isAdminProtectedRoute(pathname) || isUserProtectedRoute(pathname)) {
                return NextResponse.redirect(new URL('/', req.url))
            }
        }
    }
    
}


export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}