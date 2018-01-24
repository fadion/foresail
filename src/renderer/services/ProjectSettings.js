import fs from 'fs'
import path from 'path'
import config from '../config'

export default class ProjectSettings {
  constructor(baseDir) {
    this.baseDir = baseDir
    this.dir = path.join(this.baseDir, config.directory)
    this.configFile = path.join(this.dir, config.settingsFile)
  }

  projectExists() {
    return this._pathExists(this.dir)
  }

  async readConfig() {
    if (!this._pathExists(this.configFile)) {
      throw new Error('Project configuration file doesn\'t exist.')
    }

    let data = await this._readFile(this.configFile)
    let object

    try {
      object = JSON.parse(data)
    } catch (err) {
      throw new Error('Project configuration file is malformed.')
    }

    if (!object.name || !object.path || !object.color) {
      throw new Error('Project configuration file is malformed.')
    }

    return object
  }

  async init() {
    let data = {
      name: path.basename(this.baseDir),
      path: this.baseDir,
      color: config.colors[Math.floor(Math.random() * config.colors.length)]
    }

    await this._createDirectory(this.dir)
    await this._writeFile(this.configFile, data)

    return data
  }

  _pathExists(path) {
    return fs.existsSync(path)
  }

  _readFile(file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }

  _writeFile(file, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(file, JSON.stringify(data), err => {
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