"use client"

import { useAuth } from "@/components/auth/privy-provider"

export function SignInButton() {
  const { ready, authenticated, login, logout, user } = useAuth()

  if (!ready) {
    return (
      <button
        disabled
        className="px-4 sm:px-6 py-2.5 rounded-full bg-[#7C6BF0] text-white font-medium opacity-50 cursor-not-allowed"
      >
        Loading...
      </button>
    )
  }

  if (authenticated) {
    const displayName = user?.email?.address
      ? user.email.address
      : user?.wallet?.address
        ? `${user.wallet.address.slice(0, 4)}...${user.wallet.address.slice(-4)}`
        : "User"

    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 hidden sm:inline">
          {displayName}
        </span>
        <button
          onClick={logout}
          className="px-4 sm:px-6 py-2.5 rounded-full border-2 border-[#7C6BF0] text-gray-800 font-medium hover:bg-[#7C6BF0]/10 transition-colors"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={login}
      className="px-4 sm:px-6 py-2.5 rounded-full bg-[#7C6BF0] text-white font-medium hover:bg-[#6B5AD0] transition-colors"
    >
      Sign In
    </button>
  )
}
