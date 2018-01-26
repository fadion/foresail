import fs from 'fs'

export default class Filesystem {
  static pathExists(path) {
    return fs.existsSync(path)
  }

  static readFile(file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }

  static writeFile(file, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(file, JSON.stringify(data), 'utf8', err => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }

  static createDirectory(dir) {
    return new Promise((resolve, reject) => {
      fs.mkdir(dir, err => {
        if (err) reject(err)
        else resolve(dir)
      })
    })
  }
}