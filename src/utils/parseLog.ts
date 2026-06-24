import type { Alert, AlertStats, EventType } from "../types/alert"

// regex for the exact format the Python FIM tool writes:
// [YYYY-MM-DD HH:MM:SS] EVENT_TYPE: filename
const LOG_LINE = /^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (NEW FILE|MODIFIED|DELETED): (.+)$/

function parseLine(line: string, id: number): Alert | null {
    const match = line.trim().match(LOG_LINE)
    if (!match) return null

    const [, timestampStr, eventType, filename] = match

    return {
        id,
        timestamp: new Date(timestampStr),
        eventType: eventType as EventType,
        filename: filename.trim(),
        raw: line.trim(),
    }
}

export function parseLog(logText: string): Alert[] {
    return logText
        .split("\n")
        .map((line, i) => parseLine(line, i + 1))
        .filter((a): a is Alert => a !== null)
}

export function getStats(alerts: Alert[]): AlertStats {
    return {
        total: alerts.length,
        newFiles: alerts.filter(a => a.eventType === "NEW FILE").length,
        modified: alerts.filter(a => a.eventType === "MODIFIED").length,
        deleted: alerts.filter(a => a.eventType === "DELETED").length,
    }
}