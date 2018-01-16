<script>
  import Navigation from '../components/Navigation'
  import ImageCollection from './ImageCollection'
  import VisualDesigner from './VisualDesigner'

  export default {
    name: 'designer',

    components: {
      VisualDesigner,
      ImageCollection,
      Navigation
    }
  }
</script>

<template>
  <div class="u-100height">
    <navigation title="Event Lab" back="Projects" back-url="/projects"></navigation>

    <div class="designer">
      <image-collection></image-collection>
      <visual-designer></visual-designer>
    </div>
  </div>
</template>

<style lang="scss">
  .designer {
    height: 100%;
    display: flex;
  }
</style>