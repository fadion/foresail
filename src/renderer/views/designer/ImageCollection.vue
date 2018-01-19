<script>
  import {mapState} from 'vuex'
  import * as types from '../../store/types'
  import Box from './Box'

  export default {
    name: 'image-collection',

    data() {
      return {
        searchText: ''
      }
    },

    computed: {
      ...mapState([
        'defaultBoxes'
      ]),

      filteredBoxes() {
        // Deep clone the "boxes" data so that it remains intact on
        // subsequent searches.
        const clonedBoxes = JSON.parse(JSON.stringify(this.defaultBoxes))

        return this.filterBoxes(clonedBoxes, this.searchText)
      }
    },

    methods: {
      filterBoxes(data, text) {
        return data.filter(item => {
          // When in a top-level node, recursively run the function
          // but this time by filtering the "items" property.
          if (item.items) {
            item.items = this.filterBoxes(item.items, text)
          }
          // Means it's on a lower-level node, so it checks the item's
          // name against the search text.
          if (item.name) {
            return item.name.toLowerCase().includes(text.toLowerCase())
          }
          // Top-level node. Return only the boxes that have at least
          // one item that corresponded to the search text.
          return item.items.length
        })
      },

      clearSearch(event) {
        event.preventDefault()

        this.searchText = ''
        this.$refs.searchInput.blur()
      },

      dragEnded(data) {
        // Add to the original data the current position
        // of the box and a unique identifier. The box is
        // cloned, otherwise these changes will be passed
        // to the original reference.
        let box = Object.assign({
          id: Math.random(),
          x: data.pos.x,
          y: data.pos.y
        }, data.payload)

        this.$store.commit(types.ADD_BOX, box)
      }
    },

    created() {
      this.$store.dispatch('getAllDefaultBoxes')
    },

    components: { Box }
  }
</script>

<template>
  <aside class="imageCollection">
    <div class="imageCollection-search">
      <input type="text" class="imageCollection-input" placeholder="search for an image" ref="searchInput" v-model="searchText" @keyup.esc="clearSearch">
      <transition name="imageCollection-clearSearch">
        <a href="#" class="imageCollection-clearSearch" v-if="searchText" @click="clearSearch">&times;</a>
      </transition>
    </div>

    <div class="imageCollection-section" v-for="box in filteredBoxes" :key="box.section">
      <h3 class="imageCollection-sectionTitle">{{ box.section }}</h3>
      <box v-for="item in box.items" v-draggable="{ ghost: true, ghostContainer: '.visualDesigner', payload: item }"
           :logo="item.logo"
           :version="item.version"
           :color="item.color"
           :key="item.name + item.version"
           @dragEnded="dragEnded"
      ></box>
    </div>

    <div class="imageCollection-noResults" v-if="!filteredBoxes.length">No boxes found</div>
  </aside>
</template>

<style lang="scss">
  .imageCollection {
    flex: 0 0 240px;
    background: #eaedf3;
    padding: 20px;
    overflow-y: scroll;
    text-align: center;

    &::-webkit-scrollbar {
      display: none;
    }

    .imageBox {
      margin: 15px auto;
    }
  }

  .imageCollection-search {
    position: relative;
  }

  .imageCollection-input {
    width: 100%;
    background: #dfe2e9 url("../../assets/images/icon-search.svg") no-repeat 10px center;
    border: 0;
    padding: 10px;
    text-align: center;
    color: #616161;
    margin-bottom: 20px;
    position: relative;

    &::-webkit-input-placeholder {
      text-align: center;
      color: #a6a9b1;
    }
  }

  .imageCollection-clearSearch {
    position: absolute;
    top: 10px;
    right: 10px;
    text-decoration: none;
    color: #aaa;

    // Vue transition classes.
    &-enter-active, &-leave-active {
      transition: transform .2s, opacity .3s;
    }

    &-enter {
      transform: translateX(10px);
      opacity: 0;
    }

    &-leave-to {
      opacity: 0;
    }
  }

  .imageCollection-section:not(:last-child) {
    margin-bottom: 30px;
  }

  .imageCollection-sectionTitle,
  .imageCollection-noResults {
    font-size: 14px;
    font-weight: normal;
    color: #a6a9b1;
    margin: 0;
    padding: 0;
  }
</style>