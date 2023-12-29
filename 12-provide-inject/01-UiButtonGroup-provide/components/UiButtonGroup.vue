<template>
  <div class="button-group" role="group">
    <slot />
  </div>
</template>

<script setup>
  import { provide, computed } from 'vue';

  /** Событие с запросом на изменение значения модели. */
  const emit = defineEmits(['update:modelValue']);

  /** Входящий параметр со значением модели. */
  const prop = defineProps({ modelValue: { required: true } });

  /** Выбранный ключ в группе (реактивное, вычисляемое). */
  provide('selectedValue', computed(() => prop.modelValue));

  /** Изменить выбранный в группе ключ (запрос на изменение). */
  provide('updateSelectedValue', value => emit('update:modelValue', value));
</script>

<style scoped>
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
