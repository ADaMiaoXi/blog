---
title: 基础使用
icon: mdi:babel
order: 1
category:
    - Babel
---

## 1 使用 babel 对代码进行编译

### 1.1 运行命令安装所需的包（package）

-   devDenendencies 开发依赖（下载的第三方库不会随着 JS 编译打包到产品代码中）：

    ```shell
    npm install -save-dev @babel/core @babel/cli @babel/preset-env
    ```

-   运行依赖（将会随着 JS 编译，打包到产品代码中）

    ```shell
    npm install --save @babel/polyfill
    ```

    为什么 `@babel/polyfill` 是运行依赖？因为需要使用该套件通过 polyfill 的形式，用旧语法实现新语法的功能，以达到代码对旧浏览器的兼容。

### 1.2 创建配置文件 (babel.config.json)

-   在项目根目录下创建 `babel.config.json` 配置文件：

    ```json
    {
        "presets": [
            [
                "@babel/preset-env",
                {
                    "targets": {
                        "edge": "17",
                        "firefox": "60",
                        "chrome": "67",
                        "safari": "11.1"
                    },
                    "useBuiltIns": "usage",
                    "corejs": "3.6.5"
                }
            ]
        ]
    }
    ```

-   使用旧版本的 babel 则使用 `babel.config.js` 作为配置文件：

    ```javascript
    const presets = [
        [
            '@babel/preset-env',
            {
                targets: {
                    edge: '17',
                    firefox: '60',
                    chrome: '67',
                    safari: '11.1'
                },
                useBuiltIns: 'usage',
                corejs: '3.6.4'
            }
        ]
    ]

    module.exports = {presets}
    ```

### 1.3 执行命令编译代码

-   直接通过依赖路径找到命令并运行：

    ```shell
    ./node_modules/.bin/babel <source dir> --out-dir <target dir>
    ```

-   利用 npm@5.2.0 自带的 npm 包运行器 npx 运行 node_modules 中的 babel package：

    ```shell
    npx babel <source dir> --out-dir <target dir>
    ```

    可以简写为：

    ```shell
    npx babel src -d lib
    ```

-   **Example**:

    使用以下命令将 `src` 目录中代码编译到 `lib` 目录：

    ```shell
    ./node_modules/.bin/babel src --out-dir lib
    ```

    或：

    ```shell
    npx babel src --out-dir lib
    ```

    简化版：

    ```shell
    npx babel src -d lib
    ```

## 2 Babel 做了什么？

所有的 Babel 模块都是作为独立 npm 包发布的，都已 `@babel` 开头。需要重点关注的是 `@babel/core` 和 `@babel/cli`。

### 2.1 核心库 @babel/core

Babel 的核心功能包含在 `@babel/core` 模块中，通过以下命令安装：

```shell
npm install --save-dev @babel/core
```

在 node 的环境下可以直接通过 `require` ，在**代码运行中**l 调用 babe：

```javascript
const babel = require('@babel/core')

const code = `const sayHello = () => 'Hello'`

const optionsObjecrt = {}

const compileResult = babel.transformSync(code, optionsObjecrt)
```

编译结果存储在 `compileResult` 中：

```javascript
compileResult: {
  metadata: {},
  options: {
    assumptions: {},
    targets: {},
    cloneInputAst: true,
    babelrc: false,
    configFile: false,
    browserslistConfigFile: false,
    passPerPreset: false,
    envName: 'development',
    cwd: 'D:\\Star_collections\\Babel\\use_babel\\code',
    root: 'D:\\Star_collections\\Babel\\use_babel\\code',
    rootMode: 'root',
    plugins: [
      [Plugin], [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin], [Plugin],
      [Plugin], [Plugin], [Plugin]
    ],
    presets: [],
    parserOpts: {
      sourceType: 'module',
      sourceFileName: undefined,
      plugins: [Array]
    },
    generatorOpts: {
      filename: undefined,
      auxiliaryCommentBefore: undefined,
      auxiliaryCommentAfter: undefined,
      retainLines: undefined,
      comments: true,
      shouldPrintComment: undefined,
      compact: 'auto',
      minified: undefined,
      sourceMaps: false,
      sourceRoot: undefined,
      sourceFileName: 'unknown',
      jsescOption: [Object]
    }
  },
  ast: null,
  code: `"use strict";\n\nvar sayHello = function sayHello() {\n  return 'Hello';\n};`,
  map: null,
  sourceType: 'script'
}
```

