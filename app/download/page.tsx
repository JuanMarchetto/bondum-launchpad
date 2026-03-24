import { Smartphone } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Download the App - Bondum",
  description: "Download the Bondum app to collect and redeem loyalty tokens.",
}

export default function DownloadPage() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="w-24 h-24 rounded-full bg-[#7C6BF0]/10 flex items-center justify-center mx-auto mb-6">
        <Smartphone size={48} className="text-[#7C6BF0]" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Get the Bondum App</h1>
      <p className="text-gray-600 mb-8">
        Collect, manage, and redeem your loyalty tokens directly from your phone.
        Available for iOS and Android.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <a
          href="#"
          className="px-8 py-4 bg-black text-white rounded-2xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-3"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          App Store
        </a>
        <a
          href="#"
          className="px-8 py-4 bg-black text-white rounded-2xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-3"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M3.18 23.73c-.41-.2-.68-.6-.68-1.03V1.29c0-.45.3-.87.73-1.05l11.26 11.26L3.18 23.73zm1.81-1.07L15.92 11.5 5 .34v22.32zm13.7-10.19l-2.39-1.34L18.88 8.5l3.24 1.82c.67.37.67 1 0 1.37l-3.24 1.82-2.58-2.63 2.39-1.41zM5.97 0l10.7 6.01-2.58 2.63L5.97 0z" />
          </svg>
          Google Play
        </a>
      </div>
      <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-8">
        <h3 className="font-bold text-gray-800 mb-4">What you can do with the app</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          {[
            { title: "Collect Tokens", desc: "Earn loyalty tokens from your favorite brands" },
            { title: "Track Rewards", desc: "Monitor your token balances and available discounts" },
            { title: "Redeem Benefits", desc: "Use tokens to unlock exclusive discounts and perks" },
          ].map((f) => (
            <div key={f.title}>
              <h4 className="font-medium text-gray-800 mb-1">{f.title}</h4>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
