import type { AlertStats } from "../types/alert"
import type { Alert } from "../types/alert"
import StatCard from "./StatCard"

interface Props {
    stats: AlertStats
    alerts: Alert[]
}

export default function StatRow({ stats, alerts }: Props) {
    const last = alerts.length > 0
        ? alerts.reduce((a, b) => a.timestamp > b.timestamp ? a : b)
        : null
    const lastLabel = last
        ? last.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "—"
    return (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            <StatCard label="Total Alerts" value={stats.total} accent="text-primary" />
            <StatCard label="New Files" value={stats.newFiles} accent="text-fim-green" />
            <StatCard label="Modified" value={stats.modified} accent="text-fim-amber" />
            <StatCard label="Deleted" value={stats.deleted} accent="text-fim-red"
                sub="highest severity" />
            <StatCard label="Last Event" value={lastLabel} accent="text-fim-blue"
                sub={last ? last.filename : "—"} />
        </div>
    )
}