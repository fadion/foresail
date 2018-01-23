export default function maxProperty(array, property) {
  let items = Object.assign([], array)

  if (!array.length) {
    return 0
  }

  // Sort the array in descending order, so the first
  // element is the highest.
  items.sort((a, b) => {
    return b[property] - a[property]
  })

  return items[0][property]
}