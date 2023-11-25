<template>
  <div class="toasts">
    <UiToast
      v-for="itm in toasts"
      :key="itm.key"
      :type="itm.type"
      :text="itm.text"
      :duration="itm.duration"
      @expired="onExpired(itm)"
    />
  </div>
</template>

<script>
import UiToast from './UiToast.vue';

export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    // Добавить сообщение об ошибке.
    error(message) {
      this.toasts.push({
        key: 'error' + Date.now(),
        text: message || 'Error ' + new Date().toTimeString().slice(0, 8),
        type: 'error',
      });
    },

    // Добавить сообщение об успешной операции.
    success(message) {
      this.toasts.push({
        key: 'success' + Date.now(),
        text: message || 'Success ' + new Date().toTimeString().slice(0, 8),
        type: 'success',
      });
    },

    // Обработать истечение времени у сообщения.
    onExpired(toast) {
      let idx = this.toasts.indexOf(toast);
      if (~idx) this.toasts.splice(idx, 1);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
