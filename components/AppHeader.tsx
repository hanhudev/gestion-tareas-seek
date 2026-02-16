"use client"

import { memo } from "react"
import { LogoutButton } from "@/features/auth/components/LogoutButton"
import { AppTitle } from "./AppTitle"

export const AppHeader = memo(function AppHeader() {
  return (
    <div className="flex flex-col-reverse sm:flex-row max-sm:gap-4 justify-between items-center sm:mb-14 mb-8">
      <AppTitle />
      <LogoutButton />
    </div>
  )
})
