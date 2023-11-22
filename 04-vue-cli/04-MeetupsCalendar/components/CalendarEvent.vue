<template>
  <a class="calendar-event" :href="'/meetups/' + code">{{ title }}</a>
</template>

<script>
  export default {
    name: 'CalendarEvent',

    props: {
      code: {
        type: Number,
        required: true,
      },
      date: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style scoped>
  .calendar-event {
    --max-lines: 2;
    --line-height: 16px;

    display: block;
    text-align: left;
    text-decoration: none;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    font-weight: 600;
    line-height: var(--line-height);
    color: var(--white);
    padding: 4px 6px;
    border-radius: 2px;
    background-color: var(--blue);
    margin-top: 4px;
  }

  @media all and (min-width: 767px) {
    .calendar-event {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      max-height: calc(var(--max-lines) * var(--line-height) + 6px);
    }
  }
</style>
