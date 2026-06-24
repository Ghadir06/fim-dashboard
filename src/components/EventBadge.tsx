import type { EventType } from "../types/alert"

const styles: Record<EventType, string> = {
  "NEW FILE": "bg-green-100 text-green-800",
  "MODIFIED": "bg-yellow-100 text-yellow-800",
  "DELETED":  "bg-red-100 text-red-800",
}

export default function EventBadge({ eventType }: { eventType: EventType }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[eventType]}`}>
      {eventType}
    </span>
  )
}