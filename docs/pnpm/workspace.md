# 工作空间

pnpm 内置了对单一存储库（也称为多包存储库、多项目存储库或单体存储库）的支持。可以将
多个项目合并到一个存储库中

工作空间的根目录必须有`pnpm-workspace.yaml`文件，工作空间的根目录也可能有`.npmrc`

## 工作空间协议（workspace:）

默认情况下，如果可用的`packages`与已声明的可用范围相匹配，pnpm 将从工作区链接这些`packages`。例如，
如果`bar`中有`"foo": "^1.0.0"`的这个依赖，则`foo@1.0.0`链接到`bar`。但是，如果`bar`的依赖项中有
`"foo": "2.0.0"`，而`foo@2.0.0`在工作空间并不存在，则将从注册表安装`foo@2.0.0`。这会带来一些不确定性

幸运的是，pnpm 支持工作空间协议`workspace:`。当使用此协议时，pnpm 将拒绝解析除本地工作区`package`之外的任何
内容，因此如果设置`"foo": "workspace:2.0.0"`时，安装将会失败，因为`foo@2.0.0`不存在于工作空间中

## 通过别名引用工作空间包

假设您在工作区有一个名为`foo`的包，通常你会像这样引用`"foo": "workspace:*"`

如果要使用其它别名，那么使用以下语法`"bar": "workspace:foo@*"`

在发布之前，别名被转换为常规名称 `"bar"; "npm:foo@1.0.0"`

## 通过相对路径引用工作区包

工作区有两个包

```
+ packages
    + foo
    + bar
```

`bar`依赖`foo`，其声明可以这样写`"foo": "workspace:../foo"`。
在发布之前，这些将转换为所有包管理器支持的常规的版本规范

## 发布工作空间包

当工作空间打包到归档时，我们将动态替换这些`workspace:`依赖

- 目标工作空间中的对应版本（`workspace:*`, `workspace:~`, `workspace:^`）

- 相关的 semver 范围

例如，如果工作空间中有`foo`, `bar`, `qar`, `zoo`并且它们的版本都是`1.5.0`

```json
{
  "dependencies": {
    "foo": "workspace:*",
    "bar": "workspace:~",
    "qar": "workspace:^",
    "zoo": "workspace:^1.5.0"
  }
}
```

将转化为

```json
{
  "dependencies": {
    "foo": "1.5.0",
    "bar": "~1.5.0",
    "qar": "^1.5.0",
    "zoo": "^1.5.0"
  }
}
```

这个功能允许您可以发布转化之后的包到远端，并且可以正常使用本地工作空间的`package`，而不需要其他
中间步骤

## link-workspace-packages

- 默认值：`true`
- 类型：`true`, `false`, `deep`

如果启用了此选项，本地可用的`packages`将被链接到`node_modules`中而不是从注册表下载，
这在`monorepo`项目中使用起来十分方便。如果您需要将本地`packages`也链接到子依赖项，则可以
设置为`deep`

否则，`packages`将全部从注册表下载并安装，不过，工作空间的`packages`仍然可以通过`workspace:`
范围协议被链接到
