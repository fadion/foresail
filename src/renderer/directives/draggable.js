import Vue from 'vue'
import Draggable from '../services/Draggable'

Vue.directive('draggable', {
  inserted(el, binding) {
    let isDragging = false
    let draggable = null
    let payload = binding.value && binding.value.payload || {}
    let options = Object.assign({
      ghost: false,
      ghostContainer: null,
      constraint: false,
      onMove: null,
      onEnd: null
    }, binding.value || {})

    let mousedown = event => {
      if (event.target === el) {
        isDragging = true
        draggable = new Draggable(el, options)
        draggable.started(event)
      }
    }

    let mousemove = event => {
      if (isDragging) {
        draggable.moved(event, el => {
          if (typeof options.onMove === 'function') {
            options.onMove(el)
          }
        })
      }
    }

    let mouseup = () => {
      if (isDragging) {
        draggable.ended((el, pos) => {
          if (typeof options.onEnd === 'function') {
            options.onEnd(el, pos, payload)
          }
        })
        isDragging = false
      }
    }

    el.addEventListener('mousedown', mousedown)
    window.addEventListener('mousemove', mousemove)
    window.addEventListener('mouseup', mouseup)
  }
})