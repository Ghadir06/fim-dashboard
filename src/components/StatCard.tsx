interface Props {
    label: string
    value: string | number
    accent: string
    sub?: string
}

export default function StatCard({ label, value, accent, sub }: Props) {
    return (
        <div className="bg-surface rounded-lg border border-border p-4 flex flex-col gap-1">
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest">
                {label}
            </p>
            <p className={`text-3xl font-bold ${accent}`}>{value}</p>
            {sub && <p className="text-[10px] text-muted">{sub}</p>}
        </div>
    )
}