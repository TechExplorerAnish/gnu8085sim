/** @format */

import { useState, useMemo, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search } from "lucide-react";
import { useMemoryStore } from "../../store/memoryStore";

const ITEMS_PER_PAGE = 1000;
const TOTAL_MEMORY_SIZE = 0xffff - 1;

export function MemoryPanel() {
  const [searchValue, setSearchValue] = useState("");
  const [startAddress, setStartAddress] = useState(0);
  const { memory, setMemory } = useMemoryStore();
  const [error, setError] = useState("");
  const [editingValues, setEditingValues] = useState({}); // Track editing state
  const parentRef = useRef();

  const visibleItems = useMemo(() => {
    const items = [];
    const endAddress = TOTAL_MEMORY_SIZE + 1;
    if (startAddress + ITEMS_PER_PAGE > TOTAL_MEMORY_SIZE) {
      for (let i = startAddress; i < endAddress; i++) {
        const memValue = memory[i] || "00h";
        // Handle both numeric values and hex strings
        let displayValue;
        if (typeof memValue === 'number') {
          displayValue = memValue.toString(16).toUpperCase().padStart(2, "0") + "h";
        } else if (typeof memValue === 'string') {
          // If it already has 'h' suffix, use it as is
          if (memValue.toUpperCase().endsWith('H')) {
            displayValue = memValue;
          } else {
            // If it's a hex string without 'h', add it
            displayValue = memValue.toUpperCase().padStart(2, "0") + "h";
          }
        } else {
          displayValue = "00h";
        }
        items.push({
          address: i,
          value: displayValue,
        });
      }
    } else {
      for (let i = startAddress; i < startAddress + ITEMS_PER_PAGE; i++) {
        const memValue = memory[i] || "00h";
        // Handle both numeric values and hex strings
        let displayValue;
        if (typeof memValue === 'number') {
          displayValue = memValue.toString(16).toUpperCase().padStart(2, "0") + "h";
        } else if (typeof memValue === 'string') {
          // If it already has 'h' suffix, use it as is
          if (memValue.toUpperCase().endsWith('H')) {
            displayValue = memValue;
          } else {
            // If it's a hex string without 'h', add it
            displayValue = memValue.toUpperCase().padStart(2, "0") + "h";
          }
        } else {
          displayValue = "00h";
        }
        items.push({
          address: i,
          value: displayValue,
        });
      }
    }
    return items;
  }, [startAddress, memory]);
  
  const rowVirtualizer = useVirtualizer({
    count: visibleItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  const handleSearch = () => {
    let targetAddress;
    if (searchValue.toUpperCase().endsWith("H")) {
      targetAddress = parseInt(searchValue.slice(0, -1), 16);
    } else {
      targetAddress = parseInt(searchValue, 10);
    }

    if (!isNaN(targetAddress) && targetAddress >= 0 && targetAddress <= TOTAL_MEMORY_SIZE) {
      setError("");
      const newStartAddress = Math.floor(targetAddress / ITEMS_PER_PAGE) * ITEMS_PER_PAGE;
      setStartAddress(newStartAddress);

      setTimeout(() => {
        const indexInView = targetAddress - newStartAddress;
        if (indexInView >= 0 && indexInView < ITEMS_PER_PAGE) {
          rowVirtualizer.scrollToIndex(indexInView, { align: "start" });
        }
      }, 100);
    } else {
      setError("Please enter a valid hex (with 'h' suffix) or decimal address (0-FFFF)");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const parseInputValue = (input) => {
    input = input.trim();
    if (input.toUpperCase().endsWith("H")) {
      const hexValue = parseInt(input.slice(0, -1), 16);
      return isNaN(hexValue) ? null : hexValue;
    }
    const decValue = parseInt(input, 10);
    return isNaN(decValue) ? null : decValue;
  };

  const handleMemoryChange = (e, address) => {
    const input = e.target.value.trim();
    
    // Update editing state
    setEditingValues(prev => ({
      ...prev,
      [address]: input
    }));
    
    // Validate input length
    if (input.toUpperCase().endsWith("H")) {
      const hexValue = parseInt(input.slice(0, -1), 16);
      if (!isNaN(hexValue) && hexValue > 255) {
        const newValue = "FFh";
        setEditingValues(prev => ({
          ...prev,
          [address]: newValue
        }));
      }
    } else {
      const decValue = parseInt(input, 10);
      if (!isNaN(decValue) && decValue > 255) {
        const newValue = "255";
        setEditingValues(prev => ({
          ...prev,
          [address]: newValue
        }));
      }
    }
  };

  const handleMemoryKeyPress = (e, address) => {
    if (e.key === "Enter") {
      const value = parseInputValue(e.target.value);
      if (value !== null && value >= 0 && value <= 255) {
        const updatedMemory = [...memory];
        // Store as hex string with 'h' suffix to match the format from Toolbar
        updatedMemory[address] = value.toString(16).toUpperCase().padStart(2, "0") + "h";
        setMemory(updatedMemory);
        
        // Clear editing state for this address
        setEditingValues(prev => {
          const newState = { ...prev };
          delete newState[address];
          return newState;
        });
      } else {
        // If invalid input, restore the original value and clear editing state
        setEditingValues(prev => {
          const newState = { ...prev };
          delete newState[address];
          return newState;
        });
      }
    }
  };

  const handleMemoryBlur = (e, address) => {
    // Clear editing state when input loses focus
    setEditingValues(prev => {
      const newState = { ...prev };
      delete newState[address];
      return newState;
    });
  };

  const getInputValue = (item) => {
    // Return editing value if currently editing, otherwise return the actual memory value
    return editingValues[item.address] !== undefined ? editingValues[item.address] : item.value;
  };

  return (
    <div className="p-4 bg-background  border">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter address (hex with 'h' suffix or decimal)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full bg-slate-100 dark:bg-slate-900 pl-8"
          />
        </div>
        <Button
          variant="secondary"
          onClick={handleSearch}
          className="shrink-0 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-950"
        >
          Go to Address
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="rounded-lg border">
        <div className="grid grid-cols-3 rounded-t-lg gap-4 p-3 border-b font-medium text-sm bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-950">
          <div>Address (Hex)</div>
          <div>Address (Dec)</div>
          <div>Data (Dec)</div>
        </div>

        <div ref={parentRef} className="h-[500px] overflow-auto">
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
              const item = visibleItems[virtualItem.index];
              if (!item) return null;

              return (
                <div
                  key={item.address}
                  data-index={virtualItem.index}
                  className="grid grid-cols-3 gap-4 py-1 text-sm bg-inherit items-center hover:bg-slate-900 transition-colors absolute top-0 left-0 w-full"
                  style={{
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`
                  }}
                >
                  <div className={`font-mono pl-3 flex items-center ${searchValue.toUpperCase().replace("H", "") === item.address.toString(16).toUpperCase() ? "bg-red-300 rounded-sm h-full" : ""}`}>
                    <span>{item.address.toString(16).toUpperCase().padStart(4, "0")}h</span>
                  </div>
                  <div className={`font-mono text-center flex items-center justify-center ${searchValue === item.address.toString() ? "bg-blue-300 rounded-sm h-full" : ""}`}>
                    <span>{item.address}</span>
                  </div>
                  <Input
                    type="text"
                    value={getInputValue(item)}
                    maxLength={4}
                    onChange={(e) => handleMemoryChange(e, item.address)}
                    onKeyPress={(e) => handleMemoryKeyPress(e, item.address)}
                    onBlur={(e) => handleMemoryBlur(e, item.address)}
                    className="h-8 w-20 font-mono text-center mx-auto"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoryPanel;