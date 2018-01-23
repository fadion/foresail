<script>
  export default {
    name: 'project',

    props: {
      name: {
        type: String,
        required: true
      },
      path: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      }
    },

    methods: {
      settingsClicked() {
        this.$emit('openSettings')
      }
    }
  }
</script>

<template>
  <router-link class="project" to="/designer" :style="{ 'border-left-color': color }">
    <div class="project-info">
      <h3 class="project-name">{{ name }}</h3>
      <p class="project-path">{{ path }}</p>
    </div>
    <a href="#" class="project-settings" @click.prevent="settingsClicked">
      <img src="../../assets/images/icon-settings.svg" width="13" height="13">
    </a>
  </router-link>
</template>

<style lang="scss">
  .project {
    width: 200px;
    height: 90px;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, .05);
    border-radius: 3px;
    border-left: 7px solid transparent;
    padding: 15px;
    position: relative;
    margin: 30px;
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: default;
    text-align: left;
  }

  .project-name {
    width: 100%;
    font-size: 16px;
    font-weight: normal;
    color: #616161;
    margin: 0 0 5px 0;
    padding: 0;
  }

  .project-path {
    width: 100%;
    font-size: 12px;
    color: #b8b8b8;
    margin: 0;
    padding: 0;
  }

  .project-settings {
    position: absolute;
    top: 8px;
    right: 8px;
  }
</style>