"use strict";(self.webpackChunkmiaoxi_blog=self.webpackChunkmiaoxi_blog||[]).push([[662],{6262:(i,e)=>{e.A=(i,e)=>{const s=i.__vccOpts||i;for(const[i,l]of e)s[i]=l;return s}},8050:(i,e,s)=>{s.r(e),s.d(e,{comp:()=>c,data:()=>h});var l=s(641);const t=s.p+"assets/img/image-20240229211708084.7d89d10a.png",a=s.p+"assets/img/image-20240229211924044.189515f2.png",n=s.p+"assets/img/image-20240229212111564.2852a4da.png",p=s.p+"assets/img/image-20240229212310228.5350c3f4.png",o={},c=(0,s(6262).A)(o,[["render",function(i,e){return(0,l.uX)(),(0,l.CE)("div",null,e[0]||(e[0]=[(0,l.Fv)('<h2 id="实时场景的旧处理方案" tabindex="-1"><a class="header-anchor" href="#实时场景的旧处理方案"><span>实时场景的旧处理方案</span></a></h2><p>考虑网页中的以下场景:</p><ul><li>股票K线图</li><li>聊天</li><li>警报、重要通知</li><li>余座</li><li>抢购页面的库存</li><li>......</li></ul><p>上述场景有一个共同特点 -- <strong>实时性</strong></p><p>这种对实时性有要求的页面，会带来一些问题</p><p>比如下面的聊天场景</p><img src="'+t+'" alt="image-20240229211708084" style="zoom:80%;"><p>由于HTTP协议是请求-响应模式，请求必须在前，响应必须在后，这就导致了服务器无法「主动」的把消息告诉客户端。</p><p>开发者想了很多办法来解决这一问题</p><p>当然终极解决方案自然是 WebSocket，但了解过去的一些做法、参观前辈们经历的痛苦还是有益的。</p><h3 id="短轮询-short-polling" tabindex="-1"><a class="header-anchor" href="#短轮询-short-polling"><span>短轮询 short polling</span></a></h3><p>短轮询是一种「话痨式」的方式</p><p>客户端每隔一小段时间就向服务器请求一次，询问有没有新消息</p><img src="'+a+'" alt="image-20240229211924044" style="zoom:80%;"><p>实现短轮询是非常简单的，客户端只需要设置一个计时器不断发送请求即可</p><p>这种方案的缺陷是非常明显的：</p><ul><li>会产生大量无意义的请求</li><li>会频繁打开关闭连接.</li><li>实时性并不高</li></ul><h3 id="长轮询-long-polling" tabindex="-1"><a class="header-anchor" href="#长轮询-long-polling"><span>长轮询 long polling</span></a></h3><p>我们的前辈在有限的条件下，充分发挥智慧，来解决短轮询的问题，于是演化为长轮询</p><figure><img src="'+n+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>长轮询有效的解决了「话痨问题」 ，让每一次请求和响应都是有意义的</p><p>但长轮询仍然存在问题:</p><ul><li><p>客户端长时间收不到响应会导致超时，从而主动断开和服务器的连接</p><blockquote><p>这种情况是可以处理的，但ajax请求因为超时而结束时，立即重新发送请求到服务器<br> 虽然这种做法会让之前的请求变得无意义，但毕竟比短轮询好多了</p></blockquote></li><li><p>由于客户端可能「过早的」请求了服务器，服务器不得不挂起这个请求直到新消息的出现。这会让服务器长时间的占用资源却没什么实际的事情可做。</p></li></ul><h2 id="websocket" tabindex="-1"><a class="header-anchor" href="#websocket"><span>WebSocket</span></a></h2><p>伴随着HTML 5出现的 WebSocket，从协议上赋予了服务器主动推送消息的能力。</p><img src="'+p+'" alt="image-20240229212310228" style="zoom:80%;"><p>从上图可以看出:</p><ul><li>WebSocket也是 建立在TCP协议之上的，利用的是TCP全双工通信的能力</li><li>使用WebSocket， 会经历两个阶段:握手阶段、通信阶段微</li></ul><p>虽然优于轮询方案，但 WebSocket 仍然是有缺点的:</p><ul><li><p>兼容性<br> WebSocket 是 HTML5 新增的内容，因此古董版本的浏览器并不支持</p></li><li><p>维持 TCP 连接需要消耗资源</p><p>对于那些消息量少的场景，维持 TCP 连接确实会造成资源的浪费</p><blockquote><p>为了充分利用TCP连接的资源，在使用了 WebSocket 的页面，可以放弃ajax，都用 WebSocket 进行通信，当然这会带来程序设计上的一些问题，需要权衡。</p></blockquote></li></ul><h3 id="握手" tabindex="-1"><a class="header-anchor" href="#握手"><span>握手</span></a></h3><blockquote><p>WebSocket协议是一个高扩展性的协议，详细内容会比较复杂，这里仅讲解面试中会问到握手协议</p></blockquote><p>当客户端需要和服务器使用WebSocket进行通信时，首先会使用HTTP协议完成--次特殊的请求 - 响应，这一次请求 - 响应就是 <strong>WebSocket 握手</strong></p><p>在握手阶段，首先由客户端向服务器发送一个请求，请求地址格式如下:</p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 使用HTTP</span></span>\n<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">ws://mysite.com/path</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 使用HTTPS </span></span>\n<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">WSs://mysite.com/path</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请求头如下:</p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Connection</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Upgrade /* 嘿，后续咱们别用HTTP了，升级吧*/</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Upgrade</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">websocket /* 我们把后续的协议升级为websocket */</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Sec -WebSocket-Version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">13 /* websocket协议版本 就用13好吗? */</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Sec-WebSocket- Key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">YWJzZmFkZmF zZmRhYw== / *暗号:天王盖地虎 */</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务器如果同意，就应该响应下面的消息</p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">HTTP/1.1 101 Switching Protocols /* 换，马上换协议 */</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Connection</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Upgrade /* 协议升级了 */</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Upgrade</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">websocket /*升级到websocket */</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Sec-WebSocket- Accept</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">ZzIzMzQ1Z2V3NDUyMzIzNGVy /* 暗号:小鸡炖蘑菇 */</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>握手完成，后续消息收发不再使用HTTP，任何一方都可以主动发消息给对方</strong></p><ol><li>webSocket 协议是什么，能简述一下吗?</li></ol><blockquote><p>参考答案:<br> websocket 协议 HTML5 带来的新协议，相对于 http， 它是一个持久连接的协议，它利用 http 协议完成握手，然后通过 FCP 连接通道发送消息，使用 websocket 协议可以实现服务器主动推送消息。</p><p>首先，客户端若要发起 websocket 连接，首先必须向服务器发送 http 请求以完成握手，请求行中的 path 需要使用 <code>ws:</code> 开头的地址，请求头中要分别加入<code> upgrade</code>、<code>connection</code>、<code>Sec-WebSocket-Key</code>、 <code>Sec-WebSocket-Version</code> 标记</p><p>然后，服务器收到请求后，发现这是一个 websocket 协议的握手请求，于是响应行中包含 <code>Switching Protocols</code>，同时响应头中包含 <code>upgrade</code>、 <code>connection</code>、 <code>Sec-WebSocket- Accept</code> 标记</p><p>当客户端收到响应后即可完成握手，随后使用建立的TCP 连接直接发送和接收消息。</p></blockquote><ol start="2"><li>webSocket 与传统的 http 有什么优势？</li></ol><blockquote><p>参考答案:<br> 当页面中需要观察实时数据的变化(比如聊天、k线图)时，过去我们往往使用两种方式完成</p><p>第一是短轮询，即客户端每隔一段时间就向服务器发送消息，询问有没有新的数据</p><p>第二种是长轮询，发起一次请求询问服务器，服务器可以将该请求挂起，等到有新消息时再进行响应。响应后，客户端立即又发起一-次请求，重复整个流程。</p><p>无论是哪一种方式，都暴露了 http 协议的弱点，即响应必须在请求之后发生，服务器是被动的，无法主动推送消息。而让客户端不断的发起请求又白白的占用了资源。</p><p>webSocket 的出现就是为了解决这个问题，它利用 http 协议完成握手之后，就可以与服务器建立持久的连接，服务器可以在任何需要的时候，主动推送消息给客户端，这样占用的资源最少，同时实时性也最高。</p></blockquote><ol start="3"><li><p>前端如何实现即时通讯?</p><blockquote><p>参考答案:</p><ol><li><p>短轮询。即客户端每隔一段时间就向服务器发送消息，询问有没有新的数据</p></li><li><p>长轮询，发起一次请求询问服务器，服务器可以将该请求挂起，等到有新消息时再<br> 进行响应。响应后，客户端立即又发起一次请求，重复整个流程。</p></li><li><p>websocket，握手完毕后会建立持久性的连接通道，随后服务器可以在任何时候推<br> 送新消息给客户端</p></li></ol></blockquote></li></ol>',45)]))}]]),h=JSON.parse('{"path":"/posts/moreThanCode/network/webSocket.html","title":"WebSocket","lang":"zh-CN","frontmatter":{"title":"WebSocket","icon":"gears","order":24,"category":["网络"],"description":"实时场景的旧处理方案 考虑网页中的以下场景: 股票K线图 聊天 警报、重要通知 余座 抢购页面的库存 ...... 上述场景有一个共同特点 -- 实时性 这种对实时性有要求的页面，会带来一些问题 比如下面的聊天场景 image-20240229211708084 由于HTTP协议是请求-响应模式，请求必须在前，响应必须在后，这就导致了服务器无法「主动」...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/posts/moreThanCode/network/webSocket.html"}],["meta",{"property":"og:site_name","content":"大喵喜的技术杂货铺"}],["meta",{"property":"og:title","content":"WebSocket"}],["meta",{"property":"og:description","content":"实时场景的旧处理方案 考虑网页中的以下场景: 股票K线图 聊天 警报、重要通知 余座 抢购页面的库存 ...... 上述场景有一个共同特点 -- 实时性 这种对实时性有要求的页面，会带来一些问题 比如下面的聊天场景 image-20240229211708084 由于HTTP协议是请求-响应模式，请求必须在前，响应必须在后，这就导致了服务器无法「主动」..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-01T01:36:08.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-01T01:36:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"WebSocket\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-01T01:36:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Jianshu.Shi\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"实时场景的旧处理方案","slug":"实时场景的旧处理方案","link":"#实时场景的旧处理方案","children":[{"level":3,"title":"短轮询 short polling","slug":"短轮询-short-polling","link":"#短轮询-short-polling","children":[]},{"level":3,"title":"长轮询 long polling","slug":"长轮询-long-polling","link":"#长轮询-long-polling","children":[]}]},{"level":2,"title":"WebSocket","slug":"websocket","link":"#websocket","children":[{"level":3,"title":"握手","slug":"握手","link":"#握手","children":[]}]}],"git":{"createdTime":1739717238000,"updatedTime":1740792968000,"contributors":[{"name":"damiaoxi","username":"damiaoxi","email":"miaoxi1110@gmail.com","commits":2,"url":"https://github.com/damiaoxi"}]},"readingTime":{"minutes":5.8,"words":1740},"localizedDate":"2025年2月16日","excerpt":"<h2>实时场景的旧处理方案</h2>\\n<p>考虑网页中的以下场景:</p>\\n<ul>\\n<li>股票K线图</li>\\n<li>聊天</li>\\n<li>警报、重要通知</li>\\n<li>余座</li>\\n<li>抢购页面的库存</li>\\n<li>......</li>\\n</ul>\\n<p>上述场景有一个共同特点 -- <strong>实时性</strong></p>\\n<p>这种对实时性有要求的页面，会带来一些问题</p>\\n<p>比如下面的聊天场景</p>\\n\\n<p>由于HTTP协议是请求-响应模式，请求必须在前，响应必须在后，这就导致了服务器无法「主动」的把消息告诉客户端。</p>\\n<p>开发者想了很多办法来解决这一问题</p>","autoDesc":true}')}}]);