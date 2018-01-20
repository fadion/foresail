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

      <div class="form-section form-section--inline form-section--separator">
        <label class="form-label">Port</label>
        <input type="text" class="form-control form-text form-control--small" value="80">
      </div>
      <div class="form-section form-section--separator">
        <label class="form-label">Domain</label>
        <input type="text" class="form-control form-text form-control--full" placeholder="www.domain.com">
      </div>
      <div class="form-section form-section--separator">
        <label class="form-label">Document Root</label>
        <input type="text" class="form-control form-text form-control--full" value="www">
      </div>
      <div class="form-section form-section--inline form-section--separator">
        <label class="form-label">Force www</label>
        <input type="checkbox" class="form-control form-checkbox" checked>
      </div>
      <div class="form-section form-section--inline form-section--separator">
        <label class="form-label">Use SSL</label>
        <input type="checkbox" class="form-control form-checkbox">
      </div>
      <div class="form-section form-section--inline form-section--separator">
        <label class="form-label">Enable gzip</label>
        <input type="checkbox" class="form-control form-checkbox" checked>
      </div>

      <div class="form-buttons u-mt30">
        <button class="form-button form-button--save">Save</button>
        <button class="form-button form-button--cancel" @click.left="cancelClicked">Cancel</button>
      </div>

      <button class="form-button form-button--destroy u-100width u-mt100" @click.left="destroyClicked">Destroy Image</button>
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