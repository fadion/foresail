import fs from 'fs'
import path from 'path'
import config from '../config'

export default class ProjectSettings {
  constructor(baseDir) {
    this.baseDir = baseDir
    this.dir = path.join(this.baseDir, config.directory)
    this.file = path.join(this.dir, config.settingsFile)
  }

  exists() {
    return fs.existsSync(this.dir)
  }

  async write() {
    let data = {
      name: path.basename(this.baseDir),
      path: this.baseDir,
      color: config.colors[Math.floor(Math.random() * config.colors.length)]
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

  _createDirectory(dir) {
    return new Promise((resolve, reject) => {
      fs.mkdir(dir, err => {
        if (err) reject(err)
        else resolve(dir)
      })
    })
  }
}