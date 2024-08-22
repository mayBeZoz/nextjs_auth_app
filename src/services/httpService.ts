import axios, { AxiosError } from "axios";
import { BASE_URL } from "./api";
import { notify } from "@/lib/utils";

const httpService = axios.create({
    baseURL:BASE_URL,
})


httpService.interceptors.response.use(
    config => config,
    (error:AxiosError) => {
        const status = error.response?.status
        if (status === 500) {
            notify('Internal Server Error , please try again')
        }
    }
)

export {httpService}