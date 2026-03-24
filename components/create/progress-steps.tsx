export function ProgressSteps({ current }: { current: 1 | 2 | 3 }) {
  const steps = [
    { num: 1, label: "Brand Info" },
    { num: 2, label: "Tokenomics" },
    { num: 3, label: "Review" },
  ]

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center gap-2">
          {i > 0 && (
            <div className={`w-16 h-0.5 ${step.num <= current ? "bg-[#7C6BF0]" : "bg-gray-300"}`} />
          )}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step.num <= current
                ? "bg-[#7C6BF0] text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            {step.num < current ? "\u2713" : step.num}
          </div>
          <span
            className={`font-medium ${
              step.num <= current ? "text-[#7C6BF0]" : "text-gray-500"
            }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  )
}
