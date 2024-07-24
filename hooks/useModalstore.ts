import { Channel, ChannelType, Server } from "@prisma/client";

import { create } from "zustand";

export type ModalType="createServer"|"invite"|"settings" |"members"|"createChannel"|"leaveServer"|"deleteServer"|"messageFile"|"deleteMessage"

interface ModalData{
    server?:Server;
    channelType?:ChannelType;
    channel?:Channel;
    apiUrl?:string;
    query?:Record<string,any>
}

interface ModalStore{
type:ModalType |null;
data:ModalData
isOpen:boolean;
onOpen:(type:ModalType,data?:ModalData)=>void;
onClose:()=>void

}

export const useModalstore=create<ModalStore>((set)=>({
    type:null,
    data:{},
    isOpen:false,
    onOpen:(type,data={})=>set({isOpen:true,type,data}),
    onClose:()=>set({type:null,isOpen:false})

}))