<script>
  import * as types from '../../store/types'

  export default {
    name: 'settings',

    data() {
      return {
        newProject: Object.assign({}, this.project)
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

      <div class="form-section form-section--separator">
        <label class="form-label">Name</label>
        <input type="text" class="form-control form-text form-control--full" v-model="newProject.name">
      </div>

      <div class="form-section form-section--separator u-posRelative">
        <label class="form-label">Color</label>
        <div class="projectSettings-colors">
          <div>
            <input type="radio" class="form-color" name="color" value="#49AEE2" style="background: #49aee2;" v-model="newProject.color">
            <input type="radio" class="form-color" name="color" value="#A56FE3" style="background: #a56fe3;" v-model="newProject.color">
            <input type="radio" class="form-color" name="color" value="#EB4CF6" style="background: #eb4cf6;" v-model="newProject.color">
            <input type="radio" class="form-color" name="color" value="#D2A460" style="background: #d2a460;" v-model="newProject.color">
            <input type="radio" class="form-color" name="color" value="#E97B7B" style="background: #e97b7b;" v-model="newProject.color">
          </div>
          <div>
            <input type="radio" class="form-color" name="color" value="#49E296" style="background: #49e296;" v-model="newProject.color">
            <input type="radio" class="form-color" name="color" value="#40E5E5" style="background: #40e5e5;" v-model="newProject.color">
            <input type="radio" class="form-color" name="color" value="#FFCE5D" style="background: #ffce5d;" v-model="newProject.color">
            <input type="radio" class="form-color" name="color" value="#FBF168" style="background: #fbf168;" v-model="newProject.color">
            <input type="radio" class="form-color" name="color" value="#B1B1B1" style="background: #b1b1b1;" v-model="newProject.color">
          </div>
        </div>
      </div>

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