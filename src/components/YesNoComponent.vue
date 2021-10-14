<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "YesNoComponent",
  props: {
    callMe: {
      type: Function,
      required: true,
    },
  },
  methods: {
    callYes() {
      this.callMe("yes");
    },
    callNo() {
      this.callMe("no");
    },
  },
});
</script>
<template>
  <div>
    <button class="yes" @click="callYes">Yes</button>
    <button class="no" @click="callNo">No</button>
  </div>
</template>
