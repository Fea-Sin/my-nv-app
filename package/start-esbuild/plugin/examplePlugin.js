const { green } = require("chalk");

let exampleOnResolvePlugin = {
  name: "example",
  setup(build) {
    const path = require("path");

    // Redirect all paths starting with `images/` to `./public/images/`
    build.onResolve({ filter: /^images\// }, (args) => {
      console.log(green("====="));
      console.log(green(JSON.stringify(args)));
      console.log(green("====="));
      return {
        path: path.join(args.resolveDir, "public", args.path),
      };
    });
  },
};
module.exports = exampleOnResolvePlugin;
