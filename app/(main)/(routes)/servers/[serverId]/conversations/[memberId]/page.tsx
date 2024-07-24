import { ChatMessages } from "@/components/chat/chat-message";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatInput } from "@/components/chat/ChatInput";
import { MediaRoom } from "@/components/media-room";
import { GetorNewconver } from "@/lib/conversations";
import { CurrentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface MemeberProps{
  params:{
    memberId:string,
    serverId:string
  },
  searchParams:{
    video?:boolean
  }
}

const memberpage = async({params,searchParams}:MemeberProps) => {

  const profile=await CurrentProfile();

  if(!profile){
    return redirectToSignIn();
  }

  const currentmember=await db.member.findFirst({
    where:{
      serverId:params.serverId,
      profileId:profile.id
    },
    include:{
      profile:true
    }
  })

  if(!currentmember){
    return redirect("/");
  }

  const conversation=await GetorNewconver(currentmember.id,params.memberId)
 
   if(!conversation){
    return redirect(`/servers/${params.serverId}`)
   }

   const {memberone,membertwo}  =conversation;
   const othermember=memberone.profileId===profile.id ?membertwo :memberone;



  return (
    <div className="bg-white flex flex-col h-full  dark:bg-[#313338]">
         <ChatHeader
        imageUrl={othermember.profile.imageId}
        name={othermember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />

        {searchParams.video&&(
          <MediaRoom
          chatId={conversation.id}
           video={true} audio={true}
          >

          </MediaRoom>
        )}
         
          {!searchParams.video && (
            <>
             <ChatMessages
            member={currentmember}
            name={othermember.profile.name}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
            }}
          />
          <ChatInput
            name={othermember.profile.name}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id,
            }}
          />
</>
          )}
      
    </div>
  )
}

export default memberpage
