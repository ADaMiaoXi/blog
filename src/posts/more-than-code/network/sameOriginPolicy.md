---
title: 同源策略
icon: fluent-mdl2:view-original
order: 7
category:
  - 网络
---

浏览器有一个重要的安全策略，称之为「同源策略」。

其中，源 = 协议 + 主机 + 端口，两个源相同，称之为同源，两个源不同，称之为跨源或跨域。

比如：

| 源 1                  | 源 2                      | 是否同源 |
| --------------------- | ------------------------- | -------- |
| http://www.baidu.com  | http://www.baidu.com/news | 是       |
| https://www.baidu.com | http://www.baidu.com      | 否       |
| http://localhost:5000 | http://localhost:7000     | 否       |
| http://localhost:7000 | http://127.0.0.1:5000     | 否       |
| http://127.0.0.1:5000 | http://baidu.com          | 否       |

**同源策略是指，若页面的源和页面运行过程中加载的源不一致时，出于安全考虑，浏览器会对跨域的资源访问进行一些限制**

![]( ../../../../src/.vuepress/public/assets/images/more-than-code/network/sameOriginPolicy/image-20240225211457276.png)

同源策略对 ajax 的跨域限制的最为凶狠，默认情况下，它不允许 ajax 访问跨域资源。

![]( ../../../../src/.vuepress/public/assets/images/more-than-code/network/sameOriginPolicy/image-20240225211538760.png)

所以，我们通常所说的跨域问题,就是同源策略对 ajax 产生的影响。

有多种方式解决跨域问题，常见的有:

- **代理**，常用
- **CORS**，常用
- JSONP

无论使用哪一种方式，都是要让浏览器知道，我这次跨域请求的是自己人，就不要拦截了。