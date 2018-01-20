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
  <div class="designerContainer">
    <navigation title="Event Lab" back="Projects" back-url="/projects"/>

    <div class="designer">
      <image-collection/>
      <visual-designer/>
    </div>
  </div>
</template>

<style lang="scss">
  .designerContainer {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .designer {
    height: 100%;
    display: flex;
  }
</style>