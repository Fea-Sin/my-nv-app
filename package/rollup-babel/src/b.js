const obj = {
  name: "myb",
  version: 1,
};

export default function () {
  return { id: "b", ...obj };
}
