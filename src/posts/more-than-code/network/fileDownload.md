---
title: 文件下载
icon: line-md:download-outline-loop
order: 13
category:
  - 网络
---

服务器只要在请求的响应头中加入 `Content-Disposition: attachment; filename="xxx"` 即可触发浏览器的下载功能
其中:

`attachment` 表示响应是个附件，浏览器看到此字段，触发下载行为(不同的浏览器下载行为有所区别)。

`filename="xxx"`, 这是告诉浏览器，保存文件时使用的默认文件名。

这部分操作是由服务器完成的，和前端开发无关。