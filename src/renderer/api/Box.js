export default class Box {
  getDefaults(callback) {
    setTimeout(() => {
      let boxes = [
        {
          section: 'Web Servers',
          items: [
            {
              name: 'Nginx',
              logo: 'logo-nginx.png',
              version: 'v1.11.2',
              color: '#00A453'
            },
            {
              name: 'Apache',
              logo: 'logo-apache.png',
              version: 'v2.4.29',
              color: '#D21D56'
            }
          ]
        },
        {
          section: 'Databases',
          items: [
            {
              name: 'MySQL',
              logo: 'logo-mysql.png',
              version: 'v2.4.29',
              color: '#E38D02'
            }
          ]
        },
        {
          section: 'Applications',
          items: [
            {
              name: 'PHP FPM',
              logo: 'logo-phpfpm.png',
              version: 'v7.2.0',
              color: '#515499'
            }
          ]
        }
      ]

      callback(boxes)
    }, 100)
  }
}