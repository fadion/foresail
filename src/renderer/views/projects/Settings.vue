<script>
  import * as types from '../../store/types'
  import config from '../../config'

  export default {
    name: 'settings',

    data() {
      return {
        newProject: Object.assign({}, this.project),
        // Divide the colors into two colums.
        colors: {
          first: config.colors.slice(0, Math.round(config.colors.length / 2)),
          second: config.colors.slice(Math.round(config.colors.length / 2))
        }
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
        <div class="projectSettings-colors">
          <div>
            <input type="radio" v-for="color in colors.first" class="form-color" name="color" :value="color" :style="{ background: color }" v-model="newProject.color">
          </div>
          <div>
            <input type="radio" v-for="color in colors.second" class="form-color" name="color" :value="color" :style="{ background: color }" v-model="newProject.color">
          </div>
        </div>
      </label>

      <div class="form-buttons u-mt30">
        <button class="form-button button button--save" @click.left="saveClicked">Save</button>
        <button class="form-button button button--cancel" @click.left="cancelClicked">Cancel</button>
      </div>
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

    &-enter-active, &-leave-active {
      transition: right .4s ease-out;
    }

    &-enter, &-leave-to {
      right: -400px;
    }
  }

  .projectSettings-colors {
    position: relative;
    display: flex;
    justify-content: space-between;

    div {
      width: 48%;
    }
  }
</style>