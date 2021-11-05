# 配置

## pnpm-workspace.yaml

`pnpm-workspace.yaml`定义了工作空间的根目录，并能够使您从工作空间中包含/排除目录。
默认情况下包含所有子目录

```yaml
# 所有在 packages 和 components 下的子目录的 包
# 不包括在 test 文件夹下的 包
package:
  - "packages/**"
  - "components/**"
  - "!**/test/**"
```

## `.npmrc`

pnpm 从命令行、环境变量和`.npmrc`文件中获取其配置

- 每个包的配置文件（/path/to/.npmrc）

- 每个工作区的配置文件，`pnpm-workspace.yaml`所在目录`.npmrc`

- 系统用户配置文件`~/.npmrc`

- 全局配置文件`/etc/.npmrc`

所有`.npmrc`文件都是`key = value`配置方式
