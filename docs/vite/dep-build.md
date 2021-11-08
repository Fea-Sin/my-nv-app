# 依赖预构建

## 文件系统缓存

Vite 会将预先构建的依赖缓存到`node_modules/.vite`。它根据几个来源决定是否需要重新运行预构建
步骤

- `package.json`中的`dependencies`列表

- 包管理器的 lockfile，例如`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`

- 可能在`vite.config.js`相关字段中配置过的

只有在上述其中一项发生改变时，才需要重新运行预构建

如果需要强制 Vite 重新构建依赖，可以用`--force`命令选项启动开发服务器，或者手动删除
`node_moduels/.vite`目录

## 浏览器缓存

解析后的依赖请求会以 hTTP 头`max-ag=31536000,immutable`强缓存，以提高在
开发时页面重载性能。一旦被缓存，这些请求将永远不会再到达开发服务器。如果安装了
不同的版本，者反映在包管理器的 lockfile 中，附加的版本 query 会自动使它们失效

如果你想调试依赖项，可以

1. 通过浏览器调试工具的 Network 选项卡暂时禁用缓存

1. 重启 Vite dev server，添加`--force`命令以重建构建依赖

1. 重新载入页面
