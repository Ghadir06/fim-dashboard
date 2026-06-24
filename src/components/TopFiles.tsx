import { getTopFiles } from "../utils/getTopFiles"
import type { Alert } from "../types/alert"

const barColour = (i: number) => {
    const colours = [
        "bg-fim-blue",
        "bg-fim-green",
        "bg-fim-amber",
        "bg-fim-red",
        "bg-purple-500",
    ]
    return colours[i % colours.length]
}

export default function TopFiles({ alerts }: { alerts: Alert[] }) {
    const files = getTopFiles(alerts, 5)
    const max = files[0]?.total ?? 1
    return (
        <div className="bg-surface rounded-lg border border-border p-4 h-full">
            <h2 className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">
                Top Affected Files
            </h2>
            {files.length === 0 ? (
                <p className="text-muted text-sm">No data</p>
            ) : (
                <ul className="space-y-3">
                    {files.map((f, i) => (
                        <li key={f.filename}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-mono text-xs text-primary truncate max-w-[70%]">
                                    {f.filename}
                                </span>
                                <span className="text-xs text-muted">{f.total} events</span>
                            </div>
                            <div className="w-full bg-bg rounded-full h-1.5">
                                <div
                                    className={`h-1.5 rounded-full ${barColour(i)}`}
                                    style={{ width: `${(f.total / max) * 100}%` }}
                                />
                            </div>
                            <div className="flex gap-3 mt-1">
                                <span className="text-[10px] text-fim-green">{f.newFiles} new</span>
                                <span className="text-[10px] text-fim-amber">{f.modified} mod</span>
                                <span className="text-[10px] text-fim-red">{f.deleted} del</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}