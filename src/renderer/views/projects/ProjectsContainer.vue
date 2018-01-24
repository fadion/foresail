<script>
  import {mapState} from 'vuex'
  import * as types from '../../store/types'
  import Navigation from '../components/Navigation'
  import Project from './Project'
  import Settings from './Settings'
  import NewProject from './NewProject'

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
      }
    },

    created() {
      this.$store.dispatch(types.ALL_PROJECTS)
    },

    components: { Settings, Navigation, Project, NewProject }
  }
</script>

<template>
  <div class="projectsContainer">
    <navigation title="Projects"/>
    <div class="projects" ref="projects">
      <transition-group name="projects-inner" tag="div" class="projects-inner">
        <project v-for="(project, index) in projects"
                 :key="project.id"
                 :name="project.name"
                 :path="project.path"
                 :color="project.color"
                 ref="project"
                 @openSettings="openSettings(project, $refs.project[index].$el)"
        />
      </transition-group>
      <div class="projects-empty" v-if="!projects.length">
        <p>No project added yet.</p>
        <p>Start building one now by clicking the "New Project" button below.</p>
      </div>
      <new-project/>
    </div>
    <settings v-if="selectedProject" :project="selectedProject" @hideSettings="hideSettings"/>
  </div>
</template>

<style lang="scss">
  .projects {
    text-align: center;

    .project, .newProject {
      transition: filter .3s, opacity .3s, box-shadow 1s;
    }

    .project.is-active {
      box-shadow: 0 0 40px rgba(0, 0, 0, .15);
    }

    &.blurry {
      .project:not(.is-active), .newProject {
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

    &-enter-active, &-leave-active {
      transition: opacity .7s !important;
    }

    &-enter, &-leave-to {
      opacity: 0;
    }
  }

  .projects-empty {
    text-align: center;
    color: #b8b8b8;
  }
</style>