import {createUploadthing,type FileRouter} from  "uploadthing/next"
import  {auth}  from "@clerk/nextjs/server"

const f = createUploadthing();
 
const handleauth=()=>{
    const {userId}=auth()
    if(!userId) throw new Error("unauthorized")
        return {UserId:userId}
}
 

export const ourFileRouter = {
  
    serverImage:f({image:{maxFileSize:"4MB",maxFileCount:1}})
    .middleware(()=>handleauth())
    .onUploadComplete(()=>{}),

    messagefile:f(["image","pdf"])
    .middleware(()=>handleauth())
    .onUploadComplete(()=>{})
} satisfies FileRouter
 
export type OurFileRouter = typeof ourFileRouter;