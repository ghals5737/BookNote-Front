import { createStore } from 'zustand/vanilla'

export type MemoState = {
  count: number
}

export type MemoActions = {
  decrementMemo: () => void
  incrementMemo: () => void
}

export type MemoStore = MemoState & MemoActions

export const defaultInitState: MemoState = {
  count: 0,
}

export const createMemoStore = (
  initState: MemoState = defaultInitState,
) => {
  return createStore<MemoStore>()((set) => ({
    ...initState,
    decrementMemo: () => set((state) => ({ count: state.count - 1 })),
    incrementMemo: () => set((state) => ({ count: state.count + 1 })),
  }))
}