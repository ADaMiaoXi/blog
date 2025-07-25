---
title: 类型编程
icon: fluent:document-ts-16-regular
order: 4
category:
    - TypeScript
---

## 索引签名（映射）类型

```typescript
type User = {
    name: string
    age?: number
    sex?: string
}
```

在前面的代码中，我们可以通过修饰符 `?` 来限定属性值，但最多只能包含 `name`、`age` 和 `sex` 这三个属性，实际上只涉及 `age` 和 `sex` 这两个属性是否定义的问题。

如果希望在 TypeScript 中动态添加属性，仍然存在限制。此时可以借助**索引签名类型（Index Signatures）**来解决这个问题。

```typescript
type User = {
    [key: string]: string
}
const user: User = {
    name: 'hayes',
    sex: '男'
}
```

> `[key:T]:U` 这种写法称为索引签名，相当于通过这种简单的方式告诉 TypeScript，指定的对象可能有更多的键。其基本含义是："在这个对象中，类型为 `T` 的键，对应的值为 `U` 类型"

在这个例子中，我们声明的键的类型为 `string`（`[key: string]`），这意味着在实现这个类型结构的变量中**只能声明字符串类型的键**。

但由于 JavaScript 中，对于 `user[prop]` 形式的访问会将**数字索引访问转换为字符串索引访问**，也就是说，`user[123]` 和 `user['123']` 的效果是一致的。因此，在字符串索引签名类型中仍然可以声明数字类型的键。同样地，`symbol` 类型也是如此：

```javascript
const user: User = {
    name: 'hayes',
    sex: '男',
    123: '123',
    [Symbol('a')]: 'symbol'
}
```

索引签名类型也可以和具体的键值对类型声明并存，但是需要注意，**具体的键值类型也需要符合索引签名类型的声明**：

```typescript
type User = {
    [key: string]: string
    name: string
    // age:number //error
}
```

如果希望这里的 `age` 不报错，上面的索引签名类型**可以使用联合类型**：

```typescript
type User = {
    [key: string]: string | number | symbol | undefined
    name: string
    age: number
}
```

> 索引签名类型最常见的使用场景是在重构 JavaScript 代码时或者创建类型声明时，为内部属性较多的对象声明一个 `any` 的索引签名类型，以此来暂时支持**对类型未明确属性的访问**

```typescript
type AnyTypeHere = {
    [key: string]: any
}
```

此外，之前必须声明属性明确的对象字面量类型，这对于某些时候声明一个空对象并不友好，但又不能直接声明对象为 `obj`，此时索引签名类型就非常适合这种场景。

```typescript
type AnyTypeHere = {
    [key: string]: any
}

let obj: AnyTypeHere = {
    name: 'jack',
    age: 13
}
```

实际上，TypeScript 也专门提供了一个类似的工具类型 [Record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)，方便这种情况的使用。

## `keyof`

`keyof` 操作符可以将对象中的所有键转换为对应字面量类型，然后再组合成联合类型。

```typescript
type User = {
    id: number
    name: string
    age: number
}

type UserKeys = keyof User // keyof User = 'id' | 'name' | 'age'
```

在 VS Code 中悬浮鼠标只能看到 `keyof User`，看不到其中的实际值，可以这样处理：

```typescript
type UserKeys = keyof User & {} // "id" | "name" | "age"
```

甚至可以结合 `typeof`，直接从一个对象上获取该对象键的所有联合类型：

```typescript
const user = {
    id: 1,
    name: 'hayes',
    age: 19
}
type UserKeys = keyof typeof user // "id" | "name" | "age"
```

也可以和方括号运算符结合使用：

```typescript
type Person = {
    age: number
    name: string
    sex: boolean
}

// number|string|boolean
type A = Person[keyof Person]
```

结合泛型、方括号运算符以及 `extends` 受限的泛型，可以直接重写之前在重载中编写过的代码：

```typescript
type TagName = keyof HTMLElementTagNameMap

function createElement<T extends TagName>(tag: T): HTMLElementTagNameMap[T] {
    return document.createElement(tag)
}

const a = createElement('a') // ok
```

## `in` 运算符遍历

前面讲过 `in` 运算符在 TypeScript 中可以用来检查属性，在控制流中实现对类型的守卫。

除了类型守卫的作用，`in` 运算符还能遍历联合类型的每一个成员类型：

```typescript
type U = 'a' | 'b' | 'c'

type Foo = {
    [key in U]: string
}
// 等同于
// type Foo = {
//   a: string,
//   b: string,
//   c: string
// };
```

上面讲解 `keyof` 的时候，使用了这样的写法：

```typescript
type A = keyof Person
```

那么完全可以将 `keyof` 放入到索引中使用：

```typescript
type User = {
    readonly id: number
    name: string
    tel: string
    address?: string
}

type CopyUser = {
    [key in keyof User]: User[key]
}

const u: CopyUser = {
    id: 1,
    name: 'aaa',
    tel: '123456',
    address: 'beijing'
}
```

现在固定了 `keyof User`，那么可以使用泛型来增加通用性：

