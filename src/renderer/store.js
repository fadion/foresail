import Vue from 'vue'
import Vuex from 'vuex'
import electron from 'electron'
import VuexPersist from 'vuex-persistfile'
import state from './store/state'
import getters from './store/getters'
import mutations from './store/mutations'
import actions from './store/actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [new VuexPersist({
    path: electron.remote.app.getPath('userData'),
    reducer: (state) => {
      return {
        defaultBoxes: state.defaultBoxes,
        projects: state.projects,
      }
    }
  }).subscribe()],
  strict: true
})
