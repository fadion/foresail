import Vue from 'vue'
import Draggable from '../services/Draggable'

Vue.directive('draggable', {
  inserted(el, binding, vnode) {
    let isDragging = false
    let draggable = null
    let options = binding.value || {}
    let payload = binding.value && binding.value.payload ? binding.value.payload : {}

    let mousedown = event => {
      if (event.target === el) {
        isDragging = true
        draggable = new Draggable(el, options)
        draggable.started(event)
      }
    }

    let mousemove = event => {
      if (isDragging) {
        draggable.moved(event, item => {
          vnode.child.$emit('dragMoved', { item })
        })
      }
    }

    let mouseup = () => {
      if (isDragging) {
        draggable.ended((el, pos) => {
          vnode.child.$emit('dragEnded', { el, pos, payload })
        })
        isDragging = false
      }
    }

    el.addEventListener('mousedown', mousedown)
    window.addEventListener('mousemove', mousemove)
    window.addEventListener('mouseup', mouseup)
  }
})