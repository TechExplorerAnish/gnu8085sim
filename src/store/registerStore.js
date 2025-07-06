import { create } from "zustand";

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

  // Set individual register
  setRegister: (reg, value) => {
    if (['A', 'B', 'C', 'D', 'E', 'H', 'L'].includes(reg)) {
      set({ [reg]: value & 0xFF });
    } else if (['PC', 'SP'].includes(reg)) {
      set({ [reg]: value & 0xFFFF });
    }
  },

  // Set multiple registers
  setRegisters: (newRegisters) => {
    set((state) => ({
      A: newRegisters.A !== undefined ? newRegisters.A & 0xFF : state.A,
      B: newRegisters.B !== undefined ? newRegisters.B & 0xFF : state.B,
      C: newRegisters.C !== undefined ? newRegisters.C & 0xFF : state.C,
      D: newRegisters.D !== undefined ? newRegisters.D & 0xFF : state.D,
      E: newRegisters.E !== undefined ? newRegisters.E & 0xFF : state.E,
      H: newRegisters.H !== undefined ? newRegisters.H & 0xFF : state.H,
      L: newRegisters.L !== undefined ? newRegisters.L & 0xFF : state.L,
      PC: newRegisters.PC !== undefined ? newRegisters.PC & 0xFFFF : state.PC,
      SP: newRegisters.SP !== undefined ? newRegisters.SP & 0xFFFF : state.SP
    }));
  },

  // Set individual or multiple flags
  setFlags: (newFlags) => {
    set((state) => ({
      flags: { ...state.flags, ...newFlags }
    }));
  },

  // Set program counter
  setPC: (value) => {
    set({ PC: value & 0xFFFF });
  },

  // Set stack pointer
  setSP: (value) => {
    set({ SP: value & 0xFFFF });
  },

  // Get individual register
  getRegister: (reg) => {
    if (['A', 'B', 'C', 'D', 'E', 'H', 'L', 'PC', 'SP'].includes(reg)) {
      return get()[reg];
    }
  },
  getRegisters: () => ({
    A: get().A,
    B: get().B,
    C: get().C,
    D: get().D,
    E: get().E,
    H: get().H,
    L: get().L,
    PC: get().PC,
    SP: get().SP
  }),

  // Get PC and SP
  getPC: () => get().PC,
  getSP: () => get().SP,

  // Get flags
  getFlags: () => get().flags,

  // Reset all registers and flags
  resetRegisters: () => {
    set({
      A: 0, B: 0, C: 0, D: 0, E: 0, H: 0, L: 0,
      PC: 0, SP: 0xFFFF,
      flags: { Z: 0, S: 0, P: 0, CY: 0, AC: 0 }
    });
  }
}));