```typescript
type Copy<T> = {
    [key in keyof T]: T[key]
}

const u: Copy<User> = {
    id: 1,
    name: 'aaa',
    tel: '123456',
    address: 'beijing'
}

type Animal = {
    name: string
    age: number
    color: string
    type: string
}

const dog: Copy<Animal> = {
    name: 'jack',
    age: 3,
    color: 'black',
    type: 'dog'
}
```

> **注意：** **`keyof T`** 结合得到的是一个联合类型 `string | number | symbol`，因为 `T` 是泛型，无法确定 `T` 类型的每个键的具体类型，可以查看 `keyof any` 的结果
>
> `[key in keyof T]` 这样写没有问题，但是如果后面要和 `as`、模板字符串类型连用的话，需要注意类型的转换，最好直接让键为 `string` 类型
>
> `[key in keyof T & string]`

## 类型编程的理解

### 属性修饰符

类型编程的代码已经逐步过渡为对泛型的处理：

```typescript
type User = {
    readonly id: number
    name: string
    tel: string
    address?: string
}

type CopyUser = {
    [key in keyof User]: User[key]
}

type Copy<T extends object> = {
    [key in keyof T]: T[key]
}
```

上面的 `Copy<T>` 类型只需要稍作修改，就能成为一个很有用的新类型别名：

```typescript
type MyReadonly<T> = {
    readonly [key in keyof T]: T[key]
}
```

只是在之前的代码签名前加了 `readonly`，这个类型别名就能实现将传递的类型 `T` 的所有属性变为 `readonly`：

```typescript
type User = {
    readonly id: number
    name: string
    tel: string
    address?: string
}

type MyReadonly<T> = {
    readonly [key in keyof T]: T[key]
}

type ReadonlyUser = MyReadonly<User>

const u: ReadonlyUser = {
    id: 1,
    name: 'jack',
    tel: '135678',
    address: 'beijing'
}

u.id = 2 // error 无法分配到 "id" ，因为它是只读属性
u.name = 'tom' // error 无法分配到 "name" ，因为它是只读属性
```

或者直接在后面加上 `?`，就能将原来类型中所有的属性变为可选：

```typescript
type MyPartial<T> = {
    [key in keyof T]?: T[key]
}

type OptionalUser = MyPartial<User>

const u: OptionalUser = {
    id: 1,
    name: 'jack'
}
```

`MyReadonly` 是 [`Readonly<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype) 的具体实现。

`MyPartial` 是 [`Partial<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) 的具体实现。

实际上，这种在现有类型的基础上创建新类型的方式，在 TypeScript 中有专门的称呼：**映射类型（Mapped Types）**。与索引签名类型很类似，差别在于**索引签名**用于定义对象可以有哪些类型的键和值，适用于属性名未知或动态的情况。**映射类型**则允许在现有类型的基础上创建新的类型，通过对原始类型的属性进行转换或应用修饰符，来满足更具体的类型设计需求。

### 修饰操作符 `+`，`-`

实际上，上面的 `readonly` 与 `?` 的写法是简写，完整的写法应该是给原来的类型**加上 `readonly`**，给原来的类型**加上 `?`**：

-   `+` 修饰符：写成 `+?` 或 `+readonly`，为映射属性添加 `?` 修饰符或 `readonly` 修饰符。

```typescript
type MyReadonly<T> = {
    +readonly [key in keyof T]: T[key]
}

type MyPartial<T> = {
    [key in keyof T]+?: T[key]
}
```

既然有 `+`，那就有 `-`：

-   `–` 修饰符：写成 `-?` 或 `-readonly`，为映射属性移除 `?` 修饰符或 `readonly` 修饰符。

```typescript
type MyRequired<T> = {
    -readonly [key in keyof T]-?: T[key]
}
const u: MyRequired<User> = {
    id: 1,
    name: 'jack',
    tel: '135678',
    address: 'beijing' // 不写现在会报错，因为已经移除了可选属性
}
u.id = 2 // ok,因为已经移除了只读属性
```

### 泛型编程的理解

在 JavaScript 编程中，处理一个值并返回一个新的值时，通常使用函数：

```typescript
function myPartial(type){
  const newType = getOptional(type);
  ......
  return newType
}
const type = {xxxxxx};
const newType = myPartial(type);
```

上面的伪代码使用函数无非就两步：

1. 声明函数，传入参数
2. 调用函数，获取到新的返回值

**如果操作类型，也能像 JavaScript 的函数处理一样，操作旧类型，然后得到新的类型**，那就很方便了。

```typescript
// 可以当做是函数，可以接受任意类型。
// 由于这里的 "Type" 是形参，因此叫什么名字都无所谓，和函数的形参名是一个意思。
type MyPartial<Type> = { todos... }
// 可以当做是函数调用，调用的时候传入了具体的类型 User
// 返回了新的类型 PartialedUser
type PartialedUser = MyPartial<User>
```

两者的相似性如下：

**声明的时候**

![](../../../../.vuepress/public/assets/images/web/language/typeScript/type-programing/image-20231228173727324.png)

**调用的时候**

![](../../../../.vuepress/public/assets/images/web/language/typeScript/type-programing/image-20231228174036872.png)

