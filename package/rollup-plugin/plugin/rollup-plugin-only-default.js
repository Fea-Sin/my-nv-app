export default function onlyDefaultForEntries() {
  return {
    name: "only-default-for-entries",
    async resolveId(source, importer, options) {
      console.log("rollup plugin resolveId source--->", source);
      console.log("rollup plugin resolveId importer--->", importer);
      console.log("rollup plugin resolveId options--->", options);
      if (options.isEntry) {
        const resolution = await this.resolve(source, importer, {
          skipSelf: true,
          ...options,
        });

        if (!resolution) return null;
        return `${resolution.id}?entry-proxy`;
      }
      return null;
    },
    load(id) {
      console.log("rollup plugin load id--->", id);
      if (id.endsWith("?entry-proxy")) {
        const importee = id.slice(0, -"?entry-proxy".length);
        return `export {default} from "${importee}";`;
      }
      return null;
    },
  };
}
