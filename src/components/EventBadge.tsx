import type { EventType } from "../types/alert"

const styles: Record<EventType, string> = {
    "NEW FILE": "bg-fim-green/10 text-fim-green border border-fim-green/20",
    "MODIFIED": "bg-fim-amber/10 text-fim-amber border border-fim-amber/20",
    "DELETED": "bg-fim-red/10  text-fim-red  border border-fim-red/20",
}
export default function EventBadge({ eventType }: { eventType: EventType }) {
    return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${styles[eventType]}`}>
            {eventType}
        </span>
    )
}