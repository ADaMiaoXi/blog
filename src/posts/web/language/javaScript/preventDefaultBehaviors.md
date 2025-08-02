---
title: 阻止事件默认行为
icon: tabler:forbid
order: 12
category:
  - JavaScript
---

## 1. 什么是默认行为

默认行为是指 HTML 元素所自带的行为。例如点击一个 `a` 元素表示跳转：

```html
<a href="https://www.baidu.com">百度一下</a>
```

在上面的代码中，设置了 `a` 元素的 `href` 属性指向百度，当用户点击该 `a` 元素时，就会跳转至百度。

再例如：

```html
<form action=""></form>
```

上面的代码中书写了一个 `form` 元素，该元素有一个 `action` 属性，指的是表单内容要提交的地址。当用户点击表单元素中嵌套的提交按钮时，就会进行一个默认的提交操作。

这些就是 HTML 元素中的默认行为。

但是有些时候，不需要这些默认行为，例如，用户在填写了一个表单后，提交信息时采用 Ajax 来异步发送到服务器，此时就不需要表单 `form` 元素默认的提交跳转这个行为了。

所以此时，需要阻止默认行为。

## 2. 阻止默认行为的方式汇总

下面对阻止默认行为的方式进行总结。

**（1）`cancelable` 属性**

首先要介绍的是 `cancelable` 属性，该属性返回一个布尔值，表示事件是否可以取消。

该属性为只读属性。返回 `true` 时，表示可以取消。否则，表示不可取消。

```JavaScript
<a id="test" href="https://www.baidu.com">百度</a>
var test = document.getElementById("test");
test.onclick = function (event) {
  test.innerHTML = event.cancelable; // true
}
```

在上面的代码中，为 `a` 元素绑定了一个点击事件，点击之后通过 `event` 对象的 `cancelable` 属性来查看该元素的默认行为是否能阻止。

最终返回的是 `true`，说明能够阻止。

**（2）`preventDefault` 方法**

`preventDefault` 方法是 DOM 中最常见，也是最标准的取消浏览器默认行为的方式，无返回值。

```JavaScript
var test = document.getElementById("test");
test.onclick = function(event){
  event.preventDefault();
}
```

在上面的代码中，通过 `event` 对象来调用 `preventDefault` 方法，从而阻止了 `a` 元素的默认跳转行为。

**（3）`returnValue` 属性**

这种方式使用较少，了解这种方式的人也较少。

`returnValue` 是一个 `event` 对象上的属性。该属性可读可写，默认值是 `true`，将其设置为 `false` 就可以取消事件的默认行为，与 `preventDefault` 方法的作用相同。

该属性最早在 IE 的事件对象中实现了这种取消默认行为的方式，但现在大多数浏览器都支持该方式。

```JavaScript
var test = document.getElementById("test");
test.onclick = function(event){
  event.returnValue = false;
}
```

**（4）`return false`**

`return false` 是一条语句，该语句写在事件处理函数中也可以阻止默认行为。

需要注意的是，如果该语句写在 jQuery 代码中，能够同时阻止默认行为和阻止冒泡，但在原生 JavaScript 中只能阻止默认行为。

```JavaScript
var test = document.getElementById("test");
test.onclick = function(){
  return false;
}
```

**（5）`defaultPrevented` 属性**

`defaultPrevented` 属性也是 `event` 对象上的一个属性。该属性表示默认行为是否被阻止，返回 `true` 表示被阻止，返回 `false` 表示未被阻止。

```JavaScript
var test = document.getElementById("test");
test.onclick = function (event) {
  // 采用两种不同的方式来阻止浏览器默认行为，这是为了兼容性考虑
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
  // 将是否阻止默认行为的结果赋值给 <a> 标签的文本内容
  test.innerHTML = event.defaultPrevented;
}
```

在上面的代码中，点击 `a` 元素时，使用 `preventDefault` 方法阻止了浏览器默认行为。

之后访问 `event.defaultPrevented` 属性会得到 `true`，说明默认行为已经被阻止。

## 3. 真题解答

- 如何阻止默认事件？

> 参考答案：
>
> ```JavaScript
> // 方法一：全支持
> event.preventDefault();
> // 方法二：该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。
> event.returnValue = false;
> // 方法三：不建议滥用，jQuery 中可以同时阻止冒泡和默认事件
> return false;
> ```