export default function maxProperty(array, property) {
  let items = Object.assign([], array)

  if (!array.length) {
    return 0
  }

  items.sort((a, b) => {
    return a[property] - b[property]
  })

  return items[items.length - 1][property]
}