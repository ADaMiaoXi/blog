---
title: 严格模式
icon: fluent-mdl2:protect-restrict
order: 14
category:
  - JavaScript
---

## 1. 什么是严格模式

严格模式是从 ES5 开始新增的一种方式，是采用具有限制性 JavaScript 变体的一种方式，从而使代码隐式地脱离"马虎模式/稀松模式/懒散模式"（sloppy）模式。

设立"严格模式"的目的，主要有以下几个：

- 消除 JavaScript 语法的一些不合理、不严谨之处，减少一些怪异行为;
- 消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的 JavaScript 做好铺垫。

"严格模式"体现了 JavaScript 更合理、更安全、更严谨的发展方向，支持严格模式的浏览器有：Internet Explorer 10 +、 Firefox 4+ Chrome 13+、 Safari 5.1+、 Opera 12+。

在"严格模式下"，同样的代码，可能会有不一样的运行结果。一些在"正常模式"下可以运行的语句，在"严格模式"下将不能运行。

掌握这些内容，有助于更细致深入地理解 JavaScript，让开发者变成一个更好的程序员。

## 2. 开启严格模式

进入"严格模式"的标志，是下面这行语句：

```js
"use strict";
```

老版本的浏览器会把它当作一行普通字符串，加以忽略。

"严格模式"有两种调用方法，适用于不同的场合。

**针对整个脚本文件**

将 `"use strict"` 放在脚本文件的第一行，则整个脚本都将以"严格模式"运行。

如果这行语句不在第一行，则无效，整个脚本以"正常模式"运行。如果不同模式的代码文件合并成一个文件，这一点需要特别注意。

```js
"use strict";
console.log("这是严格模式。");
```

在上面的代码中，第一行书写了 `"use strict"`，所以整个代码会进入到严格模式执行。

```html
<script>
  "use strict";
  console.log("这是严格模式。");
</script>

<script>
  console.log("这是正常模式。");
</script>
```

上面的代码表示，一个网页中依次有两段 JavaScript 代码。前一个 `script` 标签是严格模式，后一个不是。

**针对单个函数**

将 `"use strict"` 放在函数体的第一行，则整个函数以"严格模式"运行。

```js
function strict(){
  "use strict";
  return "这是严格模式。";
}

function notStrict() {
  return "这是正常模式。";
}
```

**脚本文件的变通写法**

因为第一种调用方法不利于文件合并，所以更好的做法是，借用第二种方法，将整个脚本文件放在一个立即执行的匿名函数之中。

```js
(function (){
  "use strict";
  // some code here
})();
```

## 3. 严格模式和普通模式区别

接下来，来看一下严格模式下对 JavaScript 的语法和行为，都做了哪些改变。

**没有使用 `var` 声明的变量不能使用**

在普通模式下，可以使用一个未声明的变量，此时该变量会成为一个全局变量。但是这种使用方式在严格模式下会报错。

```js
"use strict"
a=10; // ReferenceError: a is not defined
console.log(a)
function sum(){
	var a=10;
	console.log(a)
}
sum()
```

**删除变量和不存在的属性会报错**

在普通模式下，删除变量或者不允许删除的属性虽然也会失败，但是是"静默失败"，也就是说虽然失败了，但是不会给出任何提示。这样其实会产生很多隐藏问题，也给程序员的调错带来了难度。

在严格模式下则会报错，例如：

```js
"use strict"
var i = 10;
delete i; // SyntaxError: Delete of an unqualified identifier in strict mode.
console.log(i); // 10
```

**函数中相同的形参名会报错**

在普通模式下，函数中两个形参名相同也不会报错，只不过后面的形参所接收到的值会覆盖前面的同名形参。

```js
function a(b,b){
    console.log(b); // 2
}
a(1, 2)   
```

但是在严格模式下，相同的形参名会报错。

```js
"use strict"
// SyntaxError: Duplicate parameter name not allowed in this context
function a(b,b){
    console.log(b);
}
a(1, 2)   
```

**对象不能有重名的属性**

正常模式下，如果对象有多个重名属性，最后赋值的那个属性会覆盖前面的值。严格模式下，这属于语法错误。

```js
"use strict";
var o = {
  p: 1,
  p: 2
}; // 语法错误
```

**禁止八进制表示法**

正常模式下，整数的第一位如果是 0，表示这是八进制数，比如 010 等于十进制的 8。

```js
var i = 010;
console.log(i); // 8
```

严格模式禁止这种表示法，整数第一位为 0，将报错。

```js
"use strict"
var i = 010; // SyntaxError: Octal literals are not allowed in strict mode.
console.log(i);
```

**函数内部 `this` 值为 `undefined`**

在普通模式下，函数中的 `this` 在以函数的形式被调用时，指向全局对象。而在严格模式中，得到的值为 `undefined`。

```js
"use strict"
function a(){
    console.log(this); // undefined
}
a();
```

**创设 `eval` 作用域**

正常模式下，JavaScript 语言有两种变量作用域（scope）：全局作用域和函数作用域。

严格模式创设了第三种作用域：`eval` 作用域。

正常模式下，`eval` 语句的作用域，取决于它处于全局作用域，还是处于函数作用域。

严格模式下，`eval` 语句本身就是一个作用域，不再能够生成全局变量了，它所生成的变量只能用于 `eval` 内部。

```js
"use strict";
var x = 2;
console.info(eval("var x = 5; x")); // 5
console.info(x); // 2
```

**保留字**

为了向将来 JavaScript 的新版本过渡，严格模式新增了一些保留字：`implements`, `interface`, `let`, `package`, `private`, `protected`, `public`, `static`, `yield`。使用这些词作为变量名将会报错。

```js
"use strict";
var public = "hello world" // SyntaxError: Unexpected strict mode reserved word
console.log(public);
```

更多关于严格模式的内容，可以参阅：

MDN：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode](https://gitee.com/link?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FStrict_mode)

《JavaScript 严格模式详解 By 阮一峰》：[http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html](https://gitee.com/link?target=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2013%2F01%2Fjavascript_strict_mode.html)

## 4. 真题解答

- use strict 是什么意思 ? 使用它区别是什么？

> 参考答案：
>
> use strict 代表开启严格模式，这种模式使得 JavaScript 在更严格的条件下运行，实行更严格解析和错误处理。
>
> 开启"严格模式"的优点：
>
> - 消除 JavaScript 语法的一些不合理、不严谨之处，减少一些怪异行为;
> - 消除代码运行的一些不安全之处，保证代码运行的安全；
> - 提高编译器效率，增加运行速度；
> - 为未来新版本的 JavaScript 做好铺垫。
>
> 回答一些具体的严格模式下和普通模式之间的区别。