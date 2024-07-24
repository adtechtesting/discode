import {db} from "@/lib/db" ;


export const  GetorNewconver=async(memberoneId:string,   membertwoId:string)=>{
   let conversation=await findConversation(memberoneId,membertwoId) ||await findConversation(membertwoId,memberoneId);

   if(!conversation){
      conversation=await NewConversation(memberoneId,membertwoId);
   }

   return conversation;
}

const findConversation=async(memberOne:string,memberTwo:string)=>{
  try {
    return await db.conversation.findFirst({
      where:{
         AND:[
            {memberoneId:memberOne},
            {membertwoId:memberTwo}
         ]
      },
      include:{
         memberone:{
            include:{
               profile:true
            }
         },
         membertwo:{
            include:{
               profile:true
            }
         }
      }
   });

  } catch (error) {
     console.log(error)
  }
  
}
 const NewConversation=async( memberoneId:string,   membertwoId:string)=>{
      try {
       return await db.conversation.create({
               data:{
                  memberoneId,
                  membertwoId,
               },
               include:{
                memberone:{
                  include:{
                     profile:true
                  }
                },
                membertwo:{
                  include:{
                     profile:true
                  }
                }
               }
         })
      } catch(error) {
        console.log(error) ;
      }
   }