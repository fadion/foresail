import animate from '../utils/animate'

export default class PathBuilder {
  constructor(layoutManager) {
    this.container = document.querySelector('.visualDesigner-inner')
    this.pathContainer = this._createSVG()
    this.path = null
    this.activeSpot = null
    this.isDrawing = false
    this.pathStart = { x: 0, y: 0 }
    this.pathEnd = { x: 0, y: 0 }
    this.spotTypes = Object.freeze({ left: 1, right: 2 })
    this.layoutManager = layoutManager

    this._started()
    this._moved()
    this._ended()
  }

  _createSVG() {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'pathContainer')
    svg.setAttribute('preserveAspectRatio', 'none')

    this.container.appendChild(svg)

    return svg
  }

  _createPath() {
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('class', 'pathContainer-curve')
    path.setAttribute('d', 'M0,0 C0,0 0,0 0,0')

    this.pathContainer.appendChild(path)

    return path
  }

  _started() {
    document.addEventListener('mousedown', e => {
      if (e.target.matches('.visualDesigner .imageBox-rspot, .visualDesigner .imageBox-lspot')) {
        let target = e.target
        let existingPath = this.layoutManager.endBoxPath(target.parentNode)

        // Left-side spot with an existing connection.
        // It serves as removal of a path.
        if (this._spotType(target) === this.spotTypes.left && existingPath) {
          // The starting spot and active spot are considered those
          // of the existing path. Basically, the path will be redrawn
          // by using its existing starting point.
          this.pathStart = this._spotPosition(existingPath.startSpot)
          this.path = existingPath.path
          this.activeSpot = existingPath.startSpot
          this.layoutManager.removePath(existingPath)
        } else {
          this.pathStart = this._spotPosition(target, true)
          this.activeSpot = target
          this.path = this._createPath()
        }

        // Prevent storing the previous path's ending coordinates when
        // the mouse isn't moved. Especially useful when triggering
        // the destroyPath() animation.
        this.pathEnd = this.pathStart
        this.isDrawing = true
        this.activeSpot.classList.add('is-active')
      }
    })
  }

  _moved() {
    document.addEventListener('mousemove', e => {
      if (this.isDrawing) {
        this.pathEnd = {
          x: e.clientX - this.container.getBoundingClientRect().left,
          y: e.clientY - this.container.getBoundingClientRect().top
        }

        this._drawPath(this.path, this.pathStart, this.pathEnd)
      }
    });
  }

  _ended() {
    document.addEventListener('mouseup', e => {
      if (this.isDrawing) {
        // Target should be a spot, not of the same kind as the starting
        // one, and obviously not belonging to the same parent box.
        if (!e.target.matches('.visualDesigner .imageBox-rspot, .visualDesigner .imageBox-lspot')
          || this._spotType(e.target) === this._spotType(this.activeSpot)
          || e.target.parentNode === this.activeSpot.parentNode
        ) {
          this._destroyPath(this.path)
        } else {
          this.pathEnd = this._spotPosition(e.target)
          this._drawPath(this.path, this.pathStart, this.pathEnd)

          let startSpot = this.activeSpot
          let endSpot = e.target

          // Connection started from a left spot to a right. Swap them so
          // the Layout Manager treats them as a normal right to left connection.
          // This prevents problems when disconnecting a path.
          if (this._spotType(this.activeSpot) === this.spotTypes.left) {
            [startSpot, endSpot] = [endSpot, startSpot]
          }

          let pathResult = this.layoutManager.addPath(
            startSpot.parentNode,
            endSpot.parentNode,
            startSpot,
            endSpot,
            this.path
          )

          // Path didn't pass validation, so it must be removed.
          if (!pathResult) {
            this._destroyPath(this.path)
          }
        }

        this.isDrawing = false
        this.activeSpot.classList.remove('is-active')
      }
    });
  }

  redraw(box) {
    for (let current of this.layoutManager.boxPaths(box)) {
      let pathStart = this._spotPosition(current.startSpot)
      let pathEnd = this._spotPosition(current.endSpot)

      this._drawPath(current.path, pathStart, pathEnd)
    }
  }

  _drawPath(path, start, end) {
    let p = {
      sx: start.x,
      sy: start.y,
      csx: start.x + (end.x - start.x) * 0.3,
      csy: start.y,
      cex: end.x + (start.x - end.x) * 0.5,
      cey: end.y,
      ex: end.x,
      ey: end.y
    }

    let attr = `M ${p.sx},${p.sy}` +
      ` C ${p.csx},${p.csy}` +
      ` ${p.cex},${p.cey}` +
      ` ${p.ex},${p.ey}`

    path.setAttribute('d', attr)
  }

  _spotPosition(element, multiply = false) {
    let multiplier = multiply ? 1.5 : 1
    // Current spot position minus half of widht/height to
    // center it. Add mulltiplier to count the CSS scaling too.
    return {
      x: element.getBoundingClientRect().left - this.container.getBoundingClientRect().left
      + element.offsetWidth * multiplier / 2,
      y: element.getBoundingClientRect().top - this.container.getBoundingClientRect().top
      + element.offsetHeight * multiplier / 2
    }
  }

  _spotType(element) {
    return element.classList.contains('imageBox-rspot') ? this.spotTypes.right : this.spotTypes.left
  }

  _destroyPath(element) {
    let diff = {
      x: this.pathEnd.x - this.pathStart.x,
      y: this.pathEnd.y - this.pathStart.y
    }
    let duration = 100 + Math.abs(diff.x) * 0.1 + Math.abs(diff.y) * 0.1

    animate(progress => {
      let pathEnd = {
        x: this.pathEnd.x - diff.x * progress,
        y: this.pathEnd.y - diff.y * progress
      }

      let curvePoints = {
        startX: this.pathStart.x + (pathEnd.x - this.pathStart.x) * 0.3 * (1 - progress / 3),
        startY: this.pathStart.y,
        endX: pathEnd.x + (this.pathStart.x - pathEnd.x) * 0.5 * (1 - progress),
        endY: pathEnd.y
      }

      let pathAttr = `M ${this.pathStart.x},${this.pathStart.y}` +
        ` C ${curvePoints.startX},${curvePoints.startY}` +
        ` ${curvePoints.endX},${curvePoints.endY}` +
        ` ${pathEnd.x},${pathEnd.y}`

      element.setAttribute('d', pathAttr)
    }, () => {
      element.remove()
    }, duration)
  }
}