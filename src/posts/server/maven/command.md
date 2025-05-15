---
title: Maven 命令
icon: clarity:command-line
order: 3
category:
    - Maven
---

## Maven 命令

了解 maven 的命令行操作并熟练运用常见的 maven 命令还是十分必要的，即使譬如 IDEA 等工具给我提供了图形界面化工具,但其底层还是依靠 maven 命令来驱动的。

Maven 的命令格式如下:

```shell
mvn [plugin-name]:[goal-name]
```

命令代表的含义：执行 `plugin-name` 插件的 `goal-name` 目标。

### 常用命令

| 命令                   | 描述                                                          |
| ---------------------- | ------------------------------------------------------------- |
| mvn -version           | mvn -version                                                  |
| mvn clean              | 清理项目生产的临时文件,一-般是模块下的 target 目录            |
| mvn compile            | 编译源代码，一般编译模块下的 src/main/java 目录               |
| mvn package            | 项目打包工具会在模块下的 target 目录生成 jar 或 war 等文件    |
| mvn test               | 测试命令,或执行 src/testjava/下 junit 的测试用例.             |
| mvn install            | 将打包的 jar/war 文件复制到你的本地仓库中,供其他模块使用      |
| mvn deploy             | 将打包的文件发布到远程参考提供其他人员进行下载依赖            |
| mvn site               | 生成项目相关信息的网站                                        |
| mvn eclipse:eclipse    | 将项目转化为 Eclipse 项目                                     |
| mvn dependency:tree    | 打印出项目的整个依赖树                                        |
| mvn archetype:generate | 创建 Maven 的普通 java 项目                                   |
| mvn tomcat7:run        | 在 tomcat 容器中运行 web 应用                                 |
| mvn jetty:run          | 调用 Jtty 插件的 Run 目标在 Jetty Servlet 容器中启动 web 应用 |

> 注意:运行 maven 命令的时候，首先需要定位到 maven 项目的目录， 也就是项目的 pom.xml 文件所在的目录。否则，必以通过参数来指定项目的目录。

### 命令参数

上面列举的只是比较通用的命令，其实很多命令都可以携带参数以执行更精准的任务。

#### `-D` 传入属性参数

例如:

```shell
mvn package -Dmaven.test.skip=true
```

以 `-D` 开头,将 `maven. test. skip` 的值设为 `true` ，就是告诉 maven 打包的时候跳过单元测试。同理，`mvn package -Dmaven.test.skip=true` 代表部署项目并跳过单元测试。

#### `-P` 使用指定的 Profile 配置

比如项目开发需要有多个环境，一般为开发，测试，预发，正式 4 个环境，在 pom.xml 中的配置如下:

```xml
<profiles>
	<profile>
		<id>dev</id>
		<properties>
			<env>dev</env>
		</properties>
		<activation>
			<activeByDefault>true</activeByDefault>
        </activation>
    </profile>
    <profile>
        <id>qa</id>
        <properties>
            <env>qa</env>
        </properties>
    </profile>
	<profile>
		<id>pre</id>
		<properties>
			<env>pre</env>
		</properties>
	</profile>
    <profile>
		<id>prod</id>
		<properties>
			<env>prod</env>
		</properties>
	</profile>
</profiles>
......
<build>
	<filters>
		<filter>config/${env}. properties</filter>
	</filters>
	<resources>
		<resource>
			<directory>src/main/resources</directory>
			<filtering>true</filtering>
		</resource>
	</resources>
......
</build>
```

profiles 定义了各个环境的变量 id，filters 中定义了变量配置文件的地址,其中地址中的环境变量就是上面 profile 中定义的值，resources 中是定义哪些目录下的文件会被配置文件中定义的变量替换。

通过 maven 可以实现按不同环境进行打包部署，例如:

```shell
mvn package -Pdev -Dmaven. test. skip-true
```

表示打包本地环境，并跳过单元测试。
