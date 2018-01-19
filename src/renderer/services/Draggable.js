import animate from '../utils/animate'

export default class Draggable {
  constructor(element, options) {
    this.options = Object.assign({
      ghost: false,
      ghostContainer: null,
      constraint: false
    }, options)

    // Disable ghost if there's no container set.
    if (this.options.ghost && !this.options.ghostContainer) {
      this.options.ghost = false
    }

    this.options.ghostContainer = document.querySelector(this.options.ghostContainer)
    this.element = element
    this.draggingBox = null
  }

  started(event) {
    this.originalTarget = this.element
    this.draggingBox = (this.options.ghost) ? this._createGhost(this.element) : this.element
    this.offset = {
      x: event.clientX - this.draggingBox.offsetLeft,
      y: event.clientY - this.draggingBox.offsetTop
    }

    if (this.options.ghost) {
      this.element.classList.add('is-faded')
    }
  }

  moved(event, callback) {
    let position = {
      x: event.clientX - this.offset.x,
      y: event.clientY - this.offset.y
    }

    this.draggingBox.style.left = `${position.x}px`
    this.draggingBox.style.top = `${position.y}px`

    if (this.options.constraint) {
      // Negative positioning values mean the element is outside its
      // parent's bounding box. Simply set the position to a fixed 0
      // value if that's the case.
      this.draggingBox.style.left = Math.max(0, position.x)
      this.draggingBox.style.top = Math.max(0, position.y)
    }

    if (typeof callback === 'function') {
      callback(this.draggingBox, position)
    }
  }

  ended(callback) {
    let runCallback = true
    let position
    let element = this.draggingBox

    if (this.options.ghost) {
      this.element.classList.remove('is-faded')

      // Remove ghost if it's out of bounds from the expecting container.
      if (this.draggingBox.offsetLeft < this.options.ghostContainer.offsetLeft ||
        this.draggingBox.offsetTop < this.options.ghostContainer.offsetTop
      ) {
        this._removeGhost(this.draggingBox)
        // Flag to prevent the onEnd callback from running when
        // a drop wasn't successful.
        runCallback = false
      } else {
        position = {
          x: this.draggingBox.offsetLeft - this.options.ghostContainer.offsetLeft
            + this.options.ghostContainer.scrollLeft,
          y: this.draggingBox.offsetTop - this.options.ghostContainer.offsetTop
            + this.options.ghostContainer.scrollTop
        }
        this.draggingBox.remove()
      }
    } else {
      position = {
        x: this.draggingBox.offsetLeft,
        y: this.draggingBox.offsetTop
      }
    }

    if (typeof callback === 'function' && runCallback) {
      callback(element, position)
    }

    this.draggingBox = null
  }

  _createGhost(element) {
    let ghost = element.cloneNode(true)

    ghost.style.position = 'absolute'
    ghost.style.left = `${element.offsetLeft}px`
    ghost.style.top = `${element.offsetTop}px`
    ghost.style.zIndex = 100

    // Add it to the body, so it can naturally move everywhere and
    // have it's positioning easier to handle.
    document.body.appendChild(ghost)

    return ghost
  }

  _removeGhost(element) {
    let start = {
      x: element.offsetLeft,
      y: element.offsetTop
    }
    let diff = {
      x: start.x - this.originalTarget.offsetLeft,
      y: start.y - this.originalTarget.offsetTop
    }
    // Make the animation more dynamic, so far off elements don't return
    // too fast.
    let duration = 100 + Math.abs(diff.x) * 0.2 + Math.abs(diff.y) * 0.2

    animate(duration, progress => {
      element.style.left = `${Math.round(start.x - diff.x * progress)}px`
      element.style.top = `${Math.round(start.y - diff.y * progress)}px`
      // Progress is a 0.0 - 1.0 float and so is opacity. Substract from 1 to
      // get a decreasing value. The multiplication makes it run faster.
      element.style.opacity = 1 - progress * 1.5
    }, () => {
      element.remove()
    })
  }
}