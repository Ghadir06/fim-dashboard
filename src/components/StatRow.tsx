import type { AlertStats } from "../types/alert"
import StatCard from "./StatCard"

export default function StatRow({ stats }: { stats: AlertStats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      <StatCard label="Total"     value={stats.total}    accent="border-blue-500" />
      <StatCard label="New Files" value={stats.newFiles} accent="border-green-500" />
      <StatCard label="Modified"  value={stats.modified} accent="border-yellow-500" />
      <StatCard label="Deleted"   value={stats.deleted}  accent="border-red-500" />
    </div>
  )
}