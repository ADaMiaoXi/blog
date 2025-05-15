---
title: 常用操作
icon: lsicon:operation-outline
order: 4
category:
    - Linux
---

## 常用操作

### 强制停止

`Ctrl + C` 强制停止

-   Linux 某些程序的运行，如果想强制停止，可使用快捷键 `Ctrl + C`。
-   命令输入错误，也可以通过快捷键 `Ctrl + C`，退出当前输入。

### 退出或登出

-   可以通过快捷键 `Ctrl + D`，退出当前登录用户。
-   也可以使用 `Ctrl + D` 退出某些程序专属界面，如 `python`

### 历史命令搜索

-   可以使用 `history` 命令，产看历史输入过的命令。
-   可以通过：`!` 命令前缀，自动执行上一次匹配前缀的命令

```bash
$ history
1  ls -l
2  ifconfig
3  ls
4  python
5  history

$ !py
python
```

-   可以通过快捷键：`ctrl + r`，输入内容去匹配历史命令
    如果搜索到的内容是你需要的，那么： - 回车键可以直接执行 - 键盘左右键，可以得到此命令（不执行）

### 光标移动快捷键

-   `ctrl + a`，跳到命令开头
-   `ctrl + e`，跳到命令结尾
-   `ctrl + ←`，向左跳一个单词
-   `ctrl + →`，向右跳一个单词

### 清屏

-   通过快捷键 `ctrl + l`，可以清空终端内容
-   通过命令 `clear` 得到同样效果

## 软件安装

-   CentOS 系统使用：
    -   `yum [install remove search] [-y] 软件名称`
        -   `install` 安装
        -   `remove` 卸载
        -   `search` 搜索
        -   `-y`，自动确认
-   Ubuntu 系统使用
    -   `apt [install remove search] [-y] 软件名称`
        -   `install` 安装
        -   `remove` 卸载
        -   `search` 搜索
        -   `-y`，自动确认

> `yum` 和 `apt` 均需要 root 权限

## 控制系统服务

功能：控制系统服务的启动关闭等

语法：`systemctl start | stop | restart | disable | enable | status 服务名`

-   `start`，启动
-   `stop`，停止
-   `status`，查看状态
-   `disable`，关闭开机自启
-   `enable`，开启开机自启
-   `restart`，重启

## 软链接

功能：创建文件、文件夹软链接（快捷方式）

语法：`ln -s 参数1 参数2`

-   参数 1：被链接的
-   参数 2：要链接去的地方（快捷方式的名称和存放位置）

## 时间

### 日期

语法：`date [-d] [+格式化字符串]`

-   `-d` 按照给定的字符串显示日期，一般用于日期计算

-   格式化字符串：通过特定的字符串标记，来控制显示的日期格式
    -   `%Y` 年%y 年份后两位数字 (00..99)
    -   `%m` 月份 (01..12)
    -   `%d` 日 (01..31)
    -   `%H` 小时 (00..23)
    -   `%M` 分钟 (00..59)
    -   `%S` 秒 (00..60)
    -   `%s` 自 1970-01-01 00:00:00 UTC 到现在的秒数

示例：

-   按照 `YYYY-MM-DD` 的格式显示日期

    ```bash
    $ date +%Y-%m-%d
    2025-5-11
    ```

-   按照 `YYYY-MM-DD hh:mm:ss` 的格式显示日期

    ```bash
    $ date "+%Y-%m-%d %H:%M:%S"
    2025-5-11 09:09:09
    ```

-   `-d` 选项日期计算

    ```bash
    date -d "+1 day" +%dy%m%d      # 获取明天的日期
    date -d "-1 day" +%dy%m%d      # 获取昨天的日期
    date -d "-1 month" +%dy%m%d    # 获取上月的日期
    date -d "+1 month" +%dy%m%d    # 获取下月的日期
    date -d "-1 year" +%dy%m%d     # 获取去年的日期
    date -d "+1 year" +%dy%m%d     # 获取明年的日期
    ```

-   支持的时间标记为：
    -   `year` 年
    -   `month` 月
    -   `day` 日
    -   `hour` 时
    -   `minte` 分
    -   `second` 秒

