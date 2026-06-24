import type { Alert, FilterType, SortConfig } from "../types/alert"

export function filterAndSort(
    alerts: Alert[],
    filter: FilterType,
    search: string,
    sort: SortConfig
): Alert[] {
    let result = alerts

    if (filter !== "ALL") {
        result = result.filter(a => a.eventType === filter)
    }

    if (search.trim()) {
        const q = search.toLowerCase()
        result = result.filter(a => a.filename.toLowerCase().includes(q))
    }

    return [...result].sort((a, b) => {
        let cmp = 0
        if (sort.field === "timestamp") cmp = a.timestamp.getTime() - b.timestamp.getTime()
        if (sort.field === "filename") cmp = a.filename.localeCompare(b.filename)
        if (sort.field === "eventType") cmp = a.eventType.localeCompare(b.eventType)
        return sort.direction === "asc" ? cmp : -cmp
    })
}