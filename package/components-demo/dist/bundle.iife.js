(function (vue) {
  'use strict';

  const app = vue.createApp({});

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

})(Vue);
