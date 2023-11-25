<template>
  <div class="calendar-view">
    <CalendarControls v-model:year="year" v-model:month="month" />

    <div class="calendar-view__grid">
      <CalendarCell v-for="(cell, idx) in cells"
        :key="idx"
        :date="cell.date"
        :active="cell.active"
        :events="monthEvents"/>
    </div>
  </div>
</template>

<script>
  import CalendarControls from './CalendarControls.vue';
  import CalendarCell from './CalendarCell.vue';

  export default {
    name: 'MeetupsCalendar',

    components: {
      CalendarControls,
      CalendarCell,
    },

    props: {
      meetups: {
        type: Array,
        required: true,
      },
    },

    data() {
      return {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      };
    },

    computed: {
      cells() {
        let date = new Date(this.year, this.month, 0);
        let wday = Math.abs((date.getDay() - 7) % 7);
        let clls = [];

        for (let i = 0; i < 42; i++) {
          let dat = new Date(this.year, this.month, wday - i);
          let act = this.month === dat.getMonth() + 1;
          let day = dat.getDay();

          // вся неделя предыдущего месяца.
          if (i > 27 && !day && !act) break;

          clls.push({
            date: dat.getTime(),
            active: act,
          });
        }

        return clls.reverse();
      },

      monthEvents() {
        return this.meetups.filter(evt => {
          let evtD = new Date(evt.date);
          let thatY = evtD.getFullYear() === this.year;
          let thatM = evtD.getMonth() + 1 === this.month;
          return thatY && thatM;
        });
      },
    },
  };
</script>

<style scoped>
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
