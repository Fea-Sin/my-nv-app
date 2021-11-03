# pnpm CLI

## 命令行

**等效**

- `npm install` => `pnpm install`

- `npm install <pkg>` => `pnpm install <pkg>`

- `npm run <cmd>` => `pnpm <cmd>`

例如：

`npm run lint` 和 `pnpm lint` 相同

## pnpx

`pnpx`是一个命令行工具，他从源获取包，但不将它安装为依赖，热加载它，并运行任何它暴露的默认二进制命令

```bash
pnpx create-react-app my-project
```

这将从源获取`create-react-app`并使用给定的参数运行它
