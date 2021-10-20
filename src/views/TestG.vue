<script lang="ts">
import { defineComponent } from "vue";
import { showTime } from "@/utils/utils";

export default defineComponent({
  created() {
    console.log("created--->", showTime());
  },
  data() {
    return {
      count: 1,
    };
  },
  mounted() {
    console.log("mounted component");

    for (let i = 2; i < 1000; i++) {
      this.count = i;
    }
  },
  updated() {
    console.log("update---->", showTime());
    console.log("一千万用时13秒");
    console.log("一个亿用时2分钟8秒");
  },
});
</script>
<template>
  <div>
    <div>TESTG</div>
    <div>{{ count }}</div>
  </div>
</template>
