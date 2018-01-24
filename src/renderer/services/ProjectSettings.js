import path from 'path'
import Filesystem from './Filesystem'
import config from '../config'

export default class ProjectSettings {
  constructor(baseDir) {
    this.baseDir = baseDir
    this.dir = path.join(this.baseDir, config.directory)
    this.configFile = path.join(this.dir, config.settingsFile)
  }

  projectExists() {
    return Filesystem.pathExists(this.dir)
  }

  async readConfig() {
    if (!Filesystem.pathExists(this.configFile)) {
      throw new Error('Project configuration file doesn\'t exist.')
    }

    let data = await Filesystem.readFile(this.configFile)
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

    await Filesystem.createDirectory(this.dir)
    await Filesystem.writeFile(this.configFile, data)

    return data
  }
}