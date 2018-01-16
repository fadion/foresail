import injector from 'vue-inject'
import LayoutManager from './services/LayoutManager'

injector.constant('layoutManager', new LayoutManager())