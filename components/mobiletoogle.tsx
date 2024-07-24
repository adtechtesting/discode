import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { NavigationSidebar } from "./navigation/NavigationSidebar"
import { ServerSidebar } from "./server/ServerSidebar"



export const Mobiletoogle = ({serverId}:{serverId:string}) => { 
  return (
  <Sheet>
    <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" >
            <Menu/>
        </Button>
    </SheetTrigger>
    <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-[72px]">
         <NavigationSidebar></NavigationSidebar>
        </div>
        <ServerSidebar serverId={serverId}></ServerSidebar>
    </SheetContent>
  </Sheet>
  )
}

