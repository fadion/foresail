import * as types from './types'

export default {
  [types.ADD_BOX](state, box) {
    state.boxes.push(box)
  },

  [types.UPDATE_BOX_POSITION](state, payload) {
    for (let box of state.boxes) {
      if (box.id === payload.id) {
        box.x = payload.pos.x
        box.y = payload.pos.y
      }
    }
  },

  [types.RECEIVE_DEFAULT_BOXES](state, payload) {
    state.defaultBoxes = payload.boxes
  }
}