---
title: 装饰器
icon: fluent:code-ts-16-filled
order: 6
category:
    - TypeScript
---

## 理解装饰器

**装饰器（Decorator）** 是面向对象编程中的一个重要概念，在一些纯粹的面向对象语言中早已存在，在 Java 中称为**注解**，在 C# 中称为**特征**。装饰器并非 TypeScript 独有的概念，而是 JavaScript 本身就支持的功能。装饰器概念的提出时间很早，在 ES6 时期就已经被提出，但是经过近 10 年的发展，装饰器的规范经历了多次重写，至今仍未成为正式规范的一部分。截至 2024 年，装饰器规范才刚刚进入第 3 阶段。

前些年随着面向对象语言的流行，JavaScript 的装饰器也一直备受期待。不过由于 JavaScript 不仅仅局限于基于浏览器的应用程序，规范的制定者必须考虑到 JavaScript 在各种平台上的执行情况，因此规范制定进展缓慢。

随着技术的发展，现在纯前端的框架也来到了 React 18、Vue 3 的时代，这两个框架都倾向于使用更加模块化和函数式的编程风格。这种风格更有利于实现摇树优化（Tree Shaking），这是现代前端构建工具（如 Webpack、Rollup）中的一个关键特性。

不过 Angular 一直在广泛使用装饰器，还有 Node.js 流行的后端框架 NestJS 对装饰器也有很好的支持。

无论如何，装饰器的理论基础是优秀的，对于我们理解整个程序设计是有帮助的。

### 装饰器模式

