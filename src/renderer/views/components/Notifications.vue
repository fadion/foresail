<script>
  import {mapState} from 'vuex'
  import Notification from './Notification'

  export default {
    name: 'notifications',

    data() {
      return {
        shownNotifications: []
      }
    },

    computed: {
      ...mapState([
        'notifications'
      ])
    },

    watch: {
      notifications(notifications) {
        this.shownNotifications = notifications
      }
    },

    components: { Notification }
  }
</script>

<template>
  <div class="notifications">
    <transition-group name="notifications" tag="div">
      <notification v-for="notification in shownNotifications"
                    :key="notification.id"
                    :notification="notification"
      />
    </transition-group>
  </div>
</template>

<style lang="scss">
  .notifications {
    position: fixed;
    bottom: 20px;
    right: 20px;
    max-width: 450px;

    &-enter-active, &-leave-active {
      transition: transform .4s, opacity .4s;
    }

    &-enter {
      transform: translateY(200px);
    }

    &-leave-to {
      opacity: 0;
    }

    &-move {
      transition: transform .6s;
    }
  }
</style>