import { create } from "zustand";

export const useSimulationStore = create((set) => ({
    isRunning: false,
    isHalted: false,
    isPaused: false,
    lastExecutedAddress: null,
    breakpoints: new Set(),
  
    setRunning: (val) => set({ isRunning: val }),
    setHalted: (val) => set({ isHalted: val }),
    setPaused: (val) => set({ isPaused: val }),
    setLastExecutedAddress: (addr) => set({ lastExecutedAddress: addr }),
  
    toggleBreakpoint: (addr) =>
      set((state) => {
        const newBreakpoints = new Set(state.breakpoints);
        newBreakpoints.has(addr)
          ? newBreakpoints.delete(addr)
          : newBreakpoints.add(addr);
        return { breakpoints: newBreakpoints };
      }),
  
    resetSimulationState: () =>
      set({
        isRunning: false,
        isHalted: false,
        isPaused: false,
        lastExecutedAddress: null,
        breakpoints: new Set()
      })
  }));
  