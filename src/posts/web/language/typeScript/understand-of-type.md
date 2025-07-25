---
title: 对类型的理解
icon: iconamoon:type
order: 2
category:
    - TypeScript
---

## `any` 与 `unknown`

### `any`

在 TypeScript 中，编译时所有变量都必须具有类型，如果 TypeScript 类型检查器无法确定类型，则默认为 `any` 类型。这是兜底类型，是 TypeScript 中所有类型的顶级类型。

```javascript
let a: any = 666
let b: any = ['danger']
let c = a + b
```

正常情况下，第三个语句应该在 TypeScript 中报错（计算数字和数组之和没有意义）。

但是如果显式声明了 `any` 标注，就不会报错，此时的处理方式与原生 JavaScript 完全相同。

换句话说，如果要使用 `any`，必须显式标注。如果 TypeScript 推导出值的类型为 `any`（例如忘记注解函数的参数，或者引入没有类型的 JavaScript 模块），将抛出运行时异常。

```javascript
let foo // any

function func(foo, bar) {} // error 参数"foo","bar"隐式具有“any”类型。
```

> 默认情况下，Typescript 是宽容的，在推导出类型为 `any` 时其实不会报错，如果在 `tsconfig.json` 中启用了 `noImplcitAny` 标志，就会遇到隐式 `any` 类型时报错。
>
> `noImplcitAny` 隶属于 TSC 的 `strict` 标志家族，如果已经在 `tsconfig.json` 中启用了 `strict` ，那就不需要专门设置 `noImplcitAny` 标志了，效果是一样的。

有时候确实需要一个表示任意类型的变量，特别是从 JavaScript 代码移植到 TypeScript 的时候。例如 `console.log()` 方法就能接收任意类型的参数。

默认情况下，看到的应该是这样的类型定义：

```javascript
 log(...data: any[]): void;
```

能够看到类型提示，这是由于 VS Code 编辑器结合 `lib.dom.d.ts` 文件提供的 TypeScript 支持。

如果已经安装了 `@types/node`，可以得到 Node.js 对于 `console.log` 函数更加细致的提示：

```javascript
log(message?: any, ...optionalParams: any[]): void;
```

