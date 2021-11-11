# Lint

开启 Lint 初期，可能面临成千上万的 Lint Error 需要修复。大多数人在项目中运用新工具
希望是渐进式的，而不是推到重来。如果每次提交只检测所修改的文件，上面的痛点就解决了。

`lint-staged`就是这个想法，staged 是 Git 里面的概念，指待提交区

## husky

> Modern native Git hooks made easy

### install

```bash
npm install husky --save-dev

# or

pnpm add husky --save-dev
```

### usage

- `package.json` 添加命令并运行

```bash
npm set-script prepare "husky install"
npm run prepare
```

或者

```bash
# 在"package.json" `scripts`中增加`"prepare": "husky install"`

pnpm run prepare
```

> 注意
> husky 与 git 命令相关联，所以必须是有`.git`(在 git 根目录)

- Add hook

```bash
npx husky add .husky/pre-commit "npm test"

# or

pnpx husky add .husky/pre-commit "npm test"
```

## 与 `lint-staged`集成

```bash
npm install --save-dev lint-staged
```

在`package.json`中增加配置

```json
{
  "lint-staged": {
    "*.{vue,js,ts,jsx,tsx}": "eslint --fix"
  }
}
```

or

`"*.{vue,js,ts,jsx,tsx}": ["eslint", "prettier --write"]`

最后还需要与`husky`集成，增加`.husky/pre-commit`命令

```bash
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
# or
pnpx lint-staged
```
