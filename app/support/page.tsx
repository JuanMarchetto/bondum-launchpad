import { HelpCircle, Mail, MessageCircle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Support - Bondum",
  description: "Get help with Bondum loyalty coins and the platform.",
}

const faqs = [
  {
    q: "What is a loyalty coin?",
    a: "A loyalty coin is an SPL token on the Solana blockchain that brands create to reward their customers. Think of it like a digital loyalty card, but on-chain.",
  },
  {
    q: "How much does it cost to create a coin?",
    a: "Creating a coin costs approximately 0.05 SOL in network fees. This covers the on-chain account creation and token initialization.",
  },
  {
    q: "Can I change my coin after deployment?",
    a: "No. The coin name, ticker, total supply, and decimals are permanent once deployed on Solana. Make sure to review everything carefully before deploying.",
  },
  {
    q: "How do customers earn my loyalty tokens?",
    a: "Customers earn tokens through the Bondum mobile app when they make purchases at your business. You define the rewards and discounts.",
  },
  {
    q: "What wallet do I need?",
    a: "Bondum uses Privy for authentication, which can create an embedded Solana wallet for you automatically. You can also connect an existing Solana wallet like Phantom.",
  },
]

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Support</h1>
      <p className="text-gray-600 mb-8">Find answers to common questions or reach out to our team.</p>

      <div className="space-y-4 mb-12">
        {faqs.map((faq) => (
          <div key={faq.q} className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
            <div className="flex items-start gap-3">
              <HelpCircle size={20} className="text-[#7C6BF0] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-[#7C6BF0] p-8 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Still need help?</h3>
        <p className="opacity-90 mb-6">Our team is here to help you get started.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:support@bondum.xyz"
            className="px-6 py-3 bg-white text-[#7C6BF0] rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            <Mail size={18} /> Email Support
          </a>
          <a
            href="#"
            className="px-6 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} /> Discord Community
          </a>
        </div>
      </div>
    </div>
  )
}
