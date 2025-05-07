---
title: React 组件
icon: ri:reactjs-line
order: 2
category:
    - React
---

React 定义组件可以分为两种定义方式：

- **类式**定义组件：官方最初推荐的组件定义方式，能够定义出最全功能的组件
- **函数式**定义组件：后增的组件定义方式，单靠函数定义只能定义出简单功能的组件，其余类式组件的功能缺失需要依赖 **Hook** 补充。

## 函数式组件

### 定义方式

- 定义一个返回值为虚拟 DOM 的函数

  ````jsx
  function Demo(){
      return <h1>这是一个函数式组件（适用于简单组件的定义）</h1>
  }
  ````

  **注意**：组件定义函数的函数名即组件名，组件名需要大写React才会将其当作组件处理。

- 渲染组件到页面

  ````jsx
  ReactDOM.render(<Demo/>,document.querySelector('#app'))
  ````

  **补充：**执行了  `ReactDOM.render(<Demo/>,...)` 后发生了什么？

  -  React 解析组件标签，寻找 Demo 组件的定义位置。
  - React 发现 Demo 组件是用函数定义的，随后 React 去直接调用函数，将返回的虚拟 DOM 渲染到页面。

### 函数式组件的缺陷

````jsx
// 1.定义一个组件（函数式）
function Demo(){
    console.log(this)// undefined
    return <h1>这是一个函数式组件（适用于简单组件的定义）</h1>
}
// 2.渲染组件到页面
ReactDOM.render(<Demo/>,document.querySelector('#app'))
````

由于babel解析代码是在严格模式下，函数式组件中 `this` 指向是丢失的，所以无法实现很多功能。

## 类式组件

### 定义方式

- 定义一个类，必须继承 `React.Component`

  ````jsx
  class Demo extends React.Component{
      ...
  }
  ````

- 类中**必须**定义一个 `render()`方法，该方法必须返回一个虚拟DOM，React 会将这个虚拟DOM渲染到挂载容器中。

  ````jsx
  class Demo extends React.Component{
      render(){
          console.log(this);// Demo 的实例对象 <==> Demo组件的实例对象 <==> Demo组件对象
          return <h1>这是一个类定义的组件（适用于复杂组件的定义）</h1>
      }
  }
  ````

- 渲染组件到页面

  ````jsx
  ReactDOM.render(<Demo/>, document.querySelector('#app'))
  ````

  **补充：**执行了 `ReactDOM.render(<Demo/>...)`后发生了什么？

  - React 解析组件标签，寻找 Demo 组件的定义位置。

  - React 发现Demo组件是用类定义的，React创建了一个Demo的实例对象 `d`。
  - React 通过 `d` 去调用了 `render()` 方法