# run

## pnpm run

运行一个在`package`的 manifest 文件中定义的脚本

示例，假如在`package.json`中有个`watch`脚本

```json
"scripts": {
  "watch": "build-command --watch"
}
```

除了 shell 先前存在的`PATH`，`pnpm run`也包括在`PATH`中的`node_modules/.bin`提供的`scripts`。
也意味着只要安装了一个`package`，就可以像普通的命令一样在脚本中使用

对于工作空间，`<workspace root>/node_modules/.bin`也将添加到`PATH`中，因此如果在工作空间根目录安装了
一个工具，则可以在工作空间的任何`package`的`scripts`中使用

**与`npm run`的差异**

默认情况下，pnpm 不会任意运行用户定义的`pre`和`post`钩子脚本（如`prestart`）。这种 npm 的行为导致
脚本是隐式的而不是显式的，从而混淆了执行流程

### 配置项

- --recursive / -r

这会从每一个`package`的`scripts`对象中执行任意一个命令。如果一个`package`没有该命令，就会执行失败

- `--parallel`

添加于`v5.1.0`

完全忽略并发和拓扑排序，在所有匹配的包中立即运行给定的脚本并输出前缀流。这是个推荐的标志，用于在许多`packages`上
长时间运行的进程，例如冗长的构建进程

- `--stream`

添加于`v5.1.0`

以起始`package`目录作为前缀，立即从子进程输出流，这允许从不同的`package`交替输出

- enable-pre-post-scripts

添加于`v6.1.0`

当设置为`true`，pnpm 将自动运行任何前置/后置钩子脚本。所以运行`pnpm foo`，就相当于运行：

```
pnpm prefoo && pnpm foo && pnpm postfoo
```

## pnpm exec

在项目范围内执行 shell 命令

`node_modules/.bin`添加到`PATH`，因此`pnpm exec`允许执行依赖项的命令

如果 jest 作为项目的依赖项，则无需全局安装 jest，就可以运行它

```
pnpm exec jest
```

## pnpm dlx

从源中获取包而不将其安装为依赖项，热加载，并运行它公开的任何默认命令二进制文件
