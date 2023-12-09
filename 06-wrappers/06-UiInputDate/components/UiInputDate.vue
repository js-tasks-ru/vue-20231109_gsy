<template>
  <UiInput ref="input" :type="type" :step="step" :modelValue="stringValue" @input="onInput">

    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script>
  import UiInput from './UiInput.vue';

  export default {
    name: 'UiInputDate',
    components: { UiInput },
    emits: ['update:modelValue'],

    props: {
      modelValue: {
        type: Number,
        default: null,
      },

      type: {
        type: String,
        default: 'date',
        validator: v => ['date', 'time', 'datetime-local'].includes(v),
      },

      step: {
        type: [Number, String],
        default: 1,
      },
    },

    computed: {
      stringValue() {
        if (!this.modelValue) return '';

        let val = new Date(this.modelValue)
          .toISOString()
          .slice(0, 19)
          .replace(/(:00)$/, '');

        switch (this.type) {
          case 'date': return val.slice(0, 10);
          case 'time': return val.slice(11);
          default: return val;
        }
      },
    },

    methods: {
      onInput(evt) {
        this.$emit('update:modelValue', evt.target.valueAsNumber);
      },
    },
  };
</script>
