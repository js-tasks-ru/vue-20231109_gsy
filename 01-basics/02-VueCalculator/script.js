import { createApp } from './vendor/vue.esm-browser.js';

createApp({
  data() {
    return {
      operand1: 1,
      operand2: 2,
      operator: "sum"
    };
  },

  computed: {
    result() {
      switch (this.operator) {
        case "sum": return this.operand1 + this.operand2;
        case "subtract": return this.operand1 - this.operand2;
        case "multiply": return this.operand1 * this.operand2;
        case "divide": return this.operand1 / this.operand2;
        default: throw new Error("wrong operator");
      }
    }
  }
}).mount("#app");
