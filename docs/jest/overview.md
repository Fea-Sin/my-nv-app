# 开始

Jest 的目标是在大多数 JavaScript 项目中即装即用，无需配置

轻松编写持续追踪大型对象的测试，并显示实时快照

并行进行测试，发挥每一丝算力

从`it`到`expect`Jest 将工具包整合在一处

Jest 具有独一无二的全局状态可靠的进行并行测试，Jest 会优先运行未通过的测试，
并根据每个测试的时长调整测试顺序

无需其他操作，仅需添加`--converage`参数来生成代码覆盖率报告，Jest 可以收集整个项目的覆盖信息，
包括未测试的文件

Jest 使用自定义解析器来导入您测试中的依赖，让您轻松模拟测试范围外的对象。可以使用富模拟函数来导入，
并借由简单易读的测试语法监视函数调用

安装 Jest

```bash
npm install --save-dev jest

# or

yarn add --dev jest
```

我们先写两个数相加的函数做测试 [实例](../../package/start-jest/__tests__/sum.test.js)
