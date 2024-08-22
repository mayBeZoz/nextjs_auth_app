export const ADMIN_PROTECTED_ROUTES = ['/admin']
export const USER_PROTECTED_ROUTES = ['/user']
export const AUTH_ROUTE = '/auth'


export const isAuthRoute = (path:string):boolean => {
    return path.startsWith(AUTH_ROUTE)
}

export const isUserProtectedRoute = (path:string):boolean => {
    for (let i = 0;i < USER_PROTECTED_ROUTES.length;i++){
        if(path.startsWith(USER_PROTECTED_ROUTES[i]))
            return true        
    }
    return false
}

export const isAdminProtectedRoute = (path:string):boolean => {
    for (let i = 0;i < ADMIN_PROTECTED_ROUTES.length;i++){
        if(path.startsWith(ADMIN_PROTECTED_ROUTES[i]))
            return true        
    }
    return false
} 