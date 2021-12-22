import bar from "./src/bar";

const result = bar + "and about";

export default function () {
  console.log(`Code split several entry share some module: ${result}`);
}
