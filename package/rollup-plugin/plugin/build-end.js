import { green } from "chalk";
const log = console.log;

export default function buildForEnd() {
  return {
    name: "build-for-end",
    moduleParsed(moduleInfo) {
      log(green("----module start----"));
      log(moduleInfo);
      log(green("----module end----"));
    },
  };
}
