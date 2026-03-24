"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Award, Download, HelpCircle } from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/brands", icon: Award, label: "Brands" },
  { href: "/download", icon: Download, label: "App" },
  { href: "/support", icon: HelpCircle, label: "Support" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 z-50 w-56 bg-[#7C6BF0] flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          B
          <span className="inline-block w-4 h-4 rounded-full border-2 border-white mx-0.5" />
          NDUM
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
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
  )
}
