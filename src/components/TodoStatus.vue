<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  inject: ["todoLength"],

  render() {
    return (
      <div class="show">
        <div>STSTUS: {(this as any).todoLength}</div>
      </div>
    );
  },
});
</script>

<style lang="less" scoped>
.show {
  font-size: 20px;
  color: rgb(211, 139, 46);
}
</style>
