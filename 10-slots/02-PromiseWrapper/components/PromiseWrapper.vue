<template>
  <slot :name="state" v-bind="$data" />
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      state: 'pending',
      result: null,
      error: null,
    }
  },

  watch: {
    promise: {
      immediate: true,
      handler() {
        this.state = 'pending';
        this.result = null;
        this.error = null;

        this.promise.then(result => {
          this.result = result;
          this.state = 'fulfilled';
        }).catch(error => {
          this.error = error;
          this.state = 'rejected';
        });
      }
    }
  }
};
</script>
