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

yarn 采用了以下手段解决了上述问题：

-   使用扁平的目录结构
-   并行下载
-   使用本地缓存
-   控制台仅输出关键信息
-   使用 yarn.lock 文件记录确切依赖

yarn 还优化了以下内容：

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

### 运行脚本/本地 CLI

-   运行脚本：

    ```bash
    yarn run <script-name> [-- <args>]
    ```

-   运行本地 CLI 工具：
    yarn 运行 CLI （`.bin` 文件下命令）不用像 npm 一样使用 `npx`，直接使用 `yarn run`
    ```bash
    yarn run cli
    ```

### 查询

查看 bin 目录路径：

```bash
yarn [global] bin
```

-   `global`：查看全局 `bin` 目录的路径

查询包信息：

```bash
yarn info 包名 [子字段]
```

列举已安装的依赖：

```bash
yarn [global] list [--depth=依赖深度]
```

yarn 的 `list` 命令和 npm 的 `list` 不同，yarn 输出的信息更加丰富，包括顶级目录结构、每个包的依赖版本号

### 更新包

列举需要更新的包：

```bash
yarn outdated
```

更新包：

```bash
yarn [global] upgrade [包名]
```

### 卸载包

```bash
yarn remove 包名
```

### 特有指令

```bash
yarn check
```

验证 package.json 文件的依赖记录和 lock 文件是否一致，用于防篡改。

```bash
yarn audit
```

检查本地安装的包有哪些已知漏洞，以表格的形式列出
漏洞级别如下：
`INFO`：信息级别
`LOW`: 低级别
`MODERATE`：中级别
`HIGH`：高级别
`CRITICAL`：关键级别

```bash
yarn why 包名
```

在控制台打印出安装这个包的原因，哪些包会用到它

```bash
yarn create
```

由于大部分脚手架工具都是以 `create-xxx` 的方式命名的，比如 React 的官方脚手架名称为 `create-react-app`

可以使用 `yarn create` 命令来一步完成安装和搭建

```bash
yarn create react-app my-app

# 等同于下面的两条命令
yarn global add create-react-app
create-react-app my-app
```
