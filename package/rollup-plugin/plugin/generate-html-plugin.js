import path from "path";

const root = path.dirname(__dirname);

const src = path.resolve(root, "examc/src");

export default function generateHtmlPlugin() {
  let ref1, ref2, ref3;

  return {
    name: "generate-html",
    buildStart() {
      ref1 = this.emitFile({
        type: "chunk",
        id: path.resolve(src, "./entry1.js"),
      });
      ref2 = this.emitFile({
        type: "chunk",
        id: path.resolve(src, "./entry2.js"),
      });
      ref3 = this.emitFile({
        type: "chunk",
        id: path.resolve(src, "./entry3.js"),
      });
    },
    async resolveId(source, importer, options) {
      console.log("resolve source--->", source);
      console.log("resolve importer--->", importer);
      console.log("resolve options--->", options);
      const resolution = await this.resolve(source, importer, {
        skipSelf: true,
        ...options,
      });

      console.log("resolution--->", resolution);

      return resolution;
    },
    resolveDynamicImport(_, importer) {
      console.log("resolveDynamicImport--->", importer);
      return {
        id: importer,
      };
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "index.html",
        source: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Generate Html</title>
</head>
<body>
  <script src="${this.getFileName(ref1)}" type="module"></script>
  <script src="${this.getFileName(ref2)}" type="module"></script>
  <script src="${this.getFileName(ref3)}" type="module"></script>
</body>
</html>
        `,
      });
    },
  };
}
