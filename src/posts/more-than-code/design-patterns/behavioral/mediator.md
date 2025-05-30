---
title: 中介者模式
icon: /assets/images/more-than-code/design-patterns/behavioral/mediator/mediator-mini.png
order: 4
category:
    - 设计模式
---

## 意图

**中介者模式**是一种行为设计模式， 能让你减少对象之间混乱无序的依赖关系。 该模式会限制对象之间的直接交互， 迫使它们通过一个中介者对象进行合作。

![](../../../../.vuepress/public/assets/images/more-than-code/design-patterns/behavioral/mediator/mediator.png)

## 问题

假如你有一个创建和修改客户资料的对话框， 它由各种控件组成， 例如文本框 （Text­Field）、 复选框 （Checkbox） 和按钮 （Button） 等。

![用户界面中各元素间的关系会随程序发展而变得混乱。](../../../../.vuepress/public/assets/images/more-than-code/design-patterns/behavioral/mediator/problem1-zh.png)

某些表单元素可能会直接进行互动。 例如， 选中 “我有一只狗” 复选框后可能会显示一个隐藏文本框用于输入狗狗的名字。 另一个例子是提交按钮必须在保存数据前校验所有输入内容。

![元素间存在许多关联。 因此， 对某些元素进行修改可能会影响其他元素。](../../../../.vuepress/public/assets/images/more-than-code/design-patterns/behavioral/mediator/problem2.png)

如果直接在表单元素代码中实现业务逻辑， 你将很难在程序其他表单中复用这些元素类。 例如， 由于复选框类与狗狗的文本框相耦合， 所以将无法在其他表单中使用它。 你要么使用渲染资料表单时用到的所有类， 要么一个都不用。

## 解决方案

中介者模式建议你停止组件之间的直接交流并使其相互独立。 这些组件必须调用特殊的中介者对象， 通过中介者对象重定向调用行为， 以间接的方式进行合作。 最终， 组件仅依赖于一个中介者类， 无需与多个其他组件相耦合。

在资料编辑表单的例子中， 对话框 （Dialog） 类本身将作为中介者， 其很可能已知自己所有的子元素， 因此你甚至无需在该类中引入新的依赖关系。

![UI 元素必须通过中介者对象进行间接沟通。](../../../../.vuepress/public/assets/images/more-than-code/design-patterns/behavioral/mediator/solution1-zh.png)

绝大部分重要的修改都在实际表单元素中进行。 让我们想想提交按钮。 之前， 当用户点击按钮后， 它必须对所有表单元素数值进行校验。 而现在它的唯一工作是将点击事件通知给对话框。 收到通知后， 对话框可以自行校验数值或将任务委派给各元素。 这样一来， 按钮不再与多个表单元素相关联， 而仅依赖于对话框类。

你还可以为所有类型的对话框抽取通用接口， 进一步削弱其依赖性。 接口中将声明一个所有表单元素都能使用的通知方法， 可用于将元素中发生的事件通知给对话框。 这样一来， 所有实现了该接口的对话框都能使用这个提交按钮了。

采用这种方式， 中介者模式让你能在单个中介者对象中封装多个对象间的复杂关系网。 类所拥有的依赖关系越少， 就越易于修改、 扩展或复用。

## 真实世界类比

![飞行器驾驶员之间不会通过相互沟通来决定下一架降落的飞机。 所有沟通都通过控制塔台进行。](../../../../.vuepress/public/assets/images/more-than-code/design-patterns/behavioral/mediator/live-example.png)

飞行器驾驶员们在靠近或离开空中管制区域时不会直接相互交流。 但他们会与飞机跑道附近， 塔台中的空管员通话。 如果没有空管员， 驾驶员就需要留意机场附近的所有飞机， 并与数十位飞行员组成的委员会讨论降落顺序。 那恐怕会让飞机坠毁的统计数据一飞冲天吧。

塔台无需管制飞行全程， 只需在航站区加强管控即可， 因为该区域的决策参与者数量对于飞行员来说实在太多了。

## 中介者模式结构

![](../../../../.vuepress/public/assets/images/more-than-code/design-patterns/behavioral/mediator/structure.png)

1. **组件** （Component） 是各种包含业务逻辑的类。 每个组件都有一个指向中介者的引用， 该引用被声明为中介者接口类型。 组件不知道中介者实际所属的类， 因此你可通过将其连接到不同的中介者以使其能在其他程序中复用。
2. **中介者** （Mediator） 接口声明了与组件交流的方法， 但通常仅包括一个通知方法。 组件可将任意上下文 （包括自己的对象） 作为该方法的参数， 只有这样接收组件和发送者类之间才不会耦合。
3. **具体中介者** （Concrete Mediator） 封装了多种组件间的关系。 具体中介者通常会保存所有组件的引用并对其进行管理， 甚至有时会对其生命周期进行管理。
4. 组件并不知道其他组件的情况。 如果组件内发生了重要事件， 它只能通知中介者。 中介者收到通知后能轻易地确定发送者， 这或许已足以判断接下来需要触发的组件了。
   对于组件来说， 中介者看上去完全就是一个黑箱。 发送者不知道最终会由谁来处理自己的请求， 接收者也不知道最初是谁发出了请求。

## 伪代码

在本例中， 中介者模式可帮助你减少各种 UI 类 （按钮、 复选框和文本标签） 之间的相互依赖关系。

