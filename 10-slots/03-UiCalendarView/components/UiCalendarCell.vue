<template>
  <div class="calendar-view__cell" :class="{'calendar-view__cell_inactive': !active}" tabindex="0">
    <div class="calendar-view__cell-day">{{ localDate }}</div>
    <div class="calendar-view__cell-content">
      <slot name="events" :date="date"/>
    </div>
  </div>
</template>



<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    /** Временная метка даты. */
    date: {
      type: Number,
      required: true,
    },

    /** Активная ячейка. */
    active: {
      type: Boolean,
      default: true,
    },
  });


  /** Локализованный формат даты. */
  const localDate = computed(() => {
    let dat = new Date(props.date);
    let lng = navigator.language;
    let opt = { day: 'numeric' };
    return dat.toLocaleDateString(lng, opt);
  });
</script>



<style scoped>
  .calendar-view__cell {
    position: relative;
    height: auto;
    padding: 6px 8px;
    background-color: var(--white);
    color: var(--grey-8);
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    border-bottom: 1px solid var(--grey);
    border-left: 1px solid var(--grey);
    text-align: right;
  }

  .calendar-view__cell.calendar-view__cell_inactive {
    background-color: var(--grey-light);
  }

  @media all and (max-width: 767px) {
    .calendar-view__cell:nth-child(5n + 1) {
      border-left: none;
    }
  }

  @media all and (min-width: 767px) {
    .calendar-view__cell {
      height: 144px;
    }

    .calendar-view__cell:nth-child(7n + 1) {
      border-left: none;
    }
  }
</style>