最后只需要将声明中 `{todos...}` 相关语法，换成 TypeScript 的语法即可：

```typescript
type MyPartial<T> = {
    [key in keyof T]?: T[key]
}
```

基于这个理论，回顾之前的映射类型，编写了这样的代码：

```typescript
type AnyTypeHere = {
    [key: string]: any
}
```

这样写存在一定缺陷，固定了键的类型，而且值的类型是 `any`。如前面介绍的 `Record` 工具的用法，可以通过 `Record` 工具来帮助定义需要的泛型。这个简单工具，也可以自己实现。

```typescript
// 对于 JavaScript 来说，对值操作
function MyRecord(key,value){
  // todos...
  return {....}
}
```

```typescript
// 对于 TypeScript 来说，对类型操作
type MyRecord<K,V> = {
  // todos......
}
// K 需要限定类型，而 V 传入什么类型，就应该是什么类型。这样实现起来就比较简单了。
type MyRecord<K extends string | number | symbol,V> = {
  [key in K]:V
}

```

## 关联泛型

如果现在希望实现这么一个效果，在原有对象类型的属性上进行挑选，根据挑选属性的结果，形成新的类型：

```typescript
type User = {
    readonly id: number
    name: string
    tel: string
    address?: string
}

// 比如挑选name和tel属性,形成下面的类型

type UserPick = {
    name: string
    tel: string
}
```

```typescript
type MyPick<T, K extends keyof T> = {
    [key in K]: T[key]
}

type Admin = MyPick<User, 'name' | 'tel'>

const u: Admin = {
    name: 'aaa',
    tel: '123456'
}
```

**关键点在于：**

1. 确定需要的泛型参数个数
2. 第二个泛型参数的类型应该来源于第一个参数

## 方括号运算符常见操作

### 获取值的类型

```typescript
type User = {
    readonly id: number
    name: string
    tel: string
    address?: string
}

// type ValueType = User['id' | 'name'];
type ValueType = User[keyof User]

// 泛型
type MyReadonly<T> = {
    +readonly [key in keyof T]: T[key]
}
```

数组同样可以处理：

```typescript
const arr = ['admin', 'user', 'client']
type ArrType = (typeof arr)[number] // string
```

将上面的数组通过 `as const` 转为只读元组类型之后，得到的是具体字面量类型的联合：

```typescript
const arr = ['admin', 'user', 'client'] as const
type ArrType = (typeof arr)[number] // "admin" | "user" | "client"
```

同样，我们也能写成泛型工具：

```typescript
type ArrType<T extends readonly any[]> = T[number]
type A = ArrType<['admin', 'user', 'client']>
```

### 获取数组的长度

可以通过 `['length']` 获取元组类型的具体长度 `number` 字面量类型。注意如果仅仅是数组，只能获取 `number` 类型：

```typescript
const arr = ['admin', 'user', 'client'] as const
type Len = (typeof arr)['length']
let n: Len = 3
```

同样也能写成泛型工具：

```typescript
type ArrLen<T extends readonly any[]> = T['length']
type B = ArrLen<[1, 2, 3, 4, 5, 6]> //6
```

### 结合泛型使用扩展运算符

比如现在希望编写一个泛型工具，实现两个元组类型的拼接：

```typescript
type Result = Concat<[1, 2], [3, 4]> //[1,2,3,4]
```

初看起来没有思路，但实际上 TypeScript 和 JavaScript 一样，支持 `...` 扩展运算符：

```typescript
type Concat<T extends any[], U extends any[]> = [...T, ...U]
type C = Concat<[1, 2, 3, 4], ['a', 'b', 'c']>
```

## 条件类型与类型兼容性

条件类型是 TypeScript 中非常强大的功能，看起来有点像 JavaScript 中的条件表达式（`条件 ? true 表达式 : false 表达式`）：

> SomeType extends OtherType ? TrueType : FalseType
>
> 当 `extends` 左边的类型可以赋值给右边的类型时（`extends` 左边的类型与右边兼容时），你将获得第一个分支（"true" 分支）中的**类型**；否则你将获得后一个分支（"false" 分支）中的**类型**。

首先需要解释为什么使用 `extends`，而不是 `===` 或者其他运算符。

> 这是因为在类型层面中，对于能够进行赋值操作的两个变量，我们**并不需要它们的类型完全相等，只需要具有兼容性**，而两个完全相同的类型，其 `extends` 自然也是成立的。

```typescript
type T = 1 extends number ? true : false // true
```

在实际操作中，经常会使用条件类型来判断一个类型和另一个类型是否兼容：

```typescript
type T1 = 1 extends number ? true : false // true
type T2 = '1' extends number ? true : false // false
type T3 = string extends object ? true : false // false
type T4 = {a: 1} extends object ? true : false // true
type T5 = {a: 1; b: 2} extends {a: 1} ? true : false // true
type T6 = {a: 1} extends {a: 1; b: 2} ? true : false // false
type T8 = string extends {} ? true : false // true
```

可以自行测试类型兼容性。

但是，下面的代码会让人产生困惑：

