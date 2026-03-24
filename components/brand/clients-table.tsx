import type { ClientActivity } from "@/types"

export function ClientsTable({ clients }: { clients: ClientActivity[] }) {
  if (clients.length === 0) {
    return <p className="text-gray-500 text-center py-4">No client activity yet.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 px-4 text-sm font-medium text-gray-500">Wallet</th>
            <th className="py-3 px-4 text-sm font-medium text-gray-500">Purchases</th>
            <th className="py-3 px-4 text-sm font-medium text-gray-500">Discounts Redeemed</th>
            <th className="py-3 px-4 text-sm font-medium text-gray-500">Last Activity</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id} className="border-b border-gray-100">
              <td className="py-3 px-4 text-sm font-mono text-gray-600">
                {c.walletAddress.slice(0, 4)}...{c.walletAddress.slice(-4)}
              </td>
              <td className="py-3 px-4 text-sm text-gray-800">{c.buys}</td>
              <td className="py-3 px-4 text-sm text-gray-800">{c.discountsRedeemed}</td>
              <td className="py-3 px-4 text-sm text-gray-500">
                {c.lastActivity ? new Date(c.lastActivity).toLocaleDateString() : "\u2014"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
