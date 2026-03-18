"use client"

import { useState } from "react"
import {
  Home,
  User,
  Award,
  Download,
  HelpCircle,
  Search,
  Globe,
  Instagram,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  TrendingUp,
  Users,
  Gift,
  Target,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react"

// Types
type Screen =
  | "home"
  | "profile"
  | "brands"
  | "app"
  | "support"
  | "create-coin"
  | "create-coin-2"
  | "create-coin-3"
  | "coin-detail"
  | "sign-in"

type ProfileTab = "balances" | "discounts" | "clients"

// Mock Data
const trendingCoins = [
  {
    id: 1,
    name: "$BONDUM",
    value: "150k",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bondum%20-%20Launchpad_page-0001-ACijW2t4KuJmFw2JEJsrB9NV7sAvFL.jpg",
  },
  {
    id: 2,
    name: "$PANICAFE",
    value: "110k",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bondum%20-%20Launchpad_page-0007-WLWC0dOtaXyMwtSHbLDQGNuaoBrAib.jpg",
  },
]

const categories = ["Food", "Restaurants", "Coffee Shops", "Health", "Travel", "Entertainment", "Gaming"]

const brandCoins = [
  { id: 1, name: "Panicafe Coin", ticker: "$PANICAFE", holders: 5500, hasLogo: true },
  { id: 2, name: "Brand Coin", ticker: "$BRAND", holders: 1000, hasLogo: false },
  { id: 3, name: "Brand Coin", ticker: "$BRAND", holders: 1000, hasLogo: false },
  { id: 4, name: "Brand Coin", ticker: "$BRAND", holders: 1000, hasLogo: false },
  { id: 5, name: "Brand Coin", ticker: "$BRAND", holders: 1000, hasLogo: false },
  { id: 6, name: "Brand Coin", ticker: "$BRAND", holders: 1000, hasLogo: false },
]

const discounts = [
  { id: 1, name: "10% Off", tokens: "10,000 $PANICAFE", active: true },
  { id: 2, name: "Free Coffee", tokens: "15,000 $PANICAFE", active: false },
  { id: 3, name: "25% Off", tokens: "20,000 $PANICAFE", active: true },
]

const clients = [
  { wallet: "7xR4...mK9p", buys: 28, discounts: 7 },
  { wallet: "3kT8...nL2q", buys: 21, discounts: 6 },
  { wallet: "9pW5...jR7v", buys: 14, discounts: 4 },
  { wallet: "2mN6...hS4x", buys: 9, discounts: 3 },
]

const balances = [
  { name: "BONDUM", amount: "1,000,000", icon: "B", color: "bg-[#7C6BF0]" },
  { name: "PANICAFE", amount: "500,000", icon: "P", color: "bg-amber-100 border-2 border-amber-300" },
  { name: "USDC", amount: "1,000", icon: "$", color: "bg-blue-500" },
]

const rewards = [
  { name: "10% Off Next Purchase", tokens: "10,000 $PANICAFE" },
  { name: "Free Coffee", tokens: "15,000 $PANICAFE" },
  { name: "25% Off Order", tokens: "20,000 $PANICAFE" },
  { name: "Exclusive Merch", tokens: "50,000 $PANICAFE" },
]

export default function BondumApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [profileTab, setProfileTab] = useState<ProfileTab>("balances")
  const [selectedCategory, setSelectedCategory] = useState("Coffee Shops")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showSignInModal, setShowSignInModal] = useState(false)
  const [copied, setCopied] = useState(false)

  // Create Coin Form State
  const [coinForm, setCoinForm] = useState({
    name: "",
    ticker: "",
    description: "",
    slogan: "",
    locations: "",
    socials: "",
    totalSupply: "1000000",
    decimals: "9",
    distribution: "reward-only",
  })

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen)
    setSidebarOpen(false)
  }

  // Sidebar Component
  const Sidebar = () => (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-56 bg-[#7C6BF0] flex flex-col transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            B<span className="inline-block w-4 h-4 rounded-full border-2 border-white mx-0.5" />
            NDUM
          </h1>
          <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: "home" as Screen, icon: Home, label: "Home" },
            { id: "profile" as Screen, icon: User, label: "Profile" },
            { id: "brands" as Screen, icon: Award, label: "Brands" },
            { id: "app" as Screen, icon: Download, label: "App" },
            { id: "support" as Screen, icon: HelpCircle, label: "Support" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all ${
                currentScreen === item.id ||
                (item.id === "profile" && currentScreen === "coin-detail") ||
                (item.id === "home" && currentScreen.startsWith("create-coin"))
                  ? "bg-white text-gray-800 shadow-md"
                  : "text-white hover:bg-white/20"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  )

  // Header Component
  const Header = () => (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <button className="lg:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
        <div className="flex-1 sm:flex-none sm:w-96 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for loyalty coins..."
            className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <button
          onClick={() => navigate("create-coin")}
          className="px-4 sm:px-6 py-2.5 rounded-full border-2 border-[#7C6BF0] text-gray-800 font-medium hover:bg-[#7C6BF0]/10 transition-colors"
        >
          Create Coin
        </button>
        <button
          onClick={() => setShowSignInModal(true)}
          className="px-4 sm:px-6 py-2.5 rounded-full bg-[#7C6BF0] text-white font-medium hover:bg-[#6B5AD0] transition-colors"
        >
          Sign In
        </button>
      </div>
    </header>
  )

  // Sign In Modal
  const SignInModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowSignInModal(false)}>
      <div className="bg-[#7C6BF0] rounded-3xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold text-white text-center mb-6">Connect or create wallet</h2>

        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
            <span className="text-4xl font-bold text-[#7C6BF0]">B</span>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 px-6 py-4 bg-white rounded-xl hover:bg-gray-50 transition-colors">
            <User size={24} className="text-gray-600" />
            <span className="font-medium">Login with email</span>
          </button>

          <div className="flex items-center gap-4 text-white/70">
            <div className="flex-1 h-px bg-white/30" />
            <span>or</span>
            <div className="flex-1 h-px bg-white/30" />
          </div>

          <button className="w-full flex items-center gap-3 px-6 py-4 bg-white rounded-xl hover:bg-gray-50 transition-colors">
            <div className="w-6 h-6 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">👻</span>
            </div>
            <span className="font-medium">Phantom</span>
          </button>

          <button className="w-full flex items-center gap-3 px-6 py-4 bg-white rounded-xl hover:bg-gray-50 transition-colors">
            <div className="w-6 h-6 border-2 border-gray-300 rounded" />
            <span className="font-medium">More wallets</span>
          </button>
        </div>
      </div>
    </div>
  )

  // Home Screen
  const HomeScreen = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Trending Coins</h2>

      {/* Trending Carousel */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {trendingCoins.map((coin) => (
          <div
            key={coin.id}
            onClick={() => navigate("coin-detail")}
            className="flex-shrink-0 w-64 h-40 rounded-2xl overflow-hidden relative cursor-pointer hover:shadow-lg transition-shadow bg-gray-200"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-2xl font-bold">{coin.value}</p>
              <p className="text-sm opacity-90">{coin.name}</p>
            </div>
          </div>
        ))}
        <div className="flex-shrink-0 w-64 h-40 rounded-2xl bg-gray-300" />
        <div className="flex-shrink-0 w-64 h-40 rounded-2xl bg-gray-300" />
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-shrink-0 px-5 py-2 rounded-full border-2 transition-colors ${
              selectedCategory === cat
                ? "bg-[#7C6BF0] text-white border-[#7C6BF0]"
                : "border-[#7C6BF0]/30 text-gray-700 hover:border-[#7C6BF0]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Coin Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brandCoins.map((coin) => (
          <div
            key={coin.id}
            onClick={() => navigate("coin-detail")}
            className="flex items-center gap-4 p-4 rounded-2xl border-2 border-[#7C6BF0]/30 cursor-pointer hover:border-[#7C6BF0] hover:shadow-md transition-all"
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${coin.hasLogo ? "bg-amber-100 border-2 border-amber-300" : "border-2 border-[#7C6BF0]/30"}`}
            >
              {coin.hasLogo && <span className="text-2xl font-bold text-amber-700">P$</span>}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{coin.name}</h3>
              <p className="text-gray-500 text-sm">{coin.ticker}</p>
              <p className="text-gray-600 text-sm">Loyalty Holders: {coin.holders.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Coin Detail Screen (NEW)
  const CoinDetailScreen = () => (
    <div>
      <button onClick={() => navigate("home")} className="flex items-center gap-2 text-[#7C6BF0] mb-6 hover:underline">
        <ChevronLeft size={20} />
        Back to Home
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Brand Header */}
          <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center">
                <span className="text-3xl font-bold text-amber-700">P$</span>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800">Panicafe</h1>
                <p className="text-gray-500 italic mb-3">{'"momento di piacere"'}</p>
                <div className="flex gap-3">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Globe size={20} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Instagram size={20} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <span className="font-bold">𝕏</span>
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <MapPin size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Holder Growth Chart */}
          <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Holder Growth</h3>
            <div className="h-48 flex items-end gap-2">
              {[40, 55, 45, 60, 75, 65, 80, 90, 85, 95, 88, 100].map((height, i) => (
                <div key={i} className="flex-1 bg-[#7C6BF0]/20 rounded-t-lg relative group">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-[#7C6BF0] rounded-t-lg transition-all"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>

          {/* Available Rewards */}
          <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Available Rewards</h3>
            <div className="space-y-3">
              {rewards.map((reward, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#F5F3FF] rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">{reward.name}</p>
                    <p className="text-sm text-gray-500">{reward.tokens}</p>
                  </div>
                  <button className="px-4 py-2 bg-[#7C6BF0] text-white rounded-full text-sm hover:bg-[#6B5AD0] transition-colors">
                    Redeem
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Locations</h3>
            <div className="flex flex-wrap gap-2">
              {["Argentina", "Spain", "USA"].map((loc) => (
                <span key={loc} className="px-4 py-2 bg-[#F5F3FF] rounded-full text-gray-700">
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Token Info */}
          <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Token Info</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Market Cap</p>
                <p className="text-xl font-bold text-gray-800">$110,000</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Holders</p>
                <p className="text-xl font-bold text-gray-800">5,500</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">24h Change</p>
                <p className="text-xl font-bold text-green-500">+12.5%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Supply</p>
                <p className="text-xl font-bold text-gray-800">1,000,000</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Decimals</p>
                <p className="text-xl font-bold text-gray-800">9</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mint Address</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm text-gray-600 bg-[#F5F3FF] px-2 py-1 rounded">7xR4...mK9p</code>
                  <button onClick={() => handleCopy("7xR4...mK9p")} className="text-[#7C6BF0] hover:text-[#6B5AD0]">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Download CTA */}
          <div className="rounded-2xl bg-[#7C6BF0] p-6 text-white text-center">
            <h3 className="font-bold mb-2">Get the Bondum App</h3>
            <p className="text-sm opacity-90 mb-4">Collect and redeem loyalty tokens</p>
            <button className="w-full py-3 bg-white text-[#7C6BF0] rounded-full font-medium hover:bg-gray-100 transition-colors">
              Download App
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // Profile Screen with Analytics
  const ProfileScreen = () => (
    <div>
      {/* Profile Card */}
      <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center">
            <span className="text-3xl font-bold text-amber-700">P$</span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">Panicafe</h1>
            <p className="text-gray-500 italic mb-3">{'"momento di piacere"'}</p>
            <div className="flex gap-3">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Globe size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Instagram size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <span className="font-bold">𝕏</span>
              </button>
            </div>
          </div>
          <button className="px-6 py-2.5 bg-[#7C6BF0] text-white rounded-lg font-medium hover:bg-[#6B5AD0] transition-colors">
            Promote your brand
          </button>
        </div>
      </div>

      {/* Analytics Stats Row (NEW) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#7C6BF0]/10 flex items-center justify-center">
              <TrendingUp className="text-[#7C6BF0]" size={20} />
            </div>
            <p className="text-sm text-gray-500">Market Cap</p>
          </div>
          <p className="text-2xl font-bold text-gray-800">$110k</p>
        </div>
        <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#7C6BF0]/10 flex items-center justify-center">
              <Users className="text-[#7C6BF0]" size={20} />
            </div>
            <p className="text-sm text-gray-500">Holders</p>
          </div>
          <p className="text-2xl font-bold text-gray-800">5,500</p>
        </div>
        <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#7C6BF0]/10 flex items-center justify-center">
              <Gift className="text-[#7C6BF0]" size={20} />
            </div>
            <p className="text-sm text-gray-500">Rewards Redeemed</p>
          </div>
          <p className="text-2xl font-bold text-gray-800">1,247</p>
        </div>
        <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#7C6BF0]/10 flex items-center justify-center">
              <Target className="text-[#7C6BF0]" size={20} />
            </div>
            <p className="text-sm text-gray-500">Retention Rate</p>
          </div>
          <p className="text-2xl font-bold text-gray-800">87.3%</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b-2 border-gray-200 mb-6">
        {(["balances", "discounts", "clients"] as ProfileTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setProfileTab(tab)}
            className={`pb-3 font-medium capitalize transition-colors ${
              profileTab === tab ? "text-[#7C6BF0] border-b-2 border-[#7C6BF0] -mb-0.5" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "discounts" ? "Manage Discounts" : tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {profileTab === "balances" && (
        <div>
          <p className="text-gray-500 italic mb-4">Coins</p>
          <div className="space-y-3">
            {balances.map((bal) => (
              <div key={bal.name} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${bal.color} flex items-center justify-center text-white font-bold`}>
                  {bal.icon}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{bal.name}</p>
                  <p className="text-gray-500">{bal.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {profileTab === "discounts" && (
        <div>
          <div className="flex justify-end mb-4">
            <button className="px-6 py-2.5 bg-[#7C6BF0] text-white rounded-lg font-medium hover:bg-[#6B5AD0] transition-colors">
              Create New Discount
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Discount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Tokens Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Active</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((disc) => (
                  <tr key={disc.id} className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-800">{disc.name}</td>
                    <td className="py-4 px-4 text-gray-600">{disc.tokens}</td>
                    <td className="py-4 px-4">
                      <div
                        className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${disc.active ? "bg-[#7C6BF0]" : "bg-gray-300"}`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${disc.active ? "right-1" : "left-1"}`}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button className="px-4 py-1.5 bg-[#7C6BF0] text-white rounded-lg text-sm hover:bg-[#6B5AD0] transition-colors">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {profileTab === "clients" && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Wallet Address</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">Buys</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">Discount Redeemed</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <code className="text-sm text-gray-600 bg-[#F5F3FF] px-2 py-1 rounded">{client.wallet}</code>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-600">{client.buys}</td>
                  <td className="py-4 px-4 text-center text-gray-600">{client.discounts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )

  // Brands Screen
  const BrandsScreen = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Brands in Bondum</h2>
      <p className="text-gray-600 mb-6">Explore brands building their on-chain loyalty programs</p>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-shrink-0 px-5 py-2 rounded-full border-2 transition-colors ${
              selectedCategory === cat
                ? "bg-[#7C6BF0] text-white border-[#7C6BF0]"
                : "border-[#7C6BF0]/30 text-gray-700 hover:border-[#7C6BF0]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Brand Card */}
      <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-24 h-24 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center flex-shrink-0">
            <span className="text-3xl font-bold text-amber-700">P$</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div />
              <div className="flex gap-3">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Globe size={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Instagram size={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <span className="font-bold">𝕏</span>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <MapPin size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <p>
                <span className="font-bold">Company:</span> Panicafe
              </p>
              <p>
                <span className="font-bold">Slogan:</span> <span className="italic">{'"momento di piacere"'}</span>
              </p>
              <p>
                <span className="font-bold">Description:</span> Panicafé is a café known for offering a cozy atmosphere
                and a selection of high-quality coffee, fresh pastries, and light meals.
              </p>
              <p>
                <span className="font-bold">Locations:</span> Argentina, Spain, USA
              </p>
              <p>
                <span className="font-bold">Coin:</span> $PANICAFE
              </p>
              <p>
                <span className="font-bold">Marketcap:</span> 110k
              </p>
              <p>
                <span className="font-bold">Holders:</span> 5,500
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // App Download Screen
  const AppScreen = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Get the Bondum App</h2>
      <p className="text-gray-600 mb-6">Collect loyalty tokens from your favorite brands with our wallet.</p>

      <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-gray-500">Scan to download</span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <div className="text-center">
                <div className="inline-block p-4 bg-black text-white rounded-xl mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl"></span>
                    <div className="text-left">
                      <p className="text-xs">Download on the</p>
                      <p className="font-semibold">App Store</p>
                    </div>
                  </div>
                </div>
                <div className="w-32 h-32 bg-gray-100 mx-auto rounded-xl flex items-center justify-center">
                  <div className="w-24 h-24 bg-gray-300 rounded" />
                </div>
              </div>

              <div className="text-center">
                <div className="inline-block p-4 bg-black text-white rounded-xl mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">▶</span>
                    <div className="text-left">
                      <p className="text-xs">Get it on</p>
                      <p className="font-semibold">Google Play</p>
                    </div>
                  </div>
                </div>
                <div className="w-32 h-32 bg-gray-100 mx-auto rounded-xl flex items-center justify-center">
                  <div className="w-24 h-24 bg-gray-300 rounded" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-48 h-96 bg-[#7C6BF0] rounded-3xl transform -rotate-6 shadow-xl" />
              <div className="w-48 h-96 bg-white rounded-3xl transform rotate-6 absolute top-4 left-8 shadow-xl border border-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Support Screen
  const SupportScreen = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Support</h2>
      <p className="text-gray-600 mb-6">How can we help you today?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6 hover:border-[#7C6BF0] transition-colors cursor-pointer">
          <h3 className="font-bold text-gray-800 mb-2">Getting Started</h3>
          <p className="text-gray-600">Learn how to create your first loyalty coin and set up rewards.</p>
        </div>
        <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6 hover:border-[#7C6BF0] transition-colors cursor-pointer">
          <h3 className="font-bold text-gray-800 mb-2">FAQ</h3>
          <p className="text-gray-600">Find answers to commonly asked questions.</p>
        </div>
        <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6 hover:border-[#7C6BF0] transition-colors cursor-pointer">
          <h3 className="font-bold text-gray-800 mb-2">Contact Us</h3>
          <p className="text-gray-600">Reach out to our support team for personalized help.</p>
        </div>
        <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6 hover:border-[#7C6BF0] transition-colors cursor-pointer">
          <h3 className="font-bold text-gray-800 mb-2">Documentation</h3>
          <p className="text-gray-600">Technical documentation for developers and integrators.</p>
        </div>
      </div>
    </div>
  )

  // Create Coin Step 1
  const CreateCoinStep1 = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Loyalty Coin</h2>
      <p className="text-gray-600 mb-6">{"Choose carefully, these can't be changed once the coin is created."}</p>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#7C6BF0] text-white flex items-center justify-center font-bold">1</div>
          <span className="text-[#7C6BF0] font-medium">Brand Info</span>
        </div>
        <div className="w-16 h-0.5 bg-gray-300" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold">2</div>
          <span className="text-gray-500">Tokenomics</span>
        </div>
        <div className="w-16 h-0.5 bg-gray-300" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold">3</div>
          <span className="text-gray-500">Review</span>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2">Coin Name</label>
            <input
              type="text"
              placeholder="Name your loyalty coin"
              value={coinForm.name}
              onChange={(e) => setCoinForm({ ...coinForm, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">Ticker</label>
            <input
              type="text"
              placeholder="Add a coin ticker (e.g. PANICAFE)"
              value={coinForm.ticker}
              onChange={(e) => setCoinForm({ ...coinForm, ticker: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-2">Brand Description</label>
            <textarea
              placeholder="Write a description about your brand"
              rows={4}
              value={coinForm.description}
              onChange={(e) => setCoinForm({ ...coinForm, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0] resize-none"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">Brand Slogan</label>
            <input
              type="text"
              placeholder="Add your brand's slogan"
              value={coinForm.slogan}
              onChange={(e) => setCoinForm({ ...coinForm, slogan: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">Locations</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Add the physical locations of your brand"
                value={coinForm.locations}
                onChange={(e) => setCoinForm({ ...coinForm, locations: e.target.value })}
                className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
              />
              <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">Brand Socials</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Add URLs"
                value={coinForm.socials}
                onChange={(e) => setCoinForm({ ...coinForm, socials: e.target.value })}
                className="w-full px-4 py-3 pr-20 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 text-gray-400">
                <Globe size={18} />
                <Instagram size={18} />
                <span className="font-bold text-sm">𝕏</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">Coin Logo + Coin Banner</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Add images"
                className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21,15 16,10 5,21" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={() => navigate("create-coin-2")}
            className="px-8 py-3 bg-[#7C6BF0] text-white rounded-full font-medium hover:bg-[#6B5AD0] transition-colors flex items-center gap-2"
          >
            Next: Tokenomics
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )

  // Create Coin Step 2 - Tokenomics (NEW)
  const CreateCoinStep2 = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Loyalty Coin</h2>
      <p className="text-gray-600 mb-6">Configure your token economics.</p>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#7C6BF0] text-white flex items-center justify-center font-bold">✓</div>
          <span className="text-[#7C6BF0] font-medium">Brand Info</span>
        </div>
        <div className="w-16 h-0.5 bg-[#7C6BF0]" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#7C6BF0] text-white flex items-center justify-center font-bold">2</div>
          <span className="text-[#7C6BF0] font-medium">Tokenomics</span>
        </div>
        <div className="w-16 h-0.5 bg-gray-300" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold">3</div>
          <span className="text-gray-500">Review</span>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2">Total Supply</label>
            <input
              type="text"
              placeholder="1000000"
              value={coinForm.totalSupply}
              onChange={(e) => setCoinForm({ ...coinForm, totalSupply: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
            />
            <p className="text-sm text-gray-500 mt-1">The maximum number of tokens that will ever exist.</p>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">Decimals</label>
            <select
              value={coinForm.decimals}
              onChange={(e) => setCoinForm({ ...coinForm, decimals: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#7C6BF0]/30 bg-[#F5F3FF] focus:outline-none focus:border-[#7C6BF0]"
            >
              <option value="6">6 decimals</option>
              <option value="9">9 decimals (recommended)</option>
              <option value="18">18 decimals</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">Decimal precision for token amounts.</p>
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-4">Distribution Strategy</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setCoinForm({ ...coinForm, distribution: "reward-only" })}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  coinForm.distribution === "reward-only"
                    ? "border-[#7C6BF0] bg-[#7C6BF0]/10"
                    : "border-[#7C6BF0]/30 hover:border-[#7C6BF0]"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      coinForm.distribution === "reward-only" ? "border-[#7C6BF0]" : "border-gray-300"
                    }`}
                  >
                    {coinForm.distribution === "reward-only" && <div className="w-3 h-3 rounded-full bg-[#7C6BF0]" />}
                  </div>
                  <h4 className="font-bold text-gray-800">Reward-only</h4>
                </div>
                <p className="text-gray-600 text-sm ml-8">
                  100% of tokens are distributed as loyalty rewards to customers.
                </p>
              </div>
              <div
                onClick={() => setCoinForm({ ...coinForm, distribution: "brand-reserve" })}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  coinForm.distribution === "brand-reserve"
                    ? "border-[#7C6BF0] bg-[#7C6BF0]/10"
                    : "border-[#7C6BF0]/30 hover:border-[#7C6BF0]"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      coinForm.distribution === "brand-reserve" ? "border-[#7C6BF0]" : "border-gray-300"
                    }`}
                  >
                    {coinForm.distribution === "brand-reserve" && <div className="w-3 h-3 rounded-full bg-[#7C6BF0]" />}
                  </div>
                  <h4 className="font-bold text-gray-800">Brand Reserve</h4>
                </div>
                <p className="text-gray-600 text-sm ml-8">
                  70% rewards, 30% reserved for brand treasury and partnerships.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate("create-coin")}
            className="px-8 py-3 border-2 border-[#7C6BF0] text-[#7C6BF0] rounded-full font-medium hover:bg-[#7C6BF0]/10 transition-colors flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <button
            onClick={() => navigate("create-coin-3")}
            className="px-8 py-3 bg-[#7C6BF0] text-white rounded-full font-medium hover:bg-[#6B5AD0] transition-colors flex items-center gap-2"
          >
            Next: Review
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )

  // Create Coin Step 3 - Review & Deploy (NEW)
  const CreateCoinStep3 = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Loyalty Coin</h2>
      <p className="text-gray-600 mb-6">Review your coin details before deployment.</p>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#7C6BF0] text-white flex items-center justify-center font-bold">✓</div>
          <span className="text-[#7C6BF0] font-medium">Brand Info</span>
        </div>
        <div className="w-16 h-0.5 bg-[#7C6BF0]" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#7C6BF0] text-white flex items-center justify-center font-bold">✓</div>
          <span className="text-[#7C6BF0] font-medium">Tokenomics</span>
        </div>
        <div className="w-16 h-0.5 bg-[#7C6BF0]" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#7C6BF0] text-white flex items-center justify-center font-bold">3</div>
          <span className="text-[#7C6BF0] font-medium">Review</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Summary Card */}
        <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Coin Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Coin Name</span>
              <span className="font-medium">{coinForm.name || "My Loyalty Coin"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Ticker</span>
              <span className="font-medium">${coinForm.ticker || "LOYALTY"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Total Supply</span>
              <span className="font-medium">{Number(coinForm.totalSupply).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Decimals</span>
              <span className="font-medium">{coinForm.decimals}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Distribution</span>
              <span className="font-medium capitalize">{coinForm.distribution.replace("-", " ")}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Network</span>
              <span className="font-medium">Solana</span>
            </div>
          </div>
        </div>

        {/* Cost Estimate */}
        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-[#7C6BF0]/30 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Deployment Cost</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">Estimated Cost</span>
              <span className="text-3xl font-bold text-[#7C6BF0]">~0.05 SOL</span>
            </div>
            <p className="text-sm text-gray-500">
              This covers the Solana network fees for creating your SPL token.
            </p>
          </div>

          {/* Warning */}
          <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 p-6">
            <div className="flex gap-3">
              <div className="text-amber-500 text-2xl">⚠️</div>
              <div>
                <h4 className="font-bold text-amber-800 mb-2">Irreversible Action</h4>
                <p className="text-amber-700 text-sm">
                  Once deployed, your token settings cannot be changed. Please review all details carefully before
                  proceeding. The coin name, ticker, total supply, and decimals are permanent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate("create-coin-2")}
          className="px-8 py-3 border-2 border-[#7C6BF0] text-[#7C6BF0] rounded-full font-medium hover:bg-[#7C6BF0]/10 transition-colors flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          Back
        </button>
        <button
          onClick={() => {
            alert("Coin deployment initiated!")
            navigate("home")
          }}
          className="px-8 py-3 bg-[#7C6BF0] text-white rounded-full font-medium hover:bg-[#6B5AD0] transition-colors"
        >
          Deploy Coin (~0.05 SOL)
        </button>
      </div>
    </div>
  )

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen />
      case "profile":
        return <ProfileScreen />
      case "brands":
        return <BrandsScreen />
      case "app":
        return <AppScreen />
      case "support":
        return <SupportScreen />
      case "create-coin":
        return <CreateCoinStep1 />
      case "create-coin-2":
        return <CreateCoinStep2 />
      case "create-coin-3":
        return <CreateCoinStep3 />
      case "coin-detail":
        return <CoinDetailScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <Header />
        {renderScreen()}
      </main>
      {showSignInModal && <SignInModal />}
    </div>
  )
}
