<script>
  import * as types from '../../store/types'
  import ProjectSettings from '../../services/ProjectSettings'

  export default {
    name: 'new-project',

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
            ps.write()
              .then(data => {
                this.$store.commit(types.ADD_PROJECT, data)
              })
              .catch(() => {
                this.$store.commit(types.ADD_NOTIFICATION, {
                  message: 'Couldn\'t write to project directory. Make sure you have the correct permissions.'
                })
              })
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