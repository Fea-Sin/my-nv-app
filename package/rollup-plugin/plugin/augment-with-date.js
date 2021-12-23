export default function augmentWithDatePlugin() {
  return {
    name: "augment-with-date",
    augmentChunkHash(chunkInfo) {
      console.log("Output generation hooks--->", chunkInfo);
      if (chunkInfo.name === "foo") {
        return Date.now().toString();
      }
    },
  };
}
