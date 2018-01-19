import Vue from 'vue'

Vue.directive('grabbable', {
  inserted(el) {
    let isGrabbing = false
    let offset = { x: 0, y: 0 }

    let mousedown = event => {
      if (event.target === el) {
        isGrabbing = true
        offset = { x: event.clientX, y: event.clientY }
        el.classList.add('is-grabbing')
      }
    }

    let mousemove = event => {
      if (isGrabbing) {
        // Scroll the element by adding the amount that the
        // mouse moved.
        el.scrollLeft += offset.x - event.clientX
        el.scrollTop += offset.y - event.clientY

        // Reset the offset to the current position, so mouse move
        // difference can be as small as possible.
        offset = { x: event.clientX, y: event.clientY }
      }
    }

    let mouseup = () => {
      if (isGrabbing) {
        isGrabbing = false
        el.classList.remove('is-grabbing')
      }
    }

    el.addEventListener('mousedown', mousedown)
    window.addEventListener('mousemove', mousemove)
    window.addEventListener('mouseup', mouseup)
  }
})