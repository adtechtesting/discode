import { CurrentProfile } from "@/lib/current-profile";
import {v4 as uuidv4} from "uuid"
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(req:Request){
    try {
       const {name,imageUrl}=await req.json()
       
       const profile=await CurrentProfile()
       if(!profile){
        return new NextResponse("unauthrized",{status:401})
       }
       const server=await db.server.create({
        data:{
            profileId:profile.id,
            name,
            imageUrl,
            invitecode:uuidv4(),
            channel:{
                create:[
                    {
                        name:"general",profileId:profile.id
                    }
                ]
            },
            members:{
                create:[
                    {profileId:profile.id,role:MemberRole.ADMIN}
                ]
            }
        }
       })
       return NextResponse.json(server)

    } catch (error) {
         console.log("internal error",error)
         return NextResponse.json("not create server",{status:401})
    }
}