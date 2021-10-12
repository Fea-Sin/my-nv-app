<script lang="tsx">
import { defineComponent, PropType } from "vue";

const Greeting = defineComponent({
  props: {
    msg: String,
  },
  render() {
    return (
      <div>
        <div>HELLO: {this.msg}</div>
      </div>
    );
  },
});

interface Book {
  title: string;
  author: string;
  year: number;
}

const MyBook = defineComponent({
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true,
    },
  },
  render() {
    const { book } = this;
    return (
      <div class="box">
        <div>TITLE: {book.title}</div>
        <div>AUTHOR: {book.author}</div>
        <div>YEAR: {book.year}</div>
      </div>
    );
  },
});

export default defineComponent({
  data() {
    return {
      myba: {
        title: "Vue",
        author: "Vue Team",
        year: 2021,
      },
    };
  },
  setup() {
    //
  },
  render() {
    return (
      <div>
        <div>TESTD</div>
        <div>
          <Greeting msg="Vue 3 Guide" />
        </div>
        <div>
          <MyBook book={this.myba} />
        </div>
        <div>
          <MyBook book={{ title: "小册子", author: "TestD", year: 2021 }} />
        </div>
      </div>
    );
  },
});
</script>
<style lang="less" scoped>
.box {
  text-align: left;
  border: 1px solid #e3e2e1;
  padding: 16px;
  width: 200px;
  margin: 16px;
}
</style>
