import Box from '../api/Box'
import * as types from './types'

export default {
  getAllDefaultBoxes(context) {
    new Box().getDefaults(boxes => {
      context.commit(types.RECEIVE_DEFAULT_BOXES, { boxes })
    })
  }
}