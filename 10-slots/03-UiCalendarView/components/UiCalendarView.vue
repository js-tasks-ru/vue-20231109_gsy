<template>
  <div class="calendar-view">
    <UiCalendarControls v-model:month="month" v-model:year="year"/>

    <div class="calendar-view__grid">
      <UiCalendarCell v-for="cell in cells" :key="cell.date" v-bind="cell">
        <template #events="{date}">
          <slot name="events" :date="date"/>
        </template>
      </UiCalendarCell>
    </div>
  </div>
</template>



<script setup>
  import { ref, computed } from 'vue';
  import UiCalendarControls from './UiCalendarControls.vue';
  import UiCalendarCell from './UiCalendarCell.vue';



  /** Текущий год календаря. */
  const year = ref(new Date().getFullYear());
  /** Текущий месяц календаря. */
  const month = ref(new Date().getMonth()+1);



  /** Данные ячеек (дней) в текущем месяце календаря. */
  const cells = computed(() => {
    let date = new Date(year.value, month.value, 0);
    let wday = (7 - date.getDay()) % 7;
    let clls = [];

    for (let i = 0; i < 42; i++) {
      let dat = new Date(year.value, month.value, wday - i);
      let act = month.value === dat.getMonth() + 1;
      let day = dat.getDay();

      // вся неделя предыдущего месяца.
      if (i > 27 && !day && !act) break;

      clls.push({
        date: dat.getTime(),
        active: act,
      });
    }

    return clls.reverse();
  });
</script>



<style scoped>
.calendar-view {
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }
}
</style>