在程序设计中，一直存在[装饰器模式](https://refactoringguru.cn/design-patterns/decorator)，这是一种结构设计模式，通过将对象置于包含行为的特殊包装器对象中，可以将新的行为附加到对象上。

```javascript
// 组件接口
class TextMessage {
    constructor(message) {
        this.message = message
    }

    getText() {
        return this.message
    }
}

// 装饰器基类
class MessageDecorator {
    constructor(textMessage) {
        this.textMessage = textMessage
    }

    getText() {
        return this.textMessage.getText()
    }
}

// 具体装饰器
class HTMLDecorator extends MessageDecorator {
    getText() {
        const msg = super.getText()
        return `<p>${msg}</p>`
    }
}

class EncryptDecorator extends MessageDecorator {
    getText() {
        const msg = super.getText()
        // 加密逻辑
        return this.encrypt(msg)
    }
    encrypt(msg) {
        return msg.split('').reverse().join('')
    }
}

// 使用
let message = new TextMessage('Hello World')
message = new HTMLDecorator(message)
message = new EncryptDecorator(message)

console.log(message.getText()) // 输出加密的 HTML 格式文本
```

这是面向对象的写法，在 JavaScript 中，也可以写成函数式的，因为上面的写法完全可以使用高阶函数替代：

```javascript
// 基础消息类
class TextMessage {
    constructor(message) {
        this.message = message
    }

    getText() {
        return this.message
    }
}

// 高阶函数 - HTML装饰器
function HtmlDecoratedClass(BaseClass) {
    return class extends BaseClass {
        getText() {
            const originalText = super.getText()
            return `<p>${originalText}</p>`
        }
    }
}

// 高阶函数 - 加密装饰器
function EncryptDecoratedClass(BaseClass) {
    return class extends BaseClass {
        getText() {
            const originalText = super.getText()
            // 这里应该是加密逻辑
            return this.encrypt(originalText)
        }
        encrypt(msg) {
            // 简单处理加密
            return msg.split('').reverse().join('')
        }
    }
}

// 使用装饰器
let DecoratedClass = HtmlDecoratedClass(TextMessage)
DecoratedClass = EncryptDecoratedClass(DecoratedClass)

const messageInstance = new DecoratedClass('Hello World')
console.log(messageInstance.getText()) // 输出被 HTML 格式化并加密的文本
```

### 装饰器的作用

这样可以很简单地实现装饰器的设计模式，但是这样的代码在实际工作中还是有一些问题。比如创建一个用户，然后在后期，需要对用户中的数据进行验证：

```typescript
class User {
    // 注意：严格检查(strict)不赋初始值会报错
    // 演示可以设置 strictPropertyInitialization: false
    loginId: string // 必须是3-5个字符
    loginPwd: string // 必须是6-12个字符
    age: number // 必须是0-100之间的数字
    gender: '男' | '女'
}

const u = new User()

// 对用户对象的数据进行验证
function validateUser(user: User) {
    // 对账号进行验证
    // 对密码进行验证
    // 对年龄进行验证
    // ...
}
```

实际上，这要求对类的属性都需要进行处理，这就需要进行装饰。下面的 `validateUser` 函数实际上就在处理这个问题。初看起来没有问题，但是，应该在编写类、编写属性时，对这个属性应该如何处理才是最了解的，而不是在需要验证的时候，再编写函数进行处理。

一种可能的解决方案是将 `validateUser` 函数写到类中：

```typescript
class User {
    // 注意：严格检查(strict)不赋初始值会报错
    // 演示可以设置 strictPropertyInitialization: false
    loginId: string // 必须是3-5个字符
    loginPwd: string // 必须是6-12个字符
    age: number // 必须是0-100之间的数字
    gender: '男' | '女'

    validate() {
        // 对账号进行验证
        // 对密码进行验证
        // 对年龄进行验证
        // ...
    }
}
```

这种方式虽然可行，但是并没有解决提出的问题：当编写这个类的属性时，对这个属性应该是最了解的。如果能在编写属性时就直接可以定义这些验证规则是最理想的。

另一个问题是，除了 `User` 类之外，还有其他的类需要验证，也是差不多的验证长度、是否必须填写、对这个属性的描述等等。在另外一个类中，仍然需要实现 `validate` 函数这一套。因此需要一种语法机制来处理这个问题。

装饰器就可以帮助解决这些问题：

**1. 关注点分离**：编写属性，然后再编写函数处理，实际上分离了关注点。

**2. 代码重复**：不同的类可能只是属性不一样，但是可能需要验证、分析或者处理的内容实际上差不多。

**伪代码**

```typescript
class User {
  @required
  @range(3, 5)
  @description("账号")
  loginId: string; // 中文描述：账号，验证：1.必填 2.必须是3-5个字符
  ......
}
```

这两个**问题产生的根源实际上是在定义某些信息时，能够附加的信息有限。如果能给这些信息装饰一下，添加上有用的信息，就能处理了，这就是装饰器的作用**。

所以**装饰器的作用：为某些属性、类、方法、参数提供元数据信息（metadata）**。

这里引入一个新的名词：

**元数据：描述数据的数据**。上面的伪代码中，这三个装饰器 `@required` `@range(3, 5)` `@description("账号")` 实际上就是用来描述 `loginId` 这个数据的。实际上 `meta` 这个词在其他地方也见过，在 HTML 中，`meta` 标签就是用来描述这个 HTML 文档信息的：

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- 文档编码 -->
        <meta charset="UTF-8" />
        <!-- 视口尺寸 -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body></body>
</html>
```

还有著名的公司 Facebook，改名为 Meta，这体现了这个公司名的真正含义。

## 装饰器的本质

无论如何，在 JavaScript 中，装饰器的本质是什么？虽然作用是提供元数据，但是并不是一个简单数据就能搞定的，因此**装饰器本身就是一个函数**，并且装饰器是属于 JavaScript 的，并不是简单的 TypeScript 的类型检查，是要参与运行的。

装饰器可以修饰：

-   类
-   成员（属性 + 方法）
-   参数

## tsconfig 设置

由于现在装饰器没有正式形成规范，因此，在 TypeScript 中使用装饰器，需要打开装饰器设置：

```typescript
"experimentalDecorators": true
```

## 类装饰器

类装饰器本质是一个函数，该函数接收一个参数，表示类本身（构造函数本身）。

使用装饰器 `@` 得到一个函数。

在 TypeScript 中，构造函数的表示：

-   `Function`
-   **`new (...args:any[]) => any`**

```typescript
// 定义为Function
function classDecoration(target: Function) {
    console.log('classDecoration')
    console.log(target)
}
@classDecoration
class A {}
```

```typescript
// 定义为构造函数
function classDecoration(target: new (...args: any[]) => any) {
    console.log('classDecoration')
    console.log(target)
}
@classDecoration
class A {}
```

并且**构造器是在定义这个类的时候就会运行**，而不是必须要等到 `new` 对象的时候才会执行。

从执行后的打印结果可以看出，`target` 就是这个类本身：

```text
classDecoration
[class A]
```

上面的代码，编译之后，是下面的样子：

```javascript
'use strict'
var __decorate =
    (this && this.__decorate) ||
    function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
            d
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc)
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
        return c > 3 && r && Object.defineProperty(target, key, r), r
    }
