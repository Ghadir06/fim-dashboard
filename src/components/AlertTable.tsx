import type { Alert, SortConfig, SortField } from "../types/alert"
import EventBadge from "./EventBadge"

interface Props {
    alerts: Alert[]
    sortConfig: SortConfig
    onSort: (field: SortField) => void
}

const rowAccent: Record<string, string> = {
    "NEW FILE": "hover:bg-fim-green/5",
    "MODIFIED": "hover:bg-fim-amber/5",
    "DELETED": "hover:bg-fim-red/5 bg-fim-red/[0.03]",
}

function Arrow({ field, sortConfig }: { field: SortField; sortConfig: SortConfig }) {
    if (sortConfig.field !== field)
        return <span className="ml-1 text-border">↕</span>
    return <span className="ml-1 text-fim-blue">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
}

const columns: { label: string; field: SortField }[] = [
    { label: "Timestamp", field: "timestamp" },
    { label: "Event", field: "eventType" },
    { label: "File", field: "filename" },
]

export default function AlertTable({ alerts, sortConfig, onSort }: Props) {
    return (
        <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm text-left">
                <thead className="border-b border-border">
                    <tr>
                        {columns.map(col => (
                            <th
                                key={col.field}
                                onClick={() => onSort(col.field)}
                                className="px-4 py-3 text-[10px] font-bold text-muted uppercase
                           tracking-widest cursor-pointer select-none
                           hover:text-primary transition-colors"
                            >
                                {col.label}
                                <Arrow field={col.field} sortConfig={sortConfig} />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {alerts.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="px-4 py-12 text-center text-muted text-sm">
                                No alerts match your filters
                            </td>
                        </tr>
                    ) : (
                        alerts.map(alert => (
                            <tr
                                key={alert.id}
                                className={`border-t border-border transition-colors ${rowAccent[alert.eventType]}`}
                            >
                                <td className="px-4 py-3 font-mono text-xs text-muted whitespace-nowrap">
                                    {alert.timestamp.toLocaleString()}
                                </td>
                                <td className="px-4 py-3">
                                    <EventBadge eventType={alert.eventType} />
                                </td>
                                <td className="px-4 py-3 font-mono text-xs text-primary">
                                    {alert.filename}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}