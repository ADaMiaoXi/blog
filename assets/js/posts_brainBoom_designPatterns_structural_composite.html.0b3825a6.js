"use strict";(self.webpackChunkmiaoxi_blog=self.webpackChunkmiaoxi_blog||[]).push([[7679],{66262:(i,s)=>{s.A=(i,s)=>{const a=i.__vccOpts||i;for(const[i,n]of s)a[i]=n;return a}},10439:(i,s,a)=>{a.r(s),a.d(s,{comp:()=>r,data:()=>c});var n=a(20641);const l=a.p+"assets/img/composite.2eb06412.png",e=a.p+"assets/img/problem-zh.c93dbef7.png",t=a.p+"assets/img/composite-comic-1-zh.6055c891.png",h=a.p+"assets/img/live-example.b527b90b.png",p=a.p+"assets/img/structure-zh.0a8f0e51.png",k=a.p+"assets/img/example.6268144d.png",d={},r=(0,a(66262).A)(d,[["render",function(i,s){const a=(0,n.g2)("RouteLink");return(0,n.uX)(),(0,n.CE)("div",null,[s[56]||(s[56]=(0,n.Fv)('<h2 id="意图" tabindex="-1"><a class="header-anchor" href="#意图"><span>意图</span></a></h2><p>组合模式是一种结构型设计模式， 你可以使用它将对象组合成树状结构， 并且能像使用独立对象一样使用它们。</p><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题"><span>问题</span></a></h2><p>如果应用的核心模型能用树状结构表示， 在应用中使用组合模式才有价值。</p><p>例如， 你有两类对象：<code>产品</code>和<code>盒子</code>。 一个盒子中可以包含多个<code>产品</code>或者几个较小的<code>盒子</code>。这些小<code>盒子</code>中同样可以包含一些<code>产品</code>或更小的<code>盒子</code>，以此类推。</p><p>假设你希望在这些类的基础上开发一个定购系统。 订单中可以包含无包装的简单产品， 也可以包含装满产品的盒子…… 以及其他盒子。 此时你会如何计算每张订单的总价格呢？</p><figure><img src="'+e+'" alt="订单中可能包括各种产品， 这些产品放置在盒子中， 然后又被放入一层又一层更大的盒子中。 整个结构看上去像是一棵倒过来的树。" tabindex="0" loading="lazy"><figcaption>订单中可能包括各种产品， 这些产品放置在盒子中， 然后又被放入一层又一层更大的盒子中。 整个结构看上去像是一棵倒过来的树。</figcaption></figure><p>你可以尝试直接计算： 打开所有盒子， 找到每件产品， 然后计算总价。 这在真实世界中或许可行， 但在程序中， 你并不能简单地使用循环语句来完成该工作。 你必须事先知道所有<code>产品</code>和<code>盒子</code>的类别，所有盒子的嵌套层数以及其他繁杂的细节信息。 因此，直接计算极不方便，甚至完全不可行。</p><h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案"><span>解决方案</span></a></h2><p>组合模式建议使用一个通用接口来与<code>产品</code>和<code>盒子</code>进行交互， 并且在该接口中声明一个计算总价的方法。</p><p>那么方法该如何设计呢？ 对于一个产品， 该方法直接返回其价格； 对于一个盒子， 该方法遍历盒子中的所有项目， 询问每个项目的价格， 然后返回该盒子的总价格。 如果其中某个项目是小一号的盒子， 那么当前盒子也会遍历其中的所有项目， 以此类推， 直到计算出所有内部组成部分的价格。 你甚至可以在盒子的最终价格中增加额外费用， 作为该盒子的包装费用。</p><figure><img src="'+t+'" alt="组合模式以递归方式处理对象树中的所有项目" tabindex="0" loading="lazy"><figcaption>组合模式以递归方式处理对象树中的所有项目</figcaption></figure><p>该方式的最大优点在于你无需了解构成树状结构的对象的具体类。 你也无需了解对象是简单的产品还是复杂的盒子。 你只需调用通用接口以相同的方式对其进行处理即可。 当你调用该方法后， 对象会将请求沿着树结构传递下去。</p><h2 id="真实世界类比" tabindex="-1"><a class="header-anchor" href="#真实世界类比"><span>真实世界类比</span></a></h2><figure><img src="'+h+'" alt="部队结构的例子。" tabindex="0" loading="lazy"><figcaption>部队结构的例子。</figcaption></figure><p>大部分国家的军队都采用层次结构管理。 每支部队包括几个师， 师由旅构成， 旅由团构成， 团可以继续划分为排。 最后， 每个排由一小队实实在在的士兵组成。 军事命令由最高层下达， 通过每个层级传递， 直到每位士兵都知道自己应该服从的命令。</p><h2 id="组合模式结构" tabindex="-1"><a class="header-anchor" href="#组合模式结构"><span>组合模式结构</span></a></h2><figure><img src="'+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ol><li><strong>组件</strong> （Component） 接口描述了树中简单项目和复杂项目所共有的操作。</li><li><strong>叶节点</strong> （Leaf） 是树的基本结构， 它不包含子项目。<br> 一般情况下， 叶节点最终会完成大部分的实际工作， 因为它们无法将工作指派给其他部分。</li><li><strong>容器</strong> （Container）——又名 “组合 （Composite）”——是包含叶节点或其他容器等子项目的单位。 容器不知道其子项目所属的具体类， 它只通过通用的组件接口与其子项目交互。<br> 容器接收到请求后会将工作分配给自己的子项目， 处理中间结果， 然后将最终结果返回给客户端。</li><li><strong>客户端</strong> （Client） 通过组件接口与所有项目交互。 因此， 客户端能以相同方式与树状结构中的简单或复杂项目交互。</li></ol><h2 id="伪代码" tabindex="-1"><a class="header-anchor" href="#伪代码"><span>伪代码</span></a></h2><p>在本例中， 我们将借助<strong>组合</strong>模式帮助你在图形编辑器中实现一系列的几何图形。</p><figure><img src="'+k+'" alt="几何形状编辑器示例。" tabindex="0" loading="lazy"><figcaption>几何形状编辑器示例。</figcaption></figure><p><code>组合图形Compound­Graphic</code> 是一个容器， 它可以由多个包括容器在内的子图形构成。 组合图形与简单图形拥有相同的方法。 但是， 组合图形自身并不完成具体工作， 而是将请求递归地传递给自己的子项目， 然后 “汇总” 结果。</p><p>通过所有图形类所共有的接口， 客户端代码可以与所有图形互动。 因此， 客户端不知道与其交互的是简单图形还是组合图形。 客户端可以与非常复杂的对象结构进行交互， 而无需与组成该结构的实体类紧密耦合。</p><div class="language-py line-numbers-mode" data-highlighter="shiki" data-ext="py" data-title="py" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 组件接口会声明组合中简单和复杂对象的通用操作。</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">interface Graphic </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">move</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(x, y)</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">draw</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 叶节点类代表组合的终端对象。叶节点对象中不能包含任何子对象。叶节点对象</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 通常会完成实际的工作，组合对象则仅会将工作委派给自己的子部件。</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> Dot implements Graphic </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    field x, y</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    constructor </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">Dot</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(x, y) { …… }</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">move</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(x, y) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        this.x </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">+=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> x, this.y </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">+=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> y</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">draw</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        # 在坐标位置(X,Y)处绘制一个点。</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 所有组件类都可以扩展其他组件。</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> Circle extends Dot </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    field radius</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    constructor </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">Circle</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(x, y, radius) { …… }</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">draw</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        # 在坐标位置(X,Y)处绘制一个半径为 R 的圆。</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 组合类表示可能包含子项目的复杂组件。组合对象通常会将实际工作委派给子项</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 目，然后“汇总”结果。</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> CompoundGraphic implements Graphic </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    field children: array of Graphic</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    # 组合对象可在其项目列表中添加或移除其他组件（简单的或复杂的皆可）。</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(child: Graphic) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        # 在子项目数组中添加一个子项目。</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">remove</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(child: Graphic) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        # 从子项目数组中移除一个子项目。</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">move</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(x, y) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">        foreach</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (child </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> children) do</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            child.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">move</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(x, y)</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    # 组合会以特定的方式执行其主要逻辑。它会递归遍历所有子项目，并收集和</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    # 汇总其结果。由于组合的子项目也会将调用传递给自己的子项目，以此类推，</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    # 最后组合将会完成整个对象树的遍历工作。</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">draw</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        # 1. 对于每个子部件：</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        #     - 绘制该部件。</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        #     - 更新边框坐标。</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        # 2. 根据边框坐标绘制一个虚线长方形。</span></span>\n<span class="line"></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 客户端代码会通过基础接口与所有组件进行交互。这样一来，客户端代码便可同</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 时支持简单叶节点组件和复杂组件。</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ImageEditor </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    field </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">all</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: CompoundGraphic</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">load</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">        all</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> new </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">CompoundGraphic</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>\n<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">        all</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(new </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">Dot</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">))</span></span>\n<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">        all</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(new </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">Circle</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">))</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        # ……</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    # 将所需组件组合为复杂的组合组件。</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">groupSelected</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(components: array of Graphic) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        group </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> new </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">CompoundGraphic</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">        foreach</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (component </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> components) do</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            group.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(component)</span></span>\n<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">            all</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">remove</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(component)</span></span>\n<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">        all</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(group)</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        # 所有组件都将被绘制。</span></span>\n<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">        all</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">draw</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="组合模式优缺点" tabindex="-1"><a class="header-anchor" href="#组合模式优缺点"><span>组合模式优缺点</span></a></h2><p>√ 你可以利用多态和递归机制更方便地使用复杂树结构。<br> √ 开闭原则。 无需更改现有代码， 你就可以在应用中添加新元素， 使其成为对象树的一部分。<br> × 对于功能差异较大的类， 提供公共接口或许会有困难。 在特定情况下， 你需要过度一般化组件接口， 使其变得令人难以理解。</p><h2 id="与其他模式的关系" tabindex="-1"><a class="header-anchor" href="#与其他模式的关系"><span>与其他模式的关系</span></a></h2>',29)),(0,n.Lk)("ul",null,[(0,n.Lk)("li",null,[(0,n.Lk)("p",null,[(0,n.bF)(a,{to:"/posts/brainBoom/designPatterns/structural/bridge.html"},{default:(0,n.k6)((()=>s[0]||(s[0]=[(0,n.Lk)("strong",null,"桥接模式",-1)]))),_:1}),s[3]||(s[3]=(0,n.eW)("、 ")),(0,n.bF)(a,{to:"/posts/brainBoom/designPatterns/behavioral/state.html"},{default:(0,n.k6)((()=>s[1]||(s[1]=[(0,n.Lk)("strong",null,"状态模式",-1)]))),_:1}),s[4]||(s[4]=(0,n.eW)("和")),(0,n.bF)(a,{to:"/posts/brainBoom/designPatterns/behavioral/strategy.html"},{default:(0,n.k6)((()=>s[2]||(s[2]=[(0,n.Lk)("strong",null,"策略模式",-1)]))),_:1}),s[5]||(s[5]=(0,n.eW)(" （在某种程度上包括适配器模式） 模式的接口非常相似。 实际上， 它们都基于")),s[6]||(s[6]=(0,n.Lk)("strong",null,"组合模式",-1)),s[7]||(s[7]=(0,n.eW)("——即将工作委派给其他对象， 不过也各自解决了不同的问题。 模式并不只是以特定方式组织代码的配方， 你还可以使用它们来和其他开发者讨论模式所解决的问题。"))])]),(0,n.Lk)("li",null,[(0,n.Lk)("p",null,[s[9]||(s[9]=(0,n.eW)("你可以在创建复杂")),s[10]||(s[10]=(0,n.Lk)("strong",null,"组合",-1)),s[11]||(s[11]=(0,n.eW)("树时使用")),(0,n.bF)(a,{to:"/posts/brainBoom/designPatterns/creational/builder.html"},{default:(0,n.k6)((()=>s[8]||(s[8]=[(0,n.Lk)("strong",null,"生成器模式",-1)]))),_:1}),s[12]||(s[12]=(0,n.eW)("， 因为这可使其构造步骤以递归的方式运行。"))])]),(0,n.Lk)("li",null,[(0,n.Lk)("p",null,[(0,n.bF)(a,{to:"/posts/brainBoom/designPatterns/behavioral/chain-of-responsibility.html"},{default:(0,n.k6)((()=>s[13]||(s[13]=[(0,n.Lk)("strong",null,"责任链模式",-1)]))),_:1}),s[14]||(s[14]=(0,n.eW)("通常和")),s[15]||(s[15]=(0,n.Lk)("strong",null,"组合模式",-1)),s[16]||(s[16]=(0,n.eW)("结合使用。 在这种情况下， 叶组件接收到请求后， 可以将请求沿包含全体父组件的链一直传递至对象树的底部。"))])]),(0,n.Lk)("li",null,[(0,n.Lk)("p",null,[s[18]||(s[18]=(0,n.eW)("你可以使用")),(0,n.bF)(a,{to:"/posts/brainBoom/designPatterns/behavioral/iterator.html"},{default:(0,n.k6)((()=>s[17]||(s[17]=[(0,n.Lk)("strong",null,"迭代器模式",-1)]))),_:1}),s[19]||(s[19]=(0,n.eW)("来遍历")),s[20]||(s[20]=(0,n.Lk)("strong",null,"组合",-1)),s[21]||(s[21]=(0,n.eW)("树。"))])]),(0,n.Lk)("li",null,[(0,n.Lk)("p",null,[s[23]||(s[23]=(0,n.eW)("你可以使用")),(0,n.bF)(a,{to:"/posts/brainBoom/designPatterns/behavioral/visitor.html"},{default:(0,n.k6)((()=>s[22]||(s[22]=[(0,n.Lk)("strong",null,"访问者模式",-1)]))),_:1}),s[24]||(s[24]=(0,n.eW)("对整个")),s[25]||(s[25]=(0,n.Lk)("strong",null,"组合",-1)),s[26]||(s[26]=(0,n.eW)("树执行操作。"))])]),(0,n.Lk)("li",null,[(0,n.Lk)("p",null,[s[28]||(s[28]=(0,n.eW)("你可以使用")),(0,n.bF)(a,{to:"/posts/brainBoom/designPatterns/structural/flyweight.html"},{default:(0,n.k6)((()=>s[27]||(s[27]=[(0,n.Lk)("strong",null,"享元模式",-1)]))),_:1}),s[29]||(s[29]=(0,n.eW)("实现")),s[30]||(s[30]=(0,n.Lk)("strong",null,"组合",-1)),s[31]||(s[31]=(0,n.eW)("树的共享叶节点以节省内存。"))])]),(0,n.Lk)("li",null,[(0,n.Lk)("p",null,[s[33]||(s[33]=(0,n.Lk)("strong",null,"组合",-1)),s[34]||(s[34]=(0,n.eW)("和")),(0,n.bF)(a,{to:"/posts/brainBoom/designPatterns/structural/decorator.html"},{default:(0,n.k6)((()=>s[32]||(s[32]=[(0,n.Lk)("strong",null,"装饰模式",-1)]))),_:1}),s[35]||(s[35]=(0,n.eW)("的结构图很相似， 因为两者都依赖递归组合来组织无限数量的对象。")),s[36]||(s[36]=(0,n.Lk)("br",null,null,-1)),s[37]||(s[37]=(0,n.Lk)("em",null,"装饰",-1)),s[38]||(s[38]=(0,n.eW)(" 类似于组合， 但其只有一个子组件。 此外还有一个明显不同： ")),s[39]||(s[39]=(0,n.Lk)("em",null,"装饰",-1)),s[40]||(s[40]=(0,n.eW)(" 为被封装对象添加了额外的职责， ")),s[41]||(s[41]=(0,n.Lk)("em",null,"组合",-1)),s[42]||(s[42]=(0,n.eW)(" 仅对其子节点的结果进行了 “求和”。")),s[43]||(s[43]=(0,n.Lk)("br",null,null,-1)),s[44]||(s[44]=(0,n.eW)(" 但是， 模式也可以相互合作： 你可以使用 ")),s[45]||(s[45]=(0,n.Lk)("em",null,"装饰",-1)),s[46]||(s[46]=(0,n.eW)(" 来扩展 ")),s[47]||(s[47]=(0,n.Lk)("em",null,"组合",-1)),s[48]||(s[48]=(0,n.eW)(" 树中特定对象的行为。"))])]),(0,n.Lk)("li",null,[(0,n.Lk)("p",null,[s[51]||(s[51]=(0,n.eW)("大量使用 ")),s[52]||(s[52]=(0,n.Lk)("em",null,"组合",-1)),s[53]||(s[53]=(0,n.eW)(" 和 ")),(0,n.bF)(a,{to:"/posts/brainBoom/designPatterns/structural/decorator.html"},{default:(0,n.k6)((()=>s[49]||(s[49]=[(0,n.Lk)("strong",null,"装饰",-1)]))),_:1}),s[54]||(s[54]=(0,n.eW)(" 的设计通常可从对于")),(0,n.bF)(a,{to:"/posts/brainBoom/designPatterns/creational/prototype.html"},{default:(0,n.k6)((()=>s[50]||(s[50]=[(0,n.Lk)("strong",null,"原型模式",-1)]))),_:1}),s[55]||(s[55]=(0,n.eW)("的使用中获益。 你可以通过该模式来复制复杂结构， 而非从零开始重新构造。"))])])])])}]]),c=JSON.parse('{"path":"/posts/brainBoom/designPatterns/structural/composite.html","title":"组合模式","lang":"zh-CN","frontmatter":{"title":"组合模式","icon":"/assets/images/brainBoom/designPatterns/structural/composite/composite-mini.png","order":5,"category":["设计模式"],"description":"意图 组合模式是一种结构型设计模式， 你可以使用它将对象组合成树状结构， 并且能像使用独立对象一样使用它们。 问题 如果应用的核心模型能用树状结构表示， 在应用中使用组合模式才有价值。 例如， 你有两类对象：产品和盒子。 一个盒子中可以包含多个产品或者几个较小的盒子。这些小盒子中同样可以包含一些产品或更小的盒子，以此类推。 假设你希望在这些类的基础上开...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/posts/brainBoom/designPatterns/structural/composite.html"}],["meta",{"property":"og:site_name","content":"大喵喜的技术杂货铺"}],["meta",{"property":"og:title","content":"组合模式"}],["meta",{"property":"og:description","content":"意图 组合模式是一种结构型设计模式， 你可以使用它将对象组合成树状结构， 并且能像使用独立对象一样使用它们。 问题 如果应用的核心模型能用树状结构表示， 在应用中使用组合模式才有价值。 例如， 你有两类对象：产品和盒子。 一个盒子中可以包含多个产品或者几个较小的盒子。这些小盒子中同样可以包含一些产品或更小的盒子，以此类推。 假设你希望在这些类的基础上开..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-01T09:17:36.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-01T09:17:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"组合模式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-01T09:17:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Jianshu.Shi\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"意图","slug":"意图","link":"#意图","children":[]},{"level":2,"title":"问题","slug":"问题","link":"#问题","children":[]},{"level":2,"title":"解决方案","slug":"解决方案","link":"#解决方案","children":[]},{"level":2,"title":"真实世界类比","slug":"真实世界类比","link":"#真实世界类比","children":[]},{"level":2,"title":"组合模式结构","slug":"组合模式结构","link":"#组合模式结构","children":[]},{"level":2,"title":"伪代码","slug":"伪代码","link":"#伪代码","children":[]},{"level":2,"title":"组合模式优缺点","slug":"组合模式优缺点","link":"#组合模式优缺点","children":[]},{"level":2,"title":"与其他模式的关系","slug":"与其他模式的关系","link":"#与其他模式的关系","children":[]}],"git":{"createdTime":1741180358000,"updatedTime":1743499056000,"contributors":[{"name":"damiaoxi","username":"damiaoxi","email":"miaoxi1110@gmail.com","commits":1,"url":"https://github.com/damiaoxi"},{"name":"Jianshu","username":"Jianshu","email":"jianshu.shi@eisgroup.com","commits":3,"url":"https://github.com/Jianshu"}]},"readingTime":{"minutes":8.07,"words":2422},"localizedDate":"2025年3月5日","excerpt":"<h2>意图</h2>\\n<p>组合模式是一种结构型设计模式， 你可以使用它将对象组合成树状结构， 并且能像使用独立对象一样使用它们。</p>\\n<figure><figcaption></figcaption></figure>\\n<h2>问题</h2>\\n<p>如果应用的核心模型能用树状结构表示， 在应用中使用组合模式才有价值。</p>\\n<p>例如， 你有两类对象：<code>产品</code>和<code>盒子</code>。 一个盒子中可以包含多个<code>产品</code>或者几个较小的<code>盒子</code>。这些小<code>盒子</code>中同样可以包含一些<code>产品</code>或更小的<code>盒子</code>，以此类推。</p>","autoDesc":true}')}}]);