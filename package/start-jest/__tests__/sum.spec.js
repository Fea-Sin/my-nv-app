import sum from "../src/sum";

test("add 1 + 4 to equal 5", () => {
  expect(sum(1, 4)).toBe(5);
});
