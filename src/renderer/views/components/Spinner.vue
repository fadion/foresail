<script>
  export default {
    name: 'spinner'
  }
</script>

<template>
  <div class="spinner"></div>
</template>

<style lang="scss">
  /*
  ** Based on:
  ** https://projects.lukehaas.me/css-loaders/
  */
  .spinner {
    border-radius: 50%;
    width: 25px;
    height: 25px;
  }

  .spinner {
    border: 3px solid rgba(73, 226, 150, .15);
    border-top-color: #49e296;
    animation: rotate .5s infinite linear;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
</style>