import type { FilterType } from "../types/alert"

interface Props {
    filter: FilterType
    search: string
    onFilterChange: (f: FilterType) => void
    onSearchChange: (s: string) => void
}

const OPTIONS: { value: FilterType; colour: string }[] = [
    { value: "ALL", colour: "hover:bg-border data-[active=true]:bg-border data-[active=true]:text-primary" },
    { value: "NEW FILE", colour: "hover:bg-fim-green/10 data-[active=true]:bg-fim-green/10 data-[active=true]:text-fim-green data-[active=true]:border-fim-green/30" },
    { value: "MODIFIED", colour: "hover:bg-fim-amber/10 data-[active=true]:bg-fim-amber/10 data-[active=true]:text-fim-amber data-[active=true]:border-fim-amber/30" },
    { value: "DELETED", colour: "hover:bg-fim-red/10  data-[active=true]:bg-fim-red/10  data-[active=true]:text-fim-red  data-[active=true]:border-fim-red/30" },
]

export default function FilterBar({ filter, search, onFilterChange, onSearchChange }: Props) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
                type="text"
                value={search}
                onChange={e => onSearchChange(e.target.value)}
                placeholder="Search filenames..."
                className="bg-surface border border-border rounded-lg px-3 py-2 text-sm
                   text-primary placeholder:text-muted flex-1
                   focus:outline-none focus:ring-1 focus:ring-fim-blue
                   focus:border-fim-blue transition-colors"
            />
            <div className="flex gap-2">
                {OPTIONS.map(opt => (
                    <button
                        key={opt.value}
                        data-active={filter === opt.value}
                        onClick={() => onFilterChange(opt.value)}
                        className={`px-3 py-2 rounded-lg text-[10px] font-bold tracking-widest
                        border border-transparent text-muted transition-colors ${opt.colour}`}
                    >
                        {opt.value}
                    </button>
                ))}
            </div>
        </div>
    )
}