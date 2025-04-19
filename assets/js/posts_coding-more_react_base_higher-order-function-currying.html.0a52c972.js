"use strict";(self.webpackChunkmiaoxi_blog=self.webpackChunkmiaoxi_blog||[]).push([[2850],{66262:(i,s)=>{s.A=(i,s)=>{const a=i.__vccOpts||i;for(const[i,n]of s)a[i]=n;return a}},153:(i,s,a)=>{a.r(s),a.d(s,{comp:()=>h,data:()=>l});var n=a(20641);const t={},h=(0,a(66262).A)(t,[["render",function(i,s){return(0,n.uX)(),(0,n.CE)("div",null,s[0]||(s[0]=[(0,n.Fv)('<p>受控组件中，每个表单元素都必须占用一个回调函数用于获取到该表单元素本身（<code>event.target</code>）。这种方式在表单元素过多的时候需要定义出大量的功能、结构类似的回调函数。有什么办法能够统一一个方法作为多个表单元素的回调，并且能够清晰的获取到是调用回调的表单元素想要修改 <code>state</code> 中的哪个状态呢？</p><p>有的，通过 <strong>高阶函数</strong> + <strong>函数柯里化</strong> 技术可以实现：</p><h2 id="高阶函数" tabindex="-1"><a class="header-anchor" href="#高阶函数"><span>高阶函数</span></a></h2><p>如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数：</p><ul><li><p>若 A 函数，<strong>接受</strong>的参数是一个<strong>函数</strong>，那么 A 就可以被称之为高阶函数；</p><p><strong>Example:</strong> <code>Promise</code>， <code>setTimeout()</code>，<code>Arrray.map()</code> ...</p></li><li><p>若 A 函数，调用的返回值依然是一个函数，那么该函数就是高阶函数</p><p><strong>Example:</strong> <code>bind()</code> ...</p></li></ul><h2 id="函数柯里化" tabindex="-1"><a class="header-anchor" href="#函数柯里化"><span>函数柯里化</span></a></h2><p>通过函数调用继续返回函数的方式，实现多次接收参数，最后统一处理的函数编码方式：</p><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" data-title="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 求和案例：</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> sum</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) {</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">b</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">c</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> a</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> b</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> c</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">let</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> res</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> sum</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">res</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 6</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-9-3-使用高阶函数-函数柯里化实现事件回调函数统一" tabindex="-1"><a class="header-anchor" href="#_2-9-3-使用高阶函数-函数柯里化实现事件回调函数统一"><span>2.9.3. 使用高阶函数 + 函数柯里化实现事件回调函数统一</span></a></h3><div class="language-jsx line-numbers-mode" data-highlighter="shiki" data-ext="jsx" data-title="jsx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> LoginForm</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> extends</span><span style="--shiki-light:#50A14F;--shiki-dark:#E5C07B;"> React</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Component</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    state</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        username</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        password</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;&#39;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>\n<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    render</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(){</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">form</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;"> onSubmit</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;">{</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">submitForm</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;">}</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">                用户名：&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">input</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;"> type</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;text&quot;</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;"> onChange</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;">{</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">handleTyping</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;username&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;">}</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">                密码：&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">input</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;"> type</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;password&quot;</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;"> onChange</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;">{</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">handleTyping</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;password&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;">}</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">                &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">button</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;提交&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">button</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">form</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        )</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // 柯里化高阶函数，事件回调函数在返回中，将 stateName 传入事件处理函数</span></span>\n<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    handleTyping</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">stateName</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">event</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>\n<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">            this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">setState</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">                [</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">stateName</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> event</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">target</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">value</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            })</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        </span></span>\n<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    submitForm</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">event</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">        event</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">preventDefault</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;">username</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;">password</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">} </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">state</span></span>\n<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        alert</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">`username: </span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">${</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">username</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  password: </span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">${</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">password</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD;">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">`</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">ReactDOM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">render</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">LoginForm</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/&gt;, </span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">document</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">querySelector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;#app&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">))</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',10)]))}]]),l=JSON.parse('{"path":"/posts/coding-more/react/base/higher-order-function-currying.html","title":"高阶函数 & 函数柯里化","lang":"zh-CN","frontmatter":{"title":"高阶函数 & 函数柯里化","icon":"fad:filter-rez-highpass","order":9,"category":["React"],"description":"受控组件中，每个表单元素都必须占用一个回调函数用于获取到该表单元素本身（event.target）。这种方式在表单元素过多的时候需要定义出大量的功能、结构类似的回调函数。有什么办法能够统一一个方法作为多个表单元素的回调，并且能够清晰的获取到是调用回调的表单元素想要修改 state 中的哪个状态呢？ 有的，通过 高阶函数 + 函数柯里化 技术可以实现： ...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/posts/coding-more/react/base/higher-order-function-currying.html"}],["meta",{"property":"og:site_name","content":"大喵喜的技术杂货铺"}],["meta",{"property":"og:title","content":"高阶函数 & 函数柯里化"}],["meta",{"property":"og:description","content":"受控组件中，每个表单元素都必须占用一个回调函数用于获取到该表单元素本身（event.target）。这种方式在表单元素过多的时候需要定义出大量的功能、结构类似的回调函数。有什么办法能够统一一个方法作为多个表单元素的回调，并且能够清晰的获取到是调用回调的表单元素想要修改 state 中的哪个状态呢？ 有的，通过 高阶函数 + 函数柯里化 技术可以实现： ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-19T15:08:08.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-19T15:08:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"高阶函数 & 函数柯里化\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-19T15:08:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Jianshu.Shi\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"高阶函数","slug":"高阶函数","link":"#高阶函数","children":[]},{"level":2,"title":"函数柯里化","slug":"函数柯里化","link":"#函数柯里化","children":[{"level":3,"title":"2.9.3. 使用高阶函数 + 函数柯里化实现事件回调函数统一","slug":"_2-9-3-使用高阶函数-函数柯里化实现事件回调函数统一","link":"#_2-9-3-使用高阶函数-函数柯里化实现事件回调函数统一","children":[]}]}],"git":{"createdTime":1745075288000,"updatedTime":1745075288000,"contributors":[{"name":"damiaoxi","username":"damiaoxi","email":"miaoxi1110@gmail.com","commits":1,"url":"https://github.com/damiaoxi"}]},"readingTime":{"minutes":1.45,"words":436},"localizedDate":"2025年4月19日","excerpt":"<p>受控组件中，每个表单元素都必须占用一个回调函数用于获取到该表单元素本身（<code>event.target</code>）。这种方式在表单元素过多的时候需要定义出大量的功能、结构类似的回调函数。有什么办法能够统一一个方法作为多个表单元素的回调，并且能够清晰的获取到是调用回调的表单元素想要修改 <code>state</code> 中的哪个状态呢？</p>\\n<p>有的，通过 <strong>高阶函数</strong> + <strong>函数柯里化</strong> 技术可以实现：</p>\\n<h2>高阶函数</h2>\\n<p>如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数：</p>","autoDesc":true}')}}]);