import type { Alert, SortConfig, SortField } from "../types/alert"
import EventBadge from "./EventBadge"

interface Props {
  alerts: Alert[]
  sortConfig: SortConfig
  onSort: (field: SortField) => void
}

function Arrow({ field, sortConfig }: { field: SortField; sortConfig: SortConfig }) {
  if (sortConfig.field !== field) return <span className="ml-1 text-gray-300">↕</span>
  return <span className="ml-1">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
}

const columns: { label: string; field: SortField }[] = [
  { label: "Timestamp", field: "timestamp" },
  { label: "Event",     field: "eventType" },
  { label: "File",      field: "filename" },
]

export default function AlertTable({ alerts, sortConfig, onSort }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
          <tr>
            {columns.map(col => (
              <th key={col.field}
                onClick={() => onSort(col.field)}
                className="px-4 py-3 cursor-pointer select-none hover:bg-gray-100">
                {col.label}
                <Arrow field={col.field} sortConfig={sortConfig} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {alerts.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-10 text-center text-gray-400">
                No alerts match your filters
              </td>
            </tr>
          ) : (
            alerts.map(alert => (
              <tr key={alert.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-gray-500 text-xs whitespace-nowrap">
                  {alert.timestamp.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <EventBadge eventType={alert.eventType} />
                </td>
                <td className="px-4 py-3 font-mono text-xs">
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