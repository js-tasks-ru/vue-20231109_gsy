<template>
  <UiInput ref="input" :type="type" :step="step" v-model="valueProxy">
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
        default: 1
      },
    },

    computed: {
      valueProxy: {
        get() {
          if (!this.modelValue) return '';
          let inp = this.makeProxyInput();
          inp.valueAsNumber = this.modelValue;
          return inp.value;
        },
        set(val) {
          let inp = this.makeProxyInput();
          inp.value = val;
          this.$emit('update:modelValue', inp.valueAsNumber);
        }
      },
    },

    methods: {
      makeProxyInput() {
        let inp = document.createElement('input');
        inp.type = this.type;
        inp.step = this.step;
        return inp;
      }
    },
  };
</script>
