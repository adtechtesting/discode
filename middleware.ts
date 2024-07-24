import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
      
});

export const config = {
  images:{
    domain:[
       "uploadthing.com"
    ]
  },
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};