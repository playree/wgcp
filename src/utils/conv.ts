export const convByte = (bytesize: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const decimal = 100
  const kiro = 1024

  let size = bytesize
  let unit = 'B'
  for (let i = units.length - 1; i > 0; i--) {
    if (bytesize / Math.pow(kiro, i) > 1) {
      size = Math.round((bytesize / Math.pow(kiro, i)) * decimal) / decimal
      unit = units[i]
      break
    }
  }
  return `${size}${unit}`
}
