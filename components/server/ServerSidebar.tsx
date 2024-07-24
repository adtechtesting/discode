import { CurrentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { ChannelType, MemberRole } from "@prisma/client"
import { redirect } from "next/navigation"
import { ServerHeader } from "./ServerHeader"
import { ScrollArea } from "../ui/scroll-area"
import { ServerSearch } from "./ServerSearch"
import { CameraIcon, Hash, Mic, ShieldAlert, ShieldCheck } from "lucide-react"
import { Separator } from "../ui/separator"
import { ServerSection } from "./ServerSection"
import { ServerChannel } from "./ServerChannel"
import { Servermember } from "./Servermember"

interface ServerSidebarProps{
    serverId:string
}
const iconMap={
    [ChannelType.TEXT]:<Hash className="mr-2 h-4 w-4"></Hash>,
        [ChannelType.VEDIO]:<CameraIcon className="mr-2 h-4 w-4"/>,
            [ChannelType.AUDIO]:<Mic className="mr-2 h-4 w-4"/>
}

const roleMap={
    [MemberRole.GUEST]:null,
    [MemberRole.MODERATOR]:<ShieldCheck className="h-4 w-4 mr-2 text-indigo-500"></ShieldCheck>,
      [MemberRole.ADMIN]:<ShieldAlert className="h-4 w-4 mr-2 text-indigo-500"/>
}
export const ServerSidebar = async({serverId}:ServerSidebarProps) => {
     const profile =await CurrentProfile()

     if(!profile){
        return redirect("/")
     }

     const server=await db.server.findUnique({
        where:{
            id:serverId
        },
        include:{
            channel:{
                orderBy:{
                    createdAt:"asc"
                }
            },
            members:{
                include:{
                    profile:true
                },
                orderBy:{
                    role:"asc"
                }
            }
        }
     })

     const Textchannels=server?.channel.filter((channel)=>channel.type===ChannelType.TEXT)
    const Audiochannels=server?.channel.filter((channel)=>channel.type===ChannelType.AUDIO)
    const Vediochannels=server?.channel.filter((channel)=>channel.type===ChannelType.VEDIO)
   const memeberschannels=server?.members.filter((member)=>member.profileId !==profile.id)
    if(!server){
        return redirect("/")
    }
   
    const role=server?.members?.find((member)=>member.profileId=== profile.id)?.role;

   return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
        <ServerHeader server={server} role={role}>

        </ServerHeader>

        <ScrollArea className="flex px-3">
            <div className="mt-2">
                 <ServerSearch data={[
                   {
                     label:"Text Channels",
                    type:"channel",
                    data:Textchannels?.map((channel)=>({
                        id:channel.id,
                        name:channel.name,
                        icon:iconMap[channel.type]
                    }))
                   },
                      {
                     label:"Voice Channels",
                    type:"channel",
                    data:Audiochannels?.map((channel)=>({
                        id:channel.id,
                        name:channel.name,
                        icon:iconMap[channel.type]
                    }))
                   },
                      {
                     label:"Vedio Channels",
                    type:"channel",
                    data:Vediochannels?.map((channel)=>({
                        id:channel.id,
                        name:channel.name,
                        icon:iconMap[channel.type]
                    }))
                   },   {
                     label:"Members",
                    type:"member",
                    data:memeberschannels?.map((member)=>({
                        id:member.id,
                        name:member.profile.name,
                        icon:roleMap[member.role]
                    }))
                   }

                 ]}/>

            </div>
            <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
             {!!Textchannels?.length && (
                <div className="mb-2">
                    <ServerSection 
                     label="Text channels"
                   role={role}
                  sectioType="channels"
                   channelType={ChannelType.TEXT} />

                  <div className="space-y-[2px]" >
                       {Textchannels?.map((channel)=>(
                        <ServerChannel key={channel.id} role={role} server={server} channel={channel}></ServerChannel>
                      ))}
                  </div>

                   
                </div>
             ) }
              {!!Audiochannels?.length && (
                <div className="mb-2">
                    <ServerSection 
                     label="Voice channels"
                   role={role}
                  sectioType="channels"
                   channelType={ChannelType.AUDIO} />

                   <div className="space-y-[2px]">
                       {Audiochannels?.map((channel)=>(
                        <ServerChannel key={channel.id} role={role} server={server} channel={channel}></ServerChannel>
                      ))}
                   </div>

                   
                </div>
             ) }
              {!!Vediochannels?.length && (
                <div className="mb-2">
                    <ServerSection 
                     label="Vedio channels"
                   role={role}
                  sectioType="channels"
                   channelType={ChannelType.VEDIO} />

                      <div className="space-y-[2px]">
                        {Vediochannels?.map((channel)=>(
                        <ServerChannel key={channel.id} role={role} server={server} channel={channel}></ServerChannel>
                      ))}
                      </div>

                   
                </div>
             ) }
              {!!memeberschannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            label="Members"
                            role={role}
                            sectioType="members"
                            server={server} />
                        <div className="space-y-[2px]">
                            {memeberschannels.map((member) => (
                                <Servermember key={member.id} member={member} server={server} />
                            ))}
                        </div>
                    </div>
                )}
        </ScrollArea>
    </div>
  )         
}

