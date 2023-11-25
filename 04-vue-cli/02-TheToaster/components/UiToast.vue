<template>
  <div class="toast" :class="styleClass">
    <UiIcon v-if="iconName" class="toast__icon" :icon="iconName" />
    <span>{{ text }}</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'TheToast',

  components: { UiIcon },

  emits: ['expired'],

  props: {
    type: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 5,
    },
  },

  computed: {
    iconName() {
      switch (this.type) {
        case 'error':
          return 'alert-circle';
        case 'success':
          return 'check-circle';
        default:
          return '';
      }
    },
    styleClass() {
      return {
        toast_error: this.type === 'error',
        toast_success: this.type === 'success',
      };
    },
  },

  created() {
    if (this.duration <= 0) return;
    setTimeout(() => this.$emit('expired'), this.duration * 1000);
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
  color: gray;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
