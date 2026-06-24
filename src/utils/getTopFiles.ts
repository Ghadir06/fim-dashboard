import type { Alert, EventType } from "../types/alert"

export interface FileSummary {
  filename: string
  total: number
  newFiles: number
  modified: number
  deleted: number
}

export function getTopFiles(alerts: Alert[], limit = 5): FileSummary[] {
  const map: Record<string, FileSummary> = {}

  for (const alert of alerts) {
    if (!map[alert.filename]) {
      map[alert.filename] = {
        filename: alert.filename,
        total: 0,
        newFiles: 0,
        modified: 0,
        deleted: 0,
      }
    }
    map[alert.filename].total++
    if (alert.eventType === "NEW FILE") map[alert.filename].newFiles++
    if (alert.eventType === "MODIFIED") map[alert.filename].modified++
    if (alert.eventType === "DELETED")  map[alert.filename].deleted++
  }
  return Object.values(map)
    .sort((a, b) => b.total - a.total)
    .slice(0, limit)
}