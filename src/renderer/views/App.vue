<script>
  import NotificationContainer from './components/NotificationContainer'

  export default {
    name: 'app',

    components: { NotificationContainer }
  }
</script>

<template>
  <div class="application">
    <router-view></router-view>
    <notification-container/>
  </div>
</template>

<style lang="scss">
  .application {
    height: 100%;
    animation: fadeIn .5s;
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