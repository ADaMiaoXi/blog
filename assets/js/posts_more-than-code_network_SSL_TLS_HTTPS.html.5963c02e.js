"use strict";(self.webpackChunkmiaoxi_blog=self.webpackChunkmiaoxi_blog||[]).push([[9227],{66262:(e,t)=>{t.A=(e,t)=>{const o=e.__vccOpts||e;for(const[e,i]of t)o[e]=i;return o}},59119:(e,t,o)=>{o.r(t),o.d(t,{comp:()=>b,data:()=>P});var i=o(20641);const a=o.p+"assets/img/image-20240228204003253.f6870f51.png",p=o.p+"assets/img/image-20240228210207370.88e0a83b.png",s=o.p+"assets/img/image-20240228210328167.c7c0bd8c.png",l=o.p+"assets/img/image-20240228210356027.33852b40.png",r=o.p+"assets/img/image-20240228210513884.079973ed.png",c=o.p+"assets/img/image-20240228210629522.ee65aa72.png",m=o.p+"assets/img/image-20240228210727923.2e933a37.png",n=o.p+"assets/img/image-20240228210903265.7e75f965.png",S=o.p+"assets/img/image-20240228211220821.17467315.png",g=o.p+"assets/img/image-20240228211651570.3024769d.png",T=o.p+"assets/img/image-20240228211753681.12eb0194.png",d=o.p+"assets/img/image-20240228212004205.08fd8b6f.png",h=o.p+"assets/img/image-20240228212303433.3a333728.png",y=o.p+"assets/img/image-20240228212421176.333f8151.png",u=o.p+"assets/img/image-20240228212809823.e0a942f2.png",L=o.p+"assets/img/image-20240228212958732.7d5a60d8.png",k={},b=(0,o(66262).A)(k,[["render",function(e,t){return(0,i.uX)(),(0,i.CE)("div",null,t[0]||(t[0]=[(0,i.Fv)('<h2 id="ssl、tls、https-的关系" tabindex="-1"><a class="header-anchor" href="#ssl、tls、https-的关系"><span>SSL、TLS、HTTPS 的关系</span></a></h2><p>SSL (Secure Sockets Layer) ，安全套接字协议</p><p>TLS (Transport Layer Security) ，传输层安全性协议</p><p><strong>TLS是SSL的升级版，两者几乎是一样的</strong></p><p>HTTPS (Hyper Text Transfer Protocol over SecureSocket Layer) ，建立在 SSL 协议之上的 HTTP 协议</p><img src="'+a+'" alt="image-20240228204003253" style="zoom:67%;"><h2 id="怎么保证网络信息传输是安全的" tabindex="-1"><a class="header-anchor" href="#怎么保证网络信息传输是安全的"><span>怎么保证网络信息传输是安全的</span></a></h2><p>网络信息传输容易被中介人截获篡改</p><img src="'+p+'" alt="image-20240228210207370" style="zoom:50%;"><p>因此需要<strong>加密</strong>！</p><h4 id="_23-2-1-对称加密" tabindex="-1"><a class="header-anchor" href="#_23-2-1-对称加密"><span>23.2.1 对称加密</span></a></h4><img src="'+s+'" alt="image-20240228210328167" style="zoom:50%;"><img src="'+l+'" alt="image-20240228210356027" style="zoom:50%;"><p>使用堆成加密需要服务器先把秘钥 <code>key1</code> 传给客户端，这就完蛋了</p><img src="'+r+'" alt="image-20240228210513884" style="zoom:50%;"><p>第一个请求被截取就泄露秘钥了。。。</p><h3 id="_23-2-2-非对称加密" tabindex="-1"><a class="header-anchor" href="#_23-2-2-非对称加密"><span>23.2.2 非对称加密</span></a></h3><img src="'+c+'" alt="image-20240228210629522" style="zoom:50%;"><p>用私钥加密有一个问题：</p><img src="'+m+'" alt="image-20240228210727923" style="zoom:50%;"><p>客户端只有公钥用于加密，没有私钥进行解密，客户端收到公钥加密的消息看不懂。</p><p>因此可以这么解决这个问题：</p><img src="'+n+'" alt="image-20240228210903265" style="zoom:50%;"><p>服务器端先把公钥 <code>key1</code> 交给客户端，客户端生成公钥 <code>key2</code>，并使用公钥 <code>key1</code> 把公钥 <code>key2</code> 加密起来给服务端，服务端使用私钥 <code>key1</code> 解密拿到公钥 <code>key2</code>。</p><p>然后用公钥 <code>key2</code> 进行对称加密通信。</p><p>但是有一个破解方法：</p><img src="'+S+'" alt="image-20240228211220821" style="zoom:50%;"><img src="'+g+'" alt="image-20240228211651570" style="zoom:50%;"><p>中间人直接拦截公钥 <code>key1</code> 然后中间人保持与服务器端通信，用自己的私钥加密数据，发送公钥模拟服务器与客户端通信，从而实现数据拦截修改。</p><p>因此问题的关键就是不能让中间人伪造这个中间这个公钥。</p><p>因此引入了 CA （Certificate Authority）证书颁发机构。</p><img src="'+T+'" alt="image-20240228211753681" style="zoom:50%;"><p>证书办法机构会利用只有机构自己知道的私钥，将服务器的地址和公钥 <code>key1</code> 进行加密，得到证书DC（Digital Certificate）。机构的公钥官网可查，因此可以实现公钥 <code>key1</code> 的解密</p><p>DC的结构如下</p><img src="'+d+'" alt="image-20240228212004205" style="zoom:50%;"><p>证书签名包括域名和证书办法机构，并使用机构私钥进行加密，因此无法被修改，可用于保证整个证书没有办法被伪造。</p><p>因此接下来网络通信可以变成这样：</p><img src="'+h+'" alt="image-20240228212303433" style="zoom:50%;"><img src="'+y+'" alt="image-20240228212421176" style="zoom:50%;"><p>证书就算被中间人拿到了也没有办法篡改，因为中间人拿自己的私钥去加密数据，肯定是通不过客户端机构公钥解密的。而且中间人还没办法修改证书办法机构和域名，因为没有办法使用证书办法机构的私钥对其进行加密形成证书签名。</p><img src="'+u+'" alt="image-20240228212809823" style="zoom:50%;"><p>后续中间人只能拿到个公钥 <code>key1</code>，没有私钥 <code>key1</code> 也解不开公钥 <code>key1</code> 加密的公钥 <code>key2</code></p><p>接下来客户端和服务器端直接使用公钥 <code>key2</code> 对称加密进行通信好了。</p><img src="'+L+'" alt="image-20240228212958732" style="zoom:50%;"><h2 id="问答" tabindex="-1"><a class="header-anchor" href="#问答"><span>问答</span></a></h2><ol><li><p>介绍下 HTTPS 中间人攻击</p><blockquote><p>参考答案:<br> 针对 HTTPS 攻击主要有 SSL 劫持攻击和 SSL 剥离攻击两种。</p><p>SSL 劫持攻击是指攻击者劫持了客户端和服务器之间的连接，将服务器的合法证书替换为伪造的证书，从而获取客户端和服务器之间传递的信息。这种方式一般容易被用户发现，浏览器会明确的提示证书错误，但某些用户安全意识不强，可能会点击继续浏览，从而达到攻击目的。<br> SSL 剥离攻击是指攻击者劫持了客户端和服务器之间的连接，攻击者保持自己和服务器之间的 HTTPS 连接，但发送给客户端普通的 HTTP 连接，由于HTTP连接是明文传输的，即可获取客户端传输的所有明文数据。</p></blockquote></li><li><p>介绍 HTTPS 握手过程</p><blockquote><p>参考答案:</p><p>TCP三次握手成功后：</p><ol><li>客户端请求服务器，并告诉服务器自身支持的加密算法以及密钥长度等信息</li><li>服务器响应公钥和服务器证书</li><li>客户端验证证书是否合法，然后生成一个会话密钥，并用服务器的公钥加密密钥，把加密的会话密钥通过请求发送给服务器</li><li>服务器使用私钥解密被加密的会话密钥并保存起来，然后使用会话密钥加密消息响应给客户端，表示自己已经准备就绪</li><li>客户端使用会话密钥解密消息，知道了服务器已经准备就绪。</li><li>后续客户端和服务器使用会话密钥加密信息传递消息</li></ol></blockquote></li><li><p>HTTPS握手过程中，客户端如何验证证书的合法性</p><blockquote><ol><li>校验证书的颁发机构是否受客户端信任。</li><li>通过 CRL（证书办法机构在全世界大的节点共享了一个所有申请证书状态的清单，查阅这个清单） 或 OCSP（直接发消息给证书办法机构） 的方式校验证书是否被吊销。</li><li>对比系统时间，校验证书是否在有效期内。</li><li>通过校验对方是否存在证书的私钥，判断证书的网站域名是否与证书颁发的域名一致。</li></ol></blockquote></li><li><p>阐述 https 验证身份也就是 TSL/SSL 身份验证的过程（同 HTTPS 握手过程）</p><blockquote><p>参考答案:</p><ol><li>客户端请求服务器，并告诉服务器自身支持的加密算法以及密钥长度等信息</li><li>服务器响应公钥和服务器证书</li><li>客户端验证证书是否合法，然后生成一个会话密钥，并用服务器的公钥加密密钥，把加密的结果通过请求发送给服务器</li><li>服务器使用私钥解密被加密的会话密钥并保存起来，然后使用会话密钥加密消息响应给客户端，表示自己已经准备就绪</li><li>客户端使用会话密钥解密消息，知道了服务器已经准备就绪。</li><li>后续客户端和服务器使用会话密钥加密信息传递消息</li></ol></blockquote></li><li><p>为什么需要CA机构对证书签名</p><blockquote><p>主要是为了解决证书的可信问题。如果没有权威机构对证书进行签名 ，客户端就无法知晓<br> 证书是否是伪造的，从而增加了中间人攻击的风险，https就变得毫无意义。</p></blockquote></li><li><p>如何劫持https 的请求，提供思路</p><blockquote><p>https 有防篡改的特点，只要浏览器证书验证过程是正确的，很难在用户不察觉情况下进行攻击。但若能够更改浏览器的证书验证过程，便有机会实现https 中间人攻击。</p><p>所以，要劫持 https， 首先要伪造一个证书，并且要想办法让用户信任这个证书，可以有多种方式，比如病毒、恶意软件、诱导等。一旦证书被信任后，就可以利用普通中间人攻击的方式，使用伪造的证书进行攻击。</p></blockquote></li></ol>',46)]))}]]),P=JSON.parse('{"path":"/posts/more-than-code/network/SSL_TLS_HTTPS.html","title":"SSL、TLS、HTTPS","lang":"zh-CN","frontmatter":{"title":"SSL、TLS、HTTPS","icon":"ic:outline-https","order":22,"category":["网络"],"description":"SSL、TLS、HTTPS 的关系 SSL (Secure Sockets Layer) ，安全套接字协议 TLS (Transport Layer Security) ，传输层安全性协议 TLS是SSL的升级版，两者几乎是一样的 HTTPS (Hyper Text Transfer Protocol over SecureSocket Layer) ...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/posts/more-than-code/network/SSL_TLS_HTTPS.html"}],["meta",{"property":"og:site_name","content":"大喵喜的技术杂货铺"}],["meta",{"property":"og:title","content":"SSL、TLS、HTTPS"}],["meta",{"property":"og:description","content":"SSL、TLS、HTTPS 的关系 SSL (Secure Sockets Layer) ，安全套接字协议 TLS (Transport Layer Security) ，传输层安全性协议 TLS是SSL的升级版，两者几乎是一样的 HTTPS (Hyper Text Transfer Protocol over SecureSocket Layer) ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-10T08:16:01.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-10T08:16:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SSL、TLS、HTTPS\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-10T08:16:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Jianshu.Shi\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"SSL、TLS、HTTPS 的关系","slug":"ssl、tls、https-的关系","link":"#ssl、tls、https-的关系","children":[]},{"level":2,"title":"怎么保证网络信息传输是安全的","slug":"怎么保证网络信息传输是安全的","link":"#怎么保证网络信息传输是安全的","children":[{"level":3,"title":"23.2.2 非对称加密","slug":"_23-2-2-非对称加密","link":"#_23-2-2-非对称加密","children":[]}]},{"level":2,"title":"问答","slug":"问答","link":"#问答","children":[]}],"git":{"createdTime":1739717238000,"updatedTime":1744272961000,"contributors":[{"name":"damiaoxi","username":"damiaoxi","email":"miaoxi1110@gmail.com","commits":3,"url":"https://github.com/damiaoxi"},{"name":"Jianshu","username":"Jianshu","email":"jianshu.shi@eisgroup.com","commits":1,"url":"https://github.com/Jianshu"}]},"readingTime":{"minutes":6.58,"words":1975},"localizedDate":"2025年2月16日","excerpt":"<h2>SSL、TLS、HTTPS 的关系</h2>\\n<p>SSL (Secure Sockets Layer) ，安全套接字协议</p>\\n<p>TLS (Transport Layer Security) ，传输层安全性协议</p>\\n<p><strong>TLS是SSL的升级版，两者几乎是一样的</strong></p>\\n<p>HTTPS (Hyper Text Transfer Protocol over SecureSocket Layer) ，建立在 SSL 协议之上的 HTTP 协议</p>\\n\\n<h2>怎么保证网络信息传输是安全的</h2>\\n<p>网络信息传输容易被中介人截获篡改</p>","autoDesc":true}')}}]);