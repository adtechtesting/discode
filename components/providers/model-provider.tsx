"use client"

import { useEffect, useState } from "react"
import { CreateServerModal } from "@/components/models/create-server-modal"
import { InviteModal } from "@/components/models/invite-modal"
import { EditServerModal } from "@/components/models/editServer"
import { ManageMember } from "@/components/models/manageMemebers"
import { CreateChannelModal } from "../models/createChannel"
import { LeaveModal } from "../models/LeaveModel"
import { DeleteModal } from "../models/deleteServer"
import { MessageFileModal } from "../models/messageFilemodal"
import {DeleteMessageModal} from "../models/deletemessage"

export const ModelProvider=()=>{
    const [Mounted,setisMounted]=useState(false)

    useEffect(()=>{
      setisMounted(true)
    },[])

    if(!Mounted){
        return null
    }
    return <div>
        <CreateServerModal></CreateServerModal>
        <InviteModal></InviteModal>
        <EditServerModal></EditServerModal>
        <ManageMember></ManageMember>
         <CreateChannelModal></CreateChannelModal>
         <LeaveModal></LeaveModal>
         <DeleteModal></DeleteModal>
         <MessageFileModal></MessageFileModal>
         <DeleteMessageModal></DeleteMessageModal>
    </div>
}