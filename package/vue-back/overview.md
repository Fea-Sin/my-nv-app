# 目录结构

package 目录结构

在 package folder 执行命令
`tree -aI ".git*|.vscode" -C -L 1`

```
.
├── compiler-core
├── compiler-dom
├── compiler-sfc
├── compiler-ssr
├── global.d.ts
├── reactivity
├── ref-transform
├── runtime-core
├── runtime-dom
├── runtime-test
├── server-renderer
├── sfc-playground
├── shared
├── size-check
├── template-explorer
├── vue
└── vue-compat
```

## Runtime 跟 CompileTime

通过结构我们可以看到`package`中最重要的模块有 5 个

- compiler-core

- compiler-dom

- runtime-core

- runtime-dom

- reactivity

`compiler` 和 `runtime` 它们之间的区别

`compile tiem` 我们可以理解为程序编译时，是指我们写好的源代码在被编译成为目标文件这段时间，
在这里可以理解为我们将`.vue`文件编译成浏览器能识别的`.html`文件的一些工作

`run time` 可以理解为程序运行时，即程序被编译了之后，打开程序并运行它直到程序关闭的这段时间
的系列处理

```
       |-------- @vue/compiler-dom ------- @vue/compiler-core
vue ---|
       |-------- @vue/runtime-dom  ------- @vue/runtime-core ------- @vue/reactivity
```
