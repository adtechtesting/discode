"use client"



import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "../ui/dialog"

import { useModalstore } from "@/hooks/useModalstore"

import { Button } from "../ui/button"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"






export const DeleteModal = () => {
     const router=useRouter()
    const {isOpen,onClose,type,data}=useModalstore()
  
      const {server}=data;
    const isModelOpen=isOpen && type ==="deleteServer"
   

 
    const [loading,setloading]=useState(false)

     const onClick=async()=>{
      try {
        setloading(true)
        
        axios.delete(`/api/servers/${server?.id} `)
          onClose()
          router.refresh()
          router.push("/")
      } catch (error) {
         console.log(error)
      }finally{
          setloading(false)
      }
     }
 
    
    return <Dialog open={isModelOpen} onOpenChange={onClose}>
    <DialogContent className="bg-white overflow-hidden p-0 text-black">
        <DialogHeader className="pt-8 px-8">
            <DialogTitle className="font-bold text-2xl text-center">Delete Server</DialogTitle>
             <DialogDescription className="text-center text-zinc-500">Are you sure you want to delete  <br /> <span className="font-semibold text-indigo-500">{server?.name}</span> Server permanent.</DialogDescription>
      
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
           <div className="flex items-center justify-between w-full ">
              <Button disabled={loading} variant="ghost" onClick={()=>{
             onClose
              }}>
                 Cancel
              </Button>

              <Button variant="destructive" className=" text-white " onClick={onClick} disabled={loading} >
               Delete Server
              </Button>
           </div>
        </DialogFooter>
    </DialogContent>
  </Dialog>
}

