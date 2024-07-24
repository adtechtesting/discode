"use client"


import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react";

interface ActionTooltipsProps{
    label:string;
    children:React.ReactNode;
    side?:"top"|"right"|"left"|"bottom";
    align?:"start"|"center"|"end"
}

export const Addtool = ({label,children,side,align}:ActionTooltipsProps) => {
  return (
     <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
         {children}
        </TooltipTrigger>
        <TooltipContent align={align} side={side}>
          <p className="font-semibold text-sm capitalize">{label.toLowerCase()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
