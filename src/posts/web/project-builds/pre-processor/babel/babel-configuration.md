---
title: 配置文件
icon: simple-icons:babel
order: 2
category:
  - Babel
---

## Ⅰ.配置文件类型

Babel 有两种平行的配置文件格式，这两种格式可以一起用，也可以独立存在。

- 项目级配置文件（Project-wide configuration）

  - `babel.config.json` 配置文件。这种配置文件可以用不同的尾缀，如 `.js`，`.cjs`，`.mjs`。
- 文件相关配置文件（File-relative configuration）
  - `.babelrc.json` 配置文件。这种配置文件可以用不同的尾缀 (`.babelrc`, `.js`, `.cjs`, `.mjs`)。
  - `package.json` 文件中 `"babel" ` 为 key 的配置项。



## Ⅱ. 项目级配置文件（Project-wide configuration）

这是 Babel 7.x 版本以后的新配置文件格式。Babel 有一个"根（root）"目录的概念，默认的"根"目录为当前正在工作的目录。Babel会在这个根目录中自动搜索一个叫 `babel.config.json`  ，或者一个使用**支持的扩展名的等价文件**。当然，用户可以使用显式的 "configFile" 值来覆盖默认的配置文件搜索行为。

## Ⅲ. 文件相关配置文件（File-relative configuration）

## Ⅳ. 支持拓展名的等价文件？

Babel 可以使用 Node.js 原生支持的任何文件拓展名的文件进行配置：你可以用 `.json`，`.js`，`.cjs`和`.mjs` 作为 `babel.config.json` 和 `.babelrc.json` 文件的尾缀。

- `babel.config.json` 和 `.babelrc.json` 会被按照 JSON5 的格式解析，并且应该包含一个与Babel接受的选项格式匹配的对象。

  建议在任何可能的情况下使用这种文件类型。JS 配置文件在应对在构建时有条件依赖或者以其他方式计算的复杂配置时是很方便的。 然而，其缺点是 JS 配置的静态可分析性较少，因此对缓存性、linting、IDE自动补全等有负面影响。  

  由于 `babel.config.json` 和 `.babelrc.json` 是静态文件，它允许其他使用 Babel 的工具，如 bundlers 可以安全地缓存 Babel 的结果，这对于巨大构建行为来说是一个巨大的胜利。

- `babel.config.cjs` 和 `.babelrc.cjs` 让你能够按照 CommonJS 的方式定义配置文件，使用 `module.exports`导出。仅在 `v7.7.0` 之后被支持。
- `babel.config.mjs` 和 `.babelrc.mjs` 使用原生 ECMAScript 模块化语法。仅在 Node.js 13.2 以上的版本被支持。需要注意的是原生 `ECMAScript` 模块时异步的（这就是为什么 `import()`常常返回一个 promise 对象），因为这个原因， `.mjs` 配置文件在同步调用 Babel 是被抛弃(throw ?)。仅在 `v7.8.0` 之后被支持。
- `babel.config.js` 和 `.babelrc.js` 当 你的 `package.json` 文件包含 `"type": "module"` 选项是行为同 `.mjs` 结尾的文件，否则则同 `.cjs` 结尾的文件。

JavaScript 配置文件可以 export 一个对象（object） 或者一个被调用时返回生成配置的函数（function），返回函数的配置文件被赋予了一些特殊的功能，因为函数能够访问Babel自身暴露的API。参考 [配置函数API](https://www.babeljs.cn/docs/config-files#config-function-api) 获取更多信息。

## Demo
https://gitee.com/damiaoxi/stars/tree/master/Babel/02.Babel_configuration/code