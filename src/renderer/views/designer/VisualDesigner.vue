<script>
  import {mapState} from 'vuex'
  import * as types from '../../store/types'
  import PathBuilder from '../../services/PathBuilder'
  import Position from '../../utils/position'
  import Box from './Box'
  import Settings from './Settings'
  import Minimap from './Minimap'

  export default {
    name: 'visual-designer',

    data() {
      return {
        showSettings: false,
        selectedBox: null,
        dimensions: { width: 0, height: 0, scrollLeft: 0, scrollTop: 0},
        pathBuilder: null
      }
    },

    computed: {
      ...mapState([
        'boxes'
      ])
    },

    methods: {
      boxClicked(item, event) {
        this.showSettings = true
        this.selectedBox = event.target
      },

      hideSettings() {
        this.unblurry()
        this.selectedBox = null
        this.showSettings = false
      },

      blurry() {
        this.$refs.visualDesigner.classList.add('blurry')
        this.selectedBox.classList.add('is-active')
      },

      unblurry() {
        this.$refs.visualDesigner.classList.remove('blurry')
        this.selectedBox.classList.remove('is-active')
      },

      dragMoved(el) {
        this.pathBuilder.redraw(el)
      },

      dragEnded(el, pos) {
        this.$store.commit(types.UPDATE_BOX_POSITION, { id: Number.parseFloat(el.dataset.id), pos })
      },

      grabEnded() {
        this.dimensions.scrollLeft = this.$refs.visualDesigner.scrollLeft
        this.dimensions.scrollTop = this.$refs.visualDesigner.scrollTop
      },

      extendScrollArea(boxes) {
        let last = {
          x: Position.max(boxes, 'offsetLeft'),
          y: Position.max(boxes, 'offsetTop')
        }
        let canvas = {
          width: this.$refs.visualDesigner.offsetWidth,
          height: this.$refs.visualDesigner.offsetHeight
        }
        let max = {
          x: this.$refs.visualInner.offsetWidth - canvas.width / 2,
          y: this.$refs.visualInner.offsetHeight - canvas.height / 2
        }
        let extra = {
          width: last.x + canvas.width * 0.75,
          height: last.y + canvas.height * 0.75
        }

        if (last.x > max.x) {
          this.$refs.visualInner.style.width = `${extra.width}px`
        }

        if (last.y > max.y) {
          this.$refs.visualInner.style.height = `${extra.height}px`
        }
      }
    },

    mounted() {
      this.pathBuilder = new PathBuilder(this.layoutManager)

      this.dimensions = {
        width: this.$refs.visualDesigner.offsetWidth,
        height: this.$refs.visualDesigner.offsetHeight,
        scrollLeft: this.$refs.visualDesigner.scrollLeft,
        scrollTop: this.$refs.visualDesigner.scrollTop
      }

      // Make the scrolling area larger than the visible screen.
      this.$refs.visualInner.style.width = `${this.$refs.visualDesigner.offsetWidth * 1.5}px`
      this.$refs.visualInner.style.height = `${this.$refs.visualDesigner.offsetHeight * 1.5}px`
    },

    updated() {
      // Repopulate the box array on the LayoutManager with
      // the changes on the UI every time the component is
      // updated.
      let boxes = Array.from(this.$refs.visualDesigner.querySelectorAll('.imageBox'))
      this.layoutManager.setBoxes(boxes)

      this.extendScrollArea(boxes)

      // This will be checked everytime settings are opened
      // or a new box is dragged. If one was selected, blurry
      // the rest.
      if (this.selectedBox) {
        this.blurry()
      }
    },

    dependencies: ['layoutManager'],

    components: { Box, Settings, Minimap }
  }
</script>

<template>
  <div class="visualDesigner" ref="visualDesigner" v-grabbable="{ onEnd: grabEnded }" @mousewheel.prevent>
    <div class="visualDesigner-inner" ref="visualInner"></div>
    <box v-for="item in boxes" v-draggable="{ constraint: true, onMove: dragMoved, onEnd: dragEnded }"
         :data-id="item.id"
         :has-spots="true"
         :logo="item.logo"
         :version="item.version"
         :color="item.color"
         :key="item.id"
         :style="{ top: `${item.y}px`, left: `${item.x}px` }"
         @dblclick.left.native="boxClicked(item, $event)"
    />
    <minimap :container="dimensions"/>
    <settings v-if="showSettings" @hideSettings="hideSettings"/>
  </div>
</template>

<style lang="scss">
  .visualDesigner {
    width: 100%;
    position: relative;
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    &.blurry {
      // Every imagebox that doesn't have an .is-active
      // class, and every svg. The .is-active class is
      // applied programmatically to the selected box.
      .imageBox:not(.is-active), svg {
        filter: grayscale(.8) blur(1px);
        opacity: .8;
        pointer-events: none;
      }
    }

    .imageBox {
      position: absolute;
      transition: filter .3s, box-shadow 1s;

      &.is-active {
        box-shadow: 0 0 40px rgba(0, 0, 0, .15);
      }
    }

    // Arbitrary width and height to give the
    // user more workspace.
    .visualDesigner-inner {
      pointer-events: none;

      // The svg element is rendered to fill the whole
      // container, so that paths can be easily placed
      // without complicated calculations.
      svg {
        top: 0;
        left: 0;
        min-height: 100%;
        min-width: 100%;
        pointer-events: none;
      }

      path {
        stroke-width: 2;
        stroke: #d0d7e4;
        stroke-linecap: round;
        fill: none;
      }
    }

    &.is-grabbing {
      cursor: -webkit-grabbing;
    }
  }
</style>