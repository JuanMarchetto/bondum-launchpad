"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, User, Award, Download, HelpCircle, Menu, X } from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/brands", icon: Award, label: "Brands" },
  { href: "/download", icon: Download, label: "App" },
  { href: "/support", icon: HelpCircle, label: "Support" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <button
        className="lg:hidden text-gray-600"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 bg-[#7C6BF0] flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo + close */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/b-logo.png" alt="Bondum" width={32} height={32} />
            <span className="text-xl font-bold text-white tracking-wide">BONDUM</span>
          </div>
          <button
            className="text-white"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all ${
                  isActive
                    ? "bg-white text-gray-800 shadow-md"
                    : "text-white hover:bg-white/20"
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
