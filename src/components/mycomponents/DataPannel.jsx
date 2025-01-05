import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DataPanel() {
  const data = Array.from({ length: 256 }, (_, i) => ({
    hex: i.toString(16).padStart(2, '0').toUpperCase(),
    address: i,
    value: 0
  }))

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">Start</div>
          <Input className="flex-1" />
          <Button variant="secondary" size="sm">OK</Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium mb-2">
            <div>Address (Hex)</div>
            <div>Address</div>
            <div>Data</div>
          </div>
          <div className="h-[calc(100%-2rem)] overflow-y-auto">
            <div className="grid gap-1">
              {data.map((row) => (
                <div key={row.hex} className="grid grid-cols-3 gap-4 text-sm">
                  <div className="font-mono">{row.hex.padStart(2, '0')}</div>
                  <div className="font-mono">{row.address}</div>
                  <div className="font-mono">{row.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}