```typescript
type T9 = {} extends object ? true : false // true
type T10 = object extends {} ? true : false // true
type T11 = {} extends Object ? true : false // true
type T12 = Object extends {} ? true : false // true
type T13 = Object extends object ? true : false // true
type T14 = object extends Object ? true : false // true
```

这三个建议不需要细究，知道它们有这个问题：你中有我，我中有你。这是**TypeScript "系统设定"**的问题。

记住这个图：

> **原始类型 < 原始类型对应的装箱类型 < Object 类型**

还有更神奇的：

```typescript
type T15 = string extends any ? true : false // true
type T16 = Object extends any ? true : false // true
type T17 = Object extends unknown ? true : false // true

type T18 = any extends Object ? 1 : 2 // 1 | 2
type T19 = any extends 'Hello' ? 1 : 2 // 1 | 2

type T20 = unknown extends any ? 1 : 2 // 1
type T21 = any extends unknown ? 1 : 2 // 1
```

这种表现较为特殊。实际上，这是因为**TypeScript "系统设定"**的原因，因为 `any` 从系统底层的意义来说，就是为了保证和 JavaScript 的兼容性存在的。不需要深究。记住 **`any`/`unknown`** 是所有类型的顶层类型即可。

需要注意的是，`never` 类型是所有类型的子类型：

```typescript
type T22 = never extends 'Hello' ? true : false // true
type T23 = 'Hello' extends never ? true : false // false
```

## 条件类型与泛型

条件类型可以和泛型结合，组合出很多类型编程相关的处理。

可以定义一个泛型类型 `IsString`，根据 `T` 的类型，判断返回的具体类型是 `true` 还是 `false`：

```typescript
type IsString<T> = T extends string ? true : false

type A = IsString<string> // true
type B = IsString<number> // false
type C = IsString<'abc'> // true
type D = IsString<123> // false
```

再来有下面的题目：

实现一个 `IF` 类型，它接收一个条件类型 `C`，一个判断为真时的返回类型 `T`，判断为假时的返回类型 `F`。`C` 只能是 `true` 或者 `false`，`T` 和 `F` 可以是任意类型。

```typescript
type A = If<true, 'a', 'b'> // 'a'
type B = If<false, 'a', 'b'> // 'b'
```

这就非常简单了：

```typescript
type If<C extends boolean, T, F> = C extends true ? T : F
```

> 若位于 `extends` **右侧的类型**包含位于 `extends` **左侧的类型**（即**狭窄类型 extends 宽泛类型**）时，结果为 `true`，反之为 `false`。
>
> 这对于基础类型和字面量类型来说很容易分辨。如果是对象呢？
>
> **当 `extends` 作用于对象时，若在对象中指定的 key 越多，则其类型定义的范围越狭窄**。对象字面量的兼容性问题是一直提及的，需要注意。

上面这句话，实际上之前在受限的泛型中已经感受过了：

```typescript
type ObjLength = {
    length: number
}

function getObjLength<T extends ObjLength>(obj: T) {
    return obj
}
getObjLength('Hello World')
getObjLength([1, 2, 3])
getObjLength({id: 1, length: 2})
```

函数中传入的泛型 `T` 只要拥有 `length: number` 属性，就兼容。在条件类型中同样适用：

```typescript
type Result = {a: string; b: boolean} extends {a: string} ? true : false // true
```

`extends` 左边的对象字面量类型 `{ a: string, b: boolean }` 拥有两个属性，右边的对象字面量类型 `{ a: string }` 只有一个属性，左边有更多的属性，并且和右边有一样的属性 `{ a: string }`。那么就可以说对象字面量类型 `{ a: string, b: boolean }` 和 `{ a: string }` 类型兼容，因此上面的 `Result` 的类型为 `true`。

上面的代码中编写过这样的代码：

```typescript
type Message<T extends {message: unknown}> = T['message']

const person = {
    id: 1,
    message: 'hello'
}

type PersonMessage = Message<typeof person>
```

如果没有 `message` 类型，现在这里的代码 TypeScript 会提示报错，也能通过判断让其获取其他类型：

```typescript
type Message<T> = T extends {message: unknown} ? T['message'] : never

const person = {
    id: 1
    // message:"hello"
}

type PersonMessage = Message<typeof person> // never
```

例如还能根据方括号运算符的特点，直接提取数组的类型：

```typescript
type Flatten<T> = T extends any[] ? T[number] : T

type Str = Flatten<string[]> // string
type Num = Flatten<number[]> // number

const arr = [
    {id: 1, name: 'aaa'},
    {id: 2, name: 'bbb'},
    {id: 3, name: 'ccc'}
]

// 对象字面量类型 {id: number, name: string}
type A = Flatten<typeof arr>
```

下面编写一个相对复杂的写法：

```typescript
type GetType<T> = T extends string
    ? 'string'
    : T extends number
    ? 'number'
    : T extends bigint
    ? 'bigint'
    : T extends boolean
    ? 'boolean'
    : T extends symbol
    ? 'symbol'
    : T extends undefined
    ? 'undefined'
    : T extends null
    ? 'null'
    : T extends any[]
    ? 'array'
    : T extends Function
    ? 'function'
    : 'object'

type T0 = GetType<string> // "string"
type T1 = GetType<123n> // "bigint"
type T2 = GetType<true> // "boolean"
type T3 = GetType<() => void> // "function"
type T4 = GetType<[]> // "array"
type T5 = GetType<{}> // "object"
type T6 = GetType<null> // "null"
```