`-d` 选项可以和格式化字符串配合一起使用

### 时区

修改时区为中国时区

```bash
rf -f /etc/localtime
sudo ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

### 同步时间

功能：同步时间

安装：`yum install -y ntp`

启动管理：`systemctl start | stop | restart | status | disable | enable ntpd`

手动校准时间：`ntpdate -u ntp.aliyun.com`

## IP 地址

格式：`a.b.c.d`

-   abcd 为 0~255 的数字

特殊 IP：

-   `127.0.0.1`，表示本机
-   `0.0.0.0`
    -   可以表示本机
    -   也可以表示任意 IP（看使用场景）

查看 ip：`ifconfig`

![](../../../.vuepress/public/assets/images/server/linux/ifconfig.png)

如无法使用 ifconfig 命令，可以安装：

```bash
yum -y install net-tools
```

### 主机名

功能：Linux 系统的名称

查看：`hostname`

设置：`hostnamectl set-hostname 主机名`

### 配置 VMware 固定 IP

> 为什么需要固定 IP?
>
> 当前我们虚拟机的 Linux 操作系统，其 IP 地址是通过 DHCP 服务获取的。
> DHCP：动态获取 IP 地址，即每次重启设备后都会获取一次，可能导致 IP 地址频繁变更
>
> 原因 1：办公电脑 IP 地址变化无所谓，但是我们要远程连接到 Linux 系统，如果 IP 地址经常变化我们就要频繁修改适配很麻烦
>
> 原因 2：在刚刚我们配置了虚拟机 IP 地址和主机名的映射，如果 IP 频繁更改，我们也需要频繁更新映射关系

配置固定 IP 需要 2 个大步骤：

1. 在 VMware Workstation（或 Fusion）中配置 IP 地址网关和网段（IP 地址的范围）
   ![](../../../.vuepress/public/assets/images/server/linux/fix-ip-1.png)
   ![](../../../.vuepress/public/assets/images/server/linux/fix-ip-2.png)
   ![](../../../.vuepress/public/assets/images/server/linux/fix-ip-3.png)
   ![](../../../.vuepress/public/assets/images/server/linux/fix-ip-4.png)

2. 设置 Linux 内部固定 IP

    - 使用 vim 修改文件：`/etc/sysconfig/network-scripts/ifcfg-ens33`

    示例文件内容：

    ```shell
    TYPE="Ethernet"
    PROXY_METHOD="none"
    BROWSER_ONLY="no"
    BOOTPROTO="static"			# 改为static，固定IP
    DEFROUTE="yes"
    IPV4_FAILURE_FATAL="no"
    IPV6INIT="yes"
    IPV6_AUTOCONF="yes"
    IPV6_DEFROUTE="yes"
    IPV6_FAILURE_FATAL="no"
    IPV6_ADDR_GEN_MODE="stable-privacy"
    NAME="ens33"
    UUID="1b0011cb-0d2e-4eaa-8a11-af7d50ebc876"
    DEVICE="ens33"
    ONBOOT="yes"
    IPADDR="192.168.88.131"		# IP地址，自己设置，要匹配网络范围
    NETMASK="255.255.255.0"		# 子网掩码，固定写法255.255.255.0
    GATEWAY="192.168.88.2"		# 网关，要和VMware中配置的一致
    DNS1="192.168.88.2"			# DNS1服务器，和网关一致即可
    ```

    - 执行：`systemctl restart network` 重启网卡，执行 `ifconfig` 即可看到 ip 地址固定为 `192.168.88.130` 了

## 端口

Linux 系统是一个超大号小区，可以支持 65535 个端口，这 6 万多个端口分为 3 类进行使用：
公认端口：`1~1023`，通常用于一些系统内置或知名程序的预留使用，如 SSH 服务的 `22` 端口，HTTPS 服务的 `443` 端口
非特殊需要，不要占用这个范围的端口
注册端口：`1024~49151`，通常可以随意使用，用于松散的绑定一些程序/服务
动态端口：`49152~65535`，通常不会固定绑定程序，而是当程序对外进行网络链接时，用于临时使用。

![](../../../.vuepress/public/assets/images/server/linux/port.png)

如图中，计算机 A 的微信连接计算机 B 的微信，A 使用的 `50001` 即动态端口，临时找一个端口作为出口。
计算机 B 的微信使用端口 `5678`，即注册端口，长期绑定此端口等待别人连接。

### `nmap` 命令查看端口占用情况

可以通过 Linux 命令去查看端口的占用情况
使用 `nmap` 命令，安装 `nmap`:

```bash
yum -y install nmap
```

语法：

```bash
nmap 被查看的IP地址
```

![](../../../.vuepress/public/assets/images/server/linux/nmap-port.png)
可以看到，本机 `127.0.0.1`上有 5 个端口现在被程序占用了。
其中：
`22` 端口，一般是 SSH 服务使用，即 FinalShell 远程连接 Linux 所使用的端口

### `netstat` 命令查看端口占用

功能：查看端口占用

用法：

```bash
`netstat -anp | grep 端口号`
```

安装 `netstat`：

```bash
yum -y install net-tools
```

![](../../../.vuepress/public/assets/images/server/linux/netstat1.png)

如图，可以看到当前系统 `6000` 端口被程序（进程号 `7174`）占用了
其中，`0.0.0.0:6000`，表示端口绑定在 `0.0.0.0` 这个 IP 地址上，表示允许外部访问

![](../../../.vuepress/public/assets/images/server/linux/netstat2.png)

可以看到，当前系统 12345 端口无人使用。

## 下载和网络请求

### `ping` 命令

测试网络是否联通

语法：`ping [-c num] 参数`

-   选项：`-c`，检查的次数，不使用 `-c` 选项，将无限次持续检查
-   参数：ip 或主机名，被检查的服务器的 ip 地址或主机名地址
    示例：
-   检查百度是否连通
    ![](../../../.vuepress/public/assets/images/server/linux/ping-baidu.png)
    结果表示可以连通，延时 8ms 左右。
-   检查到 `39.155.66.10` 是否联通，只检查 3 次
    ![](../../../.vuepress/public/assets/images/server/linux/ping-ip.png)

### `wget` 命令

`wget` 是非交互式的文件下载器，可以在命令行内下载网络文件
语法：

```bash
wget [-b] URL
```

-   选项： `-b` 表示后台下载，会将日志写入到当前目录下的 wget.log 文件中
-   参数： `URL` 为要下载的文件的 URL
    示例：
-   下载 apache-hadoop 3.3.0 版本：

```bash
wget http://archive.apache.org/dist/hadoop/common/hadoop-3.3.0/hadoop-3.3.0.tar.gz
```

-   在后台下载：

```bash
wget -b http://archive.apache.org/dist/hadoop/common/hadoop-3.3.0/hadoop-3.3.0.tar.gz
```

-   通过 `tail` 命令监控后台下载进度：

```bash
tail -f wget-log
```

<font  color="red">注意：无论下载是否完成，都会生成要下载的文件，如果下载未完成，需要手动清理未完成的不可用文件</font>

### `curl` 命令

`curl` 可以发送 http 网络请求，可用于：下载文件、获取信息等
语法：

```bash
curl [-O] url
```

选项：`-O`，用于下载文件，当 url 是下载链接时，可以使用此选项保存文件
参数：`url`，要发起请求的网络地址

> 示例：
> 向 cip.cc 发起网络请求：
>
> ```bash
>   curl cip.cc
> ```
>
> ![](../../../.vuepress/public/assets/images/server/linux/curl.png)
>
> 向 python.itheima.com 发起网络请求：
>
> ```bash
> curl python.itheima.com
> ```
>
> 通过 curl 下载 hadoop-3.3.0 安装包：
>
> ```bash
> curl -O http://archive.apache.org/dist/hadoop/common/hadoop-3.3.0/hadoop-3.3.0.tar.gz
> ```

## 进程管理

### `ps` 命令查看进程

功能：查看进程信息

语法：

```bash
ps [-ef]
```

查看全部进程信息，可以搭配 grep 做过滤：`ps -ef | grep xxx`
选项：`-e`，显示出全部的进程
选项：`-f`，以完全格式化的形式展示信息（展示全部信息）
![](../../../.vuepress/public/assets/images/server/linux/ps.png)
从左到右分别是：
`UID`：进程所属的用户 ID
`PID`：进程的进程号 ID
`PPID`：进程的父 ID（启动此进程的其它进程）
`C`：此进程的 CPU 占用率（百分比）
`STIME`：进程的启动时间
`TTY`：启动此进程的终端序号，如显示?，表示非终端启动
`TIME`：进程占用 CPU 的时间
`CMD`：进程对应的名称或启动路径或启动命令

### `kill` 命令关闭进程

语法

```bash
kill [-9] 进程ID
```

选项： `-9` 强制终止进程。不使用此选项会向进程发送信号要求其关闭，但是否关闭看进程自身的处理机制。

![](../../../.vuepress/public/assets/images/server/linux/kill.png)

## 查看主机运行状态

### 查看系统资源占用

功能：命令查看 CPU、内存使用情况，类似 Windows 的任务管理器，默认<font color=red>每 5 秒</font>刷新一次

语法：`top`，按 q 或 ctrl + c 退出

#### top 命令内容详解

![](../../../.vuepress/public/assets/images/server/linux/top-1.png)

第一行：
![](../../../.vuepress/public/assets/images/server/linux/top-2.png)
top：命令名称，14:39:58：当前系统时间，up 6 min：启动了 6 分钟，2 users：2 个用户登录，load：1、5、15 分钟负载

第二行：
![](../../../.vuepress/public/assets/images/server/linux/top-3.png)
Tasks：175 个进程，1 running：1 个进程子在运行，174 sleeping：174 个进程睡眠，0 个停止进程，0 个僵尸进程

第三行：
![](../../../.vuepress/public/assets/images/server/linux/top-4.png)
%Cpu(s)：CPU 使用率，us：用户 CPU 使用率，sy：系统 CPU 使用率，ni：高优先级进程占用 CPU 时间百分比，id：空闲 CPU 率，wa：IO 等待 CPU 占用率，hi：CPU 硬件中断率，si：CPU 软件中断率，st：强制等待占用 CPU 率

第四、五行：
![](../../../.vuepress/public/assets/images/server/linux/top-5.png)
Kib Mem：物理内存，total：总量，free：空闲，used：使用，buff/cache：buff 和 cache 占用
KibSwap：虚拟内存（交换空间），total：总量，free：空闲，used：使用，buff/cache：buff 和 cache 占用

![](../../../.vuepress/public/assets/images/server/linux/top-6.png)

-   PID：进程 id
-   USER：进程所属用户
-   PR：进程优先级，越小越高
-   NI：负值表示高优先级，正表示低优先级
-   VIRT：进程使用虚拟内存，单位 KB
-   RES：进程使用物理内存，单位 KB
-   SHR：进程使用共享内存，单位 KB
-   S：进程状态（S 休眠，R 运行，Z 僵死状态，N 负数优先级，I 空闲状态）
-   %CPU：进程占用 CPU 率
-   %MEM：进程占用内存率
-   TIME+：进程使用 CPU 时间总计，单位 10 毫秒
-   COMMAND：进程的命令或名称或程序文件路径

可用选项：

| 支持选项 | 功能                                                                                                                                    |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `-p`     | 只显示某个进程的信息                                                                                                                    |
| `-d`     | 设置刷新时间,默认是 5s                                                                                                                  |
| `-c`     | 显示产生进程的完整命令，默认是进程名                                                                                                    |
| `-n`     | 指定刷新次数,比如 `top -n 3`，刷新输出 3 次后退出                                                                                       |
| `-b`     | 以非交互非全屏模式运行,以批次的方式执行 top，一般配合-n 指定输出几次统计信息，将输出重定向到指定文件，比如 `top -b -n 3 > /tmp/top.tmp` |
| `-i`     | 不显示任何闲置 (idle) 或无用 (zombie) 的进程                                                                                            |
| `-u`     | 查找特定用户启动的进程                                                                                                                  |

交互式模式中，可用快捷键：

| 按键 | 功能                                                                  |
| ---- | --------------------------------------------------------------------- |
| h 键 | 显示帮助画面                                                          |
| c 键 | 显示产生进程的完整命令，等同于 `-c` 参数，再次按下 c 键，变为默认显示 |
| f 键 | 选择需要展示的项目                                                    |
| M 键 | 根据驻留内存大小(RES)排序                                             |
| P 键 | 根据 CPU 使用百分比大小进行排序                                       |
| T 键 | 根据时间/累计时间进行排序                                             |
| E 键 | 切换顶部内存显示单位                                                  |
| e 键 | 切换进程内存显示单位                                                  |
| l 键 | 切换显示平均负载和启动时间信息                                        |
| i 键 | 不显示闲置或无用的进程，等同于-1 参数，再次按下，变为默认显示         |
| t 键 | 切换显示 CPU 状态信息                                                 |
| m 键 | 切换显示内存信息                                                      |

### 磁盘信息监控

#### `df` 命令

使用 `df` 命令，可以查看硬盘的使用情况
语法：

```bash
df [-h]
```

![](../../../.vuepress/public/assets/images/server/linux/df.png)

#### `iostat` 命令

查看 CPU、磁盘的相关信息
语法：

```bash
iostat [-x] [num1] [num2]
```

-   选项：`-x`，显示更多信息
-   `num1`：数字，刷新间隔，`num2`：数字，刷新几次

![](../../../.vuepress/public/assets/images/server/linux/iostat1.png)

> tps：该设备每秒的传输次数（Indicate the number of transfers per second that were issued to the device.）。"一次传输"意思是"一次 I/O 请求"。多个逻辑请求可能会被合并为"一次 I/O 请求"。"一次传输"请求的大小是未知的。

使用 `iostat` 的 `-x` 选项，可以显示更多信息

![](../../../.vuepress/public/assets/images/server/linux/iostat2.png)

> `rrqm/s`： 每秒这个设备相关的读取请求有多少被 Merge 了（当系统调用需要读取数据的时候，VFS 将请求发到各个 FS，如果 FS 发现不同的读取请求读取的是相同 Block 的数据，FS 会将这个请求合并 Merge, 提高 IO 利用率, 避免重复调用）；
> `wrqm/s`： 每秒这个设备相关的写入请求有多少被 Merge 了。
> `rsec/s`： 每秒读取的扇区数；sectors
> `wsec/`： 每秒写入的扇区数。
> `rKB/s`： 每秒发送到设备的读取请求数
> `wKB/s`： 每秒发送到设备的写入请求数
> `avgrq-sz`: 平均请求扇区的大小
> `avgqu-sz`: 平均请求队列的长度。毫无疑问，队列长度越短越好  
> `await`： 每一个 IO 请求的处理的平均时间（单位是微秒毫秒）
> `svctm`: 表示平均每次设备 I/O 操作的服务时间（以毫秒为单位）
> `%util`： 磁盘利用率

### 网络状态监控

可以使用 `sar` 命令查看网络的相关统计（sar 命令非常复杂，这里仅简单用于统计网络）

语法：

```bash
sar -n DEV num1 num2
```

选项：

-   `-n`: 查看网络
-   `DEV`: 表示查看网络接口
-   `num1`：刷新间隔（不填就查看一次结束）
-   `num2`：查看次数（不填无限次数）

![](../../../.vuepress/public/assets/images/server/linux/sar.png)

> 信息解读：
>
> -   `IFACE` 本地网卡接口的名称
> -   `rxpck/s` 每秒钟接受的数据包
> -   `txpck/s` 每秒钟发送的数据包
> -   `rxKB/S` 每秒钟接受的数据包大小，单位为 KB
> -   `txKB/S` 每秒钟发送的数据包大小，单位为 KB
> -   `rxcmp/s` 每秒钟接受的压缩数据包
> -   `txcmp/s` 每秒钟发送的压缩包
> -   `rxmcst/s` 每秒钟接收的多播数据包

## 环境变量

-   临时设置：export 变量名=变量值
-   永久设置：
    -   针对用户，设置用户 HOME 目录内：`~/.bashrc`文件
    -   针对全局，设置 `/etc/profile`

### `PATH` 变量

记录了执行程序的搜索路径

可以将自定义路径加入 PATH 内，实现自定义命令在任意地方均可执行的效果

### `$` 符号

可以取出指定的环境变量的值

语法：`$变量名`

示例：

`echo $PATH`，输出 PATH 环境变量的值

`echo ${PATH}ABC`，输出 PATH 环境变量的值以及 ABC

如果变量名和其它内容混淆在一起，可以使用${}

## 压缩/解压

### `tar` 命令
Linux 和 Mac 系统常用有 2 种压缩格式，后缀名分别是：
- `.tar`，称之为 tarball，归档文件，即简单的将文件组装到一个 `.tar` 的文件内，并没有太多文件体积的减少，仅仅是简单的封装
- `.gz`，也常见为 `.tar.gz`，gzip 格式压缩文件，即使用 gzip 压缩算法将文件压缩到一个文件内，可以极大的减少压缩后的体积
针对这两种格式，使用 tar 命令均可以进行压缩和解压缩的操作

语法：
```bash
tar [-c -v -x -f -z -C] 压缩包 被压缩1...被压缩2...被压缩N
```

`-c`：创建压缩文件，用于压缩模式
`-v`：显示压缩、解压过程，用于查看进度
`-x`：解压模式
`-f`：要创建的文件，或要解压的文件，-f 选项必须在所有选项中位置处于最后一个
`-z`：gzip 模式，不使用-z 就是普通的 tarball 格式
`-C`：选择解压的目的地，用于解压模式

#### **压缩**
`tar` 的常用组合为：
```bash
tar -cvf test.tar 1.txt 2.txt 3.txt
```
将 1.txt 2.txt 3.txt 压缩到 test.tar 文件内
```bash
tar -zcvf test.tar.gz 1.txt 2.txt 3.txt
```
将 1.txt 2.txt 3.txt 压缩到 test.tar.gz 文件内，使用 gzip 模式

> 注意：
> `-z` 选项如果使用的话，一般处于选项位第一个
> `-f` 选项，必须在选项位最后一个



#### **解压**

常用的 `tar` 解压组合有
```bash
tar -xvf test.tar
```
解压 test.tar，将文件解压至当前目录
```bash
tar -xvf test.tar -C /home/itheima
```
解压 test.tar，将文件解压至指定目录（/home/itheima）
```bash
tar -zxvf test.tar.gz -C /home/itheima
```
以 Gzip 模式解压 test.tar.gz，将文件解压至指定目录（/home/itheima）

> 注意：
> `-f` 选项，必须在选项组合体的最后一位
> `-z` 选项，建议在开头位置
> `-C` 选项单独使用，和解压所需的其它参数分开

### zip 命令
#### **`zip` 压缩**
语法：
```bash
zip [-r] [压缩包] [被压缩1]...[被压缩N]
```
- `-r`，被压缩的包含文件夹的时候，需要使用 `-r` 选项，和 `rm`、`cp` 等命令的 `-r` 效果一致

示例：
```bash
zip test.zip a.txt b.txt c.txt
```
将 a.txt b.txt c.txt 压缩到 test.zip 文件内
```bash
zip -r test.zip test babala a.txt
```
将 test、babala 两个文件夹和 a.txt 文件，压缩到 test.zip 文件内

#### **`unzip` 解压**
使用 `unzip` 命令，可以方便的解压 zip 压缩包
语法：
```bash
unzip [-d] 参数
```
- `-d`，指定要解压去的位置，同tar的-C选项
` 参数，被解压的zip压缩包文件

示例：
```bash
unzip test.zip
```
将 test.zip 解压到当前目录
```bash
unzip test.zip -d /home/babala
```
将 test.zip 解压到指定文件夹内（/home/babala）