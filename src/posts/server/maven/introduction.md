---
title: 关于 Maven
icon: catppuccin:maven
order: 1
category:
  - Maven
---

## Maven的简介

### 简介

Maven主要服务于基于java平台的项目构建，依赖管理和项目信息管理。

### 项目构建工具

- **Ant构建**

  最早的构建工具，基于IDE,大概是2000年有的，当时是最流行java构建工具，不过它的XML脚本编写格式让XML文件特别大。对工程构建过程中的过程控制特别好

- **Maven **

  项目对象模型，通过其描述信息来管理项目的构建，报告和文档的软件项目管理工具。它填补了Ant缺点，Maven第一次支持了从网络上下载的功能，仍然采用xmI作为配置文件格式。Maven专注的是依赖管理，使用 Java 编写。

- **Gradle**

  属于结合以上两个的优点，它继承了Ant的灵活和Maven的生命周期管理，它最后被 google 作为了 Android御用管理工具。它最大的区别是不用XML作为配置文件格式,采用了 DSL 格式，使得脚本更加简洁。

目前市面上 Ant 比较老,所以一般是一些比较传统的软件 企业公司使用，Maven使用ava编写,是当下大多数互联网公司会使用的一个构建工具,中文文档也比较齐全， gradle是用 groovy 编写，目前比较新型的构建工具一些初创互联网公司会使用,以后会有很大的使用空间.

## Maven 的四大特性

### 依赖管理系统

Maven 为 Java 世界引入了一个新的依赖管理系统 jar 包管理 jar 升级时修改配置文件即可。在Java世界中，可以用 `groupld`、`artifactld`、 `version`组成的 Coordination (坐标)唯一标识一个依赖。

任何基于Maven构建的项目自身也必须定义这三项属性，生成的包可以是 Jar 包，也可以是 war 包或者 jar 包。

一个典型的依赖引用如下所示：

````xml
<dependency>
	<groupId> javax.servlet</groupId>
	<artifactId>javax.servlet-api </artifactId>
	<version>3.1.0</version>
</dependency>
````

**坐标属性的理解**

Maven 坐标为各种组件引入了秩序，任何一个组件都必须明确定义自己的坐标。

- **groupld**

  定义当前 Maven 项目隶属的实际项目公司名称。( jar 包所在仓库路径) 由于 Maven 中模块的概念， 因此一个实际项目往往会被划分为很多模块。比如 spring 是一个实际项目， 其对应的 Maven 模块会有很多，如 spring-core，spring-webmvc 等。

- **artifactld**

  该元素定义实际项目中的一个 Maven 模块项目名，推荐的做法是使用实际项目名称作为 artifactld 的前缀。比如: spring-bean, spring-webmvc 等。

- **version**

  该元素定义Maven项目当前所处的版本。

### 多模块构建

项目复查时 dao/service/controller 层分离将一个项目分解为多 个模块已经是很通用的一种方式。

在 Maven 中需要定义一个 parent POM 作为一组 module 的聚合POM。在该 POM 中可以使用 `<modules>` 标签来定义一组子模块。parent POM 不会有什么实际构建产出。而 parent POM 中的 build 配置以及依赖配置都会自动继承给子 module。

## 一致的项目结构

Ant 时代大家创建 Java 项目目录时比较随意,然后通过 Ant 配置指定哪些属于 source,那些属于 testSource 等。而 Maven 在设计之初的理念就是 Conversion over configuration (约定大于配置)。其制定了一套项目目录结构作为标准的 Java 项目结构,解决不同 ide 带来的文件目录不一致问题。

### 一致的构建模型和插件机制

````xml
<p1ugin>
	<groupId>org.mortbay.jetty</groupId>
	<artifactId>maven-jetty-plugin</artifactId>
	<version>6.1.25</version>
	<configuration>
	<scanIntervalSeconds>10</scanIntervalSeconds>
	<contextPath>/test</contextPath>
	</configuration>
</p1ugin>
````