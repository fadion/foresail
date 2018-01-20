<script>
  import {mapState} from 'vuex'

  export default {
    name: 'minimap',

    data() {
      return {
        minimapBoxes: [],
        viewport: { width: 0, height: 0, x: 0, y: 0 },
        baseBox: { width: 200, height: 70 },
        minimapSize: { width: 130, height: 60 },
        ratio: { x: 0, y: 0 },
        scale: { width: 0, height: 0 }
      }
    },

    props: {
      container: {
        type: Object,
        required: true
      }
    },

    computed: {
      ...mapState([
        'boxes'
      ])
    },

    watch: {
      boxes: {
        handler() {
          this.defineScale()
          this.defineRatio()
          this.buildBoxes()
          this.buildViewport()
        },
        deep: true
      },
      container: {
        handler() {
          this.buildViewport()
        },
        deep: true
      }
    },

    methods: {
      buildBoxes() {
        this.minimapBoxes = []

        // It takes the ratio between the minimap and the viewport as a
        // scaling factor, multiplying the max dimensions ratio for further
        // shrinking.
        let ratio = {
          x: this.minimapSize.width / this.container.width * this.ratio.x,
          y: this.minimapSize.height / this.container.height * this.ratio.y
        }

        this.boxes.forEach(box => {
          this.minimapBoxes.push({
            width: this.baseBox.width * ratio.x,
            height: this.baseBox.height * ratio.y,
            x: box.x * ratio.x,
            y: box.y * ratio.y,
            color: box.color
          })
        })
      },

      buildViewport() {
        // X and Y coordinates of the rightmost and the very
        // bottom box.
        let max = {
          x: Math.max(this.scale.width - this.container.width, 0),
          y: Math.max(this.scale.height - this.container.height, 0)
        }

        this.viewport.width = this.ratio.x * this.minimapSize.width
        this.viewport.height = this.ratio.y * this.minimapSize.height

        // When the scroll is within the rightmost box boundaries, it is
        // that value that's used for the calculation. Otherwise, cap it
        // at the rightmost coordinate.
        this.viewport.x = this.viewport.width / this.container.width
          * Math.min(this.container.scrollLeft, max.x)

        this.viewport.y = this.viewport.height / this.container.height
          * Math.min(this.container.scrollTop, max.y)
      },

      defineRatio() {
        // X and Y ratios between the visible dimensions and the maximum
        // width and height of the laid out boxes. Capped to 1 to keep
        // the calculations within the visible viewport.
        this.ratio.x = Math.min(this.container.width / this.scale.width, 1)
        this.ratio.y = Math.min(this.container.height / this.scale.height, 1)
      },

      defineScale() {
        let boxes = Object.assign([], this.boxes)

        // Sort Obj.x on ascending order, so the last element of
        // the array is the rightmost box on the X axis.
        boxes.sort((a, b) => {
          return a.x - b.x
        })
        // As the X coordinate starts at the beginning of the box,
        // add the width.
        let width = boxes[boxes.length - 1].x + this.baseBox.width

        // Same but for thhe Y axis.
        boxes.sort((a, b) => {
          return a.y - b.y
        })
        let height = boxes[boxes.length - 1].y + this.baseBox.height

        this.scale = { width, height }
      }
    }
  }
</script>

<template>
  <div class="minimap" v-if="boxes.length">
    <div class="minimap-viewport"
         :style="{
      width: `${viewport.width}px`,
      height: `${viewport.height}px`,
      left: `${viewport.x}px`,
      top: `${viewport.y}px`
    }"
    ></div>
    <div class="minimap-box" v-for="box in minimapBoxes"
         :style="{
      width: `${box.width}px`,
      height: `${box.height}px`,
      left: `${box.x}px`,
      top: `${box.y}px`,
      backgroundColor: box.color
    }"></div>
  </div>
</template>

<style lang="scss">
  .minimap {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 130px;
    height: 60px;
    background: #eef1f6;
    outline: 1px solid #d9dee8;
  }

  .minimap-viewport {
    position: absolute;
    outline: 1px solid #c1c9db;
    background: rgba(151, 164, 191, .07);
  }

  .minimap-box {
    position: absolute;
    background: #d9dee8;
    opacity: .2;
  }
</style>