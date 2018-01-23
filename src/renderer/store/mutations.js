import * as types from './types'

export default {
  [types.ADD_BOX](state, box) {
    state.boxes.push(box)
  },

  [types.DELETE_BOX](state, box) {
    state.boxes = state.boxes.filter(current => {
      return current.id !== box.id
    })
  },

  [types.UPDATE_BOX_POSITION](state, box) {
    for (let b of state.boxes) {
      if (b.id === box.id) {
        b.x = box.pos.x
        b.y = box.pos.y
      }
    }
  },

  [types.RECEIVE_DEFAULT_BOXES](state, boxes) {
    state.defaultBoxes = boxes
  },

  [types.RECEIVE_PROJECTS](state, projects) {
    state.projects = projects
  },

  [types.ADD_PROJECT](state, project) {
    state.projects.push(project)
  },

  [types.UPDATE_PROJECT](state, project) {
    for (let p of state.projects) {
      if (p.id === project.id) {
        p.name = project.name
        p.color = project.color
      }
    }
  },

  [types.ADD_NOTIFICATION](state, notification) {
    notification.id = Math.random()
    state.notifications.push(notification)
  },

  [types.DELETE_NOTIFICATION](state, notification) {
    state.notifications.splice(state.notifications.indexOf(notification), 1)
  }
}