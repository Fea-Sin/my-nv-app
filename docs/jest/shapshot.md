# 快照测试

每当你想要确保你的 UI 不会有意外的改变，快照测试是非常有用的工具

典型的做法是在渲染了 UI 组件之后，保存一个快照文件，检测它是否与保存在单元测试旁的快照
文件相匹配。若两个快照不匹配，测试将失败。有了可能意外的更改，或则 UI 组件已经更新到了新版本

快照文件应该和项目代码一起提交并做代码评审。Jest users pertty-format to make snapshots
human-readable during code review。在随后的单元测试例子中，Jest 会对比上一个快照和渲染输出。
如果它们相匹配，则测试通过，若未能匹配，要么是单元测试发现了你代码中的 BUG，要么是代码实现已经改变了，
需要更新快照文件

## 更新快照

在代码引入错误后，很容易就通过快照为何单元测试失败了。发现这种情况时，需要解决以使你的快照测试
再次通过

要解决这个问题，我们需要更新我们已经存储的快照文件。你可以运行 Jest 加一个标识符来重新生成快照文件

```bash
jest --updateSnapshot
```

这将为所有失败的快照测试重新生成快照文件。如果我们无意间产生了 BUG 导致快照测试失败，应该先修复这些 BUG，
在生成快照文件，以免用快照录制了错误的行为

## 属性匹配器

项目中常常会有不定值字段生成（例如 id 和 Date）。如果你试图对这些对象进行快照测试，每个测试都会失败

```js
it("will fail every time", () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: "LeBron James",
  };

  expect(user).toMatchSnapshot();
});

// Snapshot
exports["will fail every time 1"] = `
  Object {
    "createdAt": xxxxx,
    "id": 3,
    "name": "LeBron James"
  }
`;
```

针对这种情况，Jest 允许为任何属性提供匹配器，在快照写入或者测试前只检查这些匹配器是否通过，
而不是具体的值

```js
it("will check the matchers and pass", () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: "LeBron James",
  };

  expect(user).toMatchShapshot({
    createdAt: expect.any(Date),
    id: expect.any(Number),
  });
});

// Snapshot
exports["will check the matchers and pass 1"] = `
  Object {
    "createdAt": Any<Date>,
    "id": Any<Number>,
    "name": "LeBron James"
  }
`;
```

如何其他不是匹配器的值都会被准确检查并保存到快照文件中

命令行更新`snapshots`

```bash
pnpm run test -- -u
```
