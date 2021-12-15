import chalk from "chalk";
const log = console.log;
const red = chalk.red;
const green = chalk.green;

function defaultTask(cb) {
  // place code for your default task here
  log(red("Hello Default Task"));

  cb();
}

export function taska(cb) {
  log(chalk.blue("Hello Taska"));
  log(green("==========="));

  cb();
}

export default defaultTask;
