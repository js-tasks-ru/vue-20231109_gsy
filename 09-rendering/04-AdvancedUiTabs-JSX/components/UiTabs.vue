<script lang="jsx">
import UiTab from './UiTab.vue';

export default {
  name: 'UiTabs',
  props: { active: String },
  emits: ['update:active'],

  methods: {
    setActive(tabId) {
      this.$emit('update:active', tabId);
    },
  },

  render() {
    let slot = this.$slots.default?.() || [];
    let tabs = slot.filter((n) => n.type === UiTab);
    let actv = tabs.find((tab) => tab.props.name === this.active);

    let tabNodes = tabs.map((tab) => {
      let name = tab.props.name;
      let title = tab.props.title;
      let classes = ['tabs__tab'];
      let handleClick = () => this.setActive(name);

      if (tab === actv) classes.push('tabs__tab_active');
      return <a class={classes} role="tab" onClick={handleClick}>{title}</a>;
    });

    return (
      <div class="tabs">
        <div class="tabs__nav" role="tablist">{tabNodes}</div>
        <div class="tabs__content">{actv?.children.default()}</div>
      </div>
    );
  },
};
</script>

<style scoped>
/* _tabs.css */
.tabs {
  margin: 0;
}

.tabs__content {
}

.tabs__nav {
  display: flex;
  flex-direction: row;
  position: relative;
}

.tabs__nav:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: var(--grey-2);
}

.tabs__tab {
  display: inline-flex;
  padding: 10px 0;
  font-weight: 400;
  font-size: 18px;
  text-decoration: none;
  line-height: 28px;
  color: var(--grey-8);
  border-bottom: 2px solid transparent;
  cursor: pointer;
  margin-right: 18px;
  transition-duration: 0.2s;
  transition-property: border-color, color;
  box-shadow: none;
  background-color: transparent;
  outline: none;
  position: relative;
  z-index: 1;
}

.tabs__tab:hover,
.tabs__tab.tabs__tab_active {
  border-bottom-color: var(--blue);
  color: var(--blue);
}
</style>
