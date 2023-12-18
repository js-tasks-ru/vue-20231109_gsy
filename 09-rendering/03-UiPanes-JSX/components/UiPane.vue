<template>
  <div class="pane">
    <div class="pane__content">
      <slot />
    </div>
    <div class="pane__controls">
      <UiButton block
        variant="secondary"
        :class="{'pane__disabled-button': disableUp}"
        @click="$emit('up')">
        Up
      </UiButton>
      <UiButton block
        variant="danger"
        :class="{'pane__disabled-button': disableDown}"
        @click="$emit('down')">
        Down
      </UiButton>
    </div>
  </div>
</template>

<script setup>
  import UiButton from './UiButton.vue';

  const emit = defineEmits(['up', 'down']);
  const props = defineProps(['disableUp', 'disableDown']);
</script>

<style scoped>
  .pane {
    display: flex;
    flex-direction: row;
    border: 3px solid var(--blue-light);
  }

  .pane__content {
    border-right: 3px solid var(--blue-light);
    padding: 8px;
    flex: 1 0;
  }

  .pane__controls {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    width: min-content;
  }

  .pane__disabled-button {
    visibility: hidden;
  }
</style>
