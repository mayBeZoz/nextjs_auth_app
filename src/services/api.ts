export const BASE_URL = "http://localhost:4000/api" 

//          ===================          AUTH ROUTES          ===================          
export const usersRoute = `/users`
export const loginRoute = `${usersRoute}/login`
export const registerRoute = `${usersRoute}/register`
export const accountVerificationOTPRoute = `${usersRoute}/get-account-verification-otp`
export const submitAccountVerificationOTPRoute = `${usersRoute}/submit-account-verification-otp`
export const refreshTokenRoute = `${usersRoute}/refresh-token`
//          ===================          User ROUTES          ===================          
