import path from 'path'
import fs from 'fs'
import merge from 'deepmerge'

export default class VuexPersist {
  constructor(options) {
    this.options = Object.assign({
      path: null,
      file: 'store.json',
      reducer: null,
      mutations: []
    }, options)

    if (!this.options.path) throw new Error('Path not specified')

    this.options.path = path.join(this.options.path, this.options.file)
  }

  saveState(state) {
    fs.writeFileSync(
      this.options.path,
      JSON.stringify(this.options.reducer ? this.options.reducer(state) : state),
      'utf8'
    )
  }

  loadState(store) {
    try {
      let data = fs.readFileSync(this.options.path, 'utf8')

      store.replaceState(merge(store.state, JSON.parse(data)))
    } catch (err) {}
  }

  subscribe() {
    return (store) => {
      this.loadState(store)

      store.subscribe((mutation, state) => {
        if (this._mutation(mutation.type)) {
          this.saveState(state)
        }
      })
    }
  }

  _mutation(type) {
    return !this.options.mutations.length ||
      this.options.mutations.includes(type)
  }
}