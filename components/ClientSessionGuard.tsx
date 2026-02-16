"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function ClientSessionGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login")
      router.refresh()
    }
  }, [status, router])

  if (status === "loading" || status === "unauthenticated") {
    return null
  }

  return <>{children}</>
}
