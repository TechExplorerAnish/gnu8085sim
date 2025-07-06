import { create } from "zustand";

export const useCodeStore = create((set,get) => ({

    sourceCode: "",
    loadAddress: 0,//decimal address
    labels: {},
    errors: [],
    setSourceCode: (code) => set({ sourceCode: code }),
    setLoadAddress: (address) => set({ loadAddress: address }),
    setLabels: (labels) => set({ labels }),
    setErrors: (errors) => set({ errors }),
    clearErrors: () => set({ errors: [] }),
    getLoadAddress:() => get().loadAddress
  }));
  