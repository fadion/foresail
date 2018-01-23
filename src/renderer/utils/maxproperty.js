export default function maxProperty(array, property) {
  let items = Object.assign([], array)

  if (!array.length) {
    return 0
  }

  // Sort the array in ascending order, so the last
  // element is the highest.
  items.sort((a, b) => {
    return a[property] - b[property]
  })

  return items[items.length - 1][property]
}