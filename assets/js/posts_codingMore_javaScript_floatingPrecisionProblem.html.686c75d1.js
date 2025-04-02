"use strict";(self.webpackChunkmiaoxi_blog=self.webpackChunkmiaoxi_blog||[]).push([[4389],{66262:(i,s)=>{s.A=(i,s)=>{const a=i.__vccOpts||i;for(const[i,e]of s)a[i]=e;return a}},10539:(i,s,a)=>{i.exports=a.p+"assets/img/pic_1.4c94a667.png"},45789:(i,s,a)=>{a.r(s),a.d(s,{comp:()=>n,data:()=>h});var e=a(20641),l=a(10539);const t={},n=(0,a(66262).A)(t,[["render",function(i,s){return(0,e.uX)(),(0,e.CE)("div",null,s[0]||(s[0]=[(0,e.Fv)('<h2 id="_1-浮点数精度常见问题" tabindex="-1"><a class="header-anchor" href="#_1-浮点数精度常见问题"><span>1. 浮点数精度常见问题</span></a></h2><p>在 <em>JavaScript</em> 中整数和浮点数都属于 <em>number</em> 数据类型，所有数字都是以 <em>64</em> 位浮点数形式储存，即便整数也是如此。 所以我们在打印 <em>1.00</em> 这样的浮点数的结果是 <em>1</em> 而非 <em>1.00</em> 。</p><p>在一些特殊的数值表示中，例如金额，这样看上去有点别扭，但是至少值是正确了。</p><p>然而要命的是，当浮点数做数学运算的时候，你经常会发现一些问题，举几个例子：</p><p><strong>场景一</strong>：进行浮点值运算结果的判断</p><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 加法 </span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0.1</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0.2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 0.30000000000000004</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0.7</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0.1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 0.7999999999999999</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0.2</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0.4</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 0.6000000000000001</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2.22</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0.1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 2.3200000000000003</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> </span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 减法</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1.5</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1.2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 0.30000000000000004</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0.3</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0.2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 0.09999999999999998</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> </span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 乘法 </span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">19.9</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> *</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 1989.9999999999998</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">19.9</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> *</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 10</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> *</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 1990</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">9.7</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> *</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 969.9999999999999</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">39.7</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> *</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 3970.0000000000005</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> </span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 除法 </span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0.3</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> /</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0.1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 2.9999999999999996</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0.69</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> /</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 0.06899999999999999</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>场景二</strong>：将小数乘以 <em>10</em> 的 <em>n</em> 次方取整</p><p>比如将钱币的单位，从元转化成分，经常写出来的是 <em>parseInt(yuan*100, 10)</em></p><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">parseInt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0.58</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> *</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 57</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>场景三</strong>：四舍五入保留 <em>n</em> 位小数</p><p>例如我们会写出 <em>(number).toFixed(2)</em>，但是看下面的例子：</p><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">((</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1.335</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">toFixed</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 1.33</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在上面的例子中，我们得出的结果是 <em>1.33</em>，而不是预期结果 <em>1.34</em>。</p><h2 id="_2-为什么会有这样的问题" tabindex="-1"><a class="header-anchor" href="#_2-为什么会有这样的问题"><span>2. 为什么会有这样的问题</span></a></h2><p>似乎是不可思议。小学生都会算的题目，<em>JavaScript</em> 不会？</p><p>我们来看看其真正的原因，到底为什么会产生精度丢失的问题呢？</p><p>计算机底层只有 <em>0</em> 和 <em>1</em>， 所以所有的运算最后实际上都是二进制运算。</p><p>十进制整数利用辗转相除的方法可以准确地转换为二进制数，但浮点数呢？</p><p><em>JavaScript</em> 里的数字是采用 <em>IEEE 754</em> 标准的 <em>64</em> 位双精度浮点数。</p><p>先看下面一张图：</p><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>该规范定义了浮点数的格式，对于 <em>64</em> 位的浮点数在内存中的表示，最高的 <em>1</em> 位是符号位，接着的 <em>11</em> 位是指数，剩下的 <em>52</em> 位为有效数字，具体如下：</p><ul><li>符号位 <em>S</em>：第 <em>1</em> 位是正负数符号位（<em>sign</em>），<em>0</em> 代表正数，<em>1</em> 代表负数</li><li>指数位 <em>E</em>：中间的 <em>11</em> 位存储指数（<em>exponent</em>），用来表示次方数</li><li>尾数位 <em>M</em>：最后的 <em>52</em> 位是尾数（<em>mantissa</em>），储存小数部分，超出的部分自动进一舍零</li></ul><p>也就是说，浮点数最终在运算的时候实际上是一个符合该标准的二进制数</p><p>符号位决定了一个数的正负，指数部分决定了数值的大小，小数部分决定了数值的精度。</p><p><em>IEEE 754</em> 规定，有效数字第一位默认总是 <em>1</em>，不保存在 <em>64</em> 位浮点数之中。也就是说，有效数字总是 <em>1.xx…xx</em> 的形式，其中 <em>xx…xx</em> 的部分保存在 <em>64</em> 位浮点数之中，最长可能为 <em>52</em> 位。因此，<em>JavaScript</em> 提供的有效数字最长为 <em>53</em> 个二进制位（<em>64</em> 位浮点的后 <em>52</em> 位 + 有效数字第一位的 <em>1</em>）。</p><p>既然限定位数，必然有截断的可能。</p><p>我们可以看一个例子：</p><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0.1</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0.2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 0.30000000000000004</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>为了验证该例子，我们得先知道怎么将浮点数转换为二进制，整数我们可以用除 <em>2</em> 取余的方式，小数我们则可以用乘 <em>2</em> 取整的方式。</p><p><em>0.1</em> 转换为二进制：</p><p><em>0.1 * 2</em>，值为 <em>0.2</em>，小数部分 <em>0.2</em>，整数部分 <em>0</em></p><p><em>0.2 * 2</em>，值为 <em>0.4</em>，小数部分 <em>0.4</em>，整数部分 <em>0</em></p><p><em>0.4 * 2</em>，值为0.8，小数部分0.8，整数部分0</p><p><em>0.8 * 2</em>，值为 <em>1.6</em>，小数部分 <em>0.6</em>，整数部分 <em>1</em></p><p><em>0.6 * 2</em>，值为 <em>1.2</em>，小数部分 <em>0.2</em>，整数部分 <em>1</em></p><p><em>0.2 * 2</em>，值为 <em>0.4</em>，小数部分 <em>0.4</em>，整数部分 <em>0</em></p><p>从 <em>0.2</em> 开始循环</p><p><em>0.2</em> 转换为二进制可以直接参考上述，肯定最后也是一个循环的情况</p><p>所以最终我们能得到两个循环的二进制数：</p><p><em>0.1：0.0001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1100 ...</em></p><p><em>0.2：0.0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 ...</em></p><p>这两个的和的二进制就是：</p><p><em>sum：0.0100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 ...</em></p><p>最终我们只能得到和的近似值（按照 <em>IEEE 754</em> 标准保留 <em>52</em> 位，按 <em>0</em> 舍 <em>1</em> 入来取值），然后转换为十进制数变成：</p><p>sum ≈ 0.30000000000000004</p><p>再例如：</p><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">((</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1.335</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">toFixed</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 1.33</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>因为 <code>1.335</code> 其实是 <code>1.33499999999999996447286321199</code>，<code>toFixed</code> 虽然是四舍五入，但是是对 <code>1.33499999999999996447286321199</code> 进行四五入，所以得出 <code>1.33</code>。</p><p>在 <em>Javascript</em> 中，整数精度同样存在问题，先来看看问题：</p><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">19571992547450991</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 19571992547450990</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">19571992547450991</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">===</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">19571992547450992</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>同样的原因，在 <em>JavaScript</em> 中 <em>number</em> 类型统一按浮点数处理，整数是按最大 <em>54</em> 位来算，</p><ul><li>最大( <em>253 - 1</em>，<em>Number.MAX_SAFE_INTEGER</em>、<em>9007199254740991</em>)</li><li>最小( <em>-(253 - 1)</em>，<em>Number.MIN_SAFE_INTEGER</em>、<em>-9007199254740991</em>)</li></ul><p>所以只要超过这个范围，就会存在被舍去的精度问题。</p><p>当然这个问题并不只是在 <em>Javascript</em> 中才会出现，几乎所有的编程语言都采用了 <em>IEEE-754</em> 浮点数表示法，任何使用二进制浮点数的编程语言都会有这个问题。</p><p>只不过在很多其他语言中已经封装好了方法来避免精度的问题，而 <em>JavaScript</em> 是一门弱类型的语言，从设计思想上就没有对浮点数有个严格的数据类型，所以精度误差的问题就显得格外突出。</p><p>通常这种对精度要求高的计算都应该交给后端去计算和存储，因为后端有成熟的库来解决这种计算问题。</p><p>前端也有几个不错的类库：</p><ul><li><p><a href="https://mathjs.org/docs/getting_started.html" target="_blank" rel="noopener noreferrer">Math.js</a><br><em>Math.js</em> 是专门为 <em>JavaScript</em> 和 <em>Node.js</em> 提供的一个广泛的数学库。它具有灵活的表达式解析器，支持符号计算，配有大量内置函数和常量，并提供集成解决方案来处理不同的数据类型。像数字，大数字（超出安全数的数字），复数，分数，单位和矩阵。 功能强大，易于使用。</p></li><li><p><a href="https://mikemcl.github.io/decimal.js/" target="_blank" rel="noopener noreferrer">decimal.js</a><br> 为 <em>JavaScript</em> 提供十进制类型的任意精度数值。</p></li><li><p><a href="https://mikemcl.github.io/big.js/" target="_blank" rel="noopener noreferrer">big.js</a><br> 不仅能够支持处理 <code>Long</code> 类型的数据，也能够准确的处理小数的运算。</p></li></ul><h2 id="_3-真题解答" tabindex="-1"><a class="header-anchor" href="#_3-真题解答"><span>3. 真题解答</span></a></h2><ul><li>为什么 <code>console.log(0.2+0.1==0.3)</code> 得到的值为 <code>false</code></li></ul><blockquote><p>参考答案：</p><p>因为浮点数的计算存在 <em>round-off</em> 问题，也就是浮点数不能够进行精确的计算。并且：</p><ul><li><p>不仅 <em>JavaScript</em>，所有遵循 <em>IEEE 754</em> 规范的语言都是如此；</p></li><li><p>在 <em>JavaScript</em> 中，所有的 <em>Number</em> 都是以 <em>64-bit</em> 的双精度浮点数存储的；</p></li><li><p>双精度的浮点数在这 64 位上划分为 3 段，而这 3 段也就确定了一个浮点数的值，64bit 的划分是“ 1-11-52”的模式，具体来说：</p><ul><li>就是 <em>1</em> 位最高位（最左边那一位）表示符号位，<em>0</em> 表示正，<em>1</em> 表示负；</li><li><em>11</em> 位表示指数部分；</li><li><em>52</em> 位表示尾数部分，也就是有效域部分</li></ul></li></ul></blockquote>',62)]))}]]),h=JSON.parse('{"path":"/posts/codingMore/javaScript/floatingPrecisionProblem.html","title":"浮点数精度问题","lang":"zh-CN","frontmatter":{"title":"浮点数精度问题","icon":"tabler:circle-dashed-number-1","order":13,"category":["JavaScript"],"description":"1. 浮点数精度常见问题 在 JavaScript 中整数和浮点数都属于 number 数据类型，所有数字都是以 64 位浮点数形式储存，即便整数也是如此。 所以我们在打印 1.00 这样的浮点数的结果是 1 而非 1.00 。 在一些特殊的数值表示中，例如金额，这样看上去有点别扭，但是至少值是正确了。 然而要命的是，当浮点数做数学运算的时候，你经常会...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/posts/codingMore/javaScript/floatingPrecisionProblem.html"}],["meta",{"property":"og:site_name","content":"大喵喜的技术杂货铺"}],["meta",{"property":"og:title","content":"浮点数精度问题"}],["meta",{"property":"og:description","content":"1. 浮点数精度常见问题 在 JavaScript 中整数和浮点数都属于 number 数据类型，所有数字都是以 64 位浮点数形式储存，即便整数也是如此。 所以我们在打印 1.00 这样的浮点数的结果是 1 而非 1.00 。 在一些特殊的数值表示中，例如金额，这样看上去有点别扭，但是至少值是正确了。 然而要命的是，当浮点数做数学运算的时候，你经常会..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-01T15:00:17.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-01T15:00:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"浮点数精度问题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-01T15:00:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Jianshu.Shi\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"1. 浮点数精度常见问题","slug":"_1-浮点数精度常见问题","link":"#_1-浮点数精度常见问题","children":[]},{"level":2,"title":"2. 为什么会有这样的问题","slug":"_2-为什么会有这样的问题","link":"#_2-为什么会有这样的问题","children":[]},{"level":2,"title":"3. 真题解答","slug":"_3-真题解答","link":"#_3-真题解答","children":[]}],"git":{"createdTime":1739785906000,"updatedTime":1740841217000,"contributors":[{"name":"damiaoxi","username":"damiaoxi","email":"miaoxi1110@gmail.com","commits":6,"url":"https://github.com/damiaoxi"}]},"readingTime":{"minutes":6.02,"words":1805},"localizedDate":"2025年2月17日","excerpt":"<h2>1. 浮点数精度常见问题</h2>\\n<p>在 <em>JavaScript</em> 中整数和浮点数都属于 <em>number</em> 数据类型，所有数字都是以 <em>64</em> 位浮点数形式储存，即便整数也是如此。 所以我们在打印 <em>1.00</em> 这样的浮点数的结果是 <em>1</em> 而非 <em>1.00</em> 。</p>\\n<p>在一些特殊的数值表示中，例如金额，这样看上去有点别扭，但是至少值是正确了。</p>\\n<p>然而要命的是，当浮点数做数学运算的时候，你经常会发现一些问题，举几个例子：</p>\\n<p><strong>场景一</strong>：进行浮点值运算结果的判断</p>","autoDesc":true}')}}]);