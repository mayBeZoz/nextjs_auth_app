import { type ClassValue, clsx } from "clsx"
import { IoCheckmarkCircleOutline } from "react-icons/io5"
import { MdErrorOutline, MdOutlineWarningAmber } from "react-icons/md"
import { Bounce, toast } from "react-toastify"
import { twMerge } from "tailwind-merge"

type ToastStatus = 'success' | 'error' | "warn" | undefined

const getToastProgressColor = (status:ToastStatus) => {
    switch (status) {
        case "success":
            return 'bg-green-500'
        case 'error':
            return 'bg-red-500'
        case 'warn':
            return 'bg-yellow-500'
        default:
            return 'bg-primary'
    }
}

const ToastIcon = ({status}:{status:ToastStatus}) => {
    switch (status) {
        case "success":
            return <IoCheckmarkCircleOutline className="text-green-500 text-xl w-full"/>
        case 'error':
            return <MdErrorOutline className="text-red-500 text-xl w-full"/>
        case 'warn':
            return <MdOutlineWarningAmber className="text-yellow-500 text-xl w-full"/>
    }
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const notify = (msg:string,status?:ToastStatus) => toast(msg,{
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    progressClassName:`${getToastProgressColor(status)}`,
    icon:status && <ToastIcon status={status}/>,
    // className:'flex',
    // bodyClassName:"bg-blue-700 flex"

})



export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = emailRegex.test(email.trim());
    return Boolean(result);
}
