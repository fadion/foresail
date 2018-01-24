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
    <transition name="router">
      <router-view></router-view>
    </transition>
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

  .router {
    &-enter-active {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transition: opacity .6s;
    }

    &-leave-active {
      transition: opacity .3s;
    }

    &-enter, &-leave-to {
      opacity: 0;
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