### 2.2 CLI 命令行工具

`@babel/cli` 是一个从终端（命令行）调用 Babel 的工具，由此使得**代码打包过程中**调用 Babel 成为可能。

-   安装：

    ```shell
    npm install --save-dev @babel/core @babel/cli
    ```

-   使用：

    ```shell
    ./node_modules/.bin/babel <source dir> --out-dir <target dir>
    ```

    ```shell
    npx babel <source dir> --out-dir <target dir>
    ```

    ```shell
    npx babel <source dir> -d <target dir>
    ```

### 2.3 插件(Plugins)和预设(Presets)

Babel 的代码转换功能是以插件的形式实现的，插件是小型的 JavaScript 程序，用于指导 Babel 如何对代码进行转换。

-   **指定插件(Plugins)**对代码进行转换：

    以转换箭头函数为普通函数为例，指定使用官方插件 `@babel/plugin-transform-arrow-functions` 对箭头函数进行转换：

    1. 安装 `@babel/core` 核心库、 `@babel/cli` 命令行工具

        ```shell
        npm install --save-dev @babel/core @babel/cli
        ```

    2. 安装插件 `@babel/plugin-transform-arrow-functions`

        ```shell
        npm install --save-dev @babel/plugin-transform-arrow-functions
        ```

    3. 使用插件转换代码

        ```shell
        npx babel <source dir> -d <target dir> --plugins=@babel/plugin-transform-arrow-functions
        ```

        或

        ```shell
        ./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
        ```

-   **补充**：package.json 编译脚本

    频繁使用的长指令手动去输入比较麻烦，使用 package.json 编译脚本记录指令：

    在 json 对象中，设置 `"script" ` 属性，以键值对的形式标记指令，如：

    ```json
    {
      "scripts":{
          "build": "npx babel src -d dist",
          "build:arrow": "npx babel src -d dist --plugins=@babel/plugin-transform-arrow-functions"
      },
      "devDependencies": {
        ...
      }
    }
    ```

    -   在命令行工具中使用 `npm run build` 或者 `yarn build` 即可执行 `script` 属性中 `build` 键对应值的指令

    -   在 `script` 中标记的指令可以省略 `npx`，即上例中标记指令可以简写为：

        ```json
        {
            "scripts": {
                "build": "babel src -d dist",
                "build:arrow": "babel src -d dist --plugins=@babel/plugin-transform-arrow-functions"
            }
        }
        ```

-   使用 **预设(preset)** 进行配置

    可以使用一个名称为 `env` 的 preset 进行配置：

    ```shell
    npm install --save-dev @babel/preset-env
    ```

    指令：

    ```shell
    npx babel src --out-dir lib --presets=@babel/env
    ```

    或：

    ```json
    {
        "scripts": {
            "build": "babel src -d dist",
            "build:arrow": "babel src -d dist --plugins=@babel/plugin-transform-arrow-functions",
            "build:env": "babel src --out-dir lib --presets=@babel/env"
        },
        "devDependencies": {
            "@babel/cli": "^7.16.0",
            "@babel/core": "^7.16.0",
            "@babel/preset-env": "^7.16.4"
        }
    }
    ```

    如果不进行任何配置，上述 preset 所包含的插件将支持所有最新的 JavaScript 向低版本转换的特性。但是 preset 也是支持爱参数的。

    下面看一种非通过命令行从终端传递 cli 和 preset 参数的传递参数方法：**配置文件**。

### 2.4 配置文件 babel.config.json

