"use client"

import { useState, useEffect } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { apiFetch } from "@/lib/api"
import { ShieldX } from "lucide-react"

export function WhitelistGate({ children }: { children: React.ReactNode }) {
  const { getAccessToken, ready, authenticated } = usePrivy()
  const [status, setStatus] = useState<"loading" | "allowed" | "blocked">("loading")

  useEffect(() => {
    if (!ready || !authenticated) return

    let cancelled = false

    async function check() {
      try {
        const token = await getAccessToken()
        if (!token || cancelled) return

        const res = await apiFetch<{ whitelisted: boolean; open?: boolean }>(
          "/coins/whitelist-check",
          { token },
        )

        if (!cancelled) {
          console.log("[WhitelistGate] response:", res)
          setStatus(res.whitelisted ? "allowed" : "blocked")
        }
      } catch (err) {
        console.error("[WhitelistGate] error:", err)
        if (!cancelled) setStatus("blocked")
      }
    }

    check()
    return () => { cancelled = true }
  }, [ready, authenticated, getAccessToken])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#7C6BF0] border-t-transparent" />
      </div>
    )
  }

  if (status === "blocked") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <ShieldX className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Access Restricted</h2>
          <p className="text-gray-600 mb-4">
            Coin creation is currently limited to approved brands. Contact us to request early access.
          </p>
          <a
            href="mailto:fede@bondum.xyz"
            className="inline-block px-6 py-3 bg-[#7C6BF0] text-white rounded-full font-medium hover:bg-[#6B5AD0] transition-colors"
          >
            Request Access
          </a>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
