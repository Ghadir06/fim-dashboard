import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  Legend, ResponsiveContainer
} from "recharts"
import type { Alert } from "../types/alert"
import { groupByHour } from "../utils/groupByHour"

export default function ActivityChart({ alerts }: { alerts: Alert[] }) {
  const data = groupByHour(alerts)
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
        Activity by Hour
      </h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={28}>
          <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="newFiles" name="New File" fill="#22c55e" stackId="a" />
          <Bar dataKey="modified" name="Modified"  fill="#eab308" stackId="a" />
          <Bar dataKey="deleted"  name="Deleted"   fill="#ef4444" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}