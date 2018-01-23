<script>
  export default {
    name: 'box',

    props: {
      logo: {
        type: String,
        required: true
      },
      version: {
        type: String,
        required: true
      },
      hasSpots: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        required: true
      }
    },

    computed: {
      imagePath() {
        return require(`../../assets/images/${this.logo}`)
      }
    }
  }
</script>

<template>
  <div class="imageBox" :class="{ 'imageBox--withSpots': hasSpots }" :style="{ 'border-top-color': color }">
    <div class="imageBox-info">
      <img :src="imagePath" class="imageBox-logo">
      <span class="imageBox-version">{{ version }}</span>
    </div>
    <div class="imageBox-lspot"></div>
    <div class="imageBox-rspot"></div>
  </div>
</template>

<style lang="scss">
  .imageBox {
    width: 200px;
    height: 70px;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, .05);
    border-radius: 3px;
    // Boxes have a colored border-top based on the
    // kind of box. Just a sensible default.
    border-top: 5px solid transparent;
    padding: 15px;
    position: relative;
    transition: opacity .2s;
    // For some strange reason the cursor is changed
    // to text once dragging starts. This fixes it.
    cursor: default;

    &.is-faded {
      opacity: .5;
    }

    // Toggle to make the connecting spots visible.
    &--withSpots {
      .imageBox-rspot,
      .imageBox-lspot {
        opacity: 1;
      }

      .imageBox-lspot {
        left: -6px;
      }

      .imageBox-rspot {
        right: -6px;
      }
    }
  }

  .imageBox-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .imageBox-info,
  .imageBox-version {
    pointer-events: none;
  }

  // The spots are placed at the extremities, centered
  // vertically, and within the body of the container.
  .imageBox-lspot,
  .imageBox-rspot {
    position: absolute;
    top: calc(50% - 6px);
    width: 6px;
    height: 12px;
    background: #d0d7e4;
    opacity: 0;
    transition: transform .2s, opacity .3s, left .2s, right .2s;
  }

  .imageBox-lspot {
    left: 0;
    border-radius: 100px 0 0 100px;
  }

  .imageBox-rspot {
    right: 0;
    border-radius: 0 100px 100px 0;
  }

  // Bulking the spots a bit so their hit boxes
  // are larger and easier to reach.
  .imageBox-lspot::before,
  .imageBox-rspot::before {
    content: "";
    display: block;
    position: relative;
    width: 20px;
    height: 20px;
    top: -4px;
  }

  .imageBox-lspot::before {
    left: -6px;
  }

  .imageBox-rspot::before {
    right: 9px;
  }

  // Hover and active spots become larger and
  // full circes.
  .imageBox-rspot:hover,
  .imageBox-rspot.is-active,
  .imageBox-lspot:hover,
  .imageBox-lspot.is-active {
    width: 12px;
    border-radius: 100px;
    transform: scale(1.5);
  }

  .imageBox-lspot:hover::before,
  .imageBox-lspot.is-active::before {
    left: -4px;
  }

  .imageBox-rspot:hover::before,
  .imageBox-rspot.is-active::before {
    right: 4px;
  }
</style>