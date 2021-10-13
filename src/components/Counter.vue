<template>
  <div class="count-box">{{ count }}</div>
  <div>
    <button @click="increment">自增</button>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Counter extends Vue {
  count = 0;

  increment() {
    this.count++;
  }
}
</script>
