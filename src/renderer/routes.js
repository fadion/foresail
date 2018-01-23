import Designer from './views/designer/Designer'
import ProjectsContainer from './views/projects/ProjectsContainer'

export default [
  {
    path: '/',
    component: ProjectsContainer
  },
  {
    path: '/designer',
    component: Designer
  },
]