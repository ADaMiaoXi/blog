---
title: 常用命令
icon: clarity:command-line
order: 5
category:
    - Docker
---

## 帮助/启动类命令

### 启动 docker

```shell
systemctl start docker
```

### 停止 docker

```shell
systemctl stop docker`
```

### 重启 docker

```shell
systemctl restart docker
```

### 查看 docker 状态

```shell
systemctl status docker
```

### 开机启动

```shell
systemctl enable docker
```

### 查看 docker 概要信息

```shell
docker info
```

### 查看 docker 总体帮助文档

```shell
docker --help
```

### 查看 docker 命令帮助文档

```shell
docker 具体命令 --help
```

## 镜像命令

### 列出本地镜像

```shell
docker images
```

`OPTIONS` 说明：
`-a`：列出本地所有的镜像（含历史映像层）
`-q`：只显示镜像 ID。

![](../../../.vuepress/public/assets/images/server/docker/docker-image.png)

`REPOSITORY`：表示镜像的仓库源
`TAG`：镜像的标签版本号
`IMAGE ID`：镜像 ID
`CREATED`：镜像创建时间
`SIZE`：镜像大小

> 同一仓库源可以有多个 `TAG` 版本，代表这个仓库源的不同个版本，我们使用 REPOSITORY:TAG 来定义不同的镜像。
> 如果不指定一个镜像的版本标签，例如只使用 ubuntu，docker 将默认使用 ubuntu:latest 镜像

### 搜索镜像

```bash
docker search [OPTIONS] imageName
```

`OPTIONS` 说明：
`--limit`: 只列出 N 个镜像，默认 25 个

```shell
docker search --limit 5 redis
```

![](../../../.vuepress/public/assets/images/server/docker/docker-search.png)

`NAME`：镜像名
`DESCRIPTION`：镜像描述
`STARS`：点赞数
`OFFICIAL`：是否官方镜像
`AUTOMATED`：是否自动构建

### 下载镜像

```bash
docker pull imageName[:TAG]
```

`TAG`：镜像版本，默认为 latest

```bash
docker pull ubuntu
```

![](../../../.vuepress/public/assets/images/server/docker/docker-pull.png)

### 查看镜像/容器/数据卷所占的空间

```bash
docker system df
```

![](../../../.vuepress/public/assets/images/server/docker/docker-system-df.png)

### 删除镜像

-   删除单个

```bash
docker rmi [-f] imageID
```

-   删除多个

```bash
docker rmi [-f] imageName1:TAG imageName2:TAG
```

-   删除所有

```bash
docker rmi -f $(docker images -qa)
```

## 容器命令

### 新建 + 启动容器

```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

`OPTIONS` 说明
`--name="ContainerName"`：为容器指定一个名称；
`-d`：后台运行容器并返回容器 ID，也即启动守护式容器(后台运行)；
`-i`：以交互模式运行容器，通常与 `-t` 同时使用；
`-t`：为容器重新分配一个伪输入终端，通常与 `-i` 同时使用；也即启动交互式容器(前台有伪终端，等待交互)；
`-P`：随机端口映射，大写 P
`-p`：指定端口映射，小写 p
|参数|举例|
|-|-|
|`-p hostPort:containerPort`|端口映射 `-p 8080:80`|
|`-p hostIp:hostPort:containerPort`|配置监听地址 `-p 192.168.0.1:8080:80`|
|`-p hostIp::containerPort`|随机分配端口 `-p 192.168.0.1::80`|
|`-p hostPort:containerPort:udp`|指定协议 `-p 8080:80:udp`|
|`-p **** -p ****`|指定多个 `-p 87:80 -p 433:433`|
