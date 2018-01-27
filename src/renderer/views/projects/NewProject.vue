<script>
  import {mapState} from 'vuex'
  import * as types from '../../store/types'
  import ProjectSettings from '../../services/ProjectSettings'

  export default {
    name: 'new-project',

    computed: {
      ...mapState([
        'projects'
      ])
    },

    methods: {
      newProject() {
        this.$electron.remote.dialog.showOpenDialog(
          this.$electron.remote.getCurrentWindow(),
          {
            properties: ['openDirectory', 'showHiddenFiles', 'createDirectory', 'treatPackageAsDirectory']
          },
          paths => {
            if (!paths) return

            const ps = new ProjectSettings(paths[0])

            if (ps.projectExists()) {
              ps.readConfig()
                .then(data => {
                  if (this.projects.filter(x => x.path === data.path).length) {
                    this.$store.commit(types.ADD_NOTIFICATION, {
                      type: 'warning',
                      message: 'Project already imported and in use. Nothing to do.'
                    })
                  } else {
                    this.$store.commit(types.ADD_PROJECT, data)
                    this.$store.commit(types.ADD_NOTIFICATION, {
                      type: 'success',
                      message: 'Project was imported successfully.'
                    })
                  }
                })
                .catch(err => {
                  this.$store.commit(types.ADD_NOTIFICATION, {
                    message: err.message
                  })
                })
            } else {
              ps.init()
                .then(data => {
                  this.$store.commit(types.ADD_PROJECT, data)
                  this.$store.commit(types.ADD_NOTIFICATION, {
                    type: 'success',
                    message: 'Project was initialized successfully.'
                  })
                })
                .catch(() => {
                  this.$store.commit(types.ADD_NOTIFICATION, {
                    message: 'Couldn\'t write to project directory. Make sure you have the correct permissions.'
                  })
                })
            }
          }
        )
      }
    }
  }
</script>

<template>
  <div class="newProject u-mt50">
    <a href="#" class="button button--new" @click.left.prevent="newProject">New Project</a>
  </div>
</template>

<style lang="scss">
</style>
