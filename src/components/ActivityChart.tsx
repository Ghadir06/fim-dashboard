import {
    AreaChart, Area, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid
} from "recharts"
import type { Alert } from "../types/alert"
import { groupByHour } from "../utils/groupByHour"

export default function ActivityChart({ alerts }: { alerts: Alert[] }) {
    const data = groupByHour(alerts)

    return (
        <div className="bg-surface rounded-lg border border-border p-4 h-full">
            <h2 className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">
                Alert Activity by Hour
            </h2>
            <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="gNew" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gMod" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gDel" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3a" />
                    <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <Tooltip
                        contentStyle={{ background: "#1a1d27", border: "1px solid #2a2d3a", borderRadius: "8px" }}
                        labelStyle={{ color: "#f1f5f9" }}
                        itemStyle={{ color: "#64748b" }}
                    />
                    <Area type="monotone" dataKey="newFiles" name="New File" stroke="#22c55e" fill="url(#gNew)" strokeWidth={2} />
                    <Area type="monotone" dataKey="modified" name="Modified" stroke="#f59e0b" fill="url(#gMod)" strokeWidth={2} />
                    <Area type="monotone" dataKey="deleted" name="Deleted" stroke="#ef4444" fill="url(#gDel)" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}