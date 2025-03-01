"use strict";(self.webpackChunkmiaoxi_blog=self.webpackChunkmiaoxi_blog||[]).push([[544],{6262:(p,e)=>{e.A=(p,e)=>{const t=p.__vccOpts||p;for(const[p,o]of e)t[p]=o;return t}},1427:(p,e,t)=>{t.r(e),t.d(e,{comp:()=>i,data:()=>l});var o=t(641);const n={},i=(0,t(6262).A)(n,[["render",function(p,e){return(0,o.uX)(),(0,o.CE)("div",null,e[0]||(e[0]=[(0,o.Fv)("<p>列举优化网络性能的方法</p><blockquote><p>参考答案：</p><ul><li><p>优化打包体积</p><p>利用一些工具压缩、混淆最终打包代码、较少包体积。</p></li><li><p>多目标打包</p><p>利用一些打包插件，针对不同的浏览器打包出不同的兼容性版本，这样一来，每个版本中的兼容性代码就会大大减少，从而减少包体积。</p></li><li><p>压缩</p><p>现代浏览器普遍支持压缩格式，因此服务器的各种文件可以压缩后再响应给客户端，只要解压时间小于优化的传输时间，压缩就是可行的。</p></li><li><p>CDN</p><p>利用 CDN 可以大幅缩减静态资源的访问时间，特别是对于公共库的访问，可以使用知名的 CDN 资源，这样可以实现跨站点的缓存。</p><blockquote><p>CDN 服务器会就近使用，分散各服务器压力。</p></blockquote></li><li><p>缓存</p><p>对于除 HTML 外的所有静态资源均可以开启协商缓存，利用构建工具打包产生的文件hash 值来置换缓存。</p></li><li><p>http2</p><p>开启 http2 后，利用其多路复用、头部压缩等特点，充分利用贷款传递大量的文件数据。</p></li><li><p>sprint 图</p><p>对于不适用 http2 的场景，可以将多个图片合并为 sprint 图，以达到减少文件的目的。</p></li><li><p>defer、async</p><p>通过 <code>defer</code> 和 <code>async</code> 属性，可以让页面尽早加载 js 文件。</p></li><li><p>prefetch、preload</p><p>通过 <code>prefetch</code> 属性，可以让页面在空闲时预先下载其他页面可能要用到的资源。</p><p>通过 <code>preload</code> 属性，可以让页面预先下载本页面可能要用到的资源。</p></li><li><p>多个静态资源域</p><p>将多个独立的静态资源分到多个域中保存，可以让浏览器同时开启多个 TCP 连接，并行下载</p><blockquote><p>浏览器对一个域的访问最多创建 6 个 TCP 连接进行数据访问，但是对不同域的 TCP 连接数量不做限制。</p></blockquote></li></ul></blockquote>",2)]))}]]),l=JSON.parse('{"path":"/posts/moreThanCode/network/networkPerformanceOptimization.html","title":"网络性能优化","lang":"zh-CN","frontmatter":{"title":"网络性能优化","icon":"gears","order":19,"category":["网络"],"description":"列举优化网络性能的方法 参考答案： 优化打包体积 利用一些工具压缩、混淆最终打包代码、较少包体积。 多目标打包 利用一些打包插件，针对不同的浏览器打包出不同的兼容性版本，这样一来，每个版本中的兼容性代码就会大大减少，从而减少包体积。 压缩 现代浏览器普遍支持压缩格式，因此服务器的各种文件可以压缩后再响应给客户端，只要解压时间小于优化的传输时间，压缩就是...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/posts/moreThanCode/network/networkPerformanceOptimization.html"}],["meta",{"property":"og:site_name","content":"大喵喜的技术杂货铺"}],["meta",{"property":"og:title","content":"网络性能优化"}],["meta",{"property":"og:description","content":"列举优化网络性能的方法 参考答案： 优化打包体积 利用一些工具压缩、混淆最终打包代码、较少包体积。 多目标打包 利用一些打包插件，针对不同的浏览器打包出不同的兼容性版本，这样一来，每个版本中的兼容性代码就会大大减少，从而减少包体积。 压缩 现代浏览器普遍支持压缩格式，因此服务器的各种文件可以压缩后再响应给客户端，只要解压时间小于优化的传输时间，压缩就是..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-01T01:36:08.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-01T01:36:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"网络性能优化\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-01T01:36:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Jianshu.Shi\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[],"git":{"createdTime":1739717238000,"updatedTime":1740792968000,"contributors":[{"name":"damiaoxi","username":"damiaoxi","email":"miaoxi1110@gmail.com","commits":2,"url":"https://github.com/damiaoxi"}]},"readingTime":{"minutes":1.72,"words":517},"localizedDate":"2025年2月16日","excerpt":"<p>列举优化网络性能的方法</p>\\n<blockquote>\\n<p>参考答案：</p>\\n<ul>\\n<li>\\n<p>优化打包体积</p>\\n<p>利用一些工具压缩、混淆最终打包代码、较少包体积。</p>\\n</li>\\n<li>\\n<p>多目标打包</p>\\n<p>利用一些打包插件，针对不同的浏览器打包出不同的兼容性版本，这样一来，每个版本中的兼容性代码就会大大减少，从而减少包体积。</p>\\n</li>\\n<li>\\n<p>压缩</p>\\n<p>现代浏览器普遍支持压缩格式，因此服务器的各种文件可以压缩后再响应给客户端，只要解压时间小于优化的传输时间，压缩就是可行的。</p>\\n</li>\\n<li>\\n<p>CDN</p>\\n<p>利用 CDN 可以大幅缩减静态资源的访问时间，特别是对于公共库的访问，可以使用知名的 CDN 资源，这样可以实现跨站点的缓存。</p>\\n<blockquote>\\n<p>CDN 服务器会就近使用，分散各服务器压力。</p>\\n</blockquote>\\n</li>\\n<li>\\n<p>缓存</p>\\n<p>对于除 HTML 外的所有静态资源均可以开启协商缓存，利用构建工具打包产生的文件hash 值来置换缓存。</p>\\n</li>\\n<li>\\n<p>http2</p>\\n<p>开启 http2 后，利用其多路复用、头部压缩等特点，充分利用贷款传递大量的文件数据。</p>\\n</li>\\n<li>\\n<p>sprint 图</p>\\n<p>对于不适用 http2 的场景，可以将多个图片合并为 sprint 图，以达到减少文件的目的。</p>\\n</li>\\n<li>\\n<p>defer、async</p>\\n<p>通过 <code>defer</code> 和 <code>async</code> 属性，可以让页面尽早加载 js 文件。</p>\\n</li>\\n<li>\\n<p>prefetch、preload</p>\\n<p>通过 <code>prefetch</code> 属性，可以让页面在空闲时预先下载其他页面可能要用到的资源。</p>\\n<p>通过 <code>preload</code> 属性，可以让页面预先下载本页面可能要用到的资源。</p>\\n</li>\\n<li>\\n<p>多个静态资源域</p>\\n<p>将多个独立的静态资源分到多个域中保存，可以让浏览器同时开启多个 TCP 连接，并行下载</p>\\n<blockquote>\\n<p>浏览器对一个域的访问最多创建 6 个 TCP 连接进行数据访问，但是对不同域的 TCP 连接数量不做限制。</p>\\n</blockquote>\\n</li>\\n</ul>\\n</blockquote>","autoDesc":true}')}}]);