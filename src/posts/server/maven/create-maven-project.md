---
title: Maven 项目的创建
icon: vscode-icons:folder-type-maven-opened
order: 5
category:
  - Maven
---

## 创建 Java 项目

### 项目创建

新建项目 "New" → "Project..."

![](../../../.vuepress/public/assets/images/server/maven/image-20230807143939053.png)

选择 "Maven Archetype"，输入项目名"Name"，项目目录"Location"，"JDK"，以及项目原型（Archetype），展开 Advanced setting，检查 "Groupid"，"Artifactid"，"Version" 是否正确。点击 create

![](../../../.vuepress/public/assets/images/server/maven/image-20230807144153143.png)

![](../../../.vuepress/public/assets/images/server/maven/image-20230807144618078.png)

项目创建成果，检查 该项目maven的配置：

![](../../../.vuepress/public/assets/images/server/maven/image-20230807145118893.png)

Maven 默认项目目录缺省，需要补齐：

![](../../../.vuepress/public/assets/images/server/maven/image-20230807145233704.png)

右击项目目录，"New" → "Directory":

![](../../../.vuepress/public/assets/images/server/maven/image-20230807145803118.png)

根据提示将四个目录创建出来:

![](../../../.vuepress/public/assets/images/server/maven/image-20230807145932610.png)


## 编译并打包 Java 项目

### 编译 Java 项目

选择 "Edit Configurations..."：

![](../../../.vuepress/public/assets/images/server/maven/image-20230807151413609.png)

点击 ＋ ，选择 "Maven"：

![](../../../.vuepress/public/assets/images/server/maven/image-20230807151521021.png)

输入操作名称（"Name"）compile，对应具体需要执行的命令 compile，点击 apply：

![](../../../.vuepress/public/assets/images/server/maven/image-20230807152100479.png)

点击箭头便可执行 mvn compile 编译 Java 代码

![](../../../.vuepress/public/assets/images/server/maven/image-20230807153548967.png)

### 打包 Java 项目

相同方法配置 package 操作，点击箭头即可开始打包 Java 项目，jar 包如下：

![](../../../.vuepress/public/assets/images/server/maven/image-20230807153951636.png)

### Demo
https://gitee.com/damiaoxi/java-technology-stack/tree/master/Maven/maven_project_created_by_idea

## 创建 web 项目

### 项目创建

"New" → "Project..." → "Maven Archetype" → "Archetype" → "maven-archetype-webpack" → "Create"

![](../../../.vuepress/public/assets/images/server/maven/image-20230809143757168.png)

![](../../../.vuepress/public/assets/images/server/maven/image-20230809143856274.png)

### 配置 jetty

````xml
<build>
    <finalName>web_maven_project_created_by_idea</finalName>
    <plugins>
        <!--jetty 插件-->
        <plugin>
            <groupId>org.eclipse.jetty</groupId>
            <artifactId>jetty-maven-plugin</artifactId>
            <version>10.0.10</version>
            <configuration>
                <scan>10</scan> <!--热部署，每10秒扫描一次-->
                <webApp>
                    <contextPath>/test</contextPath> <!--对外暴露的路径-->
                </webApp>
                <httpConnector>
                    <port>8899</port> <!--启动端口号，默认端口 8080-->
                </httpConnector>
            </configuration>
        </plugin>
    </plugins>
</build>
````

![](../../../.vuepress/public/assets/images/server/maven/image-20230809151445620.png)

![](../../../.vuepress/public/assets/images/server/maven/image-20230809151500153.png)

### 配置 tomcat

````xml
<!--Tomcat7 插件-->
<plugin>
    <groupId>org.apache.tomcat.maven</groupId>
    <artifactId>tomcat7-maven-plugin</artifactId>
    <version>2.2</version>
    <configuration>
        <port>8080</port> <!--启动端口号，默认端口 8080-->
        <path>/test</path> <!--对外暴露的路径-->
        <uriEncoding>UTF-8</uriEncoding>
        <server>tomcat7</server> <!--服务器名称-->
    </configuration>
</plugin>
````

![](../../../.vuepress/public/assets/images/server/maven/image-20230809162834696.png)

## Demo
https://gitee.com/damiaoxi/java-technology-stack/tree/master/Maven/web_maven_project_created_by_idea