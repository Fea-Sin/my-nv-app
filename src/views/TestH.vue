<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import _ from "lodash";

export default defineComponent({
  setup() {
    const state = reactive({
      id: 1,
      hello: {
        name: "",
      },
    });

    watch(
      () => state,
      (state, preState) => {
        console.log("not deep", state, preState);
      }
    );

    watch(
      () => _.cloneDeep(state),
      (state, preState) => {
        console.log("deep", state, preState);
      },
      { deep: true }
    );
    state.hello.name = "Alex";
  },
  mounted() {
    console.log("Mounted--->");
  },
});
</script>

<template>
  <div>
    <div>TESTH</div>
  </div>
</template>
