import fs from 'fs'
import path from 'path'

export default class ProjectSettings {
  constructor(baseDir) {
    this.baseDir = baseDir
    this.dir = path.join(this.baseDir, '.foresail')
    this.file = path.join(this.dir, 'project.json')
  }

  exists() {
    return fs.existsSync(this.dir)
  }

  async write() {
    let data = {
      name: 'test',
      path: this.baseDir,
      color: '#E97B7B'
    }

    await this._createDirectory(this.dir)
    await this._writeFile(data)

    return data
  }

  _writeFile(data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.file, JSON.stringify(data), err => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }

  async _createDirectory(dir) {
    return new Promise((resolve, reject) => {
      fs.mkdir(dir, err => {
        if (err) reject(err)
        else resolve(dir)
      })
    })
  }
}