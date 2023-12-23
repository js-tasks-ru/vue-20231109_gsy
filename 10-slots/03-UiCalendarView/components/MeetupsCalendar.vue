<template>
  <UiCalendarView>
    <template #events="{date}">
      <UiCalendarEvent v-for="{id, title} in getDayMeetups(date)"
        tag="a"
        :key="id"
        :href="`/meetups/${id}`">
        {{ title }}
      </UiCalendarEvent>
    </template>
  </UiCalendarView>
</template>



<script setup>
  import { computed } from 'vue';
  import UiCalendarView from './UiCalendarView.vue';
  import UiCalendarEvent from './UiCalendarEvent.vue';



  const props = defineProps({
    meetups: {
      type: Array,
      required: true,
    }
  });



  /** Древо митапов в виде: tree.YYYY.MM.DD = [...] */
  const meetupsTree = computed(() => {
    const tree = {};

    props.meetups.forEach(event => {
      let date = new Date(event.date);
      let [y, m, d] = [
        date.getFullYear(),
        date.getMonth()+1,
        date.getDate()
      ];

      if (!tree[y]) tree[y] = {};
      if (!tree[y][m]) tree[y][m] = {};
      if (!tree[y][m][d]) tree[y][m][d] = [];

      tree[y][m][d].push(event);
    });

    return tree;
  });



  /**
   * Получить набор событий для одного дня.
   * @param date {Date|Number} Дата, на которую ищем.
   * @returns {Object[]} События на один день.
   */
  function getDayMeetups(time) {
    let meetups = meetupsTree.value;
    let date = new Date(time);
    let [y, m, d] = [
      date.getFullYear(),
      date.getMonth()+1,
      date.getDate()
    ];

    return meetups[y]?.[m]?.[d] || [];
  }
</script>



<style scoped></style>
