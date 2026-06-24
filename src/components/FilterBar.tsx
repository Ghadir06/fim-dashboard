import type { FilterType } from "../types/alert"

interface Props {
  filter: FilterType
  search: string
  onFilterChange: (f: FilterType) => void
  onSearchChange: (s: string) => void
}

const OPTIONS: FilterType[] = ["ALL", "NEW FILE", "MODIFIED", "DELETED"]
export default function FilterBar({ filter, search, onFilterChange, onSearchChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        type="text"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        placeholder="Search filenames..."
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2 flex-wrap">
        {OPTIONS.map(opt => (
          <button
            key={opt}
            onClick={() => onFilterChange(opt)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors
              ${filter === opt
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}