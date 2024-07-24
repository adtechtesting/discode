"use client"

import qs from "query-string"
import { useForm } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Dialog,DialogContent,DialogFooter,DialogHeader,DialogTitle } from "../ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


import { useModalstore } from "@/hooks/useModalstore"
import { ChannelType } from "@prisma/client"
import { useEffect } from "react"


 const formSchema=z.object({
    name:z.string().min(1,{
        message:"channel name  is required"
    }).refine(name=>name !=="general",{
      message:"channel name cannot be 'general' "
    }),
    type:z.nativeEnum(ChannelType)
})

export const CreateChannelModal = () => {
    
    const {isOpen,onClose,type,data}=useModalstore()
    const router=useRouter()
    const params=useParams()

    const isModelOpen=isOpen && type ==="createChannel"
    const {channelType}=data;
   
      


    const form=useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            type:  channelType||ChannelType.TEXT
        
        }
    })

    useEffect(()=>{
   if(channelType){
    form.setValue("type",channelType)
   }else{
    form.setValue("type",ChannelType.TEXT)
   }
},[channelType,form])

  const isLoading=form.formState.isSubmitting

  const onSubmit=async (values:z.infer<typeof formSchema>)=>{
      try {
        const url=qs.stringifyUrl({
          url:"/api/channels",
          query:{
            serverId:params?.serverId
          }
        })
       await axios.post(url,values)
       form.reset()
       router.refresh()
        onClose()
      } catch (error) {
          console.log(error)
      }
  }

  const ishandleClose=()=>{
    form.reset()
    onClose()
  }
    


  return <Dialog open={isModelOpen} onOpenChange={ishandleClose}>
    <DialogContent className="bg-white overflow-hidden p-0 text-black">
        <DialogHeader className="pt-8 px-8">
            <DialogTitle className="font-bold text-2xl text-center">Create Channel</DialogTitle>
           
      
        </DialogHeader>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       <div className="space-y-8 px-6">
       
          <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-xs front-bold text-zinc-500 dark:text-secondary/70 pt-2 font-bold">Channel name</FormLabel>
              <FormControl>
                <Input disabled={isLoading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 " placeholder="enter channel name" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField control={form.control} name="type" render={({field})=>(
          <FormItem>
            <FormLabel>
              Channel Type
            </FormLabel>
            <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
              <SelectValue placeholder="Select a Channel Type"></SelectValue>
            </SelectTrigger>
          </FormControl>
          <SelectContent>
           {Object.values(ChannelType).map((type)=>(
               <SelectItem key={type} value={type} className="capitalize">
                {type.toLowerCase()}
               </SelectItem>
           ))}
          </SelectContent>
            </Select>
            <FormMessage>

            </FormMessage>
          </FormItem>
        )}>

        </FormField>
       </div>
       <DialogFooter className="bg-gray-100 px-6 py-4">
        <Button disabled={isLoading} variant="primary">Create</Button>
       </DialogFooter>
      </form>
    </Form>
    </DialogContent>
  </Dialog>
}

