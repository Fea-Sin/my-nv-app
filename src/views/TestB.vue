<script>
import { h, ref, reactive } from "vue";
export default {
  // eslint-disable-next-line
  setup() {
    const readersNumber = ref(0);
    const book = reactive({ title: "Vue 3 Guide" });

    return () => h("div", [readersNumber.value, book.title]);
  },
};
</script>
