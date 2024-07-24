"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

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
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "../ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { FileUploader } from "../FileUploader"


 const formSchema=z.object({
    name:z.string().min(1,{
        message:"server is required"
    }),
    imageUrl:z.string().min(1,{
        message:"server image is required"
    })
})

export const Initalmodel = () => {
    
    const [isMounted,setIsMounted]=useState(false)
    const router=useRouter()

    useEffect(()=>{
     setIsMounted(true)
    },[])

    const form=useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            imageUrl:""
        }
    })

  const isLoading=form.formState.isSubmitting

  const onSubmit=async (values:z.infer<typeof formSchema>)=>{
      try {
       await axios.post("/api/servers",values)
       form.reset()
       router.refresh()
       window.location.reload()
      } catch (error) {
          console.log(error)
      }
  }
    
  if(!isMounted){
    return null
  }

  return <Dialog open>
    <DialogContent className="bg-white overflow-hidden p-0 text-black">
        <DialogHeader className="pt-8 px-8">
            <DialogTitle className="font-bold text-2xl text-center">Customize your Server</DialogTitle>
           <DialogDescription className="text-center text-zinc-500">Give your server a personality with name and image.You can always change it later</DialogDescription>
      
        </DialogHeader>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       <div className="space-y-8">
        <div className="flex items-center justify-center text-center">
          <FormField control={form.control} name="imageUrl" render={({field})=>(
            <FormItem>
              <FormControl>
                <FileUploader endpoint="serverImage" value={field.value} onChange={field.onChange}></FileUploader>
              </FormControl>
            </FormItem>
          )} >

          </FormField>
        </div>
          <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-xs front-bold text-zinc-500 dark:text-secondary/70 pt-2 font-bold">Server name</FormLabel>
              <FormControl>
                <Input disabled={isLoading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 " placeholder="enter the server" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
       </div>
       <DialogFooter className="bg-gray-100 px-6 py-4">
        <Button disabled={isLoading} variant="primary">Create</Button>
       </DialogFooter>
      </form>
    </Form>
    </DialogContent>
  </Dialog>
}

