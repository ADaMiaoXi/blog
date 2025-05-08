---
title: Reselect
icon: /assets/images/web/state-management/reselct/logo.ico
index: true
order: 2
category:
    - reselector
---

一个用于创建记忆“选择器”函数（memoized "selector" functions）的库。通常用于 Redux，但也可用于任何普通 JS 不可变数据。[官方文档](https://github.com/reduxjs/reselect)

-   选择器（Selectors）可以计算派生数据，从而让 Redux 存储尽可能少的状态。
-   选择器（Selectors）是高效的。除非选择器的其中一个参数改变，否则不会重新计算选择器。
-   选择器（Selectors）是可组合的。它们可以用作其他选择器（selectors）的输入。

## 安装

### 如果已经使用了 Redux Toolkit

虽然 reelect 不是 Redux 所独有的，但在默认情况下，它已经包含在官方 [Redux Toolkit](https://redux-toolkit.js.org/) 包中,无需进一步安装。

```javascript
import {createSelector} from '@reduxjs/toolkit'
```

### 独立安装

如果想独立使用 reselect, 直接安装 `reslect` 包。

```bash
# NPM
npm install reselect

# Yarn
yarn add reselect
```

---

## 基本使用

Reselect 导出 `createSelector` API，该 API 生成记忆**选择器函数**, `createSelector` 接受一个或多个从参数中提取值的**输入选择器**，以及一个接收提取值并应返回派生值的**结果函数**。如果多次调用生成的输出选择器，则只有在提取的值发生更改时才会重新计算输出。

```javascript
import {createSelector} from 'reselect'

const state = {
    todos: [
        {id: 0, completed: false},
        {id: 1, completed: true}
    ],
    alerts: [
        {id: 0, read: false},
        {id: 1, read: true}
    ]
}

const selectCompletedTodos = state => {
    console.log('selector ran')
    return state.todos.filter(todo => todo.completed === true)
}

selectCompletedTodos(state) // selector ran
selectCompletedTodos(state) // selector ran
selectCompletedTodos(state) // selector ran

const memoizedSelectCompletedTodos = createSelector([state => state.todos], todos => {
    console.log('memoized selector ran')
    return todos.filter(todo => todo.completed === true)
})

memoizedSelectCompletedTodos(state) // memoized selector ran
memoizedSelectCompletedTodos(state)
memoizedSelectCompletedTodos(state)

console.log(selectCompletedTodos(state) === selectCompletedTodos(state)) //=> false

console.log(memoizedSelectCompletedTodos(state) === memoizedSelectCompletedTodos(state)) //=> true
```

正如上例可见，`memoizedSelectCompletedTodos` 不会运行第二次和第三次**结果函数**，但我们仍然得到与上次相同的返回值。

除了跳过了不必要的重新计算之外，如果没有重新计算，`memoizedSelectCompletedTodos` 将返回现有的结果引用。

---

## 术语解释

-   **选择器函数**：接受一个或多个 JavaScript 值作为参数并派生结果的函数。当与 Redux 一起使用时，第一个参数通常是整个 Redux 存储状态。
-   **输入选择器**：用于创建记忆选择器的 **基本选择器函数**。它们作为 `createSelector` 的第一个参数传递，并与所有选择器参数一起调用。它们负责提取并向结果函数提供必要的值。
-   **输出选择器**： 由 `createSelector` 创建的实际记忆选择器。
-   **结果函数**： 输入选择器之后的函数。它接受 **输入选择器** 的返回值作为参数并返回结果。
-   **依赖**：等同于 **输入选择器**，它们是 **输出选择器** 的依赖。

下面的代码结构可以作为一个例子：

```javascript
const outputSelector = createSelector(
    [inputSelector1, inputSelector2, inputSelector3], // synonymous with `dependencies`.
    resultFunc // Result function
)
```

## APIs

可参考官方 [API 文档](https://reselect.js.org/api/createSelector)