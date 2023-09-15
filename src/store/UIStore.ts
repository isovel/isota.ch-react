import { create } from 'zustand'

export type UIStoreState = {
  showFooter: boolean
  setShowFooter: (showFooter: boolean) => void
}

export const useUIStore = create<UIStoreState>((set) => ({
  showFooter: true,
  setShowFooter: (showFooter: boolean) => set({ showFooter }),
}))
