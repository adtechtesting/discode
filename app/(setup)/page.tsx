import { initalprofile } from "@/lib/inital-profile"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { Initalmodel } from "@/components/models/Inital-model"


const Setuppage = async() => {
    const profile=await initalprofile()
    const server=await db.server.findFirst({
      where:{
        members:{
            some:{
                profileId:profile.id
            }
        }
      }
    })
    if(server){
        return redirect(`/servers/${server.id}`)
    }
  return <Initalmodel></Initalmodel>
 
}

export default Setuppage
