import { useRef, useState } from "react"

interface Props {
  onLogLoaded: (text: string) => void
}
export default function LogUploader({ onLogLoaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  function readFile(file: File) {
    const reader = new FileReader()
    reader.onload = e => {
      const text = e.target?.result
      if (typeof text === "string") onLogLoaded(text)
    }
    reader.readAsText(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) readFile(file)
  }
  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
        transition-colors mb-6
        ${dragging ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:bg-gray-50"}`}
    >
      <p className="text-sm text-gray-500">
        Drop your <span className="font-mono text-gray-700">alerts.log</span> here or{" "}
        <span className="text-blue-600 font-medium">click to browse</span>
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Sample data loaded by default
      </p>
      <input
        ref={inputRef}
        type="file"
        accept=".log,.txt"
        className="hidden"
        onChange={e => { if (e.target.files?.[0]) readFile(e.target.files[0]) }}
      />
    </div>
  )
}