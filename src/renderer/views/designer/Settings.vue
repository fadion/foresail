<script>
  export default {
    name: 'settings',

    methods: {
      cancelClicked() {
        this.$emit('hideSettings')
      },

      destroyClicked() {
        this.$emit('deleteBox')
      }
    }
  }
</script>

<template>
  <transition name="boxSettings">
    <div class="boxSettings">
      <h2>Nginx Configuration</h2>

      <label class="form-section form-section--inline form-section--separator">
        <span class="form-label">Port</span>
        <input type="text" class="form-control form-text form-control--small" value="80">
      </label>
      <label class="form-section form-section--separator">
        <span class="form-label">Domain</span>
        <input type="text" class="form-control form-text form-control--full" placeholder="www.domain.com">
      </label>
      <label class="form-section form-section--separator">
        <span class="form-label">Document Root</span>
        <input type="text" class="form-control form-text form-control--full" value="www">
      </label>
      <label class="form-section form-section--inline form-section--separator">
        <span class="form-label">Force www</span>
        <input type="checkbox" class="form-control form-checkbox" checked>
      </label>
      <label class="form-section form-section--inline form-section--separator">
        <span class="form-label">Use SSL</span>
        <input type="checkbox" class="form-control form-checkbox">
      </label>
      <label class="form-section form-section--inline form-section--separator">
        <span class="form-label">Enable gzip</span>
        <input type="checkbox" class="form-control form-checkbox" checked>
      </label>

      <div class="form-buttons u-mt30">
        <button class="form-button button button--save">Save</button>
        <button class="form-button button button--cancel" @click.left="cancelClicked">Cancel</button>
      </div>

      <button class="form-button button button--destroy u-100width u-mt100" @click.left="destroyClicked">Destroy Image</button>
    </div>
  </transition>
</template>

<style lang="scss">
  .boxSettings {
    position: fixed;
    top: 0;
    right: 0;
    width: 350px;
    height: 100%;
    background: white;
    box-shadow: -7px 0 15px rgba(0, 0, 0, .05);
    padding: 70px 20px 20px 20px;

    h2 {
      margin: 0 0 30px 0;
      padding: 0;
      font-weight: normal;
    }

    &-enter-active, &-leave-active {
      transition: right .4s ease-out;
    }

    &-enter, &-leave-to {
      right: -400px;
    }
  }
</style>