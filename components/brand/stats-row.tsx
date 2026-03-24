type Stat = { label: string; value: string | number }

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-2xl border-2 border-[#7C6BF0]/30 p-4 text-center">
          <p className="text-2xl font-bold text-[#7C6BF0]">{stat.value}</p>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
