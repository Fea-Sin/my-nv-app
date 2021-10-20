import { expect } from "chai";

describe("base Array", () => {
  it("base Array indexOf", () => {
    expect([1, 2, 3].indexOf(4)).to.equal(-1);
  });
});