![UI 对话框类的结构](../../../../.vuepress/public/assets/images/more-than-code/design-patterns/behavioral/mediator/example.png)

用户触发的元素不会直接与其他元素交流， 即使看上去它们应该这样做。 相反， 元素只需让中介者知晓事件即可， 并能在发出通知时同时传递任何上下文信息。

本例中的中介者是整个认证对话框。 对话框知道具体元素应如何进行合作并促进它们的间接交流。 当接收到事件通知后， 对话框会确定负责处理事件的元素并据此重定向请求。

```py
// 中介者接口声明了一个能让组件将各种事件通知给中介者的方法。中介者可对这
// 些事件做出响应并将执行工作传递给其他组件。
interface Mediator is
    method notify(sender: Component, event: string)


// 具体中介者类可解开各组件之间相互交叉的连接关系并将其转移到中介者中。
class AuthenticationDialog implements Mediator is
    private field title: string
    private field loginOrRegisterChkBx: Checkbox
    private field loginUsername, loginPassword: Textbox
    private field registrationUsername, registrationPassword,
                  registrationEmail: Textbox
    private field okBtn, cancelBtn: Button

    constructor AuthenticationDialog() is
        // 创建所有组件对象并将当前中介者传递给其构造函数以建立连接。

    // 当组件中有事件发生时，它会通知中介者。中介者接收到通知后可自行处理，
    // 也可将请求传递给另一个组件。
    method notify(sender, event) is
        if (sender == loginOrRegisterChkBx and event == "check")
            if (loginOrRegisterChkBx.checked)
                title = "登录"
                // 1. 显示登录表单组件。
                // 2. 隐藏注册表单组件。
            else
                title = "注册"
                // 1. 显示注册表单组件。
                // 2. 隐藏登录表单组件。

        if (sender == okBtn && event == "click")
            if (loginOrRegister.checked)
                // 尝试找到使用登录信息的用户。
                if (!found)
                    // 在登录字段上方显示错误信息。
            else
                // 1. 使用注册字段中的数据创建用户账号。
                // 2. 完成用户登录工作。
                // ……


// 组件会使用中介者接口与中介者进行交互。因此只需将它们与不同的中介者连接
// 起来，你就能在其他情境中使用这些组件了。
class Component is
    field dialog: Mediator

    constructor Component(dialog) is
        this.dialog = dialog

    method click() is
        dialog.notify(this, "click")

    method keypress() is
        dialog.notify(this, "keypress")

// 具体组件之间无法进行交流。它们只有一个交流渠道，那就是向中介者发送通知。
class Button extends Component is
    // ……

class Textbox extends Component is
    // ……

class Checkbox extends Component is
    method check() is
        dialog.notify(this, "check")
    // ……
```

## 中介者模式优缺点
√ 单一职责原则。 你可以将多个组件间的交流抽取到同一位置， 使其更易于理解和维护。
√ 开闭原则。 你无需修改实际组件就能增加新的中介者。
√ 你可以减轻应用中多个组件间的耦合情况。
√ 你可以更方便地复用各个组件。
× 一段时间后， 中介者可能会演化成为上帝对象。

## 与其他模式的关系
- [**责任链模式**](./chain-of-responsibility.md)、 [**命令模式**](./command.md)、 **中介者模式**和[**观察者模式**](./observer.md)用于处理请求发送者和接收者之间的不同连接方式：
  - *责任链* 按照顺序将请求动态传递给一系列的潜在接收者， 直至其中一名接收者对请求进行处理。
  - *命令* 在发送者和请求者之间建立单向连接。
  - *中介者* 清除了发送者和请求者之间的直接连接， 强制它们通过一个中介对象进行间接沟通。
  - *观察者* 允许接收者动态地订阅或取消接收请求。

- [**外观模式**](../structural/facade.md)和**中介者**的职责类似： 它们都尝试在大量紧密耦合的类中组织起合作。
  - *外观* 为子系统中的所有对象定义了一个简单接口， 但是它不提供任何新功能。 子系统本身不会意识到外观的存在。 子系统中的对象可以直接进行交流。
  - *中介者* 将系统中组件的沟通行为中心化。 各组件只知道中介者对象， 无法直接相互交流。

- **中介者**和[**观察者**](./observer.md)之间的区别往往很难记住。 在大部分情况下， 你可以使用其中一种模式， 而有时可以同时使用。 让我们来看看如何做到这一点。
*中介者* 的主要目标是消除一系列系统组件之间的相互依赖。 这些组件将依赖于同一个中介者对象。 *观察者* 的目标是在对象之间建立动态的单向连接， 使得部分对象可作为其他对象的附属发挥作用。
有一种流行的中介者模式实现方式依赖于 *观察者*。 中介者对象担当发布者的角色， 其他组件则作为订阅者， 可以订阅中介者的事件或取消订阅。 当 *中介者* 以这种方式实现时， 它可能看上去与 *观察者* 非常相似。
当你感到疑惑时， 记住可以采用其他方式来实现中介者。 例如， 你可永久性地将所有组件链接到同一个中介者对象。 这种实现方式和 *观察者* 并不相同， 但这仍是一种中介者模式。
假设有一个程序， 其所有的组件都变成了发布者， 它们之间可以相互建立动态连接。 这样程序中就没有中心化的中介者对象， 而只有一些分布式的观察者。