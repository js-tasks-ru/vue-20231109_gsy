import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    type() {
      return this.agendaItem.type;
    },

    iconKey() {
      return agendaItemIcons[this.type];
    },

    iconPath() {
      return `/assets/icons/icon-${this.iconKey}.svg`;
    },

    title() {
      return this.agendaItem.title || agendaItemDefaultTitles[this.type];
    },

    timeRange() {
      return `${this.agendaItem.startsAt} - ${this.agendaItem.endsAt}`;
    },
  },

  template: /* html */ `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img class="icon" :src="iconPath" :alt="iconKey"/>
      </div>
      <div class="agenda-item__col">{{ timeRange }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ title }}</h3>
        <p class="agenda-item__talk" v-if="type === 'talk'">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
