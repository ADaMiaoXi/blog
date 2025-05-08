---
title: reactive 对比 ref
icon: file-icons:closuretemplate
order: 4
category:
  - Vue
---

- 从定义数据角度分析

  - ref 用来定义：基本数据类型。

  - reactive 用来定义：对象（或数组）类型数据。

    > 备注：ref 也可以用来定义对象（或数组）类型数据，它内部会自欧东通过 `reactive` 转为代理对象

- 从原理角度对比：
  - ref 通过 `Object。defineProperty()` 的 `get` 与 `set` 来实现响应式（数据劫持）。
  - reactive 通过使用 Proxy 来实现响应式（数据劫持），并通过Reflect操作源对象内部的数据。
- 从使用角度对比：
  - ref定义的数据：操作数据需要`.value`，读取数据时模板中直接读取不需要`.value`。
  - reactive定义的数据：操作数据与读取数据，均不需要`.value`。