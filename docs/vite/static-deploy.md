# 部署静态站点

## 构建应用

```bash
pnpm run build
```

默认情况下个，构建会输出到`dist`文件夹中，你可以部署这个`dist`文件夹到你喜欢的平台

## 本地测试应用

```bash
pnpm run serve
```

`vite preview`命令会在本地启动一个静态 Web 服务器，将`dist`文件夹运行在`http://localhost:5000`，
可以通过`--port`参数来配置服务的运行端口

```json
{
  "scripts": {
    "serve": "vite preview --port 8080"
  }
}
```

## GitHub Pages

在你的项目中，创建一个`deploy.sh`脚本，运行脚本来部署站点

```bash
#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
npm run build

# 进入文件夹
cd dist

git init
git add -A
git commit -m "depoly"

# 如果你要部署在 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

> 你也可以在你的 CI 中配置脚本，使得在每次推送代码时自动部署

## Gihub Pages 配合 Travis CI

如果你要部署在`https://<USERNAME>.github.io/<REPO>/`，你的仓库地址为
`https://github.com/<USERNAME>/<REPO>`，请设置`base`为`/<REPO>/`

在项目根目录创建一个`.travis.yml`文件

在本地运行`npm install`并且提交生成的 lockfile（package-lock.json）

使用 Github Pages 部署的配置文件模版，并按照`Travis CI`文档进行配置

```yml
language: node_js
node_js:
  - lts/*
install:
  - npm ci
script:
  - npm run build
deploy:
  provider: pages
  skip_cleanup: true
  local_dir: dist
  # 在Gihub上生成的 token，允许Travis推动代码到你的仓库
  # 在仓库Travis 设置页面，设为安全环境变量
  github_token: $GITHUB_TOKEN
  keep_history: true
  on:
    branch: master
```
