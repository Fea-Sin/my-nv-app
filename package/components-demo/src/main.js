import { createApp } from "vue";

const app = createApp({});

app.component("button-counter", {
  data() {
    return {
      count: 2,
    };
  },
  template: `
    <button @click="count++">
      You clicked {{ count }} times
    </button>
  `,
});

app.mount("#components-demo");
