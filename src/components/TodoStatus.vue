<script lang="tsx">
import { defineComponent, inject } from "vue";

export default defineComponent({
  // @ts-ignore
  setup(props) {
    const userTodoLength = inject("todoLength");

    return {
      userTodoLength,
    };
  },
});
</script>

<template>
  <div class="show">STATUS: {{ userTodoLength }}</div>
</template>

<style lang="less" scoped>
.show {
  font-size: 20px;
  color: rgb(211, 139, 46);
}
</style>
