<script>
  import {mapState} from 'vuex'

  export default {
    name: 'minimap',

    data() {
      return {
        minimapBoxes: [],
        viewport: { width: 0, height: 0, x: 0, y: 0 },
        canvas: { width: 0, height: 0 },
        baseBox: { width: 200, height: 70 },
        minimapSize: { width: 150, height: 70 },
        ratio: { x: 0, y: 0 }
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
          this.canvasSize()
          this.defineRatio()
          this.buildBoxes()
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
          x: this.minimapSize.width / this.canvas.width * this.ratio.x,
          y: this.minimapSize.height / this.canvas.height * this.ratio.y
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
        this.viewport.width = this.ratio.x * this.minimapSize.width
        this.viewport.height = this.ratio.y * this.minimapSize.height
      },

      canvasSize() {
        // @TODO: Find a way to pass the parent as an HTMLElement prop.
        this.canvas.width = document.querySelector('.visualDesigner').offsetWidth
        this.canvas.height = document.querySelector('.visualDesigner').offsetHeight
      },

      defineRatio() {
        let scale = this.defineScale()

        // X and Y ratios between the visible dimensions and the maximum
        // width and height of the laid out boxes. Capped to 1 to keep
        // the calculations within the visible viewport.
        this.ratio.x = Math.min(this.canvas.width / scale.x, 1)
        this.ratio.y = Math.min(this.canvas.height / scale.y, 1)
      },

      defineScale() {
        let boxes = Object.assign([], this.boxes)

        // Sort Obj.x on ascending order, so the last element of
        // the array is the rightmost box on the X axis.
        boxes.sort((a, b) => {
          return a.x - b.x
        })
        // As the X coordinate starts at the beggining of the box,
        // add the width.
        let width = boxes[boxes.length - 1].x + this.baseBox.width

        // Same but for thhe Y axis.
        boxes.sort((a, b) => {
          return a.y - b.y
        })
        let height = boxes[boxes.length - 1].y + this.baseBox.height

        return { x: width, y: height }
      }
    }
  }
</script>

<template>
  <div class="minimap">
    <div class="minimap-viewport" v-if="boxes.length"
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
    width: 150px;
    height: 70px;
    background: #eef1f6;
    outline: 1px solid #d9dee8;
  }

  .minimap-viewport {
    position: absolute;
    outline: 1px solid #c1c9db;
    background: rgba(151, 164, 191, .05);
  }

  .minimap-box {
    position: absolute;
    background: #d9dee8;
    opacity: .2;
  }
</style>