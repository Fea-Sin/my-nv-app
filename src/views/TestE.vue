<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      myObj: {
        a: 1,
      },
      myArr: [1, 2, 3],
    };
  },
  methods: {
    myUpdate(): void {
      // eslint-disable-next-line
      (this.myObj as any).b = "新增属性";
      console.log("update obj");
    },
    updateArr(): void {
      this.myArr[1] = 8;
      console.log("update arr");
    },
  },
});
</script>
<template>
  <div>Hello Vue</div>
  <div>{{ myObj }}</div>
  <div>
    <button @click="myUpdate">更新属性</button>
  </div>
  <div>{{ myArr }}</div>
  <div>
    <button @click="updateArr">更新数组</button>
  </div>
</template>
