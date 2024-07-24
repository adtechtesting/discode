import { ChatMessages } from "@/components/chat/chat-message";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatInput } from "@/components/chat/ChatInput";
import { MediaRoom } from "@/components/media-room";
import { CurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { auth, redirectToSignIn } from "@clerk/nextjs/server";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface channelPageProps {
  params:{
    serverId:string;
    channelId:string;
  }
}

const page = async({params}:channelPageProps) => {
    const profile=await CurrentProfile();
     if(!profile){
        return auth().redirectToSignIn()
     }

     const channel=await db.channel.findUnique({
        where:{
            id:params.channelId
        }
     })

     const members=await db.member.findFirst({
        where:{
            serverId:params.serverId,
            profileId:profile.id
        }
     })

     if(!channel ||!members){
        redirect("/")
     }

  return (
    <div className="flex flex-col bg-white dark:bg-[#313338] h-full">
       <ChatHeader name={channel.name} serverId={channel.serverId} type="channel"></ChatHeader>
        
         
         
        
             {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={members}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
          />
        </>
      )}
       {channel.type === ChannelType.VEDIO&& (
        <MediaRoom
          chatId={channel.id}
          video={true}
          audio={false}
        />
      )}
         {channel.type === ChannelType.AUDIO&& (
        <MediaRoom
          chatId={channel.id}
          video={false}
          audio={true}
        />
      )}
     
    </div>
  )
}

export default page