function classDecoration(target) {
    console.log('classDecoration')
}
let A = class A {}
A = __decorate([classDecoration], A)
```

实际上通过编译后的代码，就可以看到，直接运行了 `__decorate` 函数。

### 泛型约束

之前讲过泛型构造函数，所以构造函数可以写成泛型的：

```typescript
// 泛型类型别名
type constructor<T = any> = new (...args: any[]) => T
function classDecoration(target: constructor) {
    console.log('classDecoration')
    console.log(target)
}
@classDecoration
class A {}
```

这样，可以通过泛型约束，对要使用装饰器的类进行约束：

```typescript
type constructor<T = any> = new (...args: any[]) => T
type User = {
    id: number
    name: string
    info(): void
}

function classDecoration<T extends constructor<User>>(target: T) {
    console.log('classDecoration')
    console.log(target)
}
@classDecoration
class A {
    constructor(public id: number, public name: string) {}
    info() {}
}
```

装饰器实际上是个函数，可以通过像函数那样调用，甚至传参，但是现在第一个参数 `target` 被固定限制了，该如何处理呢？

### 装饰器工厂模式

可以使用**工厂模式**来轻松解决这个问题，普通函数返回一个装饰器函数即可：

```typescript
type constructor<T = any> = new (...args: any[]) => T
function classDecorator<T extends constructor>(str: string) {
    console.log('普通方法的参数:' + str)
    return function (target: T) {
        console.log('类装饰器' + str)
    }
}

@classDecorator('hello')
class A {}
```

通过工厂模式既然能够返回一个函数，那么也能返回一个类，实际上也能通过这种方式对原来的类进行修饰。

```typescript
type constructor<T = any> = new (...args: any[]) => T

function classDecorator<T extends constructor>(target: T) {
    return class extends target {
        public newProperty = 'new property'
        public hello = 'override'
        info() {
            console.log('this is info')
        }
    }
}
@classDecorator
class A {
    public hello = 'hello world'
}
const objA = new A()

console.log(objA.hello)
console.log((objA as any).newProperty) // 显然，没有类型
;(objA as any).info()
export {}
```

虽然可以这么做，但是显然，返回的新的类并不知道有新加的内容。

### 多装饰器

类装饰器不仅仅能写一个，还能写多个：

```typescript
type constructor<T = any> = new (...args: any[]) => T
function classDecorator1<T extends constructor>(str: string) {
    console.log('classDecorator1的参数:' + str)
    return function (target: T) {
        console.log('classDecorator1类装饰器' + str)
    }
}
function classDecorator2<T extends constructor>(str: string) {
    console.log('classDecorator2的参数:' + str)
    return function (target: T) {
        console.log('classDecorator2类装饰器' + str)
    }
}

@classDecorator1('1')
@classDecorator2('2')
class A {}
```

需要注意执行后的打印顺序：

```text
classDecorator1的参数:1
classDecorator2的参数:2
classDecorator2类装饰器2
classDecorator1类装饰器1
```

装饰器的执行顺序显然是**从下到上**的。

## 属性装饰器

属性装饰器也是一个函数，该函数至少需要两个参数：

**参数一：** 如果是静态属性，为类本身；如果是实例属性，为类的原型

**参数二：** 字符串，表示属性名

```typescript
function d(target: any, key: string) {
    console.log(target, key)
    console.log(target === A.prototype)
}

