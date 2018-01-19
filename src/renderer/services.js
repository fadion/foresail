import injector from 'vue-inject'
import LayoutManager from './services/LayoutManager'

injector.service('layoutManager', LayoutManager).lifecycle.none()