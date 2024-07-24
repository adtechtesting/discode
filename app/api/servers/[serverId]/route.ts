import { CurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {
    params
}:{params:{serverId:string}}){
     
    
    
    try {
        const profile=await CurrentProfile()
         
      
        if(!profile){
            return new NextResponse("unauthorized",{status:401})
        }
        const {name,imageUrl}= await req.json()  
        const server=await db.server.update({
            where:{
                id:params.serverId,
                profileId:profile.id
            },
            data:{
               name,
               imageUrl
            }
        })

        if(!server){
            return new NextResponse("server not found ",{status:403})
        }

        return NextResponse.json(server)
    } catch (error) {
         console.log(error)
                return new NextResponse("unauthorized",{status:500})
    }
    
}

export async function DELETE(
    req:Request,
    {
    params
}:{params:{serverId:string}}){
     
    
    
    try {
        const profile=await CurrentProfile()
         
      
        if(!profile){
            return new NextResponse("unauthorized",{status:401})
        }
       
        const server=await db.server.delete({
            where:{
                id:params.serverId,
                profileId:profile.id
            }
        })

        if(!server){
            return new NextResponse("server not found ",{status:403})
        }

        return NextResponse.json(server)
    } catch (error) {
         console.log(error)
                return new NextResponse("unauthorized",{status:500})
    }
    
}