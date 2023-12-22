<template>
  <div class="pagination-container">
    <template v-for="item in pageItems">
      <slot :item="item"/>
    </template>
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    pageItems() {
      let full = this.items.length;
      let next = this.perPage;
      let skip = next * (this.page - 1);
      let last = Math.min(skip+next, full);
      return this.items.slice(skip, last);
    }
  }
};
</script>

<style></style>
