import type { SystemStatus } from "../utils/getSystemStatus"

const config: Record<SystemStatus, { colour: string; dot: string; label: string}> = {
  HEALTHY: {
    colour: "text-fim-green border-fim-green/30 bg-fim-green/10",
    dot:    "bg-fim-green",
    label:  "HEALTHY",
  },
  WARNING: {
    colour: "text-fim-amber border-fim-amber/30 bg-fim-amber/10",
    dot:    "bg-fim-amber",
    label:  "WARNING",
  },
  ALERT: {
    colour: "text-fim-red border-fim-red/30 bg-fim-red/10",
    dot:    "bg-fim-red",
    label:  "ALERT",
  },
}
export default function StatusBadge({ status }: { status: SystemStatus }) {
  const c = config[status]
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold tracking-widest ${c.colour}`}>
      <span className={`w-2 h-2 rounded-full animate-pulse ${c.dot}`} />
      SYSTEM STATUS: {c.label}
    </div>
  )
}