export default function trancatePath(path, limit = 30) {
  if (path.length <= limit) return path

  let med = Math.round(path.length / 2)
  let rem = Math.round((path.length + '...'.length - limit) / 2)

  return `${path.substring(0, med - rem)}...${path.substring(med + rem)}`
}