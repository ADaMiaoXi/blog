---
title: 适配器模式
icon: /assets/images/brain-boom/design-patterns/structural/adapter/adapter-mini.png
order: 1
category:
  - 设计模式
---

## 意图
**适配器模式**是一种结构型设计模式， 它能使接口不兼容的对象能够相互合作。

![](../../../../.vuepress/public/assets/images/brain-boom/design-patterns/structural/adapter/adapter-zh.png)

## 问题
假如你正在开发一款股票市场监测程序， 它会从不同来源下载 XML 格式的股票数据， 然后向用户呈现出美观的图表。

在开发过程中， 你决定在程序中整合一个第三方智能分析函数库。 但是遇到了一个问题， 那就是分析函数库只兼容 JSON 格式的数据。

![你无法 “直接” 使用分析函数库， 因为它所需的输入数据格式与你的程序不兼容。](../../../../.vuepress/public/assets/images/brain-boom/design-patterns/structural/adapter/problem-zh.png)