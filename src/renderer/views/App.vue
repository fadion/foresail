<script>
  import {mapState} from 'vuex'
  import NotificationContainer from './components/NotificationContainer'
  import Spinner from './components/Spinner'

  export default {
    name: 'app',

    computed: {
      ...mapState([
        'spinner'
      ])
    },

    components: { Spinner, NotificationContainer }
  }
</script>

<template>
  <div class="application">
    <router-view></router-view>
    <notification-container/>
    <spinner v-if="spinner"/>
  </div>
</template>

<style lang="scss">
  .application {
    height: 100%;
    position: relative;
    animation: fadeIn .5s;

    .spinner {
      position: fixed;
      bottom: 20px;
      right: 20px;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>