class A {
    @d
    prop1: string
    @d
    prop2: string
}
```

当然，属性装饰器也能写成工厂模式：

```typescript
function d() {
    return function d(target: any, key: string) {
        console.log(target, key)
    }
}

class A {
    @d()
    prop1: string
    @d()
    prop2: string
}
```

也可以传值进去：

```typescript
function d(value: string) {
    return function d(target: any, key: string) {
        target[key] = value
    }
}

class A {
    @d('hello')
    prop1: string
    @d('world')
    prop2: string
}

console.log(A.prototype)
```

**注意**，`target` 是类的原型，因此这里赋值实际上是赋值在类原型上的，而不是实例上。

**当属性为静态属性时，`target` 得到的结果是 A 的构造函数**

```typescript
function d() {
    return function d(target: any, key: string) {
        console.log(target, key)
    }
}

class A {
    @d()
    prop1: string
    @d()
    static prop2: string
}
```

> **补充：** 当尝试通过装饰器给属性赋值时，它实际上是在原型上设置了这些值，这意味着所有实例将共享这些属性值，而不是每个实例拥有自己的独立值。
>
> 如果要解决这个问题，需要确保装饰器在每个类实例创建时为实例属性赋值。这通常是通过在构造函数中设置这些属性来完成的，但是由于装饰器不能直接访问类的构造函数，可以使用一点策略来解决。
>
> 下面的做法需要设置：`"noImplicitAny": false,`
>
> ```typescript
> function d(value: string) {
>     return function (target: any, key: string) {
>         if (!target.__initProperties) {
>             target.__initProperties = function () {
>                 for (let prop in target.__props) {
>                     this[prop] = target.__props[prop]
>                 }
>             }
>             target.__props = {}
>         }
>         target.__props[key] = value
>     }
> }
>
> class A {
>     @d('hello')
>     prop1: string
>
>     @d('world')
>     prop2: string
>
>     constructor() {
>         if (typeof this['__initProperties'] === 'function') {
>             this['__initProperties']()
>         }
>     }
> }
>
> const a = new A()
> console.log(a.prop1) // Output: "hello"
> console.log(a.prop2) // Output: "world"
> ```

## 方法装饰器

方法装饰器也是一个函数，该函数至少需要三个参数：

**参数一：** 如果是静态方法，为类本身（类构造函数类型）；如果是实例方法，为类的原型（对象类型）

**参数二：** 字符串，表示方法名

**参数三：** 属性描述对象，实际上就是 JavaScript 的 `Object.defineProperty()` 中的属性描述对象 `{value:xxx,writable:xxx, enumerable:xxx, configurable:xxx}`

上节课属性也讲过参数一是这种情况。如果非要区分开静态方法和实例方法，实际上分开设置也可以：

```typescript
function d0() {
    return function d(target: Record<string, any>, key: string) {
        console.log(target, key)
    }
}
function d1() {
    return function d(target: Record<string, any>, key: string, descriptor: PropertyDescriptor) {
        console.log(target, key, descriptor)
    }
}
function d2() {
    return function d(target: new (...args: any[]) => any, key: string, descriptor: PropertyDescriptor) {
        console.log(target, key, descriptor)
    }
}

class A {
    @d0()
    prop1: string
    prop2: string
    @d1()
    method1() {}
    @d2()
    static method2() {}
}
```

为了减少讲解的麻烦，这里还是直接用 `any`：

```typescript
function d() {
    return function d(target: any, key: string, descriptor: PropertyDescriptor) {
        console.log(target, key, descriptor)
    }
}

class A {
    prop1: string
    prop2: string
    @d()
    method1() {}
}

const objA = new A()

