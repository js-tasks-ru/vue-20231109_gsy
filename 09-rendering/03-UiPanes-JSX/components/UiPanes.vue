<template><render /></template>

<script setup lang="jsx">
  import { ref, useSlots, onBeforeMount} from 'vue';
  import UiPane from './UiPane.vue';

  const slots = useSlots();
  const panes = ref(null);

  /** Забираем контент из слота по умолчанию, исключая коментарии. */
  onBeforeMount(() => {
    panes.value = slots.default?.().filter(s => String(s.type) !== 'Symbol(Comment)');
  });

  /**
   * Переместить i-ую панель вверх.
   * @param {number} i
   */
  function up(i) {
    const p = panes.value;
    [p[i], p[i-1]] = [p[i-1], p[i]];
  }

  /**
   * Переместить i-ую панель вниз.
   * @param {number} i
   */
  function down(i) {
    const p = panes.value;
    [p[i], p[i+1]] = [p[i+1], p[i]];
  }

  /**
   * Построить VNode панели.
   * @param {VNode} content
   * @param {number} index
   */
  function renderPane(content, index) {
    let isFirst = index === 0;
    let isLast = index >= panes.value.length - 1;

    return (
      <UiPane
        disableUp={isFirst}
        disableDown={isLast}
        onUp={() => up(index)}
        onDown={() => down(index)}>
        {content}
      </UiPane>
    );
  }

  /**
   * Построить VNode компонента.
   */
  function render() {
    return <div class="panes">{panes.value.map(renderPane)}</div>;
  }
</script>

<style scoped>
  .panes {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
