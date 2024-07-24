"use client"

import { ServerwithMemberswithProfiles } from "@/types"
import { ChannelType, MemberRole } from "@prisma/client"
import { Addtool } from "../Addtool";
import { Plus, Settings } from "lucide-react";
import { useModalstore } from "@/hooks/useModalstore";

interface ServerSectionProps{
    label:string;
    
    role?:MemberRole;
    sectioType:"channels"|"members";
    channelType?:ChannelType;
    server?:ServerwithMemberswithProfiles;
}


export const ServerSection = ({label,role,sectioType,channelType,server}:ServerSectionProps) => {
     const {onOpen}=useModalstore();
    return (
    <div className="flex justify-between items-center py-2">
         <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400 ">{label}</p>
      {role !==MemberRole.MODERATOR && sectioType==="channels" && (
          <Addtool label="Create Channel " side="top">
            <button onClick={()=>onOpen("createChannel",{channelType})} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
               <Plus className="h-4 w-4"></Plus>
            </button>
          </Addtool>

      )}
      {role !==MemberRole.ADMIN && sectioType==="members" && (
         <Addtool label="Find Members " side="top">
            <button onClick={()=>onOpen("members")} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
               <Settings className="h-4 w-4"/>
            </button>
          </Addtool>
      )}
    </div>
  )
}