> 关于 @types 的内容，可以参考快速入门。
>
> Node.js 的核心模块和某些第三方模块并不是天然支持 Typescript 的。这就意味着，如果在 TypeScript 项目中使用这些模块时，编译器无法得知这些模块的类型信息，从而无法提供类型检查和自动补全的功能。比如下面的代码会报错：
>
> ```typescript
> const fs = require('fs') // error 找不到名称require,需要Nodejs类型定义
> ```
>
> 我们可以手动安装 nodejs 的 TypeScript 社区[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 提供的声明文件库。当使用 TypeScript 开发 Node.js 项目时，`@types/node` 库可以为 Node.js 的核心模块和常用的第三方模块提供类型定义，以便在开发过程中获得类型检查和自动补全的支持。
>
> ```javascript
> npm i @types/node -D
> ```
>
> 这样上面代码`const fs = require('fs');`也找到的对应的类型支持，在 TS 文件中不会再报错了。

总的来说，可以在 `any` 类型变量上任意地进行操作，包括赋值、访问、方法调用等等，此时可以认为类型推导与检查被完全禁用：

```javascript
let anyVar: any = null
anyVar.foo.bar.fn()
anyVar[0][1][2].prop
```

正如一开始就强调的 **【any 是兜底类型，是 TypeScript 中所有类型的顶级类型】**

> **any 能兼容所有类型，也能够被所有类型兼容**

这一作用实际上意味着类型系统提供了一个绕过类型检查的机制，无论什么时候，都可以使用 `any` 类型跳过类型检查。当然，运行时出现问题需要自己负责。

`any` 类型的万能性也导致容易滥用它，比如类型不兼容时使用 `any`，不想写类型时也使用 `any`，不确定可能的类型时还是使用 `any`。此时的 `TypeScript` 就变成了令人诟病的 `AnyScript`。

### `unknown`

> 少数情况下，如果确实无法预知一个值的类型，不要使用 `any`，更合理的方式是使用 `unknown`

`unknown` 也表示任何值，一个 `unknown` 类型的变量可以再次赋值为任意其它类型，但只能赋值给 `any` 与 `unknown` 类型的变量

```javascript
let a: unknown = 30
let b = a === 30

let c: any = 30
let d: number = c + 10

let e: unknown = 'string'
e = 123
let f: any = e
// let f:string = e; // error 不能将类型unknown分配给类型string
//let f = e + 10; //error "e"的类型为"未知"
if (typeof e === 'number') {
    let g = e + 10
}
```

1. TypeScript 不会把任何值推导为 `unknown` 类型，必须显式注解
2. `unknown` 类型的值可以比较
3. `unknown` 类型的变量可以赋值给 `any` 或者 `unknown` 类型的其他变量
4. 但是执行操作时不能假定 `unknown` 类型的值为某种特定的类型（比如上面的运算，注意和 `any` 的区别），必须先向 TypeScript 证明一个值确实是某个类型，可以使用 `typeof`

简单地说，**any 放弃了所有的类型检查，而 unknown 并没有**。

```javascript
let anyFn: any
let unknownFn: unknown

anyFn.foo()
unknownFn.foo() // error 对象的类型为"unknown"
```

**在类型未知的情况下，更推荐使用 unknown 标注。**这相当于使用额外的心智负担保证了类型在各处的结构，后续重构为具体类型时也可以获得最初始的类型信息，同时还保证了类型检查的存在。当然，`unknown` 用起来比较麻烦。

如果本身就出现了不得不使用 `any` 或者 `unknown` 的情况，没必要过于纠结使用 `any` 还是 `unknown`，归根结底，使用哪个完全取决于具体需求，毕竟语言只是工具。

## boolean 与类型字面量

`number`、`boolean`、`string`、`symbol`、`bigint` 这些 JavaScript 本身就支持的基础类型使用起来很简单，TypeScript 的书写几乎感觉不到和 JavaScript 的差别，而且支持很多种书写的方式，当然中间还隐藏着一些很重要的细节。以 boolean 举例来说：

```typescript
let a = true
var b = false
const c = true
let d: boolean = true
let e: true = true
let f: false = false
//let g: true = false; // error 不能将类型false分配给类型true
```

1. 可以让 TypeScript 推导出值的类型为 `boolean`（`a`，`b`）
2. 可以明确地告诉 TypeScript，值的类型为 `boolean`（`d`）
3. 可以明确地告诉 TypeScript，值为某个具体的 `boolean` 值（`e`，`f` 和 `g`）
4. 可以让 TypeScript 推导出 (const) 值为某个具体的布尔值（`c`）

首先常见的写法是 1-4（行），要么使用 TypeScript 自己的类型推导，要么自己定义好 `boolean` 类型，这是一开始就介绍的方式。但是，5-7（行）的写法是什么意思？

其实写法也很直观，大概也能猜到，**变量 `e` 和 `f` 不是普通的 `boolean` 类型，而是值只为 `true` 和 `false` 的 `boolean` 类型**

> 把类型设为某个值，就限制了 `e` 和 `f` 在所有布尔值中只能取指定的那个值。这个特性称为类型字面量（type literal）
>
> **类型字面量：仅仅表示一个值的类型**

由于类型字面已经限定了具体的类型 `true` 或者 `false`，因此上面代码第 7 行的错误就可以理解了：

```javascript
let g: true = false // error 不能将类型false分配给类型true
```

特别注意一下第三行的代码：`const c = true;`，这里的变量 `c` 的类型是类型字面量 `true`。

> 因为 const 声明的基本类型的值，赋值之后便无法修改，因此 TypeScript 推导出的是范围最窄的类型

## 交叉（交集）类型 `&`

交叉类型和符号的意思相似，就表示 and 的意思，把 `&` 相交的组合起来，值需要全部满足相交组合的类型

```javascript
type Student = {name: string, score: number}
type Teacher = {name: string, age: number, subject: string}
type User = Student & Teacher
const user1: User = {name: 'jack', age: 18, subject: 'math'} // error 缺少属性"score"
```

虽然有时候口头上经常会说交集类型，但是在教学的时候，并不太喜欢把 `&` 符号称为交集，叫做交叉应该更容易理解一些，不容易造成思想误区。

就拿上面的类型来说，`A&B` ----> 一说交集应该是，`type C = {name:string}` 才对，最后得到的好像是数学中的联合类型。不用对记忆怀疑，记忆是对的，可以把这个归因于翻译问题

为了便于理解，你可以这样想：**C 既符合 A 也符合 B，所以是 A 和 B 的“交叉”**，有了这样的理解，下面出现的一些情况，我们才能更好的理解

相比联合类型，交叉类型的范围就没有那么广泛了，因为你不可能把具体的值使用`&`组合，这样意义也就混乱了

```javascript
type Width = number & string // never 类型
```

> `number` 和 `string` 没有什么交集，因此根本无法给变量赋值，交叉类型始终交叉的是类型，类型字面量或者基础类型，在做类型交叉的时候没有任何意义，因此得到的结果是 `never`。具体类型 `never` 类型的使用我们后面讲解

其实，对象字面量类型一样会有这样的效果

```typescript
type P = {
    name: string
    sex: string
}
type T = {
    name: string
    age: number
}
type PT = P & T

const a: PT = {
    name: 'jack',
    sex: '男',
    age: 11
}
```

如果有同名属性，并且类型一样，就会直接合并，但是如果类型不一样呢？

```diff
type P = {
  name: string
  sex: string
}
type T = {
+  name: number
  age:number
}
type PT = P & T

const a: PT = {
+  name: 'jack', // error 不能将类型“string”分配给类型“never”
  sex:'男',
  age:11
}
```

不过可以使用交集类型的特性，达到一些需要的效果。

比如，可能有一个联合类型，在实际开发中，可能这个联合类型并不知道有哪些，或者可能这个联合类型直接赋值给另外一个类型的时候会报错，可以使用`&`运算符对其进行约束

```typescript
type params = string | number | boolean
type pt = params & string
```

当然我们现在代码很简单，只能简单模拟这个情况，讲到一些类型工具之后我们再来看一些复杂情况

比如，我们还能使用交叉类型来实现类似于继承的效果

```typescript
type Goods = {
    id: number
    name: string
    price: number
}

type Cart = Goods & {
    count: number
}

type Order = Goods & {
    count: number
    totalPrice: number
}

const goods: Goods = {
    id: 1,
    name: 'goods',
    price: 100
}

const cart: Cart = {
    id: 1,
    name: 'goods',
    price: 100,
    count: 1
}

const order: Order = {
    id: 1,
    name: 'goods',
    price: 100,
    count: 1,
    totalPrice: 100
}
```

## `number`, `bigint` 与 `string`

### `number` 与 `bigint`

有了上面 `boolean` 类型的说明，其他的基本数据类型基本一致

> `bigint` 是 ES11(ES2020) 新增的一种基本数据类型，在 JavaScript 中，可以用 `Number` 表示的最大整数为 2^53 - 1，可以写为 `Number.MAX_SAFE_INTEGER`。如果超过了这个界限，那么就可以用 `BigInt` 来表示，它可以表示任意大的整数。
>
> 在一个整数字面量后面加 `n` 的方式定义一个 `bigint`，或者调用函数 `BigInt()`
>
> **注意这里强调的问题：ES11（ES2020），如果编译的时候没有指定 tsconfig 的 target（指定代码编译成的版本）和 lib（TSC 假定运行代码的环境）为 es2020 以上的版本，或者执行 tsc 的时候，没有指定--target 为 es2020 以上版本，将会编译报错**

```ts
let a = 123
let b = Infinity * 0.1
const c = 567
let d = a < b
let e: number = 100
let f: 26.218 = 26.218
// let g: 26.218 = 10; // error 不能将类型10分配给类型26.218

let a1 = 1234n
const b1 = BigInt(1234)
const b2 = 1234n
let d1 = a < a1
// let e1 = 1234.5n; // error bigint字面量必须是整数
// let f1: bigint = 1234; // error 不能将类型number分配给类型bigint
let g1: bigint = 100n
let h1: 100n = 100n
```

1. 可以让 TypeScript 推导出值的类型为 `number`/`bigint`（`a`，`b`，`a1`，`b1`）
2. 可以明确地告诉 TypeScript，值的类型为 `number`/`bigint`（`e`，`f1`）
3. 可以明确地告诉 TypeScript，值为某个具体的 `number`/`bigint` 值（`e`，`f`，`g`，`g1`，`h1`）
4. 可以让 TypeScript 推导出 (`const`) 值为某个具体的 `number`/`bigint` 值（`c`，`b2`）

### string

与 `boolean` 和 `number` 形式是一样的，而且 `string` 字符串形式同样有单引号`''`,双引号`""`和模板字符串 ` `` ` 的形式

## symbol

symbol 符号是 ES6 新增的一种基本数据类型。

> **注意：**如果编译的时候没有指定 tsconfig 的 target 和 lib 为 es6（ES2015）以上的版本，或者执行 `tsc` 的时候，没有指定 `--target` 为 es2015 以上版本，将会编译报错

symbol 经常用于代替对象和映射的字符串键，确保使用正确的键，以防键被意外设置。

```ts
let a = Symbol('a')
let b: symbol = Symbol('a')

console.log(a === b) // false

let obj = {
    name: 'Symbol',
    [a]: 'jack',
    [b]: function () {
        console.log('ts')
    }
}
console.log(obj)

for (let key in obj) {
    console.log('---', key)
}
```

> Symbol('a')使用指定的名称新建了一个符号，这个符号是唯一的，不与其他任何符号相等，即便再使用相同的名称创建一个符号也是如此。
>
> symbol 属性不参与 `for..in` 循环。`Object.keys()`也会忽略他们

当然 symbol 也可以进行全局注册：

```typescript
let id1 = Symbol.for('id')

const user = {
    [id1]: 123
}

console.log(user[id1]) // 123
console.log(id1) // Symbol(id)

let id2 = Symbol.for('id')

console.log(id1 === id2) // true
console.log(user[id2]) // 123
console.log(id2) // Symbol(id)
```

`Symbol.for()` 方法创建前，会首先搜索 **全局符号注册表** ，看看是否存在一个键值为 `id` 的 **符号值** 。如果存在就会返回已存在的 **符号值** ；否则创建一个新的 **符号值**

但是，如果使用 const 声明的 symbol 将会是 `unique symbol` 类型

```ts
const c = Symbol('a') // typeof c
const d: unique symbol = Symbol('a') // typeof d
//let e: unique symbol = Symbol('a'); // error unique symbol 的变量必须为 const

console.log(c === c)
console.log(c === d) // error 此比较没有意义，类型 typeof c 和 typeof d 没有重叠
```

`unique symbol`类型与其他字面量类型其实是一样的，比如 `1`，`true`，`"hello"` ，创建的是表示特定符号的类型

## 类型拓宽

类型拓宽（type widening）是理解 TypeScript 类型推导机制的关键。

> 一般来说，TypeScript 在推导类型的时候会放宽要求，故意推导出一个更宽泛的类型，而不限定为每个具体的类型。

声明变量时如果运行以后修改变量的值（例如使用 `let` 和 `var` 声明），变量类型将拓宽，从字面值放大到包含该字面量的基础类型

```typescript
let a = 'x' // string
let b = 123 // number
let c = true //boolean
```

然而，使用 `const` 声明不可变的变量时，情况不同，会自动的把 **类型缩窄**：

```typescript
const a = 'x' // 'x'
const b = 123 // 123
const c = true // true
```

当然可以显式地标注类型防止类型拓宽

```typescript
let a: 'x' = 'x' // 'x'
let b: 123 = 123 // 123
let c: true = true // true
```

不过使用 **`const` 声明的对象，并不会缩窄推导的类型**

```typescript
const obj = {
    b: 123 // b是number类型
}
```

因为 JavaScript 对象是可变的，所以在 TypeScript 看来，创建对象之后可能会更新对象

## null 与 undefined

在 JavaScript 中，`null` 与 `undefined` 都表示缺少什么，TypeScript 也支持这两个值，并且都有各自的类型，类型名称就是 `null` 与 `undefined`。

这两个类型比较特殊，在 TypeScript 中，`undefined`类型只有`undefined`一个值，`null`类型也只有`null`一个值。

在写 JavaScript 的时候，这两个在语义上有细微的差别，`undefined`一般表示尚未定义，而`null`表示缺少值。

`null` 与 `undefined` 在**没有开启 `strictNullChecks` 检查的情况下**（tsconfig.json 中设置了 `strict:true` 默认开始，如果想关闭，可以设置 `strictNullChecks:false` ），**会被视为其他类型的子类型**，比如 string 类型会被认为包含了 `null` 与 `undefined`

> `null` 与 `undefined` 也是单独的类型是带有 Javascript 思维，在遇到复杂结构的时候经常会思考遗漏的问题。最重要的就是忽略类型兼容性的问题。

```typescript
const temp1: undefined = undefined
const temp2: null = null

const temp3: string = null // 仅在关闭了 strictNullChecks 时才成立
const temp4: string = undefined // 仅在关闭了 strictNullChecks 时才成立

let temp5 = undefined // any
let temp6: string = null // 仅在关闭了 strictNullChecks 时才成立

// 仅在关闭了 strictNullChecks 时才成立
function getStr(): string {
    if (Math.random() > 0.5) {
        return null
    }
    return 'hello'
}

type User = {
    name: string
    age: number
}

function getUser(): User {
    if (Math.random() > 0.5) {
        return null
    }
    return {
        name: 'John',
        age: 30
    }
}
```

## void

在 JavaScript 中，`void` 有特殊的用法，比如

```javascript
<a href='javascript:void(0)'>点击</a>
```

在界面经常这样写来表示阻止 a 标签的默认行为。

这里的 `void(0)` 等价于 `void 0`，即 `void expression` 的语法，可以使用它来执行一个立即执行函数（IIFE）

```javascript
void (function () {
    alert(111)
})()
```

在 TypeScript 中，`void` 也表示一种类型，用于描述一个内部没有 `return` 语句，或者没有显式 `return` 一个值的函数的返回值，如：

```javascript
function fn1() {}
function fn2() {
    return
}
function fn3() {
    return undefined
}

let m1 = fn1()
let m2 = fn2()
let m3 = fn3()
console.log(m1, m2, m3)
```

`fn1` 与 `fn2` 的返回值类型都会被隐式推导为 `void`，只有显式返回了 `undefined` 值的 `fn3` 其返回值类型才被推导为了 `undefined`

> **注：**`fn3`只有在 `tsconfig.json` 中开启了 `strictNullChecks:true` 的情况下，其返回值类型才会被推导为 `undefined` ，如果没有开启 `strict` 模式，或者关闭了 `strictNullChecks`，`fn3` 函数的返回值类型会被默认推导为 `any`

虽然 `fn3` 的返回值类型会被推导为 `undefined`，但仍然可以使用 `void` 类型进行标注

```typescript
function fn3(): void {
    return undefined
}
```

`undefined` 能够被赋值给 `void` 类型的变量，就像在 JavaScript 中一个没有返回值的函数会默认返回一个 `undefined` ，其实主要还是为了兼容性。但是，在`strict`模式下，`null` 类型会报错，除非关闭`strictNullChecks`

```javascript
function fn3(): void {
    return undefined
}
function fn4(): void {
    return null // error 不能将类型null分配给类型void，关闭strictNullChecks不报错
}

let v1: void = undefined
let v2: void = null // error 不能将类型null分配给类型void，关闭strictNullChecks不报错
```

## 对象字面量

按照之前基础类型的惯性思维，在 TypeScript 使用类型描述对象应该是下面这个样子：

```javascript
let a: object = {
    b: 'hello'
}
```

但是访问 b 的时候就会发生错误

```javascript
console.log(a.b) //error 类型object上不存在属性"b"
```

为什么把一个变量声明成 object 类型，却做不了任何操作呢？

**其实 object 类型对值并不了解，就只能表示该值是一个 JavaScript 对象，仅此而已**。因此，当输入

```javascript
a.
```

TypeScript 不会有任何提示。

如果不显式注解，直接让 TypeScript 推导

```javascript
let a = {
    b: 'hello'
}
console.log(a.b)
```

![](../../../../.vuepress/public/assets/images/web/language/typeScript/understand-of-type/image-20231206112616176.png)

这其实就是**对象字面量**的语法，当然除了让 TypeScript 推导出对象的结构，也可以自己进行明确的描述

```javascript
const a: {b: string} = {
  b:'hello'
}
console.log(a.b);

const user: {
  name: string
  age: number
} = {
  name: 'jack',
  age: 18
}
console.log(user.name)
```

> 与前面讲的基本类型不同，使用**const 声明对象不会导致 TypeScript 把推导的类型缩窄**。这是因为 JavaScript 对象是可变的，所以在 TypeScript 看来，创建对象之后可能会更新对象的字段

## 可选符号 `?`

默认情况下，TypeScript 对对象的属性要求十分严格，如果声明对象有个类型为 `string` 的属性 `name` 和类型为 `number` 的属性 `age`，TypeScript 将预期对象有这么两个属性。而且有且仅有这两个属性，如果缺少 `name` 和 `age` 属性，或者多了其他属性，TypeScript 将报错

```typescript
// 类型 "{ name: string; }" 中缺少属性 "age"，但类型 "{ name: string; age: number; }" 中需要该属性
let user: {
    name: string
    age: number
} = {
    name: 'jack'
    // age: 18
}

// error "类型“{ name: string; age: number; }”上不存在属性“sex”
user.sex = '男'
```

可以通过可选符号修饰符 `?` 告诉 TypeScript 某个属性是可选的

```javascript
let user: {
  name: string
  age?: number
  sex?: string
} = {
  name: 'jack'
}
```

> 注意：如果标注为**可选**属性，那么这个属性的类型其实是：`类型 | undefined`，也就是说，`age?:number`，其实真正的应该是 `age?:number | undefined`

## readonly

除了修饰符可选符号(`?`)之外，还可以使用 `readonly` 修饰符把字段标记为只读

```javascript
let user: {
  readonly name: string
  age: number
} = {
  name: 'jack',
  age: 18
}
user.age = 19;
user.name = 'tom'; //error 无法为 "name" 赋值，因为它是只读属性
```

> readonly 不仅仅可以修饰对象的属性，数组，元祖和类中都可以使用 readonly

## 类型别名与接口

使用 `let`，`const`，`var` 为某个值声明变量名，也就是这个值的别名，那么类似的，在 TypeScript 中，可以为类型声明别名

```javascript
type Age = number;
type Person = {
  name: string
  age: Age
}
```

`Age` 就是一个 `number`，因此可以让 `Person` 的解构定义更容易理解。**约定俗成的，一般类型别名的首字母大写**

不过**TypeScript 无法推导类型别名，因此必须显式注解**。

和使用 let 声明变量一样，**同一种类型不能声明两次**

```javascript
type Color = 'red'
type Color = 'blue' // error 标识符Color重复
```

而且和 `let`，`const` 一样，**类型别名采用块级作用域**，每一块代码和每一个函数都有自己的作用域，作用域内部的类型别名将遮盖外部的类型别名

```javascript
type Color = 'red'

if (true) {
    type Color = 'blue' // 不报错
    let color: Color = 'blue'
}
let color: Color = 'red'
```

当然，类型别名现在最有用的地方就是减少重复输入复杂的类型。

上面声明对象类型要么类型推导，要么使用对象字面量，但是使用类型字面量书写又难看，而且也不方便，如果有多个同样类型的对象，这太麻烦了，类型别名就很简单地解决了这个问题

```javascript
type User = {
  name: string
  age: number
}

let user1: User = {
  name: 'jack',
  age: 18
}

let user2: User = {
  name: 'tom',
  age: 19
}
```

当然类型别名还能嵌套

```javascript
type Address = {
  province: string
  city: string
}
type User = {
  name: string
  age: number
  address: Address
}

let user1: User = {
  name: 'jack',
  age: 18,
  address: {
    province: '四川',
    city: '成都'
  }
}

let user2: User = {
  name: 'tom',
  age: 19,
  address: {
    province: '云南',
    city: '昆明'
  }
}
```

类型别名并不能由 TS 自动的推导出来，必须手动声明，或者也能使用类型断言

```typescript
function getUser(): User {
    return {
        name: 'John',
        age: 30,
        address: {
            province: '四川',
            city: '成都'
        }
    } as User
}
```

**对于定义比较复杂结构，接口和类型别名基本的作用一致**，上面的类型别名的代码完全可以使用接口进行替换。而且就算是交叉使用也不存在问题

```typescript
type Address = {
    province: string
    city: string
}
interface User {
    name: string
    age: number
    address: Address
}
```

## 结构化类型

TypeScript 的对象类型表示**对象的结构**。这是一种设计选择，JavaScript 采用的是**结构化类型**，TypeScript 直接沿用，没有采取名义化类型

> 在**结构化类型**中，类型的兼容性是根据其结构或成员来确定的，而不是依赖于类型的名称或标识符。换句话说，如果两个对象具有相同的结构，即它们具有相同的属性和方法，那么它们可以被认为是相同类型或兼容的类型，即使它们的名称不同。在某些语言中也叫做**鸭子类型(鸭子辨型)**（意思是不以貌取人）
>
> 相比之下，**名义化类型**的兼容性是根据类型的名称或标识符来确定的。在名义化类型系统中，即使两个对象具有相同的结构，如果它们的名称或标识符不同，它们被认为是不同的类型。
>
> 结构化类型通常用于动态类型语言，如 JavaScript，而名义化类型通常用于静态类型语言，如 Java 或 C++。

```typescript
type Person = {
    name: string
    age: number
}

type Animal = {
    name: string
    age: number
}

const person: Person = {
    name: 'John',
    age: 10
}

const animal: Animal = person

function greet(person: Person) {
    console.log(`Hello, ${person.name}`)
}

greet(animal)
```

`Person` 类型能够赋值给 `Animal` 类型，如果是 Java 等后端程序员会觉得这样做不可思议，但是其实将类型去掉，看看编译之后的结果，就能理解了，无非就是简单的对象传值，名字并不是最重要的。

```javascript
'use strict'
const person = {
    name: 'John',
    age: 10
}
const animal = person
function greet(person) {
    console.log(`Hello, ${person.name}`)
}
greet(animal)
```

同样的，就算是 class 类，一样是结构化类型

```javascript
class User {
  constructor(
  	public firstName: string,  // public 是 this.firstName=firstName 的简写形式
    public lastName: string,
    public age:number) {
  }
}

class Person {
  constructor(public firstName: string, public lastName: string, public age:number) {
  }
}

let a = new Person('lily','smith',20);
let b = new User('john','matt',21);
a = b;
```

## 装箱与拆箱类型

在写 JavaScript 的时候，如果暂时还不知道要给对象赋值什么属性，经常写成下面这个样子

```javascript
let obj = {}
```

在 TypeScript 中，`{}` 也可以用来表示类型，一般叫做空对象字面量表示

```typescript
let obj: {}
```

可能也会这么想，仅仅就只是声明一个对象，后面再给这个对象赋值具体的属性。

但是，`{}` 看似不起眼，实际上比之前的 object 作用范围还要大，object 至少规定了需要的是一个对象，而 `{}` 连基础类型都能复制，`{}` 其实和 `Object` 作用基本一样

```typescript
let obj1: {} = {name: 'John'}
let obj2: {} = 123
let obj3: {} = 'hello'
let obj4: object = {name: 'John'}
let obj5: object = 123 // Error
```

熟悉 JavaScript 原型链的开发者应该记得，原型链的顶端是 `Object` 以及 `Function`，这也就意味着所有的原始类型与对象类型最终都指向 `Object`，在 TypeScript 中就表现为 `Object` 包含了所有的类型

```typescript
const temp1: Object = {name: 'jack'}
const temp2: Object = () => {}
const temp3: Object = []
const temp4: Object = new String('hello')
const temp5: Object = 'world'
const temp6: Object = 123
const temp7: Object = true
const temp8: Object = Symbol('a')

// 关闭 strictNullChecks，下面也成立
const temp9: Object = undefined
const temp10: Object = null
const temp11: Object = void 0

// const tmp1: object = {};
// const tmp2: object = "world"; // error
// const tmp3: object = 123;     // error
```

和 `Object` 类似的还有 `Boolean`、`Number`、`String`、`Symbol`，这几个**装箱类型（Boxed Types）** 同样包含了一些超出预期的类型。以 `String` 为例，它同样包括 `undefined`、`null`、`void`，以及代表的 **拆箱类型（Unboxed Types）** `string`

```typescript
let str1: string = 'Hello World'
let str2: String = 'Hello World'

let str3: String = new String('Hello World')
// let str4: string = new String("Hello World"); // Error

str2 = str1
// str1 = str2; // Error

// 之前的类型字面量一样有这样的父子类型兼容问题
let str5: 'Hello World' = 'Hello World'
str2 = str5
// str5 = str2; // Error
```

> **在任何情况下，都不应该使用这些装箱类型**

下图表示几种对象表示不同的值是否有效：

| 值                    | `object` | `{}` | `Object` |
| --------------------- | -------- | ---- | -------- |
| `{}`                  | 是       | 是   | 是       |
| `[]`                  | 是       | 是   | 是       |
| `function(){}`        | 是       | 是   | 是       |
| `new String('hello')` | 是       | 是   | 是       |
| `'a'`                 | 否       | 是   | 是       |
| `123`                 | 否       | 是   | 是       |
| `Symbol('a')`         | 否       | 是   | 是       |
| `null`                | 否       | 否   | 否       |
| `undefined`           | 否       | 否   | 否       |

## 联合(并集)类型 `|`

有时候一个类型，可能会是 `string`，也有可能是 `number`，或者这个类型，并不仅仅就是一个类型字面量的值，希望可以限定是多个值，那这个时候应该怎么表示呢？

```javascript
type Width = number | string
const width1: Width = 100
const width2: Width = '100px'

type Color = 'red' | 'blue' | 'green'
const color1: Color = 'red'
const color2: Color = 'blue'
const color3: Color = 'green'
```

同样的，如果是对象类型，一样可以

```typescript
type Student = {name: string; score: number}
type Teacher = {name: string; age: number; subject: string}
type Person = Student | Teacher

const person1: Person = {name: 'jack', score: 100}
const person2: Person = {name: 'jack', age: 18, subject: 'math'}
const person3: Person = {name: 'jack', age: 18, subject: 'math', score: 100}
const person4: Person = {name: 'jack'} // error
```

由于是联合，从上面的代码中就可以看出，`Person` 类型可以是 `Student` 类型的值，也可以是 `Teacher` 类型的值，甚至两者兼具结构合并之后的值也行。当然，也不能两个都不是，所以 `person4` 报错

但是使用对象的联合类型很容易产生疑惑。上面的 person1 和 person2 对象都好说，取的是联合，所以可以要么是 Student，要么可以是 Teacher。要么其实可以两个都是，所以 `person3` 这样赋值是没有问题的。

但是要取值的时候就会发生问题

```typescript
const person3: Person = {name: 'jack', age: 18, subject: 'math', score: 100}

console.log(person3.name)
console.log(person3.age) // error 类型Person上不存在属性age
console.log(person3.score) // error 类型Person上不存在属性score
```

虽然 `Student` 类型和 `Teacher` 类型的联合都能赋值给 `person3`，但是实际在使用的时候 `Student` 有的属性，`Teacher` 并不一定有，反过来也一样，因此只能调用两者共同的属性 `name`。

> 如果联合不相交，那么值只能属于联合类型中的某个成员，不能同时属于每个成员。

联合类型非常常用，无论是在声明类型别名，对象字面量或者函数中都能用到

```typescript
type Color = '黑色' | '白色' | '褐色' | '花色'
type Breed = '英短' | '中华田园猫' | '暹罗猫' | '孟买猫'
type Cat = {
    name: string
    age: number
    gender: '公猫' | '母猫'
    color?: Color
    breed?: Breed
}

const cat: Cat = {
    name: 'Tom',
    age: 11,
    gender: '公猫',
    color: '黑色'
}
cat.breed = '中华田园猫'
```

## 交叉(交集)类型 `&`

交叉类型和符号的意思相似，就表示 and 的意思，把 `&` 相交的组合起来，值需要全部满足相交组合的类型

```javascript
type Student = {name: string, score: number}
type Teacher = {name: string, age: number, subject: string}
type User = Student & Teacher
const user1: User = {name: 'jack', age: 18, subject: 'math'} // error 缺少属性"score"
```

虽然有时候口头上经常会说交集类型，但是在教学的时候，我并不是太喜欢把`&`符号称为交集，叫做交叉应该更容易理解一些，不容易给大家造成思想误区。

就拿上面的类型来说，`A&B` ----> 一说交集应该是，`type C = {name:string}` 才对啊，最后得到的好像是我记忆中数学的联合类型啊？不用对你的记忆怀疑，你的记忆是对的，你可以把锅丢给翻译

为了便于理解，你可以这样想：**C 既符合 A 也符合 B，所以是 A 和 B 的“交叉”**，有了这样的理解，下面出现的一些情况，我们才能更好的理解

相比联合类型，交叉类型的范围就没有那么广泛了，因为你不可能把具体的值使用 `&` 组合，这样意义也就混乱了

```javascript
type Width = number & string // never类型
```

> `number` 和 `string` 没有什么交集，因此根本无法给变量赋值，交叉类型始终交叉的是类型，类型字面量或者基础类型，在做类型交叉的时候没有任何意义，因此得到的结果是 `never`。具体类型 `never` 类型的使用我们后面讲解

其实，对象字面量类型一样会有这样的效果

```typescript
type P = {
    name: string
    sex: string
}
type T = {
    name: string
    age: number
}
type PT = P & T

const a: PT = {
    name: 'jack',
    sex: '男',
    age: 11
}
```

如果有同名属性，并且类型一样，就会直接合并，但是如果类型不一样呢？

```diff
type P = {
  name: string
  sex: string
}
type T = {
+  name: number
  age:number
}
type PT = P & T

const a: PT = {
+  name: 'jack', // error 不能将类型“string”分配给类型“never”
  sex:'男',
  age:11
}
```

不过我们可以使用交集类型的特性，达到一些我们需要的效果。

比如，我们可能有一个联合类型，在实际开发中，可能这个联合类型我们并不知道有哪些，或者可能这个联合类型直接赋值给另外一个类型的时候会报错，我们可以使用 `&` 运算符对其进行约束

```typescript
type params = string | number | boolean
type pt = params & string
```

当然我们现在代码很简单，只能简单模拟这个情况，讲到一些类型工具之后我们再来看一些复杂情况

比如，我们还能使用交叉类型来实现类似于继承的效果

```typescript
type Goods = {
    id: number
    name: string
    price: number
}

type Cart = Goods & {
    count: number
}

type Order = Goods & {
    count: number
    totalPrice: number
}

const goods: Goods = {
    id: 1,
    name: 'goods',
    price: 100
}

const cart: Cart = {
    id: 1,
    name: 'goods',
    price: 100,
    count: 1
}

const order: Order = {
    id: 1,
    name: 'goods',
    price: 100,
    count: 1,
    totalPrice: 100
}
```

## `typeof` 与控制流分析

### 细化:类型的控制流分析

Typescript 有非常强大的类型推导能力，不单单有之前我们提到的类型拓宽，还可以类型收缩，比如在类型拓宽中，我们就提到了 `const` 声明的变量会自动的转变为类型字面量。当然这仅仅是冰山一角，Typescript 甚至可以随着你的代码逻辑，不断地尝试窄收窄，这一能力称之为**类型的控制流分析**（也可以简单的理解为就是类型推导）

> 有些人也把 **类型的控制流分析** 简称为 **类型收缩(收窄)**，但是这种称呼容易和 `const` 声明类型的类型收窄引起混淆。
>
> 不过怎么称呼无所谓，在具体的语境中，能理解就行。

```javascript
function parse(value: number | string | boolean | null | undefined) {
    if (typeof value === 'number') {
        return value * 2 // number
    } else if (typeof value === 'string') {
        return `hello ${value}` // string
    } else if (typeof value === 'boolean') {
        return !value // boolean
    } else {
        return value // null | undefined
    }
}
```

> 可以把整个流程控制想象成一条河流，从上而下流过程序，随着代码的分支分出一条条支流，在最后重新合并为一条完整的河流。
>
> **在类型控制流分析下，每流过一个 `if` 分支，后续联合类型的分支就会少一个，因为这个类型已经在这个分支处理过了，不会进入下一个分支**

### `typeof`:类型查询

上面的代码中，使用了在 JavaScript 很常用的一个操作符`typeof`，在 JavaScript 中，常常用`typeof`来检查变量类型，通常会返回 `"string"`/`"number"`/`"boolean"`/`"function"`/`"object"` 等值。

在 TypeScript 中给 `typeof` 操作符还赋予了新的功能：**类型查询（Type Query Operator）**

简单来说，可以通过 `typeof` 获取自动推导的类型，给 `typeof` 一个值，就可以推导出这个值的类型

```typescript
let temp1 = 'hello1'
const temp2 = 'hello2'
const temp3 = null
const temp4 = (a: string) => a.toUpperCase()

type Temp1 = typeof temp1 //string
type Temp2 = typeof temp2 //hello2
type Temp3 = typeof temp3 //null
type Temp4 = typeof temp4 // (a: string) => string
```

对象也是可以的

```javascript
const user = {
    name: 'jack',
    age: 18,
    address: {
        province: '四川',
        city: '成都'
    }
}

type User = typeof user

const person: User = {
    name: 'jack',
    age: 18,
    address: {
        province: '四川',
        city: '成都'
    }
}
```

## `instanceof` 和 `in`

### `instanceof` 实例判断

`typeof`类型检查只能判断`"string"`/`"number"`/`"boolean"`/`"function"`/`"object"`等值。如果遇到了具体的对象类型判断就无能为力了，因此，可以使用`instanceof`关键字

```typescript
class Animal {
    eat() {
        console.log('animal eat')
    }
}

class Dog extends Animal {
    eat() {
        console.log('dog eat')
    }
    bark() {
        console.log('dog bark')
    }
}

class Cat extends Animal {
    eat() {
        console.log('cat eat')
    }
    meow() {
        console.log('cat meow')
    }
}

function feedAnimal(animal: Animal) {
    if (animal instanceof Dog) {
        animal.bark() // Dog
    } else if (animal instanceof Cat) {
        animal.meow() // Cat
    } else {
        animal.eat() // Animal
    }
}

feedAnimal(new Dog())
```

### `in` 属性检查

JavaScript 语言中，`in`运算符用来确定对象是否包含某个属性名

```typescript
const obj = {a: 123}

if ('a' in obj) {
    console.log('有a属性')
}
```

在 TypeScript 中，`in`**检查对象是否具有特定的属性，并使用该属性区分不同的类型**。**它通常返回一个布尔值，表示该属性是否存在于该对象中**。

```typescript
type Circle = {
    kind: 'circle'
    radius: number
}

type Rectangle = {
    kind: 'rectangle'
    width: number
    height: number
}

type Triangle = {
    kind: 'triangle'
    base: number
    height: number
}

type Shape = Circle | Rectangle | Triangle

function printArea(shape: Shape) {
    if ('radius' in shape) {
        console.log(Math.PI * shape.radius ** 2)
    } else if ('width' in shape) {
        console.log(shape.width * shape.height)
    } else {
        console.log((shape.base * shape.height) / 2)
    }
}
```

## 字面量类型检查(可辨识联合类型)

再结合着对象的联合类型来看一下问题：

```typescript
type UserTextEvent = {value: string; target: HTMLInputElement}
type UserMouseEvent = {value: number; target: HTMLButtonElement}
type UserEvent = UserTextEvent | UserMouseEvent

function handle(event: UserEvent) {
    if (typeof event.value === 'string') {
        console.log(event.value) // event.value类型为string
        console.log(event.target) // event.target类型为 HTMLInputElement | HTMLButtonElement
    } else {
        console.log(event.value) // event.value类型为number
        console.log(event.target) // event.target类型为 HTMLInputElement | HTMLButtonElement
    }
}
```

`event.value`的类型可以顺利的细化，但是`event.target`却不可以，因为 handle 函数的参数是`UserEvent`。联合之后的`UserEvent`，其实类似于：

```typescript
type UserEvent = {
    value: string | number
    target: HTMLInputElement | HTMLButtonElement
}
```

也就是当`value:string`的时候，`target`可以选择`HTMLInputElement | HTMLButtonElement`

也就是当`value:number`的时候，`target`也可以选择`HTMLInputElement | HTMLButtonElement`

因此，TypeScript 需要一种更可靠的方式，明确对象的并集类型的具体情况。

最常见的方式是，使用**字面量类型进行标记**，这样具体有值的情况下，就相当于在进行值的判断，这样 TypeScript 就能很精确地推导出，具体的对象并集类型到底是哪个类型了

```typescript
type UserTextEvent = {type: 'TextEvent'; value: string; target: HTMLInputElement}
type UserMouseEvent = {type: 'MouseEvent'; value: number; target: HTMLButtonElement}
type UserEvent = UserTextEvent | UserMouseEvent

function handle(event: UserEvent) {
    if (event.type === 'TextEvent') {
        console.log(event.value) // event.value类型为string
        console.log(event.target) // event.target类型为 HTMLInputElement
    } else {
        console.log(event.value) // event.value类型为number
        console.log(event.target) // event.target类型为 HTMLButtonElement
    }
}
handle({type: 'TextEvent', value: 'hello', target: document.getElementsByTagName('input')[0]})
```

> 一般像这种多个类型的联合类型，并且多个类型含有一个公共可辨识的公共属性的联合类型，还有一个专门的称呼**"可辨识联合类型"**

**可辨识联合类型**对初学者有实际的指导作用，我们在创建类型的时候，就需要想着**最好创建带有可辨识的联合类型，而不是可选字段**

比如，有这样的情况，如果是`circle`的时候，有`radius`属性，如果是`rect`情况，有`width`和`height`属性。对于初学者，很有可能创建成下面的类型：

```typescript
type Shape = {
    kind: 'circle' | 'rect'
    radius?: number
    width?: number
    height?: number
}

function area(shape: Shape) {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2 // error shape.radius可能未定义
        case 'rect':
            return shape.width * shape.height // error shape.width，shape.height可能未定义
    }
}
```

上面这种方式 kind 字段没有与其他字段建立关系，因此，不能保证可选属性是否有值。所以报出了未定义的错误(当然在后面的学习中我们可以使用非空断言`!`处理)。

可辨识的联合类型是一种更好的处理方式：

```typescript
type Circle = {kind: 'circle'; radius: number}
type Rect = {kind: 'rect'; width: number; height: number}
type Shape = Circle | Rect

function area(shape: Shape) {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2
        case 'rect':
            return shape.width * shape.height
    }
}
```

## 自定义守卫（谓语动词 is）

自定义守卫是指通过 `{形参} is {类型}` 的语法结构，来给**返回布尔值的条件函数**赋予类型守卫的能力

```typescript
function isString(input: any) {
    return typeof input === 'string'
}
function isNumber(input: any) {
    return typeof input === 'number'
}

function foo(input: string | number) {
    if (isString(input)) {
        console.log(input) // 依然是 string | number
    } else if (isNumber(input)) {
        console.log(input) // 依然是 string | number
    }
}
```

**类型收窄只能在同一的函数中**，如果在不同的函数中就不起作用。

只要加上谓语动词：

```typescript
function isString(input: any): input is string {
    return typeof input === 'string'
}
function isNumber(input: any): input is number {
    return typeof input === 'number'
}

function foo(input: string | number) {
    if (isString(input)) {
        console.log(input) // string
    } else if (isNumber(input)) {
        console.log(input) // number
    }
}
```

自定义类型守卫在做一些比较复杂类型判断的时候比较有用

```typescript
type Box = {
    _v_isBox: boolean
    value: any
}

function isBox(box: any): box is Box {
    return box && box._v_isBox === true
}

function unWrapBox(box: Box) {
    return isBox(box) ? box.value : box
}
```

上面的这个代码，其实就是简单模拟了一下 Vue3 中[isRef](https://github.com/vuejs/core/blob/main/packages/reactivity/src/ref.ts#L97)和[unRef](https://github.com/vuejs/core/blob/main/packages/reactivity/src/ref.ts#L234)的 ts 代码

```typescript
export function isRef(r: any): r is Ref {
    return !!(r && r.__v_isRef === true)
}

export function unref<T>(ref: MaybeRef<T> | ComputedRef<T>): T {
    return isRef(ref) ? ref.value : ref
}
```

其实前面讲的`字面量的类型检查`，`typeof`，`instanceof`，`in`以及`自定义守卫`在 TypeScript 中有统一的称呼，都叫做**类型守卫**，其目的其实都是在控制流分析的时候，帮助 TypeScript 收紧类型，便于推断

## `never`

`never` 类型根据其英文翻译，就表示`从来没有`，`绝不`。其实之前已经见到过这个类型

```typescript
type A = string & number // never
```

之前不是讲过有`null`，`undefined`和`void`类型吗？这三个都是有具体意义的，也表示具体的类型，`undefined`表示尚未定义，`null`表示缺少值，甚至是`void`就表示一个空类型，就像没有返回值的函数使用 void 来作为返回值类型标注一样。

而 never 才是一个“什么都没有”的类型，它甚至不包括空的类型，严格来说，**never 类型不携带任何的类型信息**。

比如下面的联合声明：

```javascript
type Foo = string | number | boolean | undefined | null | void | never
```

把常见的基础类型都放入到了联合声明中，但是将鼠标悬浮在类型别名之上，会发现这里显示的类型是：`string | number | boolean | void | null | undefined`，`never`直接被无视掉了。

> 注意：这个特性在以后的类型编程条件判断中经常会被用到，使用 never 来填充数据

在 TypeScript 的类型系统中，`never` 类型被称为 **Bottom Type**，是**整个类型系统层级中最底层的类型**

如果说`any`，`unknown`是其他每个类型的父类型，那么`never`就是其他每个类型的子类型。

这意味着，**never 类型可以赋值给其他任何类型，但是反过来，却行不通**

通常不会显式地声明一个 `never` 类型，这是没有任何意义的，它主要被类型检查所使用。

不过在实际工作中，特别是在团队开发中，可以利用 never 的特性与类型的控制流分析，让 TypeScript 做出更合理的处理

```typescript
type Method = 'GET' | 'POST'

function request(url: string, method: Method) {
    if (method === 'GET') {
        console.log(method) // GET
        // todos...
    } else if (method === 'POST') {
        console.log(method) // POST
        // todos...
    } else {
        console.log(method) // never
    }
}
```

上面的代码没有什么问题，但是如果某一天，`Method`类型加入了新的联合类型，比如`type Method = "GET" | "POST" | "PUT" | "DELETE";`，特别是在团队开发中，这个时候，request 函数是没有任何感知的。

```typescript
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

function request(url: string, method: Method) {
    if (method === 'GET') {
        console.log(method) // GET
        // todos...
    } else if (method === 'POST') {
        console.log(method) // POST
        // todos...
    } else {
        const _neverCheck: never = method
        throw new Error(`不知道的类型: ${_neverCheck}`)
    }
}
```

将代码修改为现在的这个样子，虽然现在有报错了，**`method`根据类型流分析，还剩下`"PUT" | "DELETE"`类型，所以不能赋值给`never`类型**。但是将错误扼杀在摇篮中，才是在团队项目中想要的结果，而不是等运行了，才去一个个排查，特别是这种隐藏的 bug，在团队的成千上万行代码与模块中，去找到这个问题，是非常痛苦的问题。

> 这种方式也叫做**穷举式检查**，积极的对不期望的情况进行错误处理，在编译时就捕获未处理的情况。而不是默默地忽略它们

比如，前面的代码，也可以进行修改：

```typescript
type Circle = {kind: 'circle'; radius: number}
type Rect = {kind: 'rect'; width: number; height: number}
type Shape = Circle | Rect

function area(shape: Shape) {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2
        case 'rect':
            return shape.width * shape.height
        default:
            const _neverCheck: never = shape
            throw new Error('Invalid shape type')
    }
}
```

如果新加一个类型`const _neverCheck: never = shape;` 这行代码就会报错，因为控制流分析并没有完全结束

```diff
type Circle = { kind: "circle", radius: number }
type Rect = { kind: "rect", width: number, height: number }
+type Triangle = { kind: "triangle", base: number, height: number }
type Shape = Circle | Rect | Triangle;

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rect":
      return shape.width * shape.height;
+    case "triangle":
+      return shape.base * shape.height / 2;
    default:
      const _neverCheck: never = shape;
      throw new Error("Invalid shape type");
  }
}
```

还有在某些情况下使用 never 确实是符合逻辑的，比如一个只负责抛出错误的函数：

```typescript
function fn(): never {
    throw new Error('error')
}
```

在类型流的分析中，一旦一个返回值类型为 `never` 的函数被调用，那么下方的代码都会被视为无效的代码：

```typescript
function fn(): never {
    throw new Error('error')
}

function foo(n: number) {
    if (n > 10) {
        fn()
        let name = 'jack' // 检测到无法访问的代码。ts(7027)
        console.log('hello')
    }
}
```

`never`类型在我们后面讲解的条件类型中也可以做出很有意思的处理

## 数组

数组类型有两种声明方式：

```typescript
类型[]
或者
Array<类型>
```

```typescript
let a = [1, 2, 3]
var b = ['a', 'b']
const c: boolean[] = [true, false]
const d: string[] = ['a', 'b']

let e = [1, 'a']
const f: (number | string)[] = [2, 'b']

a.push(4)
// a.push("a"); //error
d.unshift('c')

f.push(3)
// f.push(true); //error
```

**一般情况下，数组应该保持同质。**

也就是说，不要在同一个数组中存储不同类型的值，存数值的，就是存数值的数组，存字符串的，就是存字符串的数组。设计程序时要规划好，保持数组中的每个元素都具有相同的类型。

虽然这样让数组变得不灵活了，不过这就是类型语言和 javascript 这种灵活语言的区别。如果不这么做，我们需要做一些额外的工作，让 typescript 相信我们执行的操作是安全的。

比如上面的`e`或者`f`，如果我们想映射这个数组，把字母变成大写，把数字变成乘以 2：

```javascript
let g = [1, 'a']
g.map(item => {
    if (typeof item === 'number') {
        return item * 2
    }
    return item.toUpperCase()
})
```

为此，必须使用 typeof 检查每个元素的类型，判断元素是数字还是字符串，然后再做相应的操作

**对象字面量当然也能和数组一起使用**

```typescript
const users: {
    name: string
    age: number
}[] = [
    {
        name: 'John',
        age: 30
    },
    {
        name: 'Jane',
        age: 25
    }
]
```

当然写成类型别名或者接口可读性更高一些

```typescript
type User = {
    name: string
    age: number
}

const users: Array<User> = [
    {
        name: 'John',
        age: 30
    },
    {
        name: 'Jane',
        age: 25
    }
]
```

**一般情况下，初始化一个空数组，数组的类型为`any`**

> **注意：**如果**启用**了 `strictNullChecks` 配置，同时**禁用**了 `noImplicitAny`，声明一个空数组，那么这个未标明类型的数组会被推导为 `never[]` 类型

```javascript
const arr = [] // any[]
arr.push(1)
arr.push('a')
```

**注意：**当这样的数组离开定义时所在的作用域后，TypeScript 将最终确定一个类型，不再扩展。

在实际工作中，可以很好地利用这一特性

```javascript
function fn() {
    const arr = [] // any[]
    arr.push(1)
    arr.push('a')
    return arr // (string | number)[]
}

const myArr = fn()
// myArr.push(true); // error
```

`readonly`修饰符也可以用来修饰数组，用于创建不可变的数组，只读数组和常规数组没有多大差别，只是不能就地更改。如果想创建只读数组，需要显式地注解类型。

```javascript
const arr: readonly number[] = [1, 2, 3];
const myArr1 = arr.concat(4);
console.log(myArr1);

const myArr2 = arr.filter(item => item % 2 === 0);
console.log(myArr2)

const myArr3 = arr.slice(0, 2);
console.log(myArr3);

// arr[3] = 4;  // error 类型“readonly number[]”中的索引签名仅允许读取。
// arr.push(4); // error 类型“readonly number[]”上不存在属性“push”
// arr.splice(0,2) // error 属性splice在类型readonly number[]上不存在，你是否指的是slice
```

在只读数组中，只能使用非变型方法，例如`concat`和`slice`，不能使用可变形方法，比如`push`和`splice`

> **注意：**只读数组不可变的特性能让代码更易于理解，不过其背后提供支持的仍然是常规的 JavaScript 数组。这就意味着，即便只是对数组做很小的改动，也要复制整个原数组。
>
> 对于小型数组来说，没什么影响，但是对于大型数组，可能会造成极大的影响。
>
> 如果打算大量使用不可变的数组，建议使用[immutable](https://www.npmjs.com/package/immutable)包

**使用并集数组的细节**

使用并集数组类型，一般有两种声明方式，两种方式大体上一样，但是有一些细节上的区别

```typescript
// 可以是number数组，可以是string，也可以是number和string类型混合的数组
type ArrType1 = (number | string)[]
// 要么是number类型，要么是string类型
type ArrType2 = number[] | string[]

const arr1: ArrType1 = ['a', 'b', 'c']
const arr2: ArrType2 = [1, 2, 3]
// const arr3: ArrType2 = [1, "a", 3]; // error
const arr4: ArrType1 = [1, 'a', 3]
```

## 元组

**元祖类型是数组的子类型**，是定义数组的一种特殊方式。

长度固定，各索引位置上的值具有固定的已知类型。在某些固定的场合，使用元祖类型更加方便，严谨性也更好

**声明元组必须显式注解类型**，因为声明元组与数组的声明相同，都是使用方括号`[]`，因此默认推导出来的都是数组类型

比如，在 JavaScript 中，经常使用数组来表示一个坐标点。这种做法在 TypeScript 中也没有任何问题，但是如果使用元祖类型，那么无论是提示还是代码严谨性，就更加好

```typescript
const pointer1: number[] = [10, 20]
const pointer2: [number, number] = [20, 30]
```

在 TypeScript 4.0 中，甚至加入了`具名元祖`，让元祖类型的可读性更高

```typescript
const pointer3: [x: number, y: number] = [20, 30]
const user: [name: string, age: number, gender: '男' | '女'] = ['jack', 20, '男']
```

很明显，元祖结构进一步提升了**数组结构的严谨性**

不过元祖类型还是有一个问题，虽然名义上限定了有几个值，并且如果像下面这样写，会报错

```typescript
pointer3[2] = 40 // error 不能将类型40分配给类型undefined
```

但是却可以使用`push`方法往里面加入新的值

```typescript
pointer3.push(40)
console.log(pointer3)
```

因此，可以将元祖类型限制为可读`readonly`元祖

```typescript
const pointer3: readonly [x: number, y: number] = [20, 30]
```

## 方括号运算符 `[]`

数组当然需要使用 `[]`，在 JavaScript 中经常使用 `[]` 来获取数组的值，或者动态引用获取对象属性的值

```typescript
const arr = ['a', 'b', 'c', 'd', 'e']
console.log(arr[1]) // b

const a = 'name'
const obj = {
    id: 1,
    name: 'jack'
}
console.log(obj[a]) // jack
```

在 TypeScript 中，方括号运算符 `[]` 用于类型计算，取出对象类型的键对应的值的类型，比如 `类型[键名]`，简写为 `T[K]` 会返回 `T` 类型的属性 `K` 的类型。

```typescript
type Person = {
    age: number
    name: string
    sex: boolean
}

type Age = Person['age'] // number类型
```

方括号的参数如果是联合类型，那么返回的也是联合类型。

```typescript
type AgeOrName = Person['age' | 'name'] // string | number
```

甚至可以获取数组的具体类型，注意下面的写法：

```typescript
const arr = ['a', 'b', 'c', 'd', 'e']
type ArrType = (typeof arr)[number] // string
```

因为在 Javascript 中，数组其实就是 `key:value` 的键值对，而数组的键也就是下标都是 number 类型

同样，如果是一个对象字面量类型的数组，一样会得到数组中对象字面量类型：

```typescript
type User = {
    name: string
    age: number
}

const users: User[] = [
    {name: 'John', age: 25},
    {name: 'Steve', age: 30},
    {name: 'Mike', age: 35}
]

type ArrType2 = (typeof users)[number] // { name: string; age: number;}
```

如果是一个元组，就可以得到元组类型中所有位置上类型的联合类型：

```typescript
const roles: ['Admin', 'User', 'Guest'] = ['Admin', 'User', 'Guest']
type ArrType3 = (typeof roles)[number] // "Admin" | "User" | "Guest"
```

## 类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

在使用 `TypeScript` 的过程中，你可能会遇到这种情况：你比 `TypeScript` 更加清楚某个值的类型。 比如你从异步请求中拿到一个类型为`any`的值，但你清楚的知道这个值就是`string`类型，这个时候你可以通过**类型断言**方式告诉编译器：这就是一个 string 类型。类型断言有点类似于其他语言的类型转换，注意只是类似，它没有运行时的影响，**类型断言只是在编译阶段起作用**。

### 语法

```typescript
值 as 类型
或者 < 类型 > 值
```

```typescript
let someValue: any = 'this is a string'
let strLength1: number = (<string>someValue).length
// 如果要写断言，建议用as，因为上面的形式在react中会有歧义。尖括号语法与JSX的标签语法相冲突
let strLength2: number = (someValue as string).length
```

注意在 `tsx` 语法中使用 `值 as 类型`。

### 用途

#### **联合类型断言：**

```typescript
type MyType = string | number | boolean

function getLength(type: MyType) {
    console.log((type as string).length)
}

getLength('Hello World')

type Student = {name: string; score: number}
type Teacher = {name: string; age: number; subject: string}
type Person = Student | Teacher

function print(person: Person) {
    console.log(person.name)
    console.log((person as Student).score)
}

print({name: 'John', score: 100})
```

其实从上面的代码中可以很明显的看出来，类型断言是有很明显的类型安全隐患的。所以我们一般在使用的时候，需要自己明确的知道确实可以进行断言，再进行操作。

#### 父类型断言为子类型

```typescript
class Animal {
    eat() {
        console.log('animal eat')
    }
}

class Dog extends Animal {
    eat() {
        console.log('dog eat')
    }
    bark() {
        console.log('dog bark')
    }
}

class Cat extends Animal {
    eat() {
        console.log('cat eat')
    }
    meow() {
        console.log('cat meow')
    }
}

function feed(animal: Animal) {
    ;(animal as Cat).meow()
}
```

还记得我们之前的`instanceof`吗？

```typescript
class Animal {
    eat() {
        console.log('animal eat')
    }
}

class Dog extends Animal {
    eat() {
        console.log('dog eat')
    }
    bark() {
        console.log('dog bark')
    }
}

class Cat extends Animal {
    eat() {
        console.log('cat eat')
    }
    meow() {
        console.log('cat meow')
    }
}

function feedAnimal(animal: Animal) {
    if (animal instanceof Dog) {
        animal.bark() // Dog
    } else if (animal instanceof Cat) {
        animal.meow() // Cat
    } else {
        animal.eat() // Animal
    }
}
```

其实类型安全的做法就是应该使用类型守卫，但是有时候可能使用起来不那么方便，或者说其实类型我们很确定，那就可以直接使用类型推断，比如常见的 DOM 事件操作

```typescript
const inputDom = document.querySelector('input')
inputDom!.addEventListener('change', e => {
    console.log((e.target as HTMLInputElement).value)
})
```

#### 将任何一个类型断言为 `any`

(某些情况下可以被断言为`unknown`)

有时候，当我们引用一个在此类型上不存在的属性或方法时，就会报错：

```ts
const obj = {
    name: 'jack',
    age: 18
}
console.log(obj.sex) // 类型“{ name: string; age: number; }”上不存在属性“sex”
```

对象`obj`上没有`sex`这样的一个属性，当然 TS 就会提示错误。

但有的时候，我们非常确定这段代码不会出错，比如：

```ts
window.foo = 1 // 类型“Window & typeof globalThis”上不存在属性“foo”
```

往全局对象`window`上添加新的属性，这可能是我们经常会做的操作，但是`window`对象类型上没有我们`foo`这个属性，当然同样也会报错。

此时我们可以使用 `as any` 临时将 `window` 断言为 `any` 类型：

```typescript
;(window as any).foo = 1
```

> 当然，上面的这个例子我们也可以通过扩展 `Window` 的类型来解决这个问题:
>
> ```typescript
> export {}
> declare global {
>     interface Window {
>         foo: number
>     }
> }
>
> window.foo = 1
> ```
>
> 不过如果只是临时的增加 `foo` 属性，`as any` 会更加方便。
>
> 也就是说，不能滥用 `as any`，但是也不要完全否定它的作用，需要在**类型的严格性和开发的便利性之间掌握平衡**。才能发挥出 TypeScript 最大的价值。

#### 将 `any/unknown` 断言为一个具体的类型

在日常的开发中，不可避免地需要处理 `any` 或者`unknown`类型的变量，它们可能是由于第三方库未能定义好自己的类型，也有可能是历史遗留问题，还可能是受到 TypeScript 类型系统的限制而无法精确定义类型的场景。

遇到 `any` 或者`unknown`类型的变量时，可以通过类型断言把 `any` 或者`unknown`断言为精确的类型。

```typescript
// 第三方API或者历史遗留函数
function getData(id: number): any {
    // 模拟：根据id获取的对象数据
    // ......
    return {id: 1, name: 'jack', age: 18}
}

interface User {
    id: number
    name: string
    age: number
}

const user = getData(1) as User
console.log(user.name)
```

### 限制

并不是任何一个类型都可以被断言为任何另一个类型。

```typescript
let str = '123'
let n = str as number // error
```

两个完全没有关联的类型进行断言，这当然会报错，这是很容易理解的，因此，什么情况下能断言，就很好理解了。

具体来说，若 `A` 兼容 `B`，那么 `A` 能够被断言为 `B`，`B` 也能被断言为 `A`。

```typescript
let str1: 'hello' = 'hello'
let str2 = 'hello'
str2 = str1 // 可以直接赋值
// str2 = str1 as string;
str1 = str2 as 'hello' // 可以使用类型断言
```

对象类型也一样

```typescript
let a: Animal = new Animal()
let b: Dog = new Dog()

// a = b; // 可以直接赋值
b = a as Dog // 可以使用类型断言, 但是不安全Animal没有bark方法
b.eat()
// b.bark(); // error
```

### 非空断言

当确信某个值不是`null`或`undefined`时，可以使用非空断言

**语法:** `值!`，比如`someValue!`

```typescript
let maybeString: string | null = 'hello'
let definitelyString = maybeString!
```

```typescript
function getRandom(length?: number) {
    if (!length) {
        return undefined
    }

    return Math.random().toString(36).slice(-length)
}
let s = getRandom(6)
// 可以使用类型断言
;(s as string).charAt(0)
// 由于就是字符串和非空的处理，可以使用非空断言
s!.charAt(0)
```

```typescript
type Box = {
    id: number
    name: string
}

function getBox(): Box | undefined {
    if (Math.random() > 0.5) {
        return {
            id: 1,
            name: 'box1'
        }
    }
    return undefined
}

function createProduction(box: Box) {
    // todos...
}

createProduction(getBox() as Box)
// 非空断言
createProduction(getBox()!)
```

### 双重断言

既然：

-   任何类型都可以被断言为 `any`(某些情况下可以被断言为`unknown`)
-   `any`或`unknown`可以被断言为任何类型

那么就可以使用双重断言 `as any as 类型` 来将任何一个类型断言为任何另一个类型

```typescript
let str = '123Hello'
let n = str as unknown as number
console.log(typeof n)
```

这样写很明显有类型安全的问题，类型断言并不等于类型转换，编译之后是没有类型的，所以通过 tsc 编译之后会发现，其实就是把变量`str`赋值给了变量`n`

```typescript
let str = '123Hello'
let n = str
console.log(typeof n) // string
```

### as const 断言

**`as const`断言** 用于指示 TypeScript 将一个变量视为常量，并据此推断出最具体的类型。并且，使用 `as const` 时，TypeScript 会将**数组视为只读元组**，**对象的属性也会被视为只读属性**，且对象或数组中的值会被推断为字面量类型，而不是更一般的类型（如 `string`、`number` 等）

```typescript
// a 的类型是 'Hello'
let a = 'Hello' as const

// arr 的类型是 readonly [1, 2, 3]
let arr = [1, 2, 3] as const

// obj 的类型是 { readonly x: 10; readonly y: 20; }
let obj = {x: 10, y: 20} as const

// 对于更复杂的嵌套一样起作用
const user = {
    id: 1,
    name: 'jack',
    address: {
        city: '成都',
        province: '四川'
    }
} as const

/*
user的类型是: {
    readonly id: 1;
    readonly name: "jack";
    readonly address: {
        readonly city: "成都";
        readonly province: "四川";
    };
}
*/
```

as const 结合着方括号运算符，有时候可以非常方便的处理一些看起来比较复杂的问题。

比如，需要将数组中的内容转换为联合类型

```typescript
const roles = ['角色列表', '用户删除', '用户查询', '权限详情'] as const
type Role = (typeof roles)[number] //"角色列表" | "用户删除" | "用户查询" | "权限详情"
```

## satisfies

`satisfies` 是一个类型操作符，它是 `TypeScript 4.9` 的新功能。和类型断言 `as` 功能比较类似，但是比类型断言更加安全也更加智能，因为它能在满足类型安全的前提下，自动做类型收窄和类型提示。

```typescript
interface IConfig {
    a: string | number
}

// Error   类型 "{}" 中缺少属性 "a"，但类型 "IConfig" 中需要该属性。
const legacy: IConfig = {}
// 但是使用legacy.a竟然不会报错
console.log(legacy.a)

// 这样做并不安全，因为{}中并没有属性a
const legacyAs = {} as IConfig
// 直接调用竟然也不会报错
console.log(legacyAs.a)

// Error 类型 "{}" 中缺少属性 "a"，但类型 "IConfig" 中需要该属性。
const current = {} satisfies IConfig
// 调用也会报错
console.log(current.a)

//const currentWithValue:IConfig = { a: 2 }
//currentWithValue.a.toFixed() //error 类型string|number上不存在属性toFixed

//const currentWithValue = { a: 2 } as IConfig
//currentWithValue.a.toFixed() //error 类型string|number上不存在属性toFixed

const currentWithValue = {a: 2} satisfies IConfig
// 此时使用 a 的时候会自动推断我们声明的类型,不再是联合类型
// satisfies关键字可以帮助我们反向推导
currentWithValue.a.toFixed()
```

再比如在某些映射类型中：

```typescript
type MyElement = {
    tagName: string
    src: string
    [key: string]: any
}

const element: MyElement = {
    tagName: 'img',
    src: 'https://example.com/image.png',
    alt: 'Example Image'
}

console.log(element.alt) // 没有类型提示
```

可以使用 `satisfies`

```typescript
const element = {
    tagName: 'img',
    src: 'https://example.com/image.png',
    alt: 'Example Image'
} satisfies MyElement

console.log(element.alt)
```

## 枚举

### 为什么使用枚举？

在讲解具体使用枚举之前，首先要理解为什么要使用枚举

其实枚举在其他语言中它都是老朋友了，比如`java`，`c#`。

比如我们现在要定义春夏秋冬，颜色，月份，星期，方向等等有序列或者比较固定离散值（可以被清晰区分并计数的值）的情况，在 javascript 中，我们会想到用 const 定义一系列常量，在 Typescript 我们会想到用字面量的联合类型来处理

```typescript
type Gender = '男' | '女'
type Color = 'red' | 'blue' | 'green'
type Direction = 'up' | 'down' | 'left' | 'right'
type Status = 'success' | 'error' | 'warning'
type Weekday = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'

function fn1(color: Color) {
    switch (color) {
        case 'red':
            console.log(color)
            // todo...
            break
        case 'blue':
            console.log(color)
            // todo...
            break
        case 'green':
            console.log(color)
            // todo...
            break
    }
}
```

但是这么写，其实也会遇到`java`，`c#`语言在处理上的一些问题，也就是**逻辑含义和真实的值产生了混淆，会导致当修改真实值的时候，产生大量的修改**

简单来说，就是上面的`"red" | "blue" | "green"`颜色如果想要修改为其他的颜色，比如中文的`"红"|"蓝"|"绿"`，不单单声明要改，整个判断也需要修改。所以无论是像`java`，`c#`这样的类型语言，或者是像 Typescript 才有了枚举这样的类型。

Typescript 声明枚举非常简单

```typescript
enum Color {
    Red,
    Blue,
    Green
}

function fn2(color: Color) {
    switch (color) {
        case Color.Red:
            console.log(color)
            break
        case Color.Blue:
            console.log(color)
            break
        case Color.Green:
            console.log(color)
            break
    }
}
fn2(Color.Red)
```

> 按约定，枚举名称最好为首字母大写的单数形式。枚举中的键也为首字母大写

Typescript 枚举大体分为两种：字符串到字符串之间的映射，字符串到数字之间的映射。

Typescript 可以自动为枚举中的各个成员推导对应的数字。默认从 0 开始，依次往下，你也可以自己手动设置

```typescript
enum Color {
    Red = 0,
    Blue = 1,
    Green = 2
}
```

甚至如果手动设置一个开头，Typescript 会自动的往下为你推导下一个枚举对应的数值

```typescript
enum Color {
    Red = 100,
    Blue, //101
    Green = 100 + 200, //甚至可以得到计算之后的值
    Yellow //301
}
```

当然也可以定义字符串到字符串的映射

```typescript
enum Color {
    Red = 'red',
    Blue = 'blue',
    Green = '#008000',
    Yellow = '#FFFF00'
}
```

当然，前面为什么说大体分为两种，因为其实还可以数值和字符串混合，这种一般称为**异构枚举**，不过这种就不推荐了

```typescript
enum Color {
    Red = 100,
    Blue = 'blue',
    Green = 100 + 200,
    Yellow = 'yellow'
}
```

再来一个例子，大家理解一下上面这句话的意思

写一个函数处理参数传递的各种不同的状态，比如`"success","notfound","error"`

```typescript
type StatusType = 'success' | 'notfound' | 'error'

function checkStatus(status: StatusType) {
    if (status === 'success') {
        console.log(status)
        // todo...
    } else if (status === 'notfound') {
        console.log(status)
        // todo...
    } else if (status === 'error') {
        console.log(status)
        // todo...
    }
}
```

上面的代码虽然通过类型字面量的联合类型进行了判断，但是某一天要修改类型了，改成中文 `"成功"|"未找到"|"失败"`，或者直接改成数字，`200 | 404 | 500`，那么下面所有的判断都需要改。但是如果一开始就使用的是枚举，事情就简单了。就算要修改，把枚举对应的值修改了就行了。

```typescript
enum Status {
    Success = 200,
    NotFound = 404,
    Error = 500
}

function checkStatus(status: Status) {
    if (status === Status.Success) {
        console.log(status)
        // todo...
    } else if (status === Status.NotFound) {
        console.log(status)
        // todo...
    } else if (status === Status.Error) {
        console.log(status)
        // todo...
    }
}
```

### 双向映射

枚举和对象的差异还在于，**对象是单向映射的**，我们只能从键映射到键值。而**枚举是双向映射的**，即你可以从枚举成员映射到枚举值，也可以从枚举值映射到枚举成员：

```typescript
enum Direction {
    Up,
    Down,
    Left,
    Right
}
const upValue = Direction.Up
console.log(upValue) // 0
const upKey = Direction[0]
console.log(upKey) // Up
```

为什么可以这样，看一下编译后的产物就知道了

```javascript
var Direction
;(function (Direction) {
    Direction[(Direction['Up'] = 0)] = 'Up'
    Direction[(Direction['Down'] = 1)] = 'Down'
    Direction[(Direction['Left'] = 2)] = 'Left'
    Direction[(Direction['Right'] = 3)] = 'Right'
})(Direction || (Direction = {}))
const upValue = Direction.Up
console.log(upValue) // 0
const upKey = Direction[0]
console.log(upKey) // Up
```

`obj[k] = v` 的返回值即是 v，因此这里的 `obj[obj[k] = v] = k` 本质上就是进行了 `obj[k] = v` 与 `obj[v] = k` 这样两次赋值。

但需要注意的是，仅有值为数字的枚举成员才能够进行这样的双向枚举，**字符串枚举成员仍然只会进行单次映射**：

```typescript
enum Direction {
    Up = 0,
    Down = 1,
    Left = 'left',
    Right = 'right'
}
```

**编译之后**

```javascript
var Direction
;(function (Direction) {
    Direction[(Direction['Up'] = 0)] = 'Up'
    Direction[(Direction['Down'] = 1)] = 'Down'
    Direction['Left'] = 'left'
    Direction['Right'] = 'right'
})(Direction || (Direction = {}))
```

> 通过上面的代码，可以发现，**枚举类型相当特殊，既作为类型，也可以是值**。

### 枚举的一些问题

> 在 JavaScript 中，是没有 enum 枚举类型的，虽然有相关的[enum 提案](https://github.com/rbuckton/proposal-enum)，不过一直没有进展。所以对于枚举来说，实际上是有一些小坑在里面的。

比如，从上面的编译结果可以看出，枚举类型在实际运行环境中编译成了一个**立即执行函数（IIFE）**。如果是普通业务，这不是什么问题。但如果这是一个 TypeScript 写的 npm 第三方库，需要提供给别人调用，就会发现因为枚举类型变成了立即执行函数（`IIFE`），无法被 `tree shaking` 优化掉，因为这个 `IIFE` 有副作用。

当然了，一般枚举的内容也不会太多，其实影响有限，但是这确确实实是枚举存在的一个问题，特别是现在特别鼓吹 ESM 浏览器模块化的今天，这个问题可能会被放大。

还有一个问题是，由于**枚举是双向映射的**，那么，下面的代码注意观察

```typescript
enum Direction {
    Up = 0,
    Down = 1,
    Left = 2,
    Right = 3
}
console.log(Direction[0]) // Up
console.log(Direction[99]) // 不报错，undefined
```

`Direction[99]` 这样的写法，在 TypeScript 中竟然没有报错...或者这样写

```typescript
const n: number = 11
const dir: Direction = n
```

这样写，竟然也不会报错，当然这样写是能够理解的，因为有时候会使用枚举实现一些更加灵活的场景处理，比如下面的代码

```typescript
enum AttackType {
    // Decimal    // Binary
    None = 0, // 0000
    Melee = 1, // 0001
    Fire = 2, // 0010
    Ice = 4, // 0100
    Poison = 8 // 1000
}

// 一个攻击，位运算：属性 近战 | 火 | 毒
const MeleeAndFireAndPoison = AttackType.Melee | AttackType.Fire | AttackType.Poison

const attack = (attack: AttackType) => {
    console.log(attack)
}
// 这里 `MeleeAndFireAndPoison` 可以分配给类型`AttackType`
// 但是不能直接传入字面量类型的数值11
attack(MeleeAndFireAndPoison)
// 直接传入AttackType.Melee，也可以传入枚举对应的0,1,2,4,8
attack(AttackType.Melee)
```

### 常量枚举

如果希望屏蔽不安全的访问操作，可以使用**常量枚举**

```typescript
const enum Direction {
    Up = 0,
    Down = 1,
    Left = 2,
    Right = 3
}

// console.log(Direction[0]) // error 不能反向查找
console.log(Direction.Up) // 0
```

1. 常量枚举不允许反向查找
2. 常量枚举默认并不会生产任何 JavaScript 代码，而是在用到枚举成员的时候直接插入对应的值

```typescript
console.log(0 /* Direction.Up */) // 0
```

上面的常量枚举代码，编译之后就只有这么一句

### `isolatedModules`

如果在工程中使用枚举类型，务必要设置 tsconfig 的属性`isolatedModules:true`，因为有些打包工具并没有依赖 TypeScript 的`tsc`进行类型检查和类型转译，像 `esbuild` 和 `Babel`这样的工具会单独编译每个文件，因此它们无法判断导入的名称是类型还是值。所以有一些 TypeScript 的特性是容易产生错误的，比如`const enum`。这个内容在[vite](https://cn.vitejs.dev/guide/features.html#isolatedmodules)和[esbuild](https://esbuild.github.io/content-types/#isolated-modules)中都有相关的说明
