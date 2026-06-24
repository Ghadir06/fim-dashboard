import type { Alert } from "../types/alert"

export type SystemStatus = "HEALTHY" | "WARNING" | "ALERT"
// Looks at the most recent alerts to decide overall system status.
// ALERT if any deletions in the last hour, WARNING if modifications, HEALTHY otherwise
export function getSystemStatus(alerts: Alert[]): SystemStatus {
  if (alerts.length === 0) return "HEALTHY"

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

  // for sample data, use the most recent alert's time as "now"
  const latest = alerts.reduce((a, b) =>
    a.timestamp > b.timestamp ? a : b
  )
  const windowStart = new Date(latest.timestamp.getTime() - 60 * 60 * 1000)

  const recent = alerts.filter(a => a.timestamp >= windowStart)

  if (recent.some(a => a.eventType === "DELETED"))  return "ALERT"
  if (recent.some(a => a.eventType === "MODIFIED")) return "WARNING"
  return "HEALTHY"
}