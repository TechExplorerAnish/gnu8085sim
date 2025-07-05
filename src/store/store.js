import { create } from "zustand";

export const useMemoryStore = create((set, get) => ({
  memory: new Uint8Array(65536),  // 16-bit addressable memory (0x0000 to 0xFFFF)

  //Set entire memory block
  setMemory: (newMemory) => set({ memory: Uint8Array.from(newMemory) }),

  //Set value at specific address
  setMemoryValue: (address, value) => {
    const memory = get().memory;
    const updated = new Uint8Array(memory); // copy
    updated[address] = value;
    set({ memory: updated });
  },

  //Get value at specific address
  getMemoryValue: (address) => get().memory[address],

  //Clear memory
  resetMemory: () => set({ memory: new Uint8Array(65536) }),

  //Optional: Load object file (address-opcode map from backend)
  loadMemoryMap: (map) => {
    const memory = new Uint8Array(65536);
    Object.entries(map).forEach(([addr, val]) => {
      memory[parseInt(addr)] = parseInt(val, 16);
    });
    set({ memory });
  },
}));

