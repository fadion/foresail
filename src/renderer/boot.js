import Vue from 'vue'
import VueRouter from 'vue-router'
import injector from 'vue-inject'
import routes from './routes'
import store from './store'
import './directives/draggable'
import './directives/grabbable'
import './services'
import './assets/styles/main.scss'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

const router = new VueRouter({ mode: 'history', routes })

Vue.use(VueRouter)
Vue.use(injector)

new Vue({
  router,
  store,
}).$mount('.application')