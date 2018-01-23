export default class LayoutManager {
  constructor() {
    this.boxes = []
    this.paths = []
  }

  setBoxes(boxes) {
    this.boxes = boxes
  }

  addBox(box) {
    this.boxes.push(box)
  }

  removeBox(box) {
    for (let path of this.boxPaths(box)) {
      this.removePath(path)
    }

    this.boxes.splice(this.boxes.indexOf(box), 1)
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
    return this.paths.reverse().find(path => path.endBox.dataset.id === box.dataset.id)
  }

  boxPaths(box) {
    return this.paths.filter(path => {
      return path.startBox.dataset.id === box.dataset.id
        || path.endBox.dataset.id === box.dataset.id
    })
  }

  removePath(path) {
    this.paths.splice(this.paths.indexOf(path), 1)
  }

  _boxExists(box) {
    return this.boxes.some(b => b.dataset.id === box.dataset.id)
  }

  _boxesAreConnected(first, second) {
    return this.paths.some(path => {
      return (path.startBox.dataset.id === first.dataset.id
          || path.endBox.dataset.id === first.dataset.id)
        && (path.startBox.dataset.id === second.dataset.id
          || path.endBox.dataset.id === second.dataset.id)
    })
  }
}