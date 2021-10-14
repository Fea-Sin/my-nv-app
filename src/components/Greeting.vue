<script lang="ts">
import { defineComponent } from "vue";
import HiComponent from "@/components/HiComponent.vue";

export default defineComponent({
  data() {
    return {
      isActive: true,
      isSelect: false,
    };
  },
  components: {
    HiComponent,
  },
});
</script>

<template>
  <div id="greet">
    <div>HI</div>
    <div :class="{ active: isActive, myBox: true, select: isSelect }"></div>
    <p>this is a element</p>
    <div class="foo">
      <div>Foo</div>
    </div>
    <HiComponent />
  </div>
</template>
