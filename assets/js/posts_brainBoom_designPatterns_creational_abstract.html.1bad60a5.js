"use strict";(self.webpackChunkmiaoxi_blog=self.webpackChunkmiaoxi_blog||[]).push([[2633],{66262:(i,s)=>{s.A=(i,s)=>{const a=i.__vccOpts||i;for(const[i,n]of s)a[i]=n;return a}},58835:(i,s,a)=>{i.exports=a.p+"assets/img/example.d59e2490.png"},54862:(i,s,a)=>{a.r(s),a.d(s,{comp:()=>A,data:()=>o});var n=a(20641);const l=a.p+"assets/img/abstract-factory-zh.f7005a4a.png",e=a.p+"assets/img/problem-zh.ea4f7d61.png",t=a.p+"assets/img/abstract-factory-comic-1-zh.1f94384e.png",h=a.p+"assets/img/solution1.8fd300b8.png",p=a.p+"assets/img/solution2.55772a25.png",k=a.p+"assets/img/abstract-factory-comic-2-zh.e6a100e6.png",d=a.p+"assets/img/structure.97114fa8.png";var r=a(58835);const c={},A=(0,a(66262).A)(c,[["render",function(i,s){return(0,n.uX)(),(0,n.CE)("div",null,s[0]||(s[0]=[(0,n.Fv)('<h2 id="意图" tabindex="-1"><a class="header-anchor" href="#意图"><span>意图</span></a></h2><p>抽象工厂模式是一种创建型设计模式， 它能创建一系列相关的对象， 而无需指定其具体类。</p><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题"><span>问题</span></a></h2><p>假设你正在开发一款家具商店模拟器。 你的代码中包括一些类， 用于表示：</p><p>一系列相关产品， 例如 椅子<code>Chair</code> 、 ​ 沙发<code>Sofa</code>和 咖啡桌<code>Coffee­Table</code> 。</p><p>系列产品的不同变体。 例如， 你可以使用 现代<code>Modern</code> 、 ​ 维多利亚<code>Victorian</code> 、 ​ 装饰风艺术<code>Art­Deco</code>等风格生成 椅子 、 ​ 沙发和 咖啡桌 。</p><figure><img src="'+e+'" alt="系列产品及其不同变体" tabindex="0" loading="lazy"><figcaption>系列产品及其不同变体</figcaption></figure><p>你需要设法单独生成每件家具对象， 这样才能确保其风格一致。 如果顾客收到的家具风格不一样， 他们可不会开心。</p><figure><img src="'+t+'" alt="现代风格的沙发和维多利亚风格的椅子不搭" tabindex="0" loading="lazy"><figcaption>现代风格的沙发和维多利亚风格的椅子不搭</figcaption></figure><p>此外， 你也不希望在添加新产品或新风格时修改已有代码。 家具供应商对于产品目录的更新非常频繁， 你不会想在每次更新时都去修改核心代码的。</p><h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案"><span>解决方案</span></a></h2><p>首先， 抽象工厂模式建议为系列中的每件产品明确声明接口 （例如椅子、 沙发或咖啡桌）。 然后， 确保所有产品变体都继承这些接口。 例如， 所有风格的椅子都实现 <code>椅子</code>接口； 所有风格的咖啡桌都实现 <code>咖啡桌</code>接口， 以此类推。</p><figure><img src="'+h+'" alt="同一对象的所有变体都必须放置在同一个类层次结构之中" tabindex="0" loading="lazy"><figcaption>同一对象的所有变体都必须放置在同一个类层次结构之中</figcaption></figure><p>接下来， 我们需要声明抽象工厂——包含系列中所有产品构造方法的接口。 例如 <code>create­Chair</code>创建椅子 、 ​ <code>create­Sofa</code>创建沙发和 <code>create­Coffee­Table</code>创建咖啡桌 。 这些方法必须返回抽象产品类型， 即我们之前抽取的那些接口：<code>椅子</code>,<code>沙发</code>和 <code>咖啡桌</code>等等。</p><figure><img src="'+p+'" alt="每个具体工厂类都对应一个特定的产品变体" tabindex="0" loading="lazy"><figcaption>每个具体工厂类都对应一个特定的产品变体</figcaption></figure><p>那么该如何处理产品变体呢？ 对于系列产品的每个变体， 我们都将基于 抽象工厂接口创建不同的工厂类。 每个工厂类都只能返回特定类别的产品， 例如， ​ 现代家具工厂<code>Modern­Furniture­Factory</code>只能创建 现代椅子<code>Modern­Chair</code> 、 ​ 现代沙发<code>Modern­Sofa</code>和 现代咖啡桌<code>Modern­Coffee­Table</code>对象。</p><p>客户端代码可以通过相应的抽象接口调用工厂和产品类。 你无需修改实际客户端代码， 就能更改传递给客户端的工厂类， 也能更改客户端代码接收的产品变体。</p><figure><img src="'+k+'" alt="客户端无需了解其所调用工厂的具体类信息" tabindex="0" loading="lazy"><figcaption>客户端无需了解其所调用工厂的具体类信息</figcaption></figure><p>假设客户端想要工厂创建一把椅子。 客户端无需了解工厂类， 也不用管工厂类创建出的椅子类型。 无论是现代风格， 还是维多利亚风格的椅子， 对于客户端来说没有分别， 它只需调用抽象 椅子接口就可以了。 这样一来， 客户端只需知道椅子以某种方式实现了 <code>sit­On</code> 坐下方法就足够了。 此外， 无论工厂返回的是何种椅子变体， 它都会和由同一工厂对象创建的沙发或咖啡桌风格一致。</p><p>最后一点说明： 如果客户端仅接触抽象接口， 那么谁来创建实际的工厂对象呢？ 一般情况下， 应用程序会在初始化阶段创建具体工厂对象。 而在此之前， 应用程序必须根据配置文件或环境设定选择工厂类别。</p><h2 id="抽象工厂模式结构" tabindex="-1"><a class="header-anchor" href="#抽象工厂模式结构"><span>抽象工厂模式结构</span></a></h2><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ol><li><strong>抽象产品</strong> （Abstract Product） 为构成系列产品的一组不同但相关的产品声明接口。</li><li><strong>具体产品</strong> （Concrete Product） 是抽象产品的多种不同类型实现。 所有变体 （维多利亚/现代） 都必须实现相应的抽象产品 （椅子/沙发）。</li><li><strong>抽象工厂</strong> （Abstract Factory） 接口声明了一组创建各种抽象产品的方法。</li><li><strong>具体工厂</strong> （Concrete Factory） 实现抽象工厂的构建方法。 每个具体工厂都对应特定产品变体， 且仅创建此种产品变体。</li><li>尽管具体工厂会对具体产品进行初始化， 其构建方法签名必须返回相应的抽象产品。 这样， 使用工厂类的客户端代码就不会与工厂创建的特定产品变体耦合。 客户端 （Client） 只需通过抽象接口调用工厂和产品对象， 就能与任何具体工厂/产品变体交互。</li></ol><h2 id="伪代码" tabindex="-1"><a class="header-anchor" href="#伪代码"><span>伪代码</span></a></h2><p>下面例子通过应用抽象工厂模式， 使得客户端代码无需与具体 UI 类耦合， 就能创建跨平台的 UI 元素， 同时确保所创建的元素与指定的操作系统匹配。</p><figure><img src="'+r+'" alt="跨平台 UI 类示例。" tabindex="0" loading="lazy"><figcaption>跨平台 UI 类示例。</figcaption></figure><p>跨平台应用中的相同 UI 元素功能类似， 但是在不同操作系统下的外观有一定差异。 此外， 你需要确保 UI 元素与当前操作系统风格一致。 你一定不希望在 Windows 系统下运行的应用程序中显示 macOS 的控件。</p><p>抽象工厂接口声明一系列构建方法， 客户端代码可调用它们生成不同风格的 UI 元素。 每个具体工厂对应特定操作系统， 并负责生成符合该操作系统风格的 UI 元素。</p><p>其运作方式如下： 应用程序启动后检测当前操作系统。 根据该信息， 应用程序通过与该操作系统对应的类创建工厂对象。 其余代码使用该工厂对象创建 UI 元素。 这样可以避免生成错误类型的元素。</p><p>使用这种方法， 客户端代码只需调用抽象接口， 而无需了解具体工厂类和 UI 元素。 此外， 客户端代码还支持未来添加新的工厂或 UI 元素。</p><p>这样一来， 每次在应用程序中添加新的 UI 元素变体时， 你都无需修改客户端代码。 你只需创建一个能够生成这些 UI 元素的工厂类， 然后稍微修改应用程序的初始代码， 使其能够选择合适的工厂类即可。</p><div class="language-py line-numbers-mode" data-highlighter="shiki" data-ext="py" data-title="py" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 抽象工厂接口声明了一组能返回不同抽象产品的方法。这些产品属于同一个系列</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 且在高层主题或概念上具有相关性。同系列的产品通常能相互搭配使用。系列产</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 品可有多个变体，但不同变体的产品不能搭配使用。</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">interface GUIFactory </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">createButton</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">():Button</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">createCheckbox</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">():Checkbox</span></span>\n<span class="line"></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 具体工厂可生成属于同一变体的系列产品。工厂会确保其创建的产品能相互搭配</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 使用。具体工厂方法签名会返回一个抽象产品，但在方法内部则会对具体产品进</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 行实例化。</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> WinFactory implements GUIFactory </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">createButton</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">():Button </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> new </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">WinButton</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">createCheckbox</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">():Checkbox </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> new </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">WinCheckbox</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 每个具体工厂中都会包含一个相应的产品变体。</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> MacFactory implements GUIFactory </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">createButton</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">():Button </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> new </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">MacButton</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">createCheckbox</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">():Checkbox </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> new </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">MacCheckbox</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>\n<span class="line"></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 系列产品中的特定产品必须有一个基础接口。所有产品变体都必须实现这个接口。</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">interface Button </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">paint</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 具体产品由相应的具体工厂创建。</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> WinButton implements Button </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">paint</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        # 根据 Windows 样式渲染按钮。</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> MacButton implements Button </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">paint</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        # 根据 macOS 样式渲染按钮</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 这是另一个产品的基础接口。所有产品都可以互动，但是只有相同具体变体的产</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 品之间才能够正确地进行交互。</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">interface Checkbox </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">paint</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> WinCheckbox implements Checkbox </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">paint</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        # 根据 Windows 样式渲染复选框。</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> MacCheckbox implements Checkbox </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">paint</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        # 根据 macOS 样式渲染复选框。</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 客户端代码仅通过抽象类型（GUIFactory、Button 和 Checkbox）使用工厂</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 和产品。这让你无需修改任何工厂或产品子类就能将其传递给客户端代码。</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> Application </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    private field factory: GUIFactory</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    private field button: Button</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    constructor </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">Application</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(factory: GUIFactory) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        this.factory </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> factory</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">createUI</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        this.button </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> factory.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">createButton</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">paint</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        button.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">paint</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>\n<span class="line"></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 程序会根据当前配置或环境设定选择工厂类型，并在运行时创建工厂（通常在初</span></span>\n<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 始化阶段）。</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ApplicationConfigurator </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    method </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        config </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;"> readApplicationConfigFile</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (config.</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66;">OS</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> ==</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Windows&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) then</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            factory </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> new </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">WinFactory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        else</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (config.</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66;">OS</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> ==</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;Mac&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) then</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            factory </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> new </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">MacFactory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>\n<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        else</span></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            throw new </span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">Exception</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;错误！未知的操作系统。&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        Application app </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> new </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">Application</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(factory)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="抽象工厂模式优缺点" tabindex="-1"><a class="header-anchor" href="#抽象工厂模式优缺点"><span>抽象工厂模式优缺点</span></a></h2><p>√ 你可以确保同一工厂生成的产品相互匹配。<br> √ 你可以避免客户端和具体产品代码的耦合。<br> √ 单一职责原则。 你可以将产品生成代码抽取到同一位置， 使得代码易于维护。<br> √ 开闭原则。 向应用程序中引入新产品变体时， 你无需修改客户端代码。<br> × 由于采用该模式需要向应用中引入众多接口和类， 代码可能会比之前更加复杂。</p><h2 id="与其他模式的关系" tabindex="-1"><a class="header-anchor" href="#与其他模式的关系"><span>与其他模式的关系</span></a></h2><ul><li><p>在许多设计工作的初期都会使用工厂方法模式 （较为简单， 而且可以更方便地通过子类进行定制）， 随后演化为使用抽象工厂模式、 原型模式或生成器模式 （更灵活但更加复杂）。</p></li><li><p>生成器重点关注如何分步生成复杂对象。 抽象工厂专门用于生产一系列相关对象。 抽象工厂会马上返回产品， 生成器则允许你在获取产品前执行一些额外构造步骤。</p></li><li><p>抽象工厂模式通常基于一组工厂方法， 但你也可以使用原型模式来生成这些类的方法。</p></li><li><p>当只需对客户端代码隐藏子系统创建对象的方式时， 你可以使用抽象工厂来代替外观模式。</p></li><li><p>你可以将抽象工厂和桥接模式搭配使用。 如果由桥接定义的抽象只能与特定实现合作， 这一模式搭配就非常有用。 在这种情况下， 抽象工厂可以对这些关系进行封装， 并且对客户端代码隐藏其复杂性。</p></li><li><p>抽象工厂、 生成器和原型都可以用单例模式来实现。</p></li></ul>',37)]))}]]),o=JSON.parse('{"path":"/posts/brainBoom/designPatterns/creational/abstract.html","title":"抽象模式","lang":"zh-CN","frontmatter":{"title":"抽象模式","icon":"/assets/images/brainBoom/designPatterns/creational/abstract/abstract-factory-mini.png","order":2,"category":["设计模式"],"description":"意图 抽象工厂模式是一种创建型设计模式， 它能创建一系列相关的对象， 而无需指定其具体类。 问题 假设你正在开发一款家具商店模拟器。 你的代码中包括一些类， 用于表示： 一系列相关产品， 例如 椅子Chair 、 ​ 沙发Sofa和 咖啡桌Coffee­Table 。 系列产品的不同变体。 例如， 你可以使用 现代Modern 、 ​ 维多利亚Vict...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/posts/brainBoom/designPatterns/creational/abstract.html"}],["meta",{"property":"og:site_name","content":"大喵喜的技术杂货铺"}],["meta",{"property":"og:title","content":"抽象模式"}],["meta",{"property":"og:description","content":"意图 抽象工厂模式是一种创建型设计模式， 它能创建一系列相关的对象， 而无需指定其具体类。 问题 假设你正在开发一款家具商店模拟器。 你的代码中包括一些类， 用于表示： 一系列相关产品， 例如 椅子Chair 、 ​ 沙发Sofa和 咖啡桌Coffee­Table 。 系列产品的不同变体。 例如， 你可以使用 现代Modern 、 ​ 维多利亚Vict..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-20T02:47:59.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-20T02:47:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"抽象模式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-20T02:47:59.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Jianshu.Shi\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"意图","slug":"意图","link":"#意图","children":[]},{"level":2,"title":"问题","slug":"问题","link":"#问题","children":[]},{"level":2,"title":"解决方案","slug":"解决方案","link":"#解决方案","children":[]},{"level":2,"title":"抽象工厂模式结构","slug":"抽象工厂模式结构","link":"#抽象工厂模式结构","children":[]},{"level":2,"title":"伪代码","slug":"伪代码","link":"#伪代码","children":[]},{"level":2,"title":"抽象工厂模式优缺点","slug":"抽象工厂模式优缺点","link":"#抽象工厂模式优缺点","children":[]},{"level":2,"title":"与其他模式的关系","slug":"与其他模式的关系","link":"#与其他模式的关系","children":[]}],"git":{"createdTime":1741180358000,"updatedTime":1742438879000,"contributors":[{"name":"damiaoxi","username":"damiaoxi","email":"miaoxi1110@gmail.com","commits":1,"url":"https://github.com/damiaoxi"},{"name":"Jianshu","username":"Jianshu","email":"jianshu.shi@eisgroup.com","commits":2,"url":"https://github.com/Jianshu"}]},"readingTime":{"minutes":8.88,"words":2665},"localizedDate":"2025年3月5日","excerpt":"<h2>意图</h2>\\n<p>抽象工厂模式是一种创建型设计模式， 它能创建一系列相关的对象， 而无需指定其具体类。</p>\\n<figure><figcaption></figcaption></figure>\\n<h2>问题</h2>\\n<p>假设你正在开发一款家具商店模拟器。 你的代码中包括一些类， 用于表示：</p>\\n<p>一系列相关产品， 例如 椅子<code>Chair</code> 、 ​ 沙发<code>Sofa</code>和 咖啡桌<code>Coffee­Table</code> 。</p>\\n<p>系列产品的不同变体。 例如， 你可以使用 现代<code>Modern</code> 、 ​ 维多利亚<code>Victorian</code> 、 ​ 装饰风艺术<code>Art­Deco</code>等风格生成 椅子 、 ​ 沙发和 咖啡桌 。</p>","autoDesc":true}')}}]);