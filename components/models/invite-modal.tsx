"use client"


import axios from "axios"
import { useOrigin } from "@/hooks/useOrigin"
import { Dialog,DialogContent,DialogHeader,DialogTitle } from "../ui/dialog"

import { useModalstore } from "@/hooks/useModalstore"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Check, Copy, RefreshCw } from "lucide-react"
import { Button } from "../ui/button"

import { useState } from "react"





export const InviteModal = () => {
    
    const {onOpen,isOpen,onClose,type,data}=useModalstore()
  
     const origin=useOrigin();
      const {server}=data;
    const isModelOpen=isOpen && type ==="invite"
   

    const [copied,setcopied]=useState(false)
    const [loading,setloading]=useState(false)

    const inviteUrl=`${origin}/invite/${server?.invitecode }`
    const copyUrl=()=>{
      navigator.clipboard.writeText(inviteUrl)
      setcopied(true)
       

      setTimeout(() => {
         setcopied(false)
      }, 1000);
    }

    const newUrl=async ()=>{
      try {
        setloading(true)

        const response=await axios.patch(`/api/servers/${server?.id}/invitecode`)
         onOpen("invite",{server:response.data})
      } catch (error) {
        console.log(error)
      }finally{
        setloading(false)
      }
    }
    
    return <Dialog open={isModelOpen} onOpenChange={onClose}>
    <DialogContent className="bg-white overflow-hidden p-0 text-black">
        <DialogHeader className="pt-8 px-8">
            <DialogTitle className="font-bold text-2xl text-center">Invite Friends</DialogTitle>
           
      
        </DialogHeader>
          <div className="p-6">
             <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
               Server Link
             </Label>
             <div className="flex items-center mt-2 gap-x-2">
              <Input disabled={loading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black
               focus-visible:ring-offset-0 " value={inviteUrl}></Input>
               <Button disabled={loading} onClick={copyUrl} size="icon">
                 {copied  ? <Check className="w-4 h-4"></Check> :  <Copy className="w-4 h-4"></Copy>}
               </Button>
             </div>
             <Button onClick={newUrl} disabled={loading} variant="link" size="sm" className="text-xs text-zinc-500 mt-4">
                 Generate a new Link
               <RefreshCw className="h-4 w-4 ml-2"></RefreshCw>
             </Button>
          </div>
    </DialogContent>
  </Dialog>
}

