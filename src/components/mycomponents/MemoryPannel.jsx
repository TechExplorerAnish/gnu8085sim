/** @format */
import { useState, useMemo, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useVirtualizer } from "@tanstack/react-virtual";

const ITEMS_PER_PAGE = 1000;
const TOTAL_MEMORY_SIZE = 0xffff - 1;

export function MemoryPanel() {
  const [searchValue, setSearchValue] = useState("");
  const [startAddress, setStartAddress] = useState(0);
  const [memoryData, setMemoryData] = useState([]);
  const parentRef = useRef();

  const visibleItems = useMemo(() => {
    const items = [];
    const endAddress = TOTAL_MEMORY_SIZE + 1;

    if (startAddress + ITEMS_PER_PAGE > TOTAL_MEMORY_SIZE) {
      for (let i = startAddress; i < endAddress; i++) {
        items.push({
          address: i,
          value: memoryData[i] || "00",
        });
      }
    } else {
      for (let i = startAddress; i < startAddress + ITEMS_PER_PAGE; i++) {
        items.push({
          address: i,
          value: memoryData[i] || "00",
        });
      }
    }
    return items;
  }, [startAddress, memoryData]);

  const itemsToVirtualize = visibleItems.length;

  const rowVirtualizer = useVirtualizer({
    count: itemsToVirtualize,
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

    if (
      !isNaN(targetAddress) &&
      targetAddress >= 0 &&
      targetAddress <= TOTAL_MEMORY_SIZE
    ) {
      if (targetAddress + ITEMS_PER_PAGE > TOTAL_MEMORY_SIZE) {
        setStartAddress(targetAddress);
      } else {
        setStartAddress(
          Math.floor(targetAddress / ITEMS_PER_PAGE) * ITEMS_PER_PAGE
        );
      }

      setTimeout(() => {
        const indexInView = targetAddress - startAddress;
        if (indexInView >= 0 && indexInView < visibleItems.length) {
          rowVirtualizer.scrollToIndex(indexInView, { align: "start" });
        }
      }, 0);
    } else {
      alert(
        "Invalid address! Please enter a valid hex (with 'h' suffix) or decimal address (0-FFFF)"
      );
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

  const handleMemoryChange = (e) => {
    const value = parseInputValue(e.target.value);
    if (value !== null) {
      if (value > 255) {
        e.target.value = "255";
      } else {
        e.target.value = value.toString();
      }
    } else {
      e.target.value = "";
    }
  };

  const handleMemoryKeyPress = (e, address) => {
    if (e.key === "Enter") {
      const value = parseInputValue(e.target.value);
      if (value !== null && value >= 0 && value <= 255) {
        const updatedMemory = [...memoryData];
        updatedMemory[address] = value;
        setMemoryData(updatedMemory);
        e.target.value = value.toString();
      } else {
        e.target.value = memoryData[address] || "0";
      }
    }
  };

  return (
    <div className="p-4 bg-background rounded-lg border">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-2">
          <Input
            type="text"
            placeholder="Enter address (hex with 'h' suffix or decimal)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full bg-slate-100 dark:bg-slate-900"
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

      <div className="rounded-md border bg-muted/50">
        <div className="grid grid-cols-3 gap-4 p-3 border-b font-medium text-sm bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900">
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
                  className="grid grid-cols-3 gap-4 py-1 text-sm items-center hover:bg-accent/50 transition-colors absolute top-0 left-0 w-full"
                  style={{
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <div
                    className={`${
                      searchValue == item.address ||
                      parseInt(searchValue.slice(0, -1), 16) == item.address
                        ? "bg-red-300 rounded-sm h-full"
                        : ""
                    } font-mono pl-3 flex items-center`}
                  >
                    <span>
                      {" "}
                      {item.address.toString(16).toUpperCase().padStart(4, "0")}
                      h
                    </span>
                  </div>
                  <div
                    className={`${
                      searchValue == item.address ||
                      parseInt(searchValue.slice(0, -1), 16) == item.address
                        ? "bg-blue-300 rounded-sm h-full"
                        : ""
                    } font-mono text-center flex items-center justify-center`}
                  >
                    <span>{item.address}</span>
                  </div>
                  <Input
                    type="text"
                    defaultValue={parseInt(item.value, 16)}
                    maxLength={4}
                    onChange={(e) => handleMemoryChange(e, item.address)}
                    onKeyPress={(e) => handleMemoryKeyPress(e, item.address)}
                    className="h-8 w-20 font-mono text-center"
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
