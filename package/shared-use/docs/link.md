# npm link

当在开发项目时需要一个依赖包，你也是这个依赖包的作者，而这个包并没有发布。
或者你需要在项目中 debug 依赖包的问题时

此时你会需要 `npm link`

Package linking 需要两个步骤

**第一个步骤在 package 目录执行`npm link`**

在 package 目录执行`npm link`，会将当前包 **symlink**到 global 文件夹

global 文件夹为`{prefix}/lib/node_modules/<package>`

`npm prefix -g`命令可以查看当前 prefix，mac 一般为`/usr/local`

执行`npm link`命令还能 link package 下的 bins 文件夹到`{prefix}/bin/{name}`

**第二个步骤在使用依赖包的地方执行`npm link package-name`**

执行`npm link package-name` 会将全局安装的 package link 到当前项目的`node_modules`

> 注意，`package-name`是 package.json 的 name 属性，并不是 package 文件夹名称

## `npm publish`

当依赖包`npm publish`，链接的包会以`快照`的方式同步当前状态

## 总结

包目录执行 `npm link`

使用包的项目 link 包 `npm link package-name`
