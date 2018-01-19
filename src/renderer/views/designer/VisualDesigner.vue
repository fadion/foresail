<script>
  import {mapState} from 'vuex'
  import * as types from '../../store/types'
  import PathBuilder from '../../services/PathBuilder'
  import Draggable from '../../services/Draggable'
  import Box from './Box'
  import Settings from './Settings'
  import Minimap from './Minimap'

  export default {
    name: 'visual-designer',

    data() {
      return {
        isGrabbing: false,
        grabTarget: null,
        grabOffset: { x: 0, y: 0 },
        targetDragBox: null,
        isDragging: false,
        draggable: null,
        pathBuilder: null,
        showSettings: false,
        selectedBox: null
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
        this.targetDragBox = box
        this.draggable = new Draggable(event.target, {
          constraint: true
        })
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
            this.$store.commit(types.UPDATE_BOX_POSITION, { id: this.targetDragBox.id, pos })
          })

          this.isDragging = false
        }
      },

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

      // This will be checked everytime settings are opened
      // or a new box is dragged. If one was selected, blurry
      // the rest.
      if (this.selectedBox) {
        this.blurry()
      }
    },

    destroyed() {
      window.removeEventListener('mousemove', this.grabMoved)
      window.removeEventListener('mousemove', this.grabMoved)

      window.removeEventListener('mouseup', this.boxDragMoved)
      window.removeEventListener('mouseup', this.boxDragEnded)
    },

    dependencies: ['layoutManager'],

    components: { Box, Settings, Minimap }
  }
</script>

<template>
  <div class="visualDesigner" ref="visualDesigner" @mousedown.left="grabStarted" @mousewheel.prevent>
    <div class="visualDesigner-inner"></div>
    <box v-for="item in boxes" :data-id="item.id"
         :has-spots="true"
         :logo="item.logo"
         :version="item.version"
         :color="item.color"
         :key="item.id"
         :style="{ top: `${item.y}px`, left: `${item.x}px` }"
         @mousedown.self.left.native="boxDragStarted(item, $event)"
         @dblclick.left.native="boxClicked(item, $event)"
    ></box>
    <minimap></minimap>
    <settings v-if="showSettings" @hideSettings="hideSettings"></settings>
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