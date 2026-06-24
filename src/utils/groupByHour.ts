import type { Alert } from "../types/alert"

export interface HourBucket {
    hour: string
    newFiles: number
    modified: number
    deleted: number
}

export function groupByHour(alerts: Alert[]): HourBucket[] {
    const map: Record<string, HourBucket> = {}

    for (const alert of alerts) {
        const h = String(alert.timestamp.getHours()).padStart(2, "0")
        const key = `${h}:00`
        if (!map[key]) map[key] = { hour: key, newFiles: 0, modified: 0, deleted: 0 }
        if (alert.eventType === "NEW FILE") map[key].newFiles++
        if (alert.eventType === "MODIFIED") map[key].modified++
        if (alert.eventType === "DELETED") map[key].deleted++
    }
    return Object.values(map).sort((a, b) => a.hour.localeCompare(b.hour))
}