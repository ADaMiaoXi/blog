---
title: 常见请求方法
icon: tabler:http-post
order: 2
category:
  - 网络
---

## 请求方法的本质

![]( ../../../../src/.vuepress/public/assets/images/more-than-code/network/requestMethods/image.png)

请求方法是请求行中的第一个单词，它向服务器描述了客户发出请求的动作类型。在 HTTP 协议中，不同的请求方法只是包含了不同的语义，但服务器和浏览器的一些约定俗成的行为造成了它们具体的区别。

```js
fetch('https://www.baidu.com',{
      method: 'getPic' // 告诉百度，这次请求是来获取图片的
})
```
上面的请求中，我们使用了自定义方法 `getPic`。虽然百度服务器无法理解这是什么，但这样的请求也是可以正常发送到百度服务器的。

在实践中，客户端和服务器慢慢形成了一个共识，约定俗成的规定了一些常见的请求方法：

- **GET**：表示向服务器获取资源。业务数据在请求行中，无需请求体。
- **POST**：表示向服务器提交数据，通常用于产生新的数据，比如注册。业务数据在请求体中。
- **PUT**：表示希望修改服务器的数据，通常用于修改，业务数据在请求体中。
- **DELETE**：表示希望删除服务器的数据。业务数据在请求行中，无需请求体。
- **OPTIONS**：发生在跨域的预检请求中，表示客户端向服务器申请跨域提交。
- **TRACE**：回显服务器收到的请求，主要用于测试和诊断。
- **CONNECT**：用于建立链接管道，通江在代理场景中使用，网页中很少用到。

## GET 和 POST 的区别

由于浏览器和服务器约定俗称的规则，造成了 GET 和 POST 在 web 中的区别：

1. 浏览器在发送 GET 请求时，不会附带请求体。
2. GET 请求的传递信息量有限（各个浏览器的限制不一样），适合传递少量数据；POST 请求没有限制。
3. GET 请求只能传递 ASCII 数据（浏览器规定请求行和请求头中只能是 ASCII 数据），遇到非 ASCII 数据需要进行编码（浏览器自动进行编码），POST 请求没有限制。
4. 大部分 GET 请求传递的数据都附带在 path 参数中，能够通过分享地址完整的重现页面，但同时也暴露了数据，若有敏感数据传递，不应该使用 GET 请求，至少不应该放到 path 中。
5. 刷新页面时，若当前页面是通过 POST 请求得到的，则浏览器会提示用户是否重新提交。若是 GET 请求得到的页面则没有提示。
6. GET 请求的地址可以被保存为浏览器书签，POST 不可以（书签保存不会保存请求体）

## 问答

1. http 常见请求反方有哪些？

   > 参考答案：
   >
   > - GET，表示向服务器获取资源
   > - POST，表示向服务器提交信息，通常用于产生新的数据，比如注册
   > - PUT：表示希望修改服务器的数据，通常用于修改
   > - DELETE：表示希望删除服务器的数据
   > - OPTIONS：发生在跨域与监测请求中，表示客户端向服务器申请跨域提交
   > - TRACE：回显服务器接到的请求，主要用于测试和诊断
   > - CONNECT：用于建立链接管道，通常在代理场景中使用，网页中很少用到

2. GET 和 POST 的区别

   > 参考答案：
   >
   > 1. 浏览器在发送 GET 请求时，不会附带请求体。
   > 2. GET 请求的传递信息量有限（各个浏览器的限制不一样），适合传递少量数据；POST 请求没有限制。
   > 3. GET 请求只能传递 ASCII 数据（浏览器规定请求行和请求头中只能是 ASCII 数据），遇到非 ASCII 数据需要进行编码（浏览器自动进行编码），POST 请求没有限制。
   > 4. 大部分 GET 请求传递的数据都附带在 path 参数中，能够通过分享地址完整的重现页面，但同时也暴露了数据，若有敏感数据传递，不应该使用 GET 请求，至少不应该放到 path 中。
   > 5. 刷新页面时，若当前页面是通过 POST 请求得到的，则浏览器会提示用户是否重新提交。若是 GET 请求得到的页面则没有提示。
   > 6. GET 请求的地址可以被保存为浏览器书签，POST 不可以（书签保存不会保存请求体）