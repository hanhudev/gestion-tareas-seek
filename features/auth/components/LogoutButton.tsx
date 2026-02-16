"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

import { memo } from "react"

export const LogoutButton = memo(function LogoutButton() {
  return (
    <Button 
      variant="outline" 
      onClick={() => signOut({ callbackUrl: "/auth/login" })}
      className="gap-2 self-end"
    >
      <LogOut className="h-4 w-4" />
      Cerrar Sesión
    </Button>
  )
})
