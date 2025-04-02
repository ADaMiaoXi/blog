"use strict";(self.webpackChunkmiaoxi_blog=self.webpackChunkmiaoxi_blog||[]).push([[5855],{66262:(t,e)=>{e.A=(t,e)=>{const o=t.__vccOpts||t;for(const[t,r]of e)o[t]=r;return o}},1711:(t,e,o)=>{o.r(e),o.d(e,{comp:()=>a,data:()=>d});var r=o(20641);const i=o.p+"assets/img/image-20240227233335800.e59ff858.png",n={},a=(0,o(66262).A)(n,[["render",function(t,e){return(0,r.uX)(),(0,r.CE)("div",null,e[0]||(e[0]=[(0,r.Fv)('<p>CSRF (Cross-site request forgery, 跨站请求伪造) ，它是指攻击者利用了用户的身份信息，执行了用户非本意的操作。</p><figure><img src="'+i+'" alt="image-20240227233335800" tabindex="0" loading="lazy"><figcaption>image-20240227233335800</figcaption></figure><h3 id="_17-1-防御方式" tabindex="-1"><a class="header-anchor" href="#_17-1-防御方式"><span>17.1 防御方式</span></a></h3><table><thead><tr><th>防御手段</th><th>防御力</th><th>问题</th></tr></thead><tbody><tr><td>不使用 cookie</td><td>* * * * *</td><td>兼容性略差<br>SSR（浏览器渲染）会遇到困难，但可解决<br>&gt; 有的网站需要登陆方可显示内容，不带 cookie 在浏览器渲染的时候只会渲染出登陆页面，不利于搜索引擎优化。可以通过中间页跳转，在中间页调用 local storage 中的 token 进行登陆。从而解决该问题。</td></tr><tr><td>cookie 中使用 sameSite<br>（<br>set-cookie: sameSite = strict 的时候，发cookie 的时候会去验证当前所在的页面是否和cookie所属页面相同<br>set-cookie: sameSite = Lax 的售后，发 cookie 的时候 GET 请求不验证，POST 请求验证<br>）</td><td>* * * *</td><td>兼容性差<br>容易挡住自己人</td></tr><tr><td>使用 CSRF token<br>（客户端获取到真网站之后真网站会给客户端一个 token，并将该 token 存在 session 中。在完成真网站操作后，session 直接删除该 token）</td><td>* * * * *</td><td>获取到 token 后未进行操作仍然会被攻击</td></tr><tr><td>使用 referer 防护</td><td>**</td><td>过去很常用，现在已经发现漏洞</td></tr></tbody></table><h3 id="_17-2-问答" tabindex="-1"><a class="header-anchor" href="#_17-2-问答"><span>17.2 问答</span></a></h3><p>介绍 CSRF 攻击</p><blockquote><p>CSRF 是跨站请求伪造，是一种挟制用户在当前已登录的Web应用上执行非本意的操作的攻击方法。</p><p>它首先引导用户访问一个危险网站，当用户访问网站后，网站会发送请求到被攻击的站点，这<br> 次请求会携带用户的cookie发送，因此就利用了用户的身份信息完成攻击。</p><p>防御 CSRF 攻击有多种手段:</p><ol><li>不使用 cookie</li><li>为表单添加校验的 token 校验</li><li>cookie中使用 sameSite 字段</li><li>服务器检查 referer 字段</li></ol></blockquote>',7)]))}]]),d=JSON.parse('{"path":"/posts/moreThanCode/network/CSRFAttack.html","title":"CSRF攻击","lang":"zh-CN","frontmatter":{"title":"CSRF攻击","icon":"mdi:bug","order":17,"category":["网络"],"description":"CSRF (Cross-site request forgery, 跨站请求伪造) ，它是指攻击者利用了用户的身份信息，执行了用户非本意的操作。 image-20240227233335800image-20240227233335800 17.1 防御方式 17.2 问答 介绍 CSRF 攻击 CSRF 是跨站请求伪造，是一种挟制用户在当前已登录的W...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/posts/moreThanCode/network/CSRFAttack.html"}],["meta",{"property":"og:site_name","content":"大喵喜的技术杂货铺"}],["meta",{"property":"og:title","content":"CSRF攻击"}],["meta",{"property":"og:description","content":"CSRF (Cross-site request forgery, 跨站请求伪造) ，它是指攻击者利用了用户的身份信息，执行了用户非本意的操作。 image-20240227233335800image-20240227233335800 17.1 防御方式 17.2 问答 介绍 CSRF 攻击 CSRF 是跨站请求伪造，是一种挟制用户在当前已登录的W..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-01T15:00:17.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-01T15:00:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CSRF攻击\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-01T15:00:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Jianshu.Shi\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":3,"title":"17.1 防御方式","slug":"_17-1-防御方式","link":"#_17-1-防御方式","children":[]},{"level":3,"title":"17.2 问答","slug":"_17-2-问答","link":"#_17-2-问答","children":[]}],"git":{"createdTime":1739717238000,"updatedTime":1740841217000,"contributors":[{"name":"damiaoxi","username":"damiaoxi","email":"miaoxi1110@gmail.com","commits":3,"url":"https://github.com/damiaoxi"}]},"readingTime":{"minutes":1.66,"words":497},"localizedDate":"2025年2月16日","excerpt":"<p>CSRF (Cross-site request forgery, 跨站请求伪造) ，它是指攻击者利用了用户的身份信息，执行了用户非本意的操作。</p>\\n<figure><figcaption>image-20240227233335800</figcaption></figure>\\n<h3>17.1 防御方式</h3>\\n<table>\\n<thead>\\n<tr>\\n<th>防御手段</th>\\n<th>防御力</th>\\n<th>问题</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>不使用 cookie</td>\\n<td>* * * * *</td>\\n<td>兼容性略差<br>SSR（浏览器渲染）会遇到困难，但可解决<br>&gt; 有的网站需要登陆方可显示内容，不带 cookie 在浏览器渲染的时候只会渲染出登陆页面，不利于搜索引擎优化。可以通过中间页跳转，在中间页调用 local storage 中的 token 进行登陆。从而解决该问题。</td>\\n</tr>\\n<tr>\\n<td>cookie 中使用 sameSite<br>（<br>set-cookie: sameSite = strict 的时候，发cookie 的时候会去验证当前所在的页面是否和cookie所属页面相同<br>set-cookie: sameSite = Lax 的售后，发 cookie 的时候 GET 请求不验证，POST 请求验证<br>）</td>\\n<td>* * * *</td>\\n<td>兼容性差<br>容易挡住自己人</td>\\n</tr>\\n<tr>\\n<td>使用 CSRF token<br>（客户端获取到真网站之后真网站会给客户端一个 token，并将该 token 存在 session 中。在完成真网站操作后，session 直接删除该 token）</td>\\n<td>* * * * *</td>\\n<td>获取到 token 后未进行操作仍然会被攻击</td>\\n</tr>\\n<tr>\\n<td>使用 referer 防护</td>\\n<td>**</td>\\n<td>过去很常用，现在已经发现漏洞</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}')}}]);