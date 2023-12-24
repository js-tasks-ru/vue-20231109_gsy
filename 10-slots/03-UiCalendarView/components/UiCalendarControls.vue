<template>
  <div class="calendar-controls">
    <div class="calendar-controls-inner">
      <button class="calendar-control-left"
        type="button"
        aria-label="Previous month"
        @click.prevent="clickPrev">
      </button>

      <div class="calendar-view__date">{{ localDate }}</div>

      <button class="calendar-control-right"
        type="button"
        aria-label="Next month"
        @click.prevent="clickNext">
      </button>
    </div>
  </div>
</template>



<script setup>
  import { computed } from 'vue';

  const emit = defineEmits([
    'click-prev',
    'click-next',
    'update:year',
    'update:month'
  ]);



  const props = defineProps({
    month: {
      type: Number,
      default: () => new Date().getMonth() + 1,
    },
    year: {
      type: Number,
      default: () => new Date().getFullYear(),
    },
  });



  const localDate = computed(() => {
    let lng = navigator.language;
    let opt = { month: 'long', year: 'numeric' };
    let dat = new Date(props.year, props.month, 0);
    return dat.toLocaleDateString(lng, opt);
  });



  function clickPrev() {
    let nM = (props.month - 1) % 12;
    let nY = !nM;

    emit('click-prev');
    emit('update:month', nM || 12);
    if (nY) emit('update:year', props.year - 1);
  }



  function clickNext() {
    let nM = (props.month + 1) % 12;
    let nY = nM === 1;

    emit('click-next');
    emit('update:month', nM || 12);
    if (nY) emit('update:year', props.year + 1);
  }
</script>



<style scoped>
  .calendar-controls {
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

  .calendar-controls-inner {
    max-width: 325px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-transform: capitalize;
  }

  .calendar-controls-inner button {
    border: none;
    padding: 0;
  }

  .calendar-control-left,
  .calendar-control-right {
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

  .calendar-control-left:hover,
  .calendar-control-right:hover {
    opacity: 0.8;
  }

  .calendar-control-right {
    transform: rotate(180deg);
  }
</style>