进一步增加难度：**实现泛型工具 Merge**

将两个类型合并成一个类型，第二个类型的键会覆盖第一个类型的键。

```typescript
type foo = {
    name: string
    age: string
}

type bar = {
    age: number
    sex: string
}

type Result = Merge<foo, bar>
//type Result = {
//  name: string;
//  age: number;
//  sex: string;
//}
```

```typescript
type Merge<F, S> = {
    // 遍历所有的 key,联合类型默认会去重
    [P in keyof F | keyof S]: P extends keyof S // 如果P包含在keyof S中
        ? // 直接取后者的值的类型，保证后者类型覆盖前者
          S[P]
        : // 如果是前者的属性
        P extends keyof F
        ? // 返回前者的类型
          F[P]
        : // 不会走到这一流程
          never
}
```

## 分布（分发）式条件特性

条件类型在结合**联合类型 + 泛型**使用时，会触发分布式条件特性：

| 分布式条件类型             | 等价于                     |
| -------------------------- | -------------------------- | --------------------------- | --------------------------- | -------------------------- | ---------------------------- |
| `string extends T ? A : B` | `string extends T ? A : B` |
| `(string                   | number) extends T ? A : B` | `(string extends T ? A : B) | (number extends T ? A : B)` |
| `(string                   | number                     | boolean) extends T ? A : B` | `(string extends T ? A : B) | (number extends T ? A : B) | (boolean extends T ? A : B)` |

在前面的内容中编写过这样的类型工具：

```typescript
type IsString<T> = T extends string ? true : false

type A = IsString<string> // true
type B = IsString<number> // false
type C = IsString<'abc'> // true
type D = IsString<123> // false
```

如果传入的 `T` 是一个联合类型，那么就会触发分布式特性：

```typescript
type IsString<T> = T extends string ? 1 : 2
type E = IsString<'a' | true | 1> // 1 | 2
```

可以写得更灵活一些。比如定义下面的类型：

```typescript
type MyInclude<T, U> = T extends U ? T : never
```

可以这样使用：

```typescript
type A = 'a' | 'b' | 'c'
type B = 'a' | 'b'
type C = MyInclude<A, B> // a | b
```

实际上 `MyInclude` 完成了类似于下面的操作：

```typescript
type C = MyInclude<'a', 'a' | 'b'> | MyInclude<'b', 'a' | 'b'> | MyInclude<'c', 'a' | 'b'>
```

可以替换为具体的定义来理解一下：

```typescript
type C =
    | ('a' extends 'a' | 'b' ? 'a' : never)
    | ('b' extends 'a' | 'b' ? 'b' : never)
    | ('c' extends 'a' | 'b' ? 'c' : never)
```

这样其实得到结果：

```typescript
type C = 'a' | 'b' | never
```

最后根据 `never` 的特性，直接省略掉，得到最后的结果：

```typescript
type C = 'a' | 'b'
```

上面 `MyInclude` 这个代码例子实际上完全可以反过来，又形成另外一个类型：

```typescript
type MyExclude<T, U> = T extends U ? never : T

type A = 'a' | 'b' | 'c'
type B = 'a' | 'b'
type C = MyExclude<A, B> // c
```

可以按照上面的步骤，自行分析一下。

`MyInclude` 实际上是 [Extract<Type, Union>](https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union) 工具类型的实现。

`MyExclude` 实际上是 [Exclude<UnionType, ExcludedMembers>](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers) 工具类型的实现。

根据 [Exclude<UnionType, ExcludedMembers>](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers) 和 [Pick<Type, Keys>](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys) 工具还能实现和 [Pick<Type, Keys>](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys) 工具相反的效果：

```typescript
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```

```typescript
type Foo = {
    name: string
    age: number
}

type Bar = MyOmit<Foo, 'age'> //{ name: string }
```

`MyOmit` 的实现，其实就是 [Omit<Type, Keys>](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys) 工具类型的实现。

这几个工具，可以做个案例来练习一下。比如有如下对象字面量类型：

```typescript
type User = {
    id: number
    name: string
    age: number
    tel: string
    address: string
}
```

现在希望实现一个工具类型，将选择键名设置为可选。例如，如果设置 `age`、`tel` 和 `address`，那么经过工具类型转换之后，上面的类型别名就会变为：

```typescript
type User = {
    id: number
    name: string
    age?: number
    tel?: string
    address?: string
}
```

```typescript
// type RequiredPick = Omit<User, "age"|"tel"|"address">
// type PartialPick = Partial<Pick<User, "age" | "tel" | "address">>

// type OptionalPick = RequiredPick & PartialPick
// let user: OptionalPick = {
//   id: 1,
//   name: "John",
// }

type OptionalPick<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

let user: OptionalPick<User, 'address' | 'age' | 'tel'> = {
    id: 1,
    name: 'John'
}
```

