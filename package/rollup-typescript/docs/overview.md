# Rollup + TypeScript

安装`@rollup/plugin-typescript`插件

```bash
npm install --save-dev @rollup/plugin-typescript
```

`rollup.config.js`配置

```js
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/app.ts",
  output: {
    file: "dist/bundle.esm.js",
    format: "esm",
  },
  plugins: [typescript({ tsconfig: "./tsconfig.json" })],
};
```

[实例](../rollup.config.js)
