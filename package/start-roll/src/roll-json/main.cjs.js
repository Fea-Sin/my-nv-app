const { version } = require("../../package.json");

function say() {
  console.log("cjs tree-shaking", version);
}
say();

module.exports = {
  say,
};
