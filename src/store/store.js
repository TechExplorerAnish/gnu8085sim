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



export const useRegisterStore = create((set, get) => ({
    // 8-bit general purpose registers
    A: 0x00,
    B: 0x00,
    C: 0x00,
    D: 0x00,
    E: 0x00,
    H: 0x00,
    L: 0x00,
  
    // Special 16-bit registers
    PC: 0x0000,
    SP: 0xFFFF,
  
    // Flags (bit or boolean style)
    flags: {
      Z: 0,   // Zero flag
      S: 0,   // Sign flag
      P: 0,   // Parity flag
      CY: 0,  // Carry flag
      AC: 0   // Auxiliary carry
    },
  
    // Setters
  
    setRegister: (reg, value) => {
      if (['A', 'B', 'C', 'D', 'E', 'H', 'L'].includes(reg)) {
        set({ [reg]: value & 0xFF });
      } else if (['PC', 'SP'].includes(reg)) {
        set({ [reg]: value & 0xFFFF });
      }
    },
  
    setFlags: (newFlags) => {
      set((state) => ({
        flags: { ...state.flags, ...newFlags }
      }));
    },
  
    resetRegisters: () => {
      set({
        A: 0, B: 0, C: 0, D: 0, E: 0, H: 0, L: 0,
        PC: 0, SP: 0xFFFF,
        flags: { Z: 0, S: 0, P: 0, CY: 0, AC: 0 }
      });
    }
  }));
  
  
 