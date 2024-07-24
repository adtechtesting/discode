import { Hash, Menu } from "lucide-react";
import { Mobiletoogle } from "../mobiletoogle";
import { UserAvatar } from "../UserAvatar";
import { SocketIndicator } from "@/components/socketindicator";
import { VedioAppbutton } from "./chat-button";

interface ChatheaderProps{
    serverId:string;
    name:string;
    imageUrl?:string;
    type:"channel" | "conversation"
}

export const ChatHeader = ({serverId,name,imageUrl,type}:ChatheaderProps) => {
  return (
    <div className="text-md font-semibold flex items-center h-12 border-neutral-200 px-3 dark:border-neutral-800 border-b-2">
      <Mobiletoogle serverId={serverId}/>
      {type==="channel"&&(
         <Hash className="w-5 h-5 mr-2 text-zinc-500 dark:text-zinc-400"></Hash>
            
    )}
      {type === "conversation" && (
        <UserAvatar 
          src={imageUrl}
          className="h-8 w-8 md:h-8 md:w-8 mr-2"
        />
      )}
    <p className="text-black font-semibold text-md dark:text-white">{name}</p>
      <div className="ml-auto flex items-center">
            {type==="conversation" && (
              <VedioAppbutton></VedioAppbutton>
            )}
          <SocketIndicator></SocketIndicator>
      </div>
    
    </div>
  )
}

