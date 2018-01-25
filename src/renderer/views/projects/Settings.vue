<script>
  import * as types from '../../store/types'
  import config from '../../config'

  export default {
    name: 'settings',

    data() {
      return {
        newProject: Object.assign({}, this.project),
        colors: config.colors
      }
    },

    props: {
      project: {
        type: Object,
        required: true
      }
    },

    methods: {
      saveClicked() {
        this.$store.commit(types.UPDATE_PROJECT, this.newProject)
        this.$store.commit(types.ADD_NOTIFICATION, {
          type: 'success',
          message: 'The project was updated successfully.'
        })
        this.$emit('hideSettings')
      },

      cancelClicked() {
        this.$emit('hideSettings')
      },

      removeClicked() {
        this.$store.commit(types.DELETE_PROJECT, this.project)
        this.$store.commit(types.ADD_NOTIFICATION, {
          type: 'success',
          sticky: true,
          message: 'The project was removed, but the Foresail configuration is still ' +
          'saved in the directory. You can restore the project at anytime.'
        })
        this.$emit('hideSettings')
      }
    }
  }
</script>

<template>
  <transition name="projectSettings">
    <div class="projectSettings">
      <h2>{{ project.name }}</h2>

      <label class="form-section form-section--separator">
        <span class="form-label">Name</span>
        <input type="text" class="form-control form-text form-control--full" v-model="newProject.name">
      </label>

      <label class="form-section form-section--separator">
        <span class="form-label">Color</span>
        <div>
          <input type="radio" v-for="color in colors" class="form-color" name="color" :value="color" :style="{ background: color }" v-model="newProject.color">
        </div>
      </label>

      <div class="form-buttons u-mt30">
        <button class="form-button button button--save" @click.left="saveClicked">Save</button>
        <button class="form-button button button--cancel" @click.left="cancelClicked">Cancel</button>
      </div>

      <button class="form-button button button--destroy u-100width u-mt100" @click.left="removeClicked">Remove Project</button>
    </div>
  </transition>
</template>

<style lang="scss">
  .projectSettings {
    position: fixed;
    top: 0;
    right: 0;
    width: 350px;
    height: 100%;
    background: white;
    box-shadow: -7px 0 15px rgba(0, 0, 0, .05);
    padding: 70px 20px 20px 20px;
    overflow-y: auto;

    h2 {
      margin: 0 0 30px 0;
      padding: 0;
      font-weight: normal;
    }

    .form-color {
      margin: 0 5px 5px 0;
    }

    &-enter-active, &-leave-active {
      transition: right .4s ease-out;
    }

    &-enter, &-leave-to {
      right: -400px;
    }
  }
</style>