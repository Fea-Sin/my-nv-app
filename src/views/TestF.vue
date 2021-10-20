<script lang="ts">
import { defineComponent } from "vue";

const MyComponent = defineComponent({
  data() {
    return {
      count: 1,
    };
  },
  methods: {
    increment(): void {
      this.count++;
    },
  },
});

console.log("defineComponent component---->", MyComponent);

export default MyComponent;
</script>

<template>
  <div>
    <div>TESTF</div>
  </div>
</template>
