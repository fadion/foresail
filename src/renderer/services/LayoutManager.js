export default class LayoutManager {
  constructor() {
    this.boxes = []
    this.paths = []
  }

  addBox(box) {
    this.boxes.push(box)
  }

  addPath(startBox, endBox, startSpot, endSpot, path) {
    if (!this._boxExists(startBox) || !this._boxExists(endBox)
      || this._boxesAreConnected(startBox, endBox)
    ) {
      return false
    }

    this.paths.push({
      startBox,
      endBox,
      startSpot,
      endSpot,
      path
    })

    return true
  }

  endBoxPath(box) {
    return this.paths.reverse().find(path => path.endBox === box)
  }

  boxPaths(box) {
    return this.paths.filter(path => path.startBox === box || path.endBox === box)
  }

  removePath(path) {
    this.paths.splice(this.paths.indexOf(path), 1)
  }

  _boxExists(box) {
    return this.boxes.includes(box)
  }

  _boxesAreConnected(first, second) {
    return this.paths.some(path => {
      return (path.startBox === first || path.endBox === first)
          && (path.startBox === second || path.endBox === second)
    })
  }
}