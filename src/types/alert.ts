export type EventType = "NEW FILE" | "MODIFIED" | "DELETED"

export interface Alert {
  id: number
  timestamp: Date
  eventType: EventType
  filename: string
  raw: string
}

export interface AlertStats {
  total: number
  newFiles: number
  modified: number
  deleted: number
}

export type SortField = "timestamp" | "filename" | "eventType"

export type SortDirection = "asc" | "desc"

export interface SortConfig {
  field: SortField
  direction: SortDirection
}
export type FilterType = "ALL" | EventType