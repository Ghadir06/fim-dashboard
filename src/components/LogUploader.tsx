import { useRef, useState } from "react"

export default function LogUploader({ onLogLoaded }: { onLogLoaded: (text: string) => void }) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [dragging, setDragging] = useState(false)

    function readFile(file: File) {
        const reader = new FileReader()
        reader.onload = e => {
            if (typeof e.target?.result === "string") onLogLoaded(e.target.result)
        }
        reader.readAsText(file)
    }

    return (
        <div
            onClick={() => inputRef.current?.click()}
            onDrop={e => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files[0]) readFile(e.dataTransfer.files[0]) }}
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            className={`border border-dashed rounded-lg p-4 text-center cursor-pointer
        transition-all mb-6 flex items-center justify-center gap-3
        ${dragging
                    ? "border-fim-blue bg-fim-blue/5 text-fim-blue"
                    : "border-border hover:border-muted text-muted hover:text-primary"
                }`}
        >
            <span className="text-lg">📂</span>
            <div className="text-left">
                <p className="text-xs font-semibold">
                    Drop <span className="font-mono">alerts.log</span> or click to upload
                </p>
                <p className="text-[10px] text-muted mt-0.5">Sample data loaded by default</p>
            </div>
            <input ref={inputRef} type="file" accept=".log,.txt" className="hidden"
                onChange={e => { if (e.target.files?.[0]) readFile(e.target.files[0]) }} />
        </div>
    )
}