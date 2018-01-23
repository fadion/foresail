<script>
  import {mapState} from 'vuex'
  import * as types from '../../store/types'
  import Navigation from '../components/Navigation'
  import Project from './Project'
  import Settings from './Settings'

  export default {
    name: 'projects',

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
      </div>
      <settings v-if="selectedProject" :project="selectedProject" @hideSettings="hideSettings"/>
    </div>
  </div>
</template>

<style lang="scss">
  .projects-inner {
    width: 80%;
    margin: 50px auto 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>