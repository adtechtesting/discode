
import { CurrentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import {NavigationAction} from "./NavigationAction"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NavigationItem } from "./NavigationItem"
import { ModeToggle } from "@/components/mode-toggle"
import { UserButton } from "@clerk/nextjs"



export const NavigationSidebar = async() => {

    const profile=await CurrentProfile()
      if(!profile){
        return redirect("/")
      }

      const servers=await db.server.findMany({
        where:{
            members:{
                some:{
                    profileId:profile.id
                }
            }
        }
      })

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] bg-[#e3e5e8] py-3">
       <NavigationAction></NavigationAction>
       <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded w-10 mx-auto"></Separator>
        <ScrollArea className="flex-1 w-full ">

        {servers.map((server)=>(
          <div className="mb-4" key={server.id}>
              <NavigationItem name={server.name} id={server.id} imageUrl={server.imageUrl}></NavigationItem>
          </div>
        ))}

        </ScrollArea>
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
         <ModeToggle></ModeToggle>
         <UserButton afterSignOutUrl="/" appearance={{elements:{
          avatarBox:"h-[48px] w-[48px]"
         }}}></UserButton>
        </div>
    </div>
  )
}


