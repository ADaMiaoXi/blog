---
title: 跨域-代理
icon: carbon:server-proxy
order: 8
category:
  - 网络
---

**对于前端开发而言**，大部分的跨域问题，都是通过代理解决的

**代理适用的场景是:生产环境不发生跨域，但开发环境发生跨域**

因此，只需要在开发环境使用代理解决跨域即可，这种代理又称之为开发代理

![](../../../../src/.vuepress/public/assets/images/moreThanCode/network/crossDomain/image-20240225212728820.png)

在实际开发中，只需要对开发服务器稍加配置即可完成

````javascript
// vue 的开发服务器代理配置
// vue.config.js
module.exports = {
    devServer: {// 配置开发服务器
        proxy: { // 配置代理
            "/api":{ // 若请求路径以 /api 开头
                target: "http://dev.taobao.com" //将其转发到 http://dev.taobao.com
            }
        }
    }
}
````