<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";

export default defineComponent({
  setup() {
    const orange = ref(true);
    watchEffect(() => {
      console.log("orange watchEffect-->", orange.value);
    });

    return {
      orange,
    };
  },
  props: {
    fruits: Array,
  },
  data() {
    return {
      apple: true,
    };
  },
  emits: ["update:fruits"],
  mounted() {
    console.log("Mounted--->", this.orange);
  },
  methods: {
    checkChange(e: Event) {
      this.orange = (e.target as HTMLInputElement).checked;
    },
  },
});
</script>

<template>
  <div>
    <div>Fruits</div>
    <div>
      <input type="checkbox" id="chox1" value="苹果" :checked="apple" />
      <label for="chox1">苹果</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="chox2"
        value="橘子"
        :checked="orange"
        @change="checkChange"
      />
      <label for="chox2">橘子</label>
    </div>
  </div>
</template>
