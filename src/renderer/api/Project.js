export default class Project {
  getAll(callback) {
    setTimeout(() => {
      let projects = [
        {
          id: 1,
          name: 'Event Lab',
          path: '\\users\\projects\\applications\\web\\current\\event-lab',
          color: '#49AEE2'
        },
        {
          id: 2,
          name: 'Facebook',
          path: '\\users\\mark\\facebook',
          color: '#A56FE3'
        },
        {
          id: 3,
          name: 'Trello',
          path: '\\users\\web\\trello',
          color: '#49E296'
        },
        {
          id: 4,
          name: 'Slack',
          path: '\\users\\slack\\electron\\slack',
          color: '#FFCE5D'
        },
        {
          id: 5,
          name: 'Apple Website',
          path: '\\users\\apple\\website',
          color: '#E97B7B'
        }
      ]

      callback(projects)
    }, 100)
  }
}