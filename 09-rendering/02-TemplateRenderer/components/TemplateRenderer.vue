<script>
import { compile, h } from 'vue';

export default {
  name: 'TemplateRenderer',

  render() {
    return h({
      components: this.components,
      render: this.renderFunc,
      props: ['bindings'],
    }, {
      bindings: this.bindings
    });
  },

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  computed: {
    renderFunc() {
      return compile(this.template);
    },
  },
};
</script>
