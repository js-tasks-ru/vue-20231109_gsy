<template>
  <div class="calendar-view__cell" :class="{ 'calendar-view__cell_inactive': !active }" tabindex="0">
    <div class="calendar-view__cell-day">{{ text }}</div>
    <div class="calendar-view__cell-content">
      <CalendarEvent v-for="evt in events"
        :key="evt.id"
        :code="evt.id"
        :date="evt.date"
        :title="evt.title"/>
    </div>
  </div>
</template>

<script>
  import CalendarEvent from './CalendarEvent.vue';

  export default {
    name: 'CalendarCell',

    components: { CalendarEvent },

    props: {
      date: {
        type: Number,
        required: true,
      },
      active: {
        type: Boolean,
        default: true,
      },
      events: {
        type: Array,
        default: () => [],
      },
    },

    computed: {
      text() {
        let dat = new Date(this.date);
        let lng = navigator.language;
        let opt = { day: 'numeric' };
        return dat.toLocaleDateString(lng, opt);
      },
    },
  };
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
