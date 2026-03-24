import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PrivyProviderWrapper } from "@/components/auth/privy-provider"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Bondum - Blockchain Loyalty Platform",
  description:
    "Create and manage on-chain loyalty programs for your brand. Build customer loyalty with blockchain-powered tokens.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <PrivyProviderWrapper>
          <Sidebar />
          <div className="lg:ml-56 min-h-screen bg-[#F5F3FF]">
            <div className="p-4 sm:p-6 lg:p-8">
              <Header />
              <main>{children}</main>
            </div>
          </div>
          <Analytics />
        </PrivyProviderWrapper>
      </body>
    </html>
  )
}