最后，**触发分布式条件类型需要注意两点：**

1. 类型参数需要通过泛型参数的方式传入，也就是下面这种直接写死的是不行的：

```typescript
// 始终都是"no"
type A = string | number | boolean extends string | number ? 'yes' : 'no'
```

2. 类型参数需要是一个联合类型，并且条件中的泛型参数不能被包裹。比较下面两个结果的区别：

```typescript
type B<T> = T extends any ? T[] : never
type C<T> = [T] extends any ? T[] : never

type D = B<string | number> // string[] | number[]
type E = C<string | number> // (string | number)[]
```

## 映射类型的属性过滤

上面通过 `Pick` + `Exclude` 实现了 `Omit` 类型工具，那么能不能完全自己实现，不借助已有的类型工具呢？也可以，不过需要掌握一个技巧：通过 `as` + `never` 实现属性过滤的效果。

```typescript
type User = {
    readonly id: number
    name: string
    tel: string
    address?: string
}

type MyOmit<T, K extends keyof T> = {
    [P in keyof T as P extends K ? never : P]: T[P]
}

type A = MyOmit<User, 'tel' | 'address'> //  {readonly id: number; name: string}
```

在例子中，映射 `K in keyof T` 获取类型 `T` 的每一个属性以后，后面紧跟着 `as` 实际上是可以为键重新映射命名的。

不过现在，它的键名重映射 `as P extends K ? never : P`，使用了条件运算符，又会触发分布式处理：

> `"id"` ---> `"tel" | "address"` ? `never` : `"id"`
>
> `"name"` ---> `"tel" | "address"` ? `never` : `"name"`
>
> `"tel"` ---> `"tel" | "address"` ? `never` : `"tel"`
>
> `"address"` ---> `"tel" | "address"` ? `never` : `"address"`
>
> `"id" | "name" | never | never` ---> `"id" | "name"`

还能再升级一下，例如：只保留 `User` 值类型是 `string` 类型的，生成新的类型：

```typescript
type PickStringValueType<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K]
}
type FilteredUser = PickStringValueType<User> //{name:string, tel:string}
```

同样，如果想反过来，去掉值类型是 `string` 类型的，将 `K` 和 `never` 换个位置即可。

实际上，上面做得更加通用一些，就完全可以写成一个类型工具：

```typescript
type PickByType<T, U> = {
    [P in keyof T as T[P] extends U ? P : never]: T[P]
}

type B = PickByType<User, number> // { readonly id: number }
```

## `infer`

通过使用 `infer` 关键字，还可以在**条件类型中声明泛型类型**。

```typescript
// type Flatten<T> = T extends any[] ? T[number] : T;
type Flatten<T> = T extends (infer U)[] ? U : T
type T1 = Flatten<number[]> // number
type T2 = Flatten<string> // string
const arr = [
    {id: 1, name: 'aaa'},
    {id: 2, name: 'bbb'},
    {id: 3, name: 'ccc'}
]

// 对象字面量类型 {id: number, name: string}
type T3 = Flatten<typeof arr>
```

对比之前方括号运算符 `T[number]`，实际上使用 `infer` 关键字之后，类型代码更易读了。如果对方括号运算符不是那么熟悉，`T[number]` 的写法本身就很具有迷惑性。

`infer`，意为推断，如 `infer U` 中 `U` 就表示**待推断的类型**。完全可以先把这里的 `infer U` 看做 `any`，当执行时，TypeScript 推导出具体的类型，并将类型赋值给 `U`。

比如，希望获取数组第一个元素的类型：

```typescript
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type F1 = First<arr1> // 'a'
type F2 = First<arr2> //  3
```

可以通过 `infer` 进行推断，把第一个元素和其他元素分开，再连成一个数组即可。

```typescript
type First<T extends any[]> = T extends [infer F, ...infer R] ? F : never
```

此外，也可以用 `T[K]`，使用方括号运算符：

```typescript
type First<T extends any[]> = T extends [] ? never : T[0]
```

`T[0]` 实际上就是获取第 0 个位置上元素的类型。这里判断 `T` 和一个空元组的兼容性，也就是 `T` 不是一个空元组，那就得到第 0 个位置上元素的类型。

实际上还能有下面的写法：

```typescript
type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
```

`T['length']` 可以获取 `length` 属性的类型，实际上也就是数组长度。不是 0 的话，得到第 0 个位置上元素的类型。

```typescript
type ArrayLength<T extends any[]> = T['length']

type L1 = ArrayLength<arr1> // 3
```

继续，交换元组两个位置上的类型：

```typescript
type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T

type S1 = Swap<[1, 2]> // 符合元组结构，首尾元素替换[2, 1]
type S2 = Swap<[1, 2, 3, 4]> // 不符合元组结构，直接返回原数组[1,2,3,4]
```

同样，如果希望无论如何数组的首位都进行交换，加上 **`...` 操作符**即可：

```typescript
type Swap<T extends any[]> = T extends [infer A, ...infer Rest, infer B] ? [B, ...Rest, A] : T
```

同样，函数也能进行推断：

