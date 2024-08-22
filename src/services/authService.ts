import axios, { AxiosError } from "axios";
import { BASE_URL } from "./api";

export const authService = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})

