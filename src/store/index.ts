import { create } from 'zustand'

export const useStore = create<{
  path: string
  keyword: string
  isHidden: boolean
  updatePath: (path: string) => void
  updateKeyword: (keyword: string) => void
  updateIsHidden: (isHidden: boolean) => void
}>(set => ({
  path: '',
  keyword: '',
  isHidden: true,
  // 更新 path
  updatePath: path => set({ path }),
  // 更新 keyword
  updateKeyword: keyword => set({ keyword }),
  // 更新 isHidden
  updateIsHidden: isHidden => set({ isHidden })
}))
