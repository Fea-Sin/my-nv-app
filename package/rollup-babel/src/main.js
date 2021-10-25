import amap from "./a";
import objb from "./b";

const mapMain = amap.set("objb", objb);

console.log("rollup babel--->", mapMain);

console.log("rollup babel mapMain mya", mapMain.get("mya"));

export default mapMain;
