<script>
  import {mapState} from 'vuex'
  import * as types from '../../store/types'
  import PathBuilder from '../../services/PathBuilder'
  import Draggable from '../../services/Draggable'
  import Box from './Box'
  import Settings from './Settings'

  export default {
    name: 'visual-designer',

    data() {
      return {
        isGrabbing: false,
        grabTarget: null,
        grabOffset: { x: 0, y: 0 },
        targetBox: null,
        isDragging: false,
        draggable: null,
        pathBuilder: null,
        showSettings: false
      }
    },

    computed: {
      ...mapState([
        'boxes'
      ])
    },

    methods: {
      grabStarted(event) {
        this.isGrabbing = true
        this.grabTarget = event.target
        this.grabOffset = { x: event.clientX, y: event.clientY }

        event.target.classList.add('is-grabbing')
      },

      grabMoved(event) {
        if (this.isGrabbing) {
          // Scroll the element by adding the amount that the
          // mouse moved.
          this.grabTarget.scrollLeft += this.grabOffset.x - event.clientX
          this.grabTarget.scrollTop += this.grabOffset.y - event.clientY

          // Reset the offset to the current position, so mouse move
          // difference can be as small as possible.
          this.grabOffset = { x: event.clientX, y: event.clientY }
        }
      },

      grabEnded() {
        if (this.isGrabbing) {
          this.isGrabbing = false
          this.grabTarget.classList.remove('is-grabbing')
        }
      },

      boxDragStarted(box, event) {
        this.isDragging = true
        this.targetBox = box
        this.draggable = new Draggable(event.target)
        this.draggable.started(event)
      },

      boxDragMoved(event) {
        if (this.isDragging) {
          this.draggable.moved(event, (item) => {
            // Paths connected to the specific box are
            // redrawn once it moves.
            this.pathBuilder.redraw(item)
          })
        }
      },

      boxDragEnded() {
        if (this.isDragging) {
          this.draggable.ended((el, pos) => {
            // Trigger an update in the store, so the new box
            // position can be reflected in the UI.
            this.$store.commit(types.UPDATE_BOX_POSITION, { id: this.targetBox.id, pos })
          })

          this.isDragging = false
        }
      },

      boxClicked() {
        this.showSettings = true
      },

      hideSettings() {
        this.showSettings = false
      }
    },

    created() {
      window.addEventListener('mousemove', this.grabMoved)
      window.addEventListener('mousemove', this.boxDragMoved)

      window.addEventListener('mouseup', this.grabEnded)
      window.addEventListener('mouseup', this.boxDragEnded)
    },

    mounted() {
      this.pathBuilder = new PathBuilder(this.layoutManager)
    },

    updated() {
      // Repopulate the box array on the LayoutManager with
      // the changes on the UI every time the component is
      // updated.
      let boxes = this.$refs.visualDesigner.querySelectorAll('.imageBox')
      this.layoutManager.setBoxes(Array.from(boxes))
    },

    destroyed() {
      window.removeEventListener('mousemove', this.grabMoved)
      window.removeEventListener('mousemove', this.grabMoved)

      window.removeEventListener('mouseup', this.boxDragMoved)
      window.removeEventListener('mouseup', this.boxDragEnded)
    },

    dependencies: ['layoutManager'],

    components: { Box, Settings }
  }
</script>

<template>
  <div class="visualDesigner" ref="visualDesigner" @mousedown.left="grabStarted">
    <div class="visualDesigner-inner"></div>
    <box v-for="item in boxes" :data-id="item.id"
         :has-spots="true"
         :logo="item.logo"
         :version="item.version"
         :color="item.color"
         :key="item.id"
         :style="{ top: `${item.y}px`, left: `${item.x}px` }"
         @mousedown="boxDragStarted(item, $event)"
         @click="boxClicked(item)"
    ></box>
    <settings v-if="showSettings" @hideSettings="hideSettings"></settings>
  </div>
</template>

<style lang="scss">
  .visualDesigner {
    width: 100%;
    position: relative;
    overflow: scroll;

    .imageBox {
      position: absolute;
    }

    // Arbitrary width and height to give the
    // user more workspace.
    .visualDesigner-inner {
      width: 4000px;
      height: 2000px;
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