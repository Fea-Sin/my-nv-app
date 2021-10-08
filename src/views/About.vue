<template>
  <div class="about">
    <h1>THIS IS A PAGE</h1>
    <div>
      <div class="number">{{ count }}</div>
    </div>
    <div>
      <button @click="increment" class="opera">+</button>
      <button @click="decrement" class="opera">-</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class About extends Vue {
  count = 0;

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }
}
</script>
<style lang="less" scoped>
.number {
  font-size: 40px;
  color: #42b983;
  font-weight: bold;
}
.opera {
  padding: 10px 16px;
  margin: 10px 16px;
}
</style>
