import { NextResponse } from "next/server";
import { CurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import {v4 as uuidv4} from "uuid"
export async function PATCH(
    req:Request,
    {params}:{params:{serverId:string}}
){
   try {
       const profile=await CurrentProfile()
       if(!profile){
        return new NextResponse("unauthorized",{status:401})
       }

       if(!params.serverId){
         return new NextResponse("server id miss",{status:400})
       }

      const server=await db.server.update({
        where:{
            id:params.serverId,
            profileId:profile.id
        },
        data:{
            invitecode:uuidv4()
        }
      })

      if(!server){
        return new NextResponse("not  founding url",{status:403})
      }

      return NextResponse.json(server)
   } catch (error) {
    console.log(error)
            return new NextResponse("internal error",{status:500})
   }
}