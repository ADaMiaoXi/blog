"use strict";(self.webpackChunkmiaoxi_blog=self.webpackChunkmiaoxi_blog||[]).push([[3110],{66262:(e,i)=>{i.A=(e,i)=>{const t=e.__vccOpts||e;for(const[e,p]of i)t[e]=p;return t}},81168:(e,i,t)=>{t.r(i),t.d(i,{comp:()=>h,data:()=>C});var p=t(20641);const a=t.p+"assets/img/image-20240227222337214.d7c37cd9.png",n=t.p+"assets/img/image-20240227222506977.889a0664.png",l=t.p+"assets/img/image-20240227222643891.3f5bbd40.png",r=t.p+"assets/img/image-20240227222858319.537fa51b.png",o=t.p+"assets/img/image-20240227223031550.31219064.png",c=t.p+"assets/img/image-20240227223410812.6e59bc6c.png",s=t.p+"assets/img/image-20240227223516185.dd1af857.png",g={},h=(0,t(66262).A)(g,[["render",function(e,i){return(0,p.uX)(),(0,p.CE)("div",null,i[0]||(i[0]=[(0,p.Fv)('<h2 id="tcp-收发数据流程" tabindex="-1"><a class="header-anchor" href="#tcp-收发数据流程"><span>TCP 收发数据流程</span></a></h2><figure><img src="'+a+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>TCP 协议允许双发互发数据（HTTP 协议不允许）</p><h2 id="tcp如何收发数据" tabindex="-1"><a class="header-anchor" href="#tcp如何收发数据"><span>TCP如何收发数据</span></a></h2><p>分段发送</p><figure><img src="'+n+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="可靠传输" tabindex="-1"><a class="header-anchor" href="#可靠传输"><span>可靠传输</span></a></h2><p>在TCP协议中，任何时候、任何一方都可以主动发送数据给另一方</p><p>为了解决数据报丢失、数据报错乱等问题，TCP协议要求：<strong>接收方收到数据报后，必须对数据报进行确认!</strong></p><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>seq:表示这次数据报的序号</li><li>ACK:表示这次数据报是一个确认数据报</li><li>ack:表示期望下一次接收的数据报序号</li></ul><p>发送方如果长时间没有收到确认数据报（ACK=1），则会判定丢失或者是错误，然后重发。</p><h2 id="连接的建立-三次握手" tabindex="-1"><a class="header-anchor" href="#连接的建立-三次握手"><span>连接的建立(三次握手)</span></a></h2><p>TCP协议要实现数据的收发，必须要先建立连接</p><p>连接的本质其实就是双方各自开辟的一块儿内存空间，空间中主要是数据缓冲区和一些变量</p><figure><img src="'+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>连接建立的过程需要经过三次数据报传输，因此称之为三次握手</p><blockquote><p>开始</p><p>客户端:我说话能听见吗?</p><p>服务器:能听见，我说话能听见吗?</p><p>客户端:能听见</p><p>结束</p></blockquote><figure><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="连接的销毁-四次挥手" tabindex="-1"><a class="header-anchor" href="#连接的销毁-四次挥手"><span>连接的销毁(四次挥手)</span></a></h2><blockquote><p>开始</p><p>客户端:我说完了，挂了?</p><p>服务器:我明白你说完了，但别忙挂，我还有话要说。</p><p>服务器继续说.....</p><p>服务器：我也说完了，挂了?</p><p>客户端：好的！</p><p>结束</p></blockquote><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>客户端最后等待 2MSL（最大分节生命周期）是为了防止最后一次挥手失败，如果最后一次挥手失败，服务器会再发一次第三次挥手的消息，直到收到第四次挥手为止。</p><h2 id="http和tcp的关系" tabindex="-1"><a class="header-anchor" href="#http和tcp的关系"><span>HTTP和TCP的关系</span></a></h2><figure><img src="'+s+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>HTTP协议是对内容格式的规定，它使用了TCP协议完成消息的可靠传输</p><p>在具体使用TCP协议时:</p><ol><li>客户端发消息给服务器叫做请求，服务器发消息给客户端叫做响应</li><li>使用HTTP协议的服务器不会主动发消息给客户端(尽管TCP可以)，只对请求进行响应</li><li>每一个HTTP请求 - 响应，都要先建立TCP连接(三次握手)，然后完成请求 - 响应后，再销毁连接(四次挥)。这就导致每次请求- 响应都是相互独立的，无法保持状态。</li></ol><h2 id="问答" tabindex="-1"><a class="header-anchor" href="#问答"><span>问答</span></a></h2><ol><li><p>简述 TCP 连接的过程（淘系）</p><blockquote><p>参考答案：</p><p>TCP协议通过三次握手建立可靠的点对点连接，具体过程是:</p><p>首先服务器进入监听状态，然后即可处理连接</p><p>第一次握手:建立连接时，客户端发送syn包到服务器， 并进入SYN_ SENT状态，等待服务器确认。在发送的包中还会包含一一个初始序列号seq。 此次握手的含义是客户端希望与服务器建立连接。</p><p>第二次握手:服务器收到 syn 包，然后回应给客户端一个 SYN+ACK 包，此时服务器进入 SYN_ RCVD 状态。此次握手的含义是服务端回应客户端，表示已收到并同意客户端的连接请求。</p><p>第三次握手:客户端收到服务器的SYN 包后，向服务器再次发送ACK 包，并进入 ESTAB_ LISHED 状态。</p><p>最后，服务端收到客户端的 ACK 包，于是也进入 ESTAB_LISHED 状态，至此，连接建立完成</p></blockquote></li><li><p>谈谈你对 TCP 三次握手和四次挥手的理解</p><blockquote><p>TCP协议通过三次握手建立可靠的点对点连接，具体过程是:</p><p>首先服务器进入监听状态，然后即可处理连接</p><p>第一次握手：建立连接时，客户端发送syn 包到服务器，并进入 SYN_ SENT 状态，等待服务器确认。在发送的包中还会包含一个初始序列号 seq。 此次握手的含义是客户端希望与服务器建立连接。</p><p>第二次握手：服务器收到 syn 包，然后回应给客户端一个 SYN + ACK 包，此时服务器进入 SYN_ RCVD 状态。此次握手的含义是服务端回应客户端，表示已收到并同意客户端的连接请求。</p><p>第三次握手：客户端收到服务器的SYN 包后，向服务器再次发送ACK包，并进入 ESTAB_ LISHED 状态。</p><p>最后，服务端收到客户端的 AC K包，于是也进入 ESTAB_LISHED 状态，至此，连接建立完成。</p><p><strong>当需要关闭连接时，需要进行四次挥手才能关闭</strong></p><ol><li>Client 向Server 发送FIN包，表示Client 主动要关闭连接，然后进入FIN_WAIT_1状态，等待Server 返回 ACK 包。此后Client 不能再向Server 发送数据，但能读取数据。</li><li>Server 收到 FIN 包后向Client 发送 ACK 包，然后进入CLOSE_ WAIT 状态，此后 Server 不能再读取数据，但可以继续向Client 发送数据。</li><li>Client 收到Server 返回的 ACK 包后进入 FIN_ WAIT_2 状态，等待 Server 发送 FIN 包。</li><li>Server 完成数据的发送后，将FIN包发送给 Client，然后进入LAST_ ACK 状态，等待 Client 返回 ACK 包，此后 Server 既不能读取数据，也不能发送数据。</li><li>Client 收到 FIN 包后向 Server 发送 ACK 包，然后进入TIME_WAIT 状态，接着等待足够长的时间(2MSL) 以确保Server 接收到ACK 包，最后回到 CLOSED 状态，释放网络资源。</li><li>Server 收到Client 返回的 ACK 包后便回到 CLOSED 状态，释放网络资源。</li></ol></blockquote></li></ol>',30)]))}]]),C=JSON.parse('{"path":"/posts/moreThanCode/network/tcp.html","title":"TCP协议","lang":"zh-CN","frontmatter":{"title":"TCP协议","icon":"carbon:tcp-ip-service","order":16,"category":["网络"],"description":"TCP 收发数据流程 TCP 协议允许双发互发数据（HTTP 协议不允许） TCP如何收发数据 分段发送 可靠传输 在TCP协议中，任何时候、任何一方都可以主动发送数据给另一方 为了解决数据报丢失、数据报错乱等问题，TCP协议要求：接收方收到数据报后，必须对数据报进行确认! seq:表示这次数据报的序号 ACK:表示这次数据报是一个确认数据报 ack:...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/posts/moreThanCode/network/tcp.html"}],["meta",{"property":"og:site_name","content":"大喵喜的技术杂货铺"}],["meta",{"property":"og:title","content":"TCP协议"}],["meta",{"property":"og:description","content":"TCP 收发数据流程 TCP 协议允许双发互发数据（HTTP 协议不允许） TCP如何收发数据 分段发送 可靠传输 在TCP协议中，任何时候、任何一方都可以主动发送数据给另一方 为了解决数据报丢失、数据报错乱等问题，TCP协议要求：接收方收到数据报后，必须对数据报进行确认! seq:表示这次数据报的序号 ACK:表示这次数据报是一个确认数据报 ack:..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-01T15:00:17.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-01T15:00:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TCP协议\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-01T15:00:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Jianshu.Shi\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"TCP 收发数据流程","slug":"tcp-收发数据流程","link":"#tcp-收发数据流程","children":[]},{"level":2,"title":"TCP如何收发数据","slug":"tcp如何收发数据","link":"#tcp如何收发数据","children":[]},{"level":2,"title":"可靠传输","slug":"可靠传输","link":"#可靠传输","children":[]},{"level":2,"title":"连接的建立(三次握手)","slug":"连接的建立-三次握手","link":"#连接的建立-三次握手","children":[]},{"level":2,"title":"连接的销毁(四次挥手)","slug":"连接的销毁-四次挥手","link":"#连接的销毁-四次挥手","children":[]},{"level":2,"title":"HTTP和TCP的关系","slug":"http和tcp的关系","link":"#http和tcp的关系","children":[]},{"level":2,"title":"问答","slug":"问答","link":"#问答","children":[]}],"git":{"createdTime":1739717238000,"updatedTime":1740841217000,"contributors":[{"name":"damiaoxi","username":"damiaoxi","email":"miaoxi1110@gmail.com","commits":3,"url":"https://github.com/damiaoxi"}]},"readingTime":{"minutes":4.76,"words":1429},"localizedDate":"2025年2月16日","excerpt":"<h2>TCP 收发数据流程</h2>\\n<figure><figcaption></figcaption></figure>\\n<p>TCP 协议允许双发互发数据（HTTP 协议不允许）</p>\\n<h2>TCP如何收发数据</h2>\\n<p>分段发送</p>\\n<figure><figcaption></figcaption></figure>\\n<h2>可靠传输</h2>\\n<p>在TCP协议中，任何时候、任何一方都可以主动发送数据给另一方</p>\\n<p>为了解决数据报丢失、数据报错乱等问题，TCP协议要求：<strong>接收方收到数据报后，必须对数据报进行确认!</strong></p>\\n<figure><figcaption></figcaption></figure>","autoDesc":true}')}}]);