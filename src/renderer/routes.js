import Designer from './views/designer/Designer'
import Projects from './views/projects/Projects'

export default [
  {
    path: '/projects',
    component: Projects
  },
  {
    path: '/',
    component: Designer
  },
]