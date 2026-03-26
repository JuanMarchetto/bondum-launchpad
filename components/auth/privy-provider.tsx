"use client"

import { createContext, useContext } from "react"
import { PrivyProvider, usePrivy } from "@privy-io/react-auth"

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID
const isPrivyConfigured =
  !!PRIVY_APP_ID && PRIVY_APP_ID !== "placeholder-privy-app-id"

type AuthContextValue = {
  ready: boolean
  authenticated: boolean
  login: () => void
  logout: () => Promise<void>
  user: any
}

const AuthContext = createContext<AuthContextValue>({
  ready: true,
  authenticated: false,
  login: () => {
    console.warn(
      "Privy is not configured. Set NEXT_PUBLIC_PRIVY_APP_ID in .env.local"
    )
  },
  logout: async () => {},
  user: null,
})

export function useAuth(): AuthContextValue {
  return useContext(AuthContext)
}

function PrivyAuthBridge({ children }: { children: React.ReactNode }) {
  const { ready, authenticated, login, logout, user } = usePrivy()
  return (
    <AuthContext.Provider value={{ ready, authenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function PrivyProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  if (!isPrivyConfigured) {
    return <>{children}</>
  }

  return (
    <PrivyProvider
      appId={PRIVY_APP_ID!}
      config={{
        loginMethods: ["email", "wallet"],
        appearance: {
          theme: "light",
          accentColor: "#7C6BF0",
          logo: "/b-logo.png",
        },
        embeddedWallets: {
          solana: {
            createOnLogin: "users-without-wallets",
          },
        },
      }}
    >
      <PrivyAuthBridge>{children}</PrivyAuthBridge>
    </PrivyProvider>
  )
}