```typescript
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never

// string
type A = GetReturnType<() => string>
// void
type B = GetReturnType<(n: number) => void>
// number
type C = GetReturnType<() => number>
```

`GetReturnType` 实际上是 [`ReturnType<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype) 的具体实现。

## 模板字符串类型

TypeScript 字符串模板类型的写法跟 JavaScript 模板字符串非常类似：

```typescript
type World = 'world'
type Greeting = `hello ${World}`
```

除了前面的 `type` 跟 JavaScript 不一样之外，后面就是一模一样了。通过 `${}` 包裹，里面可以直接传入类型变量，使用变量的模板字符串可以实现意想不到的效果。

```typescript
type Direction = 'left' | 'right' | 'top' | 'bottom'
type BoxName = 'padding' | 'margin' | 'border'
type BoxModel = `${BoxName}-${Direction}`
```

使用模板字符串，联合类型会被挨个组合到模板中，最后轻松地生成一个包含各种组合的联合类型。

使用对象也能处理一些更多的内容：

```typescript
const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30
}

type PersonKeys = keyof typeof person

type EventPersonChange = `${PersonKeys}Changed`

// 泛型处理
// keyof T 默认会认为对象的键有string|number|symbol
// keyof T & string 相当于 (string|number|symbol) & string ---> string
type EventObjectChange<T> = `${keyof T & string}Changed`

type P = EventObjectChange<typeof person>
```

加入映射类型：

```typescript
type A = {
    foo: number
    bar: number
}

type B = {
    [K in keyof A as `${K}ID`]: number
}

// 等同于
// type B = {
//   fooID: number;
//   barID: number;
// }
```

但是如果想做得通用一点，也就是和泛型结合，会遇到问题：

```typescript
// 结合泛型使用，由于keyof T得到的是一个联合类型，不能直接用于模板字符串拼接
// 需要使用 交叉类型 &，去掉其他类型，只保留字符串类型
type AddID<T> = {
    [K in keyof T as `${K & string}ID`]: number
}

type D = AddID<A>
```

TypeScript 官方也提供了很多内置的字符串工具 [Intrinsic String Manipulation Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#intrinsic-string-manipulation-types)，根据名字大概也能猜测出意思：

```typescript
type World = 'world'
type Greeting = `hello ${World}`

type UpperCaseGreeting = Uppercase<Greeting> // `HELLO ${Uppercase<World>}`;
// type Greeting = "HELLO WORLD"

type LowerCaseGreeting = Lowercase<Greeting>
// type LowerCaseGreeting = "hello world"

type CapitalizeGreeting = Capitalize<LowerCaseGreeting>
// type CapitalizeGreeting = "Hello world"

type UnUpperCaseGreeting = Uncapitalize<UpperCaseGreeting>
// type CapitalizeGreeting = "hELLO WORLD"
```

这还仅仅是字符串模板的初级使用。结合泛型编程，可以玩出很多花样。

例如提供一个对象字面量类型，通过字符串模板直接得到 `Getter` 和 `Setter` 类型：

```typescript
type User = {name: string; age: number; address: string}

type AddGetter<T> = {
    [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K]
}

type AddSetter<T> = {
    [K in keyof T as `set${Capitalize<K & string>}`]: (arg: T[K]) => void
}

type UserGetter = AddGetter<User>
type UserSetter = AddSetter<User>
```

还可以处理得更通用一些：

```typescript
type ObjectWithGetterSetter<T extends object> = T & AddGetter<T> & AddSetter<T>

type UserWithGetterSetter = ObjectWithGetterSetter<User>

let p: UserWithGetterSetter = {
    name: 'jack',
    age: 20,
    address: '北京',
    getName() {
        return this.name
    },
    getAge() {
        return this.age
    },
    getAddress() {
        return this.address
    },
    setName(name: string) {
        this.name = name
    },
    setAge(age: number) {
        this.age = age
    },
    setAddress(address: string) {
        this.address = address
    }
}
```

## 递归复用

现在有这样一个需求，需要将字符串字面量类型中的每个值类型取出，组成联合类型，类似于：

```typescript
type A = '12345'
// 转变为
type B = '1' | '2' | '3' | '4' | '5'
```

如果字符串长度不变，那么可以直接使用 `infer` 进行类型推断：

```typescript
type A = '12345'

type StringToUnion<S extends string> = S extends `${infer One}${infer Two}${infer Three}${infer Four}${infer Five}`
    ? One | Two | Three | Four | Five
    : never

type B = StringToUnion<A>
```

但是这仅仅才 5 个字符，如果字符串较多的话，需要 `infer` 推断多个类型，比如九字真言，需要 `infer` 9 次？

```typescript
type A = '临兵斗者皆阵列前行'
```

这个时候就可以使用递归复用：**当处理数量较多的类型的时候，可以只处理一个类型，然后递归地调用自身处理下一个类型，直到结束条件**。

```typescript
type NineMantra = '临兵斗者皆阵列前行'

type StringToUnion<S extends string> = S extends `${infer One}${infer Rest}` ? One | StringToUnion<Rest> : never

