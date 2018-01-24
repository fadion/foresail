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
        selectedProject: null,
        selectedTarget: null
      }
    },

    computed: {
      ...mapState([
        'projects'
      ])
    },

    methods: {
      openSettings(project, el) {
        this.selectedProject = project
        this.selectedTarget = el

        this.$refs.projects.classList.add('blurry')
        this.selectedTarget.classList.add('is-active')
      },

      hideSettings() {
        this.$refs.projects.classList.remove('blurry')
        this.selectedTarget.classList.remove('is-active')

        this.selectedProject = null
        this.selectedTarget = null
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
    <div class="projects" ref="projects">
      <div class="projects-inner">
        <project v-for="(project, index) in projects"
                 :key="project.id"
                 :name="project.name"
                 :path="project.path"
                 :color="project.color"
                 ref="project"
                 @openSettings="openSettings(project, $refs.project[index].$el)"
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

    .project, .projects-new {
      transition: filter .3s, opacity .3s, box-shadow 1s;
    }

    .project.is-active {
      box-shadow: 0 0 40px rgba(0, 0, 0, .15);
    }

    &.blurry {
      .project:not(.is-active), .projects-new {
        filter: grayscale(.8) blur(1px);
        opacity: .8;
        pointer-events: none;
      }
    }
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