import { create } from "zustand";

export const useCodeStore = create((set) => ({

    sourceCode: "",
    labels: {},
    errors: [],
    setSourceCode: (code) => set({ sourceCode: code }),
    setLabels: (labels) => set({ labels }),
    setErrors: (errors) => set({ errors }),
    clearErrors: () => set({ errors: [] })
  }));
  