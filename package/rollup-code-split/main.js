import bar from "./src/bar";

const result = bar + " and main";

export default function () {
  import("./src/foo").then(({ default: foo }) => {
    console.log("Code split dynamic module:", foo);
  });

  console.log(`Code split several entry share some module: ${result}`);
}
