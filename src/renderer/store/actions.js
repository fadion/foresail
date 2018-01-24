import axios from 'axios'
import Project from '../api/Project'
import * as types from './types'

export default {
  [types.ALL_DEFAULT_BOXES](context) {
    context.commit(types.SHOW_SPINNER)

    return new Promise((resolve, reject) => {
      axios.get('https://cors.io/?https://wander.al/foresail/boxes.json')
        .then(response => {
          resolve(response)
          context.commit(types.RECEIVE_DEFAULT_BOXES, response.data.boxes)
          context.commit(types.HIDE_SPINNER)
        })
        .catch(error => {
          context.commit(types.ADD_NOTIFICATION, {
            message: 'Can\'t download information for the default images.' +
            'This may be due to a network or server error.',
            sticky: true,
            retry: types.ALL_DEFAULT_BOXES
          })
          context.commit(types.HIDE_SPINNER)

          reject(error)
        })
    })
  },

  [types.ALL_PROJECTS](context) {
    context.commit(types.SHOW_SPINNER)

    new Project().getAll(projects => {
      context.commit(types.RECEIVE_PROJECTS, projects)
      context.commit(types.HIDE_SPINNER)
    })
  }
}