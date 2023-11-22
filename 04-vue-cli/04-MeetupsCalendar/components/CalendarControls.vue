<template>
  <div class="calendar-view__controls">
    <div class="calendar-view__controls-inner">
      <button class="calendar-view__control-left" type="button" aria-label="Previous month" @click="onClickPrev"></button>
      <div class="calendar-view__date">{{ localDate }}</div>
      <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="onClickNext"></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CalendarControls',

    emits: ['click-prev', 'click-next', 'update:year', 'update:month'],

    props: {
      month: {
        type: Number,
        default: () => new Date().getMonth() + 1,
      },
      year: {
        type: Number,
        default: () => new Date().getFullYear(),
      },
    },

    computed: {
      localDate() {
        let lng = navigator.language;
        let opt = { month: 'long', year: 'numeric' };
        let dat = new Date(this.year, this.month, 0);
        return dat.toLocaleDateString(lng, opt);
      },
    },

    methods: {
      onClickPrev() {
        let nM = (this.month - 1) % 12;
        let nY = !nM;

        this.$emit('click-prev');
        this.$emit('update:month', nM || 12);
        if (nY) this.$emit('update:year', this.year - 1);
      },

      onClickNext() {
        let nM = (this.month + 1) % 12;
        let nY = nM === 1;

        this.$emit('click-next');
        this.$emit('update:month', nM || 12);
        if (nY) this.$emit('update:year', this.year + 1);
      },
    },
  };
</script>

<style scoped>
  .calendar-view__controls {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 1;
    color: var(--blue);
    background-color: var(--blue-extra);
    padding: 24px;
    display: flex;
    justify-content: center;
  }

  .calendar-view__controls-inner {
    max-width: 325px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-transform: capitalize;
  }

  .calendar-view__controls-inner button {
    border: none;
    padding: 0;
  }

  .calendar-view__control-left,
  .calendar-view__control-right {
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s all;
    background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
    background-size: cover;
  }

  .calendar-view__control-left:hover,
  .calendar-view__control-right:hover {
    opacity: 0.8;
  }

  .calendar-view__control-right {
    transform: rotate(180deg);
  }
</style>
