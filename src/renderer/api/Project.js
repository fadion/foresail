export default class Project {
  getAll(callback) {
    setTimeout(() => {
      let projects = [
        {
          id: 1,
          name: 'Event Lab',
          path: '\\users\\projects\\applications\\web\\current\\event-lab',
          color: '#49aee2'
        },
        {
          id: 2,
          name: 'Facebook',
          path: '\\users\\mark\\facebook',
          color: '#a56fe3'
        },
        {
          id: 3,
          name: 'Trello',
          path: '\\users\\web\\trello',
          color: '#49e296'
        },
        {
          id: 4,
          name: 'Slack',
          path: '\\users\\slack\\electron\\slack',
          color: '#ffce5d'
        },
        {
          id: 5,
          name: 'Apple Website',
          path: '\\users\\apple\\website',
          color: '#e97b7b'
        }
      ]

      callback(projects)
    }, 100)
  }
}