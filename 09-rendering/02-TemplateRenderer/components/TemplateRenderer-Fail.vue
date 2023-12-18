<script>
import { compile } from 'vue';

export default {
  name: 'TemplateRenderer',

  render(...args) {
    return this.renderFunc.apply(this, args);
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

  watch: {
    components: {
      immediate: true,
      handler() {
        this.$options.components = this.components;
      },
    },
  },

  computed: {
    renderFunc() {
      return compile(this.template);
    },
  },
};
</script>
