<template>
  <div class="button-group" role="group">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'UiButtonGroup',

    emits: ['update:modelValue'],

    props: {
      modelValue: {
        required: true,
      },
    },
  };
</script>

<style scoped>
  .button-group {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    white-space: nowrap;
  }
</style>
