'use client'
import { usersRoute } from "@/services/api";
import { httpService } from "@/services/httpService";
import { useQuery } from "react-query";

export default function Home() {
    
    const {data} = useQuery({
        queryFn:async () => {
            const res = await httpService.get(usersRoute)
            console.log(res)
            return res
        },
        queryKey:['users']
    })
console.log(data)
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <h1 className="font-bold text-5xl">home page</h1>
        </div>
    );
}