for (let prop in objA) {
    console.log(prop)
}
```

结果：

```shell
{} method1 {
  value: [Function: method1],
  writable: true,
  enumerable: false,
  configurable: true
}
prop1
prop2
```

通过结果可以看到，方法默认并没有遍历，因为 `enumerable: false`，完全可以通过属性描述符进行修改：

```typescript
function enumerable() {
    return function d(target: any, key: string, descriptor: PropertyDescriptor) {
        console.log(target, key, descriptor)
        descriptor.enumerable = true
    }
}

class A {
    prop1: string
    prop2: string
    @enumerable()
    method1() {}
}

const objA = new A()

for (let prop in objA) {
    console.log(prop)
}
```

既然可以这么做，那么操作性就大大增加了，比如完全可以修改属性描述符的 `value` 值，让其变为执行其他的内容：

```typescript
function enumerable() {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        console.log(target, key, descriptor)
        descriptor.enumerable = true
    }
}

// 被废弃的方法
function noUse() {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        descriptor.value = function () {
            console.log('被废弃的方法')
        }
    }
}

class A {
    prop1: string
    prop2: string
    @enumerable()
    method1() {}

    @enumerable()
    @noUse()
    method2() {
        console.log('正常执行......')
    }
}

const objA = new A()

for (let prop in objA) {
    console.log(prop)
}
// 执行被废弃的方法
objA.method2()
```

甚至还能实现方法的拦截器：

```typescript
function enumerable() {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        console.log(target, key, descriptor)
        descriptor.enumerable = true
    }
}

// 被废弃的方法
function noUse() {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        descriptor.value = function () {
            console.log('被废弃的方法')
        }
    }
}

function interceptor(str: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const temp = descriptor.value
        descriptor.value = function (...args: any[]) {
            console.log('前置拦截---' + str)
            temp.call(this, args)
            console.log('后置拦截---' + str)
        }
    }
}

class A {
    prop1: string
    prop2: string
    @enumerable()
    method1() {}

    @enumerable()
    @noUse()
    method2() {
        console.log('正常执行......')
    }

    @enumerable()
    @interceptor('interceptor')
    method3(str: string) {
        console.log('正在执行 method3:' + str)
    }
}

const objA = new A()

for (let prop in objA) {
    console.log(prop)
}
// 执行被废弃的方法
objA.method2()

// 拦截
objA.method3('hello world')
```

## 访问器属性装饰器

**参数一：** 类的原型（对象类型）

**参数二：** 字符串，表示方法名

**参数三：** 属性描述对象，实际上就是 JavaScript 的 `Object.defineProperty()` 中的属性描述对象 `{set:Function,get:Function, enumerable:xxx, configurable:xxx}`

```typescript
function d(str: string) {
    return function d<T>(target: any, key: string, descriptor: TypedPropertyDescriptor<T>) {
        console.log(target, key)
        const temp = descriptor.set!
        descriptor.set = function (value: T) {
            console.log('前置', str)
            temp.call(this, value)
            console.log('后置', str)
        }
    }
}

class User {
    public id: number
    public name: string
    private _age: number

    @d('hello')
    set age(v: number) {
        console.log('set', v)
        this._age = v
    }
}

const u = new User()
u.age = 10
```

## 方法参数装饰器

方法参数装饰器几乎和属性装饰器一致，只是多了一个属性：

**参数一：** 如果是静态属性，为类本身；如果是实例属性，为类的原型

**参数二：** 字符串，表示方法名

**参数三：** 表示参数顺序

```typescript
function paramDecorator(target: any, key: string, index: number) {
    console.log(target, key, index)
}

class A {
    method1(@paramDecorator id: number, @paramDecorator name: string) {
        console.log('---', id, name)
    }
}

const objA = new A()
objA.method1(1, 'hello')
```

当然，也能写成工厂模式：

```typescript
function paramDecorator() {
    return function (target: any, key: string, index: number) {
        console.log(target, key, index)
    }
}

class A {
    method1(@paramDecorator() id: number, @paramDecorator() name: string) {
        console.log('---', id, name)
    }
}

const objA = new A()
objA.method1(1, 'hello')
```

稍微处理一下，在原型上加上属性看看效果：

```typescript
function paramDecorator(paramName: string) {
    return function (target: any, key: string, index: number) {
        !target.__params && (target.__params = {})
        target.__params[index] = paramName
    }
}

