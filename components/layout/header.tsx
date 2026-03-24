"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { MobileNav } from "@/components/layout/mobile-nav"
import { SignInButton } from "@/components/auth/sign-in-button"

export function Header() {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <MobileNav />
        <div className="flex-1 sm:flex-none sm:w-96 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for loyalty coins..."
            className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <Link
          href="/create-coin"
          className="px-4 sm:px-6 py-2.5 rounded-full border-2 border-[#7C6BF0] text-gray-800 font-medium hover:bg-[#7C6BF0]/10 transition-colors"
        >
          Create Coin
        </Link>
        <SignInButton />
      </div>
    </header>
  )
}
