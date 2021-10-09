<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const counter = ref(0);

console.log("响应式counter", counter.value);

const getSomething = () => {
  const num = Math.floor(Math.random() * 100);
  console.log("当前随机数--->", num);
  return num;
};

onMounted(getSomething);

watch(counter, (newValue, oldValue) => {
  console.log("newValue--->", newValue);
  console.log("oldValue--->", oldValue);
  console.log("The new counter value is: ", counter.value);

  setTimeout(() => {
    counter.value = getSomething();
  }, 500);
});
counter.value++;

const setCount = () => {
  counter.value = counter.value + 3;
};
</script>
<template>
  <div class="Tbox">
    <div>TESTA</div>
    <div class="number">{{ counter }}</div>
    <div><button @click="setCount" class="btn">+</button></div>
  </div>
</template>
<style lang="less" scoped>
.btn {
  padding: 8px 16px;
}
.number {
  font-size: 40px;
  color: #42b983;
  font-weight: bold;
}
</style>
