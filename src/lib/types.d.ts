import { UserRoles } from "./lib/constants"

declare type Children = {
    children:React.ReactNode
}

declare type UserRoles = 'admin' | 'user' | "super-admin"

declare interface IUser {
    _id:string,
    role:UserRoles,
    email:string,
    verified:boolean,
    firstName:string,
    lastName:string
}


declare type UserTokenPayload = {
    role:UserRoles,
    _id:string,
    email:string
}

declare type AuthProviderData = {
    user:UserTokenPayload|null,
    isAuth:boolean
} | undefined


declare type Response<ResponseData> = {
    error:any,
    status:"fail" | "success" | "error",
    data:ResponseData,
    message:string
}