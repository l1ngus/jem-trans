import { cn } from "@/lib/utils"
import { ClassValue } from "clsx"
import type { ReactNode } from "react"

interface GroupWrapperProps {
  children: ReactNode
  className?: ClassValue
}

export default ({ children, className }: GroupWrapperProps) => {
  return (
    <div className={cn([
      "flex flex-col gap-2",
      className
    ])}>
      {children}
    </div>
  )
}