class A {
    method1(@paramDecorator('id') id: number, @paramDecorator('name') name: string) {
        console.log('---', id, name)
    }
}

const objA = new A()
console.log(A.prototype) // { __params: { '0': 'id', '1': 'name' } }
```

## [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)

`reflect-metadata` 是一个 JavaScript 库，用于在运行时访问和操作装饰器的元数据。它提供了一组 API，可以读取和写入装饰器相关的元数据信息。

上面通过自己封装函数来处理类和类成员相关的元数据，但是相关能力比较薄弱，借助 `reflect-metadata` 来提供元数据的处理能力。

### 安装

```javascript
npm install reflect-metadata
```

**`tsconfig.json` 设置**

```typescript
"experimentalDecorators": true,
"emitDecoratorMetadata": true
```

**引入**

```typescript
import 'reflect-metadata'
```

### 基本语法

#### 定义元数据

**声明性定义：**

```typescript
@Reflect.metadata(metadataKey, metadataValue)
```

```typescript
@Reflect.metadata('classType', 'A类-1')
class A {
    prop1: string
    method() {}
}
```

**命令式定义：**

```typescript
Reflect.defineMetadata(metadataKey, metadataValue, 定义元数据的对象, propertyKey?);
```

```typescript
class A {
    prop1: string
    method() {}
}

Reflect.defineMetadata('classType', 'A类-2', A)
```

#### 获取元数据

```typescript
Reflect.getMetadata(metadataKey, 定义元数据类):返回metadataValue
```

```typescript
console.log(Reflect.getMetadata('classType', A))
```

### 工厂模式

也可以将上面的处理封装为工厂模式，使用起来更加方便：

**方式 1：**

```typescript
const ClassTypeMetaKey = Symbol('classType')

function ClassType(type: string) {
    return Reflect.metadata(ClassTypeMetaKey, type)
}

@ClassType('A类-1')
class A {
    prop1: string
    method() {}
}

console.log(Reflect.getMetadata(ClassTypeMetaKey, A))
```

**方式 2：**

```typescript
type constructor<T = any> = new (...args: any[]) => T

const ClassTypeMetaKey = Symbol('classType')

function ClassType(type: string) {
    return <T extends constructor>(target: T) => {
        Reflect.defineMetadata(ClassTypeMetaKey, type, target)
    }
}

@ClassType('A类-2')
class A {
    prop1: string
    method() {}
}

console.log(Reflect.getMetadata(ClassTypeMetaKey, A))
```

### 成员属性和方法的处理

基本语法 API 都基本差不多，不过属性和方法是有两种状态的，**实例的和静态的，对应的对象分别是对象原型和类本身**：

```typescript
class A {
    // @Reflect.metadata("propType1", "prop1-value")
    prop1: string
    // @Reflect.metadata("propType2", "prop2-value")
    static prop2: string

    @Reflect.metadata('methodType1', 'method1-value')
    method1() {}

    @Reflect.metadata('methodType2', 'method2-value')
    static method2() {}
}

Reflect.defineMetadata('propType1', 'prop1-value', A.prototype, 'prop1')
Reflect.defineMetadata('propType2', 'prop2-value', A, 'prop2')

console.log(Reflect.getMetadata('propType1', A.prototype, 'prop1'))
console.log(Reflect.getMetadata('propType2', A, 'prop2'))

console.log(Reflect.getMetadata('methodType1', A.prototype, 'method1'))
console.log(Reflect.getMetadata('methodType2', A, 'method2'))
```

可以稍微封装一下，简单地得到一些想要的效果：

```typescript
const formatMetadataKey = Symbol('format')
function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString)
}
function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey)
}

class Greeter {
    @format('Hello, %s')
    greeting: string
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        let formatString = getFormat(this, 'greeting')
        return formatString.replace('%s', this.greeting)
    }
}

const objG = new Greeter('world')
// console.log(objG.greet()); // "Hello, world"

