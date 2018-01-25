<script>
  import * as types from '../../store/types'

  export default {
    name: 'notification',

    data() {
      return {
        timeout: null
      }
    },

    props: {
      notification: {
        type: Object,
        required: true
      }
    },

    methods: {
      remove() {
        this.$store.commit(types.DELETE_NOTIFICATION, this.notification)
      },

      retry() {
        this.$refs.reply.classList.add('is-animating')

        this.$store.dispatch(this.notification.retry)
          .then(() => {
            this.remove()
          })
          .catch(() => {
            this.remove()
          })
      }
    },

    mounted() {
      if (!this.notification.sticky) {
        let delay = this.notification.delay || 3000

        this.timeout = setTimeout(() => {
          this.remove()
        }, delay)
      }
    },

    beforeDestroy() {
      if (this.timeout) {
        // Without clearing the timeout, it will stack them
        // when the component is updated or remounted and
        // cause unexpected behaviour.
        clearTimeout(this.timeout)
      }
    }
  }
</script>

<template>
  <div class="notification"
       :class="[`notification--${notification.type || 'error' }`, { 'notification--sticky': notification.sticky }]"
       @click="remove"
  >
    <p class="notification-message">
      {{ notification.message }}
      <a href="#" class="notification-retry" ref="reply" v-if="notification.retry" @click.prevent.stop="retry">Retry</a>
    </p>
  </div>
</template>

<style lang="scss">
  .notification {
    background: #777;
    color: white;
    border-radius: 3px;
    padding: 20px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    cursor: pointer;

    &::before {
      font-size: 25px;
    }

    &--error {
      background: #fce2e5;
      color: #d6283d;

      &::before {
        content: ':(';
      }

      .notification-retry {
        color: #d6283d;
      }
    }

    &--warning {
      background: #ffeebe;
      color: #ac820c;

      &::before {
        content: ':|';
      }

      .notification-retry {
        color: #ac820c;
      }
    }

    &--success {
      background: #d4fbc6;
      color: #4c8416;

      &::before {
        content: ':)';
      }
    }

    &--sticky::after {
      content: "×";
      position: absolute;
      top: 5px;
      right: 8px;
      opacity: .5;
    }

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  .notification-message {
    width: 90%;
    font-size: 14px;
    margin: 0;
    padding: 0;
  }

  .notification-retry {
    font-weight: bold;
    display: block;
    margin-top: 5px;

    &.is-animating::after {
      content: "";
      display: inline-block;
      margin-left: 5px;
      animation: .7s infinite alternate textSpinner;
    }
  }

  @keyframes textSpinner {
    0% {
      content: "";
    }

    33% {
      content: ".";
    }

    66% {
      content: "..";
    }

    100% {
      content: "...";
    }
  }
</style>