---
title: React 性能优化策略
icon: carbon:compare
order: 22
category:
    - React
---

React 中内置的性能优化相关策略，包括：

- eagerState 策略
- bailout 策略

其中 eagerState 策略需要满足的条件是比较苛刻的，开发时不必强求。但是作为 React 开发者，应该追求写出满足 bailout 策略的组件。

当我们聊到性能优化的时候，常见的想法就是使用性能优化相关的 API，但是当我们深入学习 bailout 策略的原理后，我们就会知道，即使不使用性能优化 API，只要满足一定条件，也能命中 bailout 策略。

我们来看一个例子：

```jsx
import React, { useState } from "react";

function ExpensiveCom() {
  const now = performance.now();
  while (performance.now() - now < 200) {}
  return <p>耗时的组件</p>;
}

function App() {
  const [num, updateNum] = useState(0);

  return (
    <>
      <input value={num} onChange={(e) => updateNum(e.target.value)} />
      <p>num is {num}</p>
      <ExpensiveCom />
    </>
  );
}

export default App;
```

在上面的例子中，App 是挂载的组件，由于 ExpensiveCom 在 render 时会执行耗时的操作，因此在 input 输入框中输入内容时，会发生明显的卡顿。

究其原因，是因为 ExpensiveCom 组件并没有命中 bailout 策略。

那么为什么该组件没有命中 bailout 策略呢？

在 App 组件中，会触发 state 更新（num 变化），所以 App 是肯定不会命中 bailout 策略的，而在 ExpensiveCom 中判断是否能够命中 bailout 策略时，有一条是 oldProps === newProps，由于 App 每次都是重新 render 的，所以子组件的这个条件并不会满足。



为了使 ExpensiveCom 命中 bailout 策略，咱们就需要从 App 入手，将 num 与 num 相关的视图部分进行一个分离，形成一个独立的组件，如下：

```jsx
import React, { useState } from "react";

function ExpensiveCom() {
  const now = performance.now();
  while (performance.now() - now < 200) {}
  return <p>耗时的组件</p>;
}

function Input() {
  const [num, updateNum] = useState(0);

  return (
    <div>
      <input value={num} onChange={(e) => updateNum(e.target.value)} />
      <p>num is {num}</p>
    </div>
  );
}

function App() {
  return (
    <>
      <Input/>
      <ExpensiveCom />
    </>
  );
}

export default App;

```

在上面的代码中，我们将 App 中的 state 变化调整到了 Input 组件中，这样修改之后对于 App 来讲就不存在 state 的变化了，那么 App 组件就会命中 bailout 策略，从而让 ExpensiveCom 组件也命中 bailout 策略。

命中 bailout 策略后的 ExpensiveCom 组件就不会再执行耗时的 render。



现在我们考虑另一种情况，在如下的组件中，div 的 title 属性依赖 num，无法像上面例子中进行分离，如下：

```jsx
import React, { useState } from "react";

function ExpensiveCom() {
  const now = performance.now();
  while (performance.now() - now < 200) {}
  return <p>耗时的组件</p>;
}


function App() {
  const [num, updateNum] = useState(0);

  return (
    <div title={num}>
      <input value={num} onChange={(e) => updateNum(e.target.value)} />
      <p>num is {num}</p>
      <ExpensiveCom />
    </div>
  );
}

export default App;
```

那么此时我们可以通过 children 来达到分离的目的，如下：

```jsx
import React, { useState } from "react";

function ExpensiveCom() {
  const now = performance.now();
  while (performance.now() - now < 200) {}
  return <p>耗时的组件</p>;
}

function Counter({ children }) {
  const [num, updateNum] = useState(0);
  return (
    <div title={num}>
      <input value={num} onChange={(e) => updateNum(e.target.value)} />
      <p>num is {num}</p>
      {children}
    </div>
  );
}

function App() {
  // 在该 App 当中就没有维护数据了，也就不存在 state 的变化
  return (
    <Counter>
      <ExpensiveCom/>
    </Counter>
  );
}

export default App;

```

不管采用哪种方式，其本质就是将**可变部分**与**不可变部分**进行分离，**使不变的部分能够命中 bailout 策略**。在日常开发中，即使不使用性能优化 API，合理的组件结构也能为性能助力。



在默认情况下，FiberNode 要命中 bailout 策略还需要满足 oldProps === newProps。这意味着默认情况下，如果父 FiberNode 没有命中策略，子 FiberNode 就不会命中策略，孙 FiberNode 以及子树中的其他 FiberNode 都不会命中策略。所以当我们编写好符合性能优化条件的组件后，还需要注意组件对应子树的根节点。

如果根节点是应用的根节点（HostRootFiber），那么默认情况下 oldProps === newProps，挂载其下的符合性能优化条件的组件能够命中bailout策略。

如果根节点是其他组件，则此时需要使用性能优化 API，将命中 bailout 策略其中的一个条件从“满足 oldProps === newProps” 变为“浅比较 oldProps 与 newProps”。只有根节点命中 bailout 策略，挂载在它之下的符合性能优化条件的组件才能命中 bailout 策略。