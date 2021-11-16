# 支持的包地址

## 从 npm 安装

`pnpm add package-name`默认会从`npm registry`安装最新的`package-name`

如果在 workspace 中执行，该命令将首先去检查这个 workspace 中的其他项目是否已经使用了
这个指定的包，如果是的话，就使用这个包的版本范围来进行安装

可以通过以下方式安装包：

- tag: `pnpm add express@nightly`
- version: `pnpm add express@1.0.0`
- version range: `pnpm add express@2 react@">=0.1.0 <0.2.0"`

### 从 workspace 安装

需要注意的是当我们使用 workspace 安装依赖时，会从配置的原处进行安装，当然取决于是否设置了
`link-workspace-packages`，以及是否使用了`workspace: range protocol`

## 从本地安装

从本地安装的两种方法

- 源码文件（`.tar`、`.tar.gz`、`.tgz`）

```bash
pnpm add ./package.tar.gz
```

- 本地目录

```bash
pnpm add ./some-directory
```

当从目录安装时，会在当前项目目录中生成一个 symlink node_modules，这里跟执行`pnpm link`是一致的

## 从远端安装 Tar 包

参数必须是一个可访问的 url，`http://`或者`https://`开头的

```bash
pnpm add https://github.com/indexzero/forever/tarball/v0.5.6
```

## 从 git 安装

```
pnpm add <git remote url>
```

通过 git clone，从 git 作者处安装包，可以用协议准确的指定 git 作者
例如`pnpm add github:user/repo`

- 来自 master 的最新提交 `pnpm add kevva/is-positive`

- 某次提交下的安装 `pnpm add kevva/is-positive#97edff6f525f192a3f83cea194765f769ae2678`

- 分支 `pnpm add keva/is-positive#master`

- 版本范围 `pnpm add kevva/is-positive#semver:^2.0.0`

## 选项

- 将指定的软件包安装为常规的`dependencies`

```
pnpm add package-name --save-prod
```

- 将制定的 package 安装为`devDependencies`

```
pnpm add package-name --save-dev
```

- 保存的依赖会被指定为一个确切的版本

```
pnpm add package-name --save-exact
```

- 添加一个或多个`peerDependencies`的 package 并安装到 dev dependencies

```
pnpm add package-name --save-peer
```

- 安装全局依赖

```
pnpm add package-name --global
```

## pnpm install

`pnpm install`用于安装项目所有依赖

在 workspace 内，`npm install` 下载 workspace 项目所有依赖。如果想禁用这个行为，需要将`recursive-install`
设置为`false`

- --offline

default: `false`

如果为`true`，则 pnpm 将仅使用在`store中已有的包`。如果本地找不到，则会安装失败

- --prefer-offline

default: `false`

如果为`true`，缺失的数据会从服务器获取，比绕过缓存数据的过期检查

- --ignore-scripts

default: `false`

不执行任何项目中`package.json`和它的依赖项目中定义的任何脚本

> 该标记不会阻止执行`.pnpmfile.cjs`

- --fix-lockfile

自动修复损坏的 lock 文件入口

## pnpm update

`pnpm update`根据指定的范围更新软件的最新版本

- `pnpm update` 遵循`package.json`指定的范围更新所有的依赖

- `pnpm update --latest` 更新所有依赖项，此操作会忽略`package.json`指定的范围，可能会导致
  跨主版本的升级

- `pnpm update foo@2` 将`foo`更新到 v2 上的最新版本

- `pnpm update "@babel/*"` 更新`@babel`范围内的所有依赖项

### 配置项

- --recursive / -r

同时在所有子目录中使用`package.json`（不包括 node_modules）运行更新

```
pnpm --recursive update
```

将每个包中的`typescript`更新为最新版本

```
pnpm --recursive update typescript@latest
```

- --global

更新全局安装的依赖包

- --workespace

尝试链接工作区中的所有包。版本将更新至与工作区内的包匹配的版本

如果更新特定的包，而工作区内找不到可更新的依赖，则命令失败。
例如，如果`Express`不是工作区的包，那么以下命令失败

```
pnpm update --recursive --workspace express
```

- --prod

只更新`dependencies`和`optionalDependencies`的包

- --dev

只更新`devDependencies`的包

## pnpm remove

删除 packages 从`node_modules`和`package.json`

- --recursive

当在工作区中使用此命令时，将从每个工作区的包中移除相关依赖

当不在工作区内使用时，将删除相关依赖项，也包含子目录中对应包

- --global

从全局删除一个依赖包

- --save-dev

仅删除开发环境`devDenpendencies`中的依赖项

- --save-prod

仅从`dependencies`中删除相关依赖

## pnpm link

使当前本地包可在系统范围内或其它位置访问

- `pnpm link`

从执行此命令的路径，链接`package`到`node_modules`中

- `pnpm link --global`

从执行命令的路径，链接`package`到全局的`node_modules`中

- `pnpm link <pkg>`

将制定的`package`链接到执行命令的包中

## pnpm unlink

取消链接一个系统范围的`package`

如果不带参数，则所有已链接的依赖项都将取消链接

- --recursive

取消链接在所有子目录中找到的所有`package`

## pnpm publish

发布一个包到注册表

```
pnpm [-r] publish [<tarball|folder>] [--tag <tag>] [--access <public|restricted>]
```

当在一个工作空间内发布时，工作空间根目录的 LICENSE 文件和`package`一起打包。除非`package`有专属的
许可证

递归运行命令`pnpm -r publish`，pnpm 将发布所有尚未发布到注册表的`package`版本

- --tag <tag>

使用给定的`tag`发布`package`，默认情况下会更新`latest`的`tag`

例如，在 foo 目录

```bash
pnpm publish --tag next
```

在项目中，使用 foo 的 next 版本

```
pnpm add foo@next
```

- --force

尝试发布`package`，即使在注册表中的版本已经存在
