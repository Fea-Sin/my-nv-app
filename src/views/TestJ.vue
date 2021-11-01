<script lang="ts">
import { defineComponent, computed } from "vue";
import Status from "@/components/TodoStatus.vue";

export default defineComponent({
  components: {
    Status,
  },
  data() {
    return {
      todos: ["Vue3", "TypeScript", "Rollup", "Babel"],
    };
  },
  provide() {
    return {
      todoLength: computed(() => this.todos.length),
    };
  },
  methods: {
    add() {
      this.todos.push("新增一条");
    },
  },
});
</script>

<template>
  <div>
    <div>TESTJ</div>
    <div>
      <button @click="add">增加</button>
    </div>
    <div>
      <h3 v-for="item in todos" :key="item">{{ item }}</h3>
    </div>
    <div>
      <Status />
    </div>
  </div>
</template>
