"use client"

import { useEffect } from "react"
import { useAuth } from "@/components/auth/privy-provider"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { ready, authenticated, login } = useAuth()

  useEffect(() => {
    if (ready && !authenticated) {
      login()
    }
  }, [ready, authenticated, login])

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#7C6BF0] border-t-transparent" />
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#7C6BF0] border-t-transparent mx-auto mb-4" />
          <p className="text-gray-500">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
