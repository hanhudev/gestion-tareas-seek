"use client"

import { memo } from "react"
import { cn } from "@/lib/utils"

interface AppTitleProps {
  className?: string
}

export const AppTitle = memo(function AppTitle({ className }: AppTitleProps) {
  return (
    <h1 className={cn(
      "text-3xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent",
      className
    )}>
      Gestor de Tareas
    </h1>
  )
})
