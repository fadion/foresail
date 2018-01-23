<script>
  import Notifications from './components/Notifications'

  export default {
    name: 'app',

    components: { Notifications }
  }
</script>

<template>
  <div class="application">
    <router-view></router-view>
    <notifications/>
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