// greet封装在外面也是同样的原理
function greet(obj: any, key: string) {
    let formatString = getFormat(obj, key)
    return formatString.replace('%s', obj[key])
}

const g = greet(objG, 'greeting')
console.log(g)
```

## [class-transformer](https://www.npmjs.com/package/class-transformer)

以下介绍两个基于 [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) 元数据实现的比较有用的功能库。

[class-transformer](https://www.npmjs.com/package/class-transformer) 可以很方便地将普通对象转换为类的某些实例，这个功能在某些时候非常有用。

在很多时候，从后端获取的数据都是一些简单的 JSON 格式的数据，有些数据可能需要经过前端的再处理，如下：

```json
{
  "id": 1,
  "firstName": "Nancy",
  "lastName": "Lopez",
  "age": 35
}
```

为了简单方便，可以使用远程的 mock 模拟数据，比如 [easy mock](https://mock.mengxuegu.com/login)，直接简单登录后即可使用，使用过程就两步：

1. 创建项目
2. 创建接口

更复杂的情况可以参考网站的文档。

可以创建如下的简单数据：

```json
{
  code: 200,
  "data|10": [{
    "id|+1": 1,
    "firstName": "@first",
    "lastName": "@last",
    "age|9-45": 1
  }],
  msg: "成功"
}
```

从后端获取的是上面的数据，可能前端还需要一些功能，比如获取全名，比如判断是否成年，可以创建一个类进行封装处理：

```typescript
class User { 
  id: number
  firstName: string
  lastName: string
  age: number
  
  getFullName() { 
    return this.firstName + " "+ this.lastName;
  }

  isAdult() { 
    return this.age > 18 ? "成年人" : "未成年人";
  }
}

// 模拟数据返回格式
interface Result<T> {
  code: number;
  data: T;
  msg: string
}
```

在获取数据时，**如果直接获取的就是简单 JSON 数据，虽然没什么影响，但是不能访问自己封装的函数**：

```typescript
fetch("https://mock.mengxuegu.com/mock/65b1f3d1c4cd67421b34cd0c/mock_ts/list")
  .then(res => res.json())
  .then( (res:Result<User[]>) => { 
    console.log(res.code);
    console.log(res.msg);

    const users = res.data;

    for (const u of users) {
      console.log(u.id + " " + u.firstName);
      // console.log(u.id + " " + u.getFullName() + " " + u.isAdult()); //error
    }
  })
```

这里，就可以使用 `class-transformer`，它可以自动地将数据和封装的类进行映射，使用也非常简单：

```typescript
import "reflect-metadata"
import { plainToInstance } from 'class-transformer';

fetch("https://mock.mengxuegu.com/mock/65b1f3d1c4cd67421b34cd0c/mock_ts/list")
  .then(res => res.json())
  .then( (res:Result<User[]>) => { 
    console.log(res.code);
    console.log(res.msg);

    const users = res.data;
    const us = plainToInstance(User, users);

    for (const u of us) {
      // console.log(u.id + " " + u.firstName);
      console.log(u.id + " " + u.getFullName() + " " + u.isAdult());
    }
  })
```

这样就正常地获取了 `User` 类所修饰的内容。

## [class-validator](https://www.npmjs.com/package/class-validator)

这个库同样是基于 [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) 元数据实现的比较有用的功能库，从名字就可以看出，这个库可以用来对类进行验证。

这个库使用也非常简单，基本上了解两步就可以了：

1. 相关装饰器的绑定
2. 验证方法的调用

```typescript
import "reflect-metadata";
import { validate, IsNotEmpty, Length, Min, Max, IsPhoneNumber } from "class-validator";

class User {
  @IsNotEmpty({ message: "账号不能为空" })
  @Length(3, 5, { message: "账号必须是3-5个字符" })
  loginId: string; 

  @Min(9)
  @Max(45)  
  age: number;

  @IsPhoneNumber("CN")
  tel: string;
}

const u = new User();

validate(u).then(errors => { 
  console.log(errors)
})
```
