//キーの変換
export const keyToString = (key: number): string => {
  if (key === 0) return "原曲"
  return key > 0 ? `+${key}` : `${key}`
}

export const stringToKey = (str: string): number => {
  if (str === "原曲") return 0
  return Number.parseInt(str)
}
