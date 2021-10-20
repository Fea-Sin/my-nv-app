import { expect } from "chai";
import { isMap } from "../src";

describe("#isMap", () => {
  it("isMap base", () => {
    const map = new Map();
    map.set("name", ["vuejs"]);
    expect(isMap(map)).to.equal(true);
  });
});
