# 工作空间

pnpm 内置了对单一存储库（也称为多包存储库、多项目存储库或单体存储库）的支持。可以将
多个项目合并到一个存储库中

工作空间的根目录必须有`pnpm-workspace.yaml`文件，工作空间的根目录也可能有`.npmrc`

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
