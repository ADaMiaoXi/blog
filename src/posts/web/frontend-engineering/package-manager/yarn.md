---
title: yarn
icon: logos:yarn
order: 2
category:
    - Package manager
---

Yarn 是由 Facebook、Google、Exponent 和 Tilde 联合推出的一个新的 JavaScript 包管理工具，**它仍然使用 NPM 的 registry**，但提供了全新的 CLI 来对包进行管理。

过去，由于 早期 NPM 存在以下问题，Yarn 的出现极大地抢占了 NPM 的市场份额。

-   依赖目录嵌套层次深：早期 NPM 的依赖是嵌套的，这在 Windows 系统上是一个严重问题，由于众所周知的原因，Windows 系统无法支持过深的目录结构。
-   下载速度慢：
    -   由于嵌套层次的问题，NPM 对包的下载只能是串行的，即前一个包下载完后才会下载下一个包，导致带宽资源没有被充分利用。
    -   多个相同版本的包会被重复下载。
-   控制台输出繁杂：早期 NPM 安装包时，每安装一个依赖，就会输出依赖的详细信息，导致一次安装有大量信息输出到控制台，遇到错误时极难排查。
-   执行指令困难： 早期 NPM 没有执行依赖包指令的工具，执行指令需要手动执行 `bin` 目录下的文件，需要写出完整路径。（没有 `npx`）
-   工程移植问题：由于 NPM 的版本依赖可以是模糊的，可能导致工程移植后依赖的确切版本不一致。(没有 package.json 文件)

针对上述问题，yarn 从诞生之初就已经解决，其采用了以下手段：

-   使用扁平的目录结构
-   并行下载
-   使用本地缓存
-   控制台仅输出关键信息
-   使用 yarn.lock 文件记录确切依赖

此外，yarn 还优化了以下内容：

-   增加了某些功能强大的命令
-   让既有的命令更加语义化
-   本地安装的 CLI 工具可以使用 `yarn` 直接启动
-   将全局安装的目录当作一个普通的工程，生成 package.json 文件，便于全局安装移植

Yarn 的出现给 NPM 带来了巨大的压力。很快，NPM 借鉴了 Yarn 的先进理念，不断对自身进行优化。到了 `npm@6` 版本，几乎完全解决了上述问题：

-   目录扁平化
-   并行下载
-   本地缓存
-   使用 package-lock.json 记录确切依赖
-   增加了大量的命令别名
-   内置了 `npx`，可以启动本地的 CLI 工具
-   极大简化了控制台输出

`npm@6` 之后，可以说 NPM 已经和 Yarn 非常接近，甚至没有差距。许多新项目又重新从 Yarn 转回到 NPM。

## yarn 指令

### 初始化项目

```bash
yarn init [--yes/-y]
```

### 安装包

#### 安装指定包：

```bash
yarn [global] add [--dev/-D]  [--exact/-E] <package-name>[@<version>]
```

-   `global`：安装为全局包
-   `--dev` / `-D`：安装为开发依赖
-   `--exact` / `-E`：安装指定版本
    ```bash
    # 不使用 -E 参数，默认可能安装 ^1.2.3 版本范围
    yarn add package-name@1.2.3
    # 使用 -E 参数，精确安装 1.2.3 版本
    yarn add package-name@1.2.3 -E
    ```
-   `@<version>`： 指定版本

#### 安装 package.json 中的依赖

```bash
yarn install [--production/--prod]
```

-   `--production/--prod`：只安装生产环境依赖，当使用 `--production` 或 `--prod` 参数时，yarn 只会安装 package.json 中 `dependencies` 字段列出的依赖，而不会安装 `devDependencies` 字段中的开发依赖
