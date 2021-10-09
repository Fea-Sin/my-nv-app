<script setup lang="ts">
import { ref } from "vue";

const counter = ref(0);

console.log("响应式counter", counter.value);

counter.value++;

console.log("响应式counter", counter.value);
</script>
<template>
  <div class="Tbox">
    <div>TESTA</div>
    <div>{{ counter }}</div>
  </div>
</template>
