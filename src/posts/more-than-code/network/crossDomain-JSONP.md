---
title: 跨域-JSONP
icon: tabler:json
order: 10
category:
    - 网络
---

在 CORS 出现之前，人们想了一种奇妙的办法来实现跨域，这就是 JSONP。

要实现 JSONP，需要浏览器和服务器来一个天衣无缝的绝妙配合。

JSONP 的做法是当需要跨域请求时，不使用 AJAX，转而生成一个 `<script/>` 元素去请求服务器，由于浏览器并不阻止 `<script/>` 元素的请求，这样请求可以到达服务器。服务器拿到请求后，响应一段 JS 代码，这段代码实际上是一个函数调用，调用的是客户端预先生成好的函数，并把浏览器需要的数据作为参数传递到函数中，从而间接的把数据传递给客户端。

![](../../../../src/.vuepress/public/assets/images/more-than-code/network/crossDomain/image-20240226211907395.png)

JSONP 有着明显的缺点，即其只能支持 GET 请求。
