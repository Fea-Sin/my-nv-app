import { green } from "chalk";
const log = console.log;

export default function buildForEnd() {
  return {
    name: "build-for-end",
    buildStart(options) {
      log(green("----build options start----"));
      log(options);
      log(green("----build options end----"));
    },
    moduleParsed(moduleInfo) {
      log(green("----module start----"));
      log(moduleInfo);
      log(green("----module end----"));
    },
  };
}
