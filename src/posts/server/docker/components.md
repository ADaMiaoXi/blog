---
title: 基本组成
icon: nonicons:docker-16
order: 2
category:
    - Docker
---

## 镜像(image)

Docker 镜像（Image）就是一个只读的模板。镜像可以用来创建 Docker 容器，一个镜像可以创建很多容器。

它也相当于是一个 root 文件系统。比如官方镜像 centos:7 就包含了完整的一套 centos:7 最小系统的 root 文件系统。

相当于容器的“源代码”，docker 镜像文件类似于 Java 的类模板，而 docker 容器实例类似于 java 中 new 出来的实例对象。

## 容器(container)

1. 从面向对象角度
    Docker 利用容器（Container）独立运行的一个或一组应用，应用程序或服务运行在容器里面，容器就类似于一个虚拟化的运行环境，<font color=red>容器是用镜像创建的运行实例</font>。就像是 Java 中的类和实例对象一样，镜像是静态的定义，容器是镜像运行时的实体。容器为镜像提供了一个标准的和隔离的运行环境，它可以被启动、开始、停止、删除。每个容器都是相互隔离的、保证安全的平台

2. 从镜像容器角度
    <font color=red>可以把容器看做是一个简易版的 Linux 环境</font>（包括 root 用户权限、进程空间、用户空间和网络空间等）和运行在其中的应用程序。

## 仓库(repository)

仓库（Repository）是<font color=red>集中存放镜像</font>文件的地方。

类似于
Maven 仓库，存放各种 jar 包的地方；
github 仓库，存放各种 git 项目的地方；
Docker 公司提供的官方 registry 被称为 Docker Hub，存放各种镜像模板的地方。

仓库分为公开仓库（Public）和私有仓库（Private）两种形式。
最大的公开仓库是 Docker Hub(https://hub.docker.com/)，
存放了数量庞大的镜像供用户下载。国内的公开仓库包括阿里云 、网易云等
