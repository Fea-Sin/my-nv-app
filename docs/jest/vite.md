# Add testing to Vite

## 单元测试

我们用`Jest`和`Vue Test Utils`来做单元测试

```bash
pnpm add --save-dev jest

pnpm add --save-dev @types/jest

pnpm add --save-dev ts-jest

pnpm add --save-dev vue-jest@next

pnpm add --save-dev @vue/test-utils@next
```

Jest 并能懂 Vue 和 TypeScript，所以我们必须在`jest.config.js`做相关配置

```js
module.exports = {
  moduleFileExtensions: ["js", "ts", "json", "vue", "jsx", "tsx"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.vue$": "vue-jest",
  },
};
```

在`tsconfig.json`中为 TypeScript 增加对`Jest`和`Vite`的 type 定义

```json
{
  "compilerOptions": {
    "types": ["vite/client", "@types/jest"]
  }
}
```

最后在`package.json`增加命令

```json
{
  "scripts": {
    "test": "jest"
  }
}
```
