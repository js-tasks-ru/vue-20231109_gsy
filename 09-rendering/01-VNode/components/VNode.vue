<script>
import { isVNode, h } from 'vue';

export default {
  name: 'VNode',

  render() {
    return this.vnode;
  },

  props: {
    vnode: {
      type: [Object, Array],
      require: true,
      validator: (value) => (Array.isArray(value) ? value.every((item) => isVNode(item)) : isVNode(value)),
    },
  },
};
</script>
