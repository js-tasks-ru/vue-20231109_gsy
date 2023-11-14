import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupDescription',

  props: {
    description: {
      type: String,
      default: '',
      required: false,
    },
  },

  template: /* html */ `<p class="meetup-description">{{ description }}</p>`,
});
