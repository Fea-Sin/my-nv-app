import { expect } from "chai";
import sum from "../src/sum";

test("add 1 + 7 to equal 8", () => {
  expect(sum(1, 7)).to.equal(8);
});
