import axios from 'axios'
import Project from '../api/Project'
import * as types from './types'

export default {
  [types.ALL_DEFAULT_BOXES](context) {
    return new Promise((resolve, reject) => {
      axios.get('https://cors.io/?https://wander.al/foresail/boxes.json')
        .then(response => {
          resolve(response)
          context.commit(types.RECEIVE_DEFAULT_BOXES, response.data.boxes)
        })
        .catch(error => {
          context.commit(types.ADD_NOTIFICATION, {
            message: 'Can\'t download information for the default images.' +
            'This may be due to a network or server error.',
            sticky: true,
            retry: types.ALL_DEFAULT_BOXES
          })

          reject(error)
        })
    })
  },

  [types.ALL_PROJECTS](context) {
    new Project().getAll(projects => {
      context.commit(types.RECEIVE_PROJECTS, projects)
    })
  }
}