<script>
  import {mapState} from 'vuex'
  import * as types from '../../store/types'
  import ProjectSettings from '../../services/ProjectSettings'
  import Navigation from '../components/Navigation'
  import Project from './Project'
  import Settings from './Settings'

  export default {
    name: 'projects-container',

    data() {
      return {
        selectedProject: null
      }
    },

    computed: {
      ...mapState([
        'projects'
      ])
    },

    methods: {
      openSettings(project) {
        this.selectedProject = project
      },

      hideSettings() {
        this.selectedProject = null
      },

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
    },

    created() {
      this.$store.dispatch(types.ALL_PROJECTS)
    },

    components: { Settings, Navigation, Project }
  }
</script>

<template>
  <div class="projectsContainer">
    <navigation title="Projects"/>
    <div class="projects">
      <div class="projects-inner">
        <project v-for="project in projects"
                 :key="project.id"
                 :name="project.name"
                 :path="project.path"
                 :color="project.color"
                 @openSettings="openSettings(project)"
        />
        <div class="projects-empty" v-if="!projects.length">
          <p>No project added yet.</p>
          <p>Start building one now by clicking the "New Project" button below.</p>
        </div>
      </div>
      <a href="#" class="projects-new button button--new" @click.left.prevent="newProject">New Project</a>
    </div>
    <settings v-if="selectedProject" :project="selectedProject" @hideSettings="hideSettings"/>
  </div>
</template>

<style lang="scss">
  .projects {
    text-align: center;
  }

  .projects-inner {
    width: 80%;
    margin: 50px auto 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .projects-empty {
    text-align: center;
    color: #b8b8b8;
  }

  .projects-new {
    margin-top: 60px;
  }
</style>