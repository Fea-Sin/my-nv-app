<script>
export default {
  // eslint-disable-next-line
  data() {
    return {
      readersNumber: 0,
      book: {
        title: "Vue 3 Guide",
      },
    };
  },
  // eslint-disable-next-line
  render() {
    return (
      <div>
        <span class="item">{this.readersNumber}</span>
        <span class="item">{this.book.title}</span>
      </div>
    );
  },
};
</script>
<style lang="less" scoped>
.item {
  padding: 0 5px;
}
</style>
