"use client"

import qs from "query-string"
import { Addtool } from "../Addtool"
import { Icon, VideoIcon, VideoOffIcon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const VedioAppbutton=()=>{
     const pathname=usePathname();
     const router=useRouter();
     const SearchParams=useSearchParams();
     const isvedio=SearchParams?.get("vedio");
     const onClick=()=>{
        const url=qs.stringifyUrl({
            url:pathname||"",
            query:{
                video:isvedio ? undefined :true
            }
        },{skipNull:true})

        router.push(url)
     }
     const Icon= isvedio ?VideoOffIcon:VideoIcon
     const addtoolTip=isvedio ?"end vedio"  :"start vedio"

    return (
     <Addtool side="bottom" label={addtoolTip}>
        <button onClick={onClick} className="mr-4 hover:opacity-75 transition">
            <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400"/> 
        </button>
     </Addtool>
    )
}