使用配置文件可以在不使用命令指定预设参数或指定插件的情况下，对转换进行配置。在文件夹最外层创建 `babel.config.json` (需要 `v7.8.0` 或更高版本)。babel 在进行转换的时候，会先读取 `babel.config.json` 中的配置，然后按照配置对源文件进行转换。

内容包含如下：

```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "target": {
                    "ie": "10",
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67",
                    "safari": "11.1"
                }
            }
        ]
    ]
}
```

现在，名为 `env` 的 preset 只会为目标浏览器中没有的功能加载转换插件。

### 2.5 Polyfill

**注意：** _从 Babel 7.4.0 版本开始，`@babel/polyfill`就已经过时并不建议使用了。建议直接使得文件包含 `core-js/stable`（用于模拟 ECMAScript 的功能）和 `regenerator-runtime/runtime`（需要使用转义后的生成器函数时使用）_

`@babel/polyfill` 模块包含 `core-js` 和一个自定义的 `regenerator runtime` 来模拟完整的 ES2015+ 环境。

这意味着使用了 `@babel/polyfill` 之后可以使用诸如 `Promise` 和 `WeakMap` 之类的新的内置组件、`Array.from` 或 `Object.assign` 之类的静态方法、`Array.prototype.include` 之类的实例方法以及生成器函数（generator functions）。为了添加这些功能，polyfill 将这些垫片方法添加到全局范围和类似 `String` 这样的原生原型对象（native prototypes）中。

-   安装 `@babel/polyfill`

    ```shell
    npm install --save @babel/polyfill
    ```

    **注意**：使用 `--save` 参数而不是使用 `--save-dev`，因为 polyfill 垫片需要一同打包到运行时的代码中去。

但是对于一个工具的作者来说，一次性引入所有垫片是一件非常占用资源的事情。比如现有的转换目标环境不需要 `Array.prototype.includes`这种实例方法的垫片，推荐使用 `transform runtime` 插件，而不是使用会对全局变量造成污染的 `@babel/polyfill`。

如果你确切的知道你所需要的垫片，还可以直接从 `core-js` 中获取使用它们。

**Luckly!!!**，`@babel/preset-env` 提供了一个 `"useBuiltIns"` 参数，当参数值设置为 `"usage"` 时，就会加载上述优化措施：也就是转换后的代码只会从 `core-js` 中引入所需要的 polyfill。配置如下：

```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "ie": "10",
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67",
                    "safari": "11.1"
                },
                "useBuiltIns": "usage"
            }
        ]
    ]
}
```

Babel 将检查你的所有代码，以便查找目标环境中缺失的功能，然后只把必须的 polyfill 包含进来。示例代码如下：

```javascript
Promise.resolve().finally()
```

由于 IE10 中没有 `Promise` ，IE10 和 Edge 中没有 `Promise.prototype.finally`，示例代码会被转换为：

```javascript
'use strict'

require('core-js/modules/es7.promise.finally.js')

require('core-js/modules/es6.object.to-string.js')

require('core-js/modules/es6.promise.js')

Promise.resolve().finally()
```

如果我们不将 `"useBuiltIns"` 参数设置为 `"usage"` （默认值是 "false"）的话，则需要在所有的代码之前利用 `require` 加载一次完整的 `polyfill`：

-   将 `"useBuiltIns"` 设置为 `"entry"`

    ```json
    {
        "presets": [
            [
                "@babel/preset-env",
                {
                    "targets": {
                        "edge": "17",
                        "firefox": "60",
                        "chrome": "67",
                        "safari": "11.1"
                    },
                    "useBuiltIns": "entry"
                }
            ]
        ]
    }
    ```

-   然后在所有代码之前引入 `core-js` 和 `regenerator runtime`来模拟 ES2015+ 的完整环境，因为 `@babel/polyfoll` 已经被废弃了。

    ```javascript
    import 'core-js/stable'
    import 'regenerator-runtime/runtime'
    ```

## Demo
https://gitee.com/damiaoxi/stars/tree/master/Babel/01.use_babel/code
