<template>
  <button class="counter" @click="onClick">{{ value }}</button>
</template>

<script>
  export default {
    name: 'CounterButton',
    emits: ['update:count'],

    props: {
      count: {
        type: Number,
        default: 0,
      },
    },

    data() {
      return {
        value: this.count,
      };
    },

    watch: {
      count() {
        this.value = this.count;
      },
    },

    methods: {
      onClick() {
        this.value++;
        this.$emit('update:count', this.value);
      },
    },
  };
</script>

<style scoped>
  .counter {
    height: 1.5rem;
    min-width: 3rem;
  }
</style>
