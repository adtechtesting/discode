"use client"
import { ServerwithMemberswithProfiles } from "@/types"
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, Delete, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModalstore } from "@/hooks/useModalstore";

interface ServerHeaderProps{
    server:ServerwithMemberswithProfiles;
    role?:MemberRole
}



export const ServerHeader = ({server,role}:ServerHeaderProps) => {
  const {onOpen}=useModalstore()
  const isAdmin=role===MemberRole.ADMIN;

  const isModerator=isAdmin ||role===MemberRole.MODERATOR;

  return (
  <DropdownMenu>

    <DropdownMenuTrigger className="focus:outline-none" asChild>
     
     <button className="w-full text-md font-semibold flex px-3 items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
        {server.name}
          <ChevronDown className="h-5 w-5 ml-auto"></ChevronDown>
     </button>
   
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 sapce-y-[2px]">
       
       {isModerator && (
        <DropdownMenuItem onClick={()=>onOpen("invite",{server})} className="text-sm text-indigo-500 dark:text-indigo-400 px-3 py-2">
          Invite People
          <UserPlus className="h-4 w-4 ml-auto"></UserPlus>
        </DropdownMenuItem>
       )}

       {isAdmin && (
        <DropdownMenuItem className="text-sm px-3 py-2" onClick={()=>{onOpen("settings",{server})}}>
           User Settings
          <Settings className="h-4 w-4 ml-auto"/>
        </DropdownMenuItem>
       )}

        {isAdmin && (
        <DropdownMenuItem className="text-sm px-3 py-2" onClick={()=>{onOpen("members",{server})}}>
           Members Settings
          <Users className="h-4 w-4 ml-auto"/>
        </DropdownMenuItem>
       )}

        {isModerator && (
        <DropdownMenuItem className="text-sm px-3 py-2" onClick={()=>onOpen("createChannel",{server})}>
         Create Channels
          <PlusCircle className="h-4 w-4 ml-auto"/>
        </DropdownMenuItem>
       )}
       
       {isModerator &&(
        <DropdownMenuSeparator></DropdownMenuSeparator>
       )}

          {isAdmin && (
        <DropdownMenuItem className="text-sm px-3 py-2 text-rose-500" onClick={()=>{
          onOpen("deleteServer",{server})
        }}> 
            Delete Server
          <Trash className="h-4 w-4 ml-auto"/>
        </DropdownMenuItem>
       )}

         {!isAdmin && (
        <DropdownMenuItem className="text-sm px-3 py-2 text-rose-500" onClick={()=>onOpen("leaveServer",
          {server}
        )}> 
             LeaveServer
          <LogOut className="h-4 w-4 ml-auto"/>
        </DropdownMenuItem>
       )}
    </DropdownMenuContent>
  </DropdownMenu>
  )
}


