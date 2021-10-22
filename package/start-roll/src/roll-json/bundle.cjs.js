'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var name = "@nvapp/start-roll";
var version$1 = "1.0.0";
var description = "";
var main = "index.js";
var directories = {
	doc: "docs"
};
var scripts = {
	"build:a": "rollup --config rollup.config.js",
	"build:b": "rollup --config rollup.config.b.js",
	"build:ciife": "rollup --config src/rollb/rollup.config.js",
	"build:cumd": "rollup --config src/rollb/rollup.config.umd.js",
	"build:d": "rollup --config src/rollc/rollup.config.js",
	"build:e": "rollup --config src/roll-json/rollup.config.js",
	"build:ecjs": "rollup --config src/roll-json/rollup.config.cjs.js",
	build: "npm run build:a && npm run build:b"
};
var keywords = [
];
var author = "";
var license = "ISC";
var devDependencies = {
	rollup: "^2.58.0",
	"rollup-plugin-commonjs": "^10.1.0",
	"rollup-plugin-json": "^4.0.0",
	"rollup-plugin-node-resolve": "^5.2.0"
};
var _package = {
	name: name,
	version: version$1,
	description: description,
	main: main,
	directories: directories,
	scripts: scripts,
	keywords: keywords,
	author: author,
	license: license,
	devDependencies: devDependencies
};

var _package$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name,
  version: version$1,
  description: description,
  main: main,
  directories: directories,
  scripts: scripts,
  keywords: keywords,
  author: author,
  license: license,
  devDependencies: devDependencies,
  'default': _package
});

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var require$$0 = getCjsExportFromNamespace(_package$1);

const { version } = require$$0;

function say() {
  console.log("cjs tree-shaking", version);
}

var main_cjs = {
  say,
};
var main_cjs_1 = main_cjs.say;

exports["default"] = main_cjs;
exports.say = main_cjs_1;