type NineMantraUnion = StringToUnion<NineMantra>
```

和字符串字面量类型很类似，如果一个数组要做一些类似的类型处理，那一样可以递归。比如，要把数组中的元素类型倒序：

```typescript
type ReverseArr<T extends any[]> = T extends [infer One, infer Two, infer Three, infer Four, infer Five]
    ? [Five, Four, Three, Two, One]
    : never

type Reversed = ReverseArr<[1, 2, 3, 4, 5]> // [5, 4, 3, 2, 1]
```

同样，使用递归复用：

```typescript
type ReverseArr<T extends any[]> = T extends [infer One, ...infer Rest] ? [...ReverseArr<Rest>, One] : T // 注意结束之后返回的是数组

type Reversed = ReverseArr<[1, 2, 3, 4, 5]> // [5, 4, 3, 2, 1]
```

再看一个示例，通过编写一个类型工具，获取一个字符串字面量类型的长度：

```typescript
type S = LengthOfString<'12345'> // 5
```

可以思考，之前讲过数组类型可以获取长度，通过 `T['length']`，那么能否把字符串类型转成数组类型呢？可以实现，通过 `infer` 推断和递归复用：

```typescript
type LengthOfString<S extends string, T extends string[] = []> = S extends `${infer F}${infer R}`
    ? LengthOfString<R, [...T, F]>
    : T['length']

type S = LengthOfString<'12345'>
```

通过递归复用，还能实现对索引映射类型的深递归。比如，希望将一个层级较深的对象类型全部属性转为 `readonly` 只读：

```typescript
type User = {
    id: number
    name: string
    address: {
        province: string
        city: {
            name: string
            street: string
        }
    }
}
```

如果使用之前编写的 `MyReadonly` 处理，仅仅只会把第一个层级的属性转变为 `readonly`：

```typescript
type MyReadonly<T> = {
    readonly [key in keyof T]: T[key]
}

type ReadonlyUser = MyReadonly<User>
```

这里简单使用递归就能实现想要的效果：

```typescript
type DeepReadonly<T extends Record<string, any>> = {
    readonly [K in keyof T]: T[K] extends Record<string, any> ? DeepReadonly<T[K]> : T[K]
}

type ReadonlyUser = DeepReadonly<User>
```

但是这样不便于看到最后转换的效果，因为 TypeScript 为了保证性能，并不会做深层的计算。

有一个比较实用的类型编程技巧，就是在比较复杂的，特别是需要递归计算的类型编程计算外，包裹一层代码：

```typescript
T extends any ?
具体类型体操代码
: never
```

这样就可以看到最后计算完成的效果。比如把上面的代码换成：

```typescript
type DeepReadonly<T extends Record<string, any>> = T extends any
    ? {
          readonly [K in keyof T]: T[K] extends Record<string, any> ? DeepReadonly<T[K]> : T[K]
      }
    : never

type ReadonlyUser = DeepReadonly<User> //现在可以看到全部计算完成的类型效果
```

## 分发逆变推断

根据函数的型变，可以做出一些比较复杂的类型体操变化。

实现高级工具类型函数：联合类型转为交叉类型

```typescript
type I = UnionToIntersection<{id: 1} | {name: 'jack'} | {sex: '男'}>
// { id: 1 } & { name: "jack" } & { sex: "男" }
```

在所有类型转换中，联合转交叉可以说是比较有难度的了。

核心在于其他类型都有比较简单的遍历方法，比如元组的 `T extends [infer F, ...infer R]`，对象的 `[P in keyof T]: T[P]`，还有字符串的遍历套路。在这些类型中，转交叉其实非常简单。这里以元组为例：

```typescript
type TupleToIntersection<T extends any[]> =
    // 递归复用遍历
    T extends [infer F, ...infer R]
        ? // 元素交叉即可
          F & TupleToIntersection<R>
        : unknown // any & unknown = any 所以当 T 为空时，返回 unknown不影响结果

// MyType = {id: 1} & {name: 'jack'}
type MyType = TupleToIntersection<[{id: 1}, {name: 'jack'}]>
```

但是对联合类型就麻烦了，因为我们无法把联合类型一个一个拉出来进行遍历，联合类型只有分布式（分发）特性。但是分发特性也是从一个联合类型返回一个新的联合类型，并不能转成交叉类型。

那么这个题，可以通过利用联合类型的`分布式特性` + `逆变特性` + `infer` 类型推断来实现这个效果：

```typescript
type UnionToIntersection<U> =
    // 利用分发特性生成
    // (arg: { id: 1 }) => any |
    // (arg: { name: "jack" }) => any |
    // (arg: { sex: "男" }) => any
    (U extends any ? (arg: U) => any : never) extends (arg: infer P) => any
        ? P // 利用逆变特性，P = { id: 1 } & { name: "jack" } & { sex: "男" }
        : never
```

函数参数逆变的特性如下：

```typescript
type C = {id: 1; name: 'jack'; sex: '男'} extends {id: 1} ? 1 : 2 // 1

type D = ((arg: {id: 1}) => any) extends (arg: {id: 1; name: 'jack'; sex: '男'}) => any ? 1 : 2 //1
```
