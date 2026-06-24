interface Props {
  label: string
  value: number
  accent: string
}

export default function StatCard({ label, value, accent }: Props) {
  return (
    <div className={`bg-white rounded-lg border-l-4 ${accent} shadow-sm p-4`}>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  )
}