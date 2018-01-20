<script>
  export default {
    name: 'navigation',

    props: {
      title: {
        type: String,
        required: true
      },
      back: String,
      backUrl: String
    },

    data() {
      return {
        newTitle: this.title
      }
    },

    methods: {
      titleClicked(event) {
        event.target.classList.remove('inactive')
        event.target.removeAttribute('readonly')
        // @TODO this is not working
        event.target.focus()
      },

      titleBlur(event) {
        event.target.classList.add('inactive')
        event.target.setAttribute('readonly', true)
      }
    }
  }
</script>

<template>
  <nav class="mainNav">
    <router-link :to="backUrl" class="mainNav-back" v-if="back">{{ back }}</router-link>
    <h1 class="mainNav-title">
      <input type="text" class="inactive" v-model="newTitle" @click="titleClicked" @blur="titleBlur" readonly>
    </h1>
  </nav>
</template>

<style lang="scss">
  .mainNav {
    background: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, .07);
    font-size: 18px;
    position: relative;
    padding: 10px 0;
    z-index: 10;
    flex-shrink: 0;
  }

  .mainNav-back {
    position: absolute;
    left: 20px;
    top: calc(50% - 9px);
    text-decoration: none;
    color: #387dcb;

    &::before {
      content: "< ";
    }
  }

  .mainNav-title,
  .mainNav input {
    text-align: center;
    font-weight: normal;
    color: #b8b8b8;
    font-size: 28px;
  }

  .mainNav-title {
    margin: 0 auto;
    padding: 0;
    width: 50%;
  }

  .mainNav-title input {
    width: 100%;
    border: 0;

    // Make the input behave like a
    // normal title.
    &.inactive {
      cursor: default;
      user-select: none;
    }
  }
</style>