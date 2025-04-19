---
title: React 路由
icon: devicon:reactrouter-wordmark
order: 13
category:
    - React
---

## 前端路由原理

> 单页应用使得页面可以在无刷新的条件下重新渲染，通过hash或者html5 Bom对象中的history可以做到改变url，但是不刷新页面。 

### 通过hash来实现前端路由

早期的前端路由是通过hash来实现的：**改变url的hash值是不会刷新页面的。**因此可以通过hash来实现前端路由，从而实现无刷新的效果。

#### 改变 url 的 hash 值

`hash` 属性位于 `location` 对象中，在当前页面中，可以通过：

```
window.location.hash='edit'
```

来实现改变当前 url 的 hash 值。执行上述的 hash 赋值后，页面的 url 发生改变。

赋值前：[http://localhost:3000](https://link.juejin.im?target=http%3A%2F%2Flocalhost%3A3000) 赋值后：[http://localhost:3000/#edit](https://link.juejin.im?target=http%3A%2F%2Flocalhost%3A3000%2F%23edit)

在 url 中多了以 `#` 结尾的 hash 值，但是赋值前后虽然页面的 hash 值改变导致页面完整的 url 发生了改变，但是页面是不会刷新的。

#### 监听 url 中的 hash 变化

通过 hash 改变了url，会触发 `hashchange` 事件，只要监听 `hashchange` 事件，就能捕获到通过 `hash` 改变 url 的行为。 

````javascript
window.onhashchange=function(event){
  console.log(event);
}
//或者
window.addEventListener('hashchange',function(event){
   console.log(event);
})
````

 当 `hash` 值改变时，输出一个 `HashChangeEvent`。该 `HashChangeEvent` 的具体值为：

````javascript
{
    isTrusted: true, 
    oldURL: "http://localhost:3000/",
    newURL: "http://localhost:3000/#teg",
    type: "hashchange",
    .....
}
````

有了监听事件，且改变 `hash` 页面不刷新，这样我们就可以在监听事件的回调函数中，执行我们展示和隐藏不同UI显示的功能，从而实现前端路由。 

### 通过 history 实现前端路由

HTML5 的 History 对象是一个底层接口，不继承于任何的接口。History接口允许我们操作浏览器会话历史记录。

    ````javascript
var history = window.history
    ````

 History 的属性：

- `History.length`：返回在会话历史中有多少条记录，包含了当前会话页面。此外如果打开一个新的Tab，那么这个length的值为1
- `History.state`：保存了会出发 `popState` 事件的方法，所传递过来的属性对象（后面会在 `pushState` 和`replaceState` 方法中详细的介绍）

History方法：

- `History.back()` ：返回浏览器会话历史中的上一页，跟浏览器的回退按钮功能相同
- `History.forward()`：指向浏览器会话历史中的下一页，跟浏览器的前进按钮相同
- `History.go()`：可以跳转到浏览器会话历史中的指定的某一个记录页
- `History.pushState()`：`pushState` 可以将给定的数据压入到浏览器会话历史栈中，该方法接收 3 个参数，对象，title 和一串 url。pushState后会改变当前页面 url ，但是不会伴随着刷新
- `History.replaceState()`：`replaceState` 将当前的会话页面的url替换成指定的数据，`replaceState` 后也会改变当前页面的 url，但是也不会刷新页面。

#### 改变浏览器的 history

`History` 的方法中，`pushState` 和 `repleaceState` 有一个相同点：**会改变当前页显示的url，但都不会刷新页面。**

两者不同的是： **pushState是压入浏览器的会话历史栈中，会使得History.length加1，而replaceState是替换当前的这条会话历史，因此不会增加History.length.** 

因此可以通过调用：

- `history.pushState()` 
- `history.repleaceState()` 

来改变当前显示的 url，从而实现前端路由。

#### 监听通过 history 来改变 url 的事件

 History改变url有以下几种方法：

- `History.back()`
- `History.forward()`
- `History.go()`
- `History.pushState()`
- `History.replaceState()`

同时在 `history` 中还支持一个事件，该事件为 `popstate`。第一想法就是如果popstate能够监听所有的history方法所导致的url变化，那么就大功告成了。遗憾的是： 

-  `History.back()`、`History.forward()`、`History.go()` 事件是会触发popstate事件，但是会触发页面跳转。
-  `History.pushState()` 和 `History.replaceState()` ，不会触发页面跳转，但是也**不会触发** `popstate` 事件。



 **如何监听replaceState和pushState行为？**

 可以通过在方法里面主动的去触发popState事件。另一种就是在方法中创建一个新的全局事件。 

具体的做法为：

````javascript
var _wr = function(type) {
   var orig = history[type];
   return function() {
       var rv = orig.apply(this, arguments);
      var e = new Event(type);
       e.arguments = arguments;
       window.dispatchEvent(e);
       return rv;
   };
};
history.pushState = _wr('pushState');
history.replaceState = _wr('replaceState');
````

 这样就创建了2个全新的事件，事件名为pushState和replaceState，我们就可以在全局监听： 

````javascript
window.addEventListener('replaceState', function(e) {
  console.log('THEY DID IT AGAIN! replaceState 111111');
});
window.addEventListener('pushState', function(e) {
  console.log('THEY DID IT AGAIN! pushState 2222222');
});
````

 这样就可以监听到 `pushState` 和 `replaceState` 行为。 



## React Router 6.x

- React Router 以三个不同的报发布到 npm 上，它们分别是：
  - react-router：路由的核心组件库，提供了最全的组件、钩子
  - react-router-dom：包含 react-router所有内容，并添加一些专门用于 DOM 的组件，例如 `BrowserRouter` 等。
  - react-router-native：包括 react-router 所有内容，并添加一些专门用于 ReactNative 的 API，例如 `<NativeRouter>` 等。
- 与 React Router 5.x 版本相比，改变了什么
  - 内置组件的变化：移除 `<Switch/>`，新增 `<Routes>`  等。
  - 语法变化：`component={About}` 变为 `element={<About/>}` 等。
  - 新增多个 hook：`useParams`、`useNavigate`、`useMatch` 等。
  - **官方明确推荐函数式组件了！！！**

### React Router 依赖

React Router 并没有集成在 React 中，所以使用前需要额外安装依赖：

````shell
yarn add react-router-dom
````

### 基本使用

#### 路由链接 `<Link/>`

- ：在 React 中依靠 **路由链接** 切换组件：

  ````jsx
  import { Link } from 'react-router-dom';
  
  <Link to="/about">About</Link>
  <Link to="/home">Home</Link>
  ````

#### 路由器 `<Router/>`

- **路由链接** 必须包裹在 `<Router>` 组件下使用，以检测路由的变化：

  ` <Router>` 组件分为两种，分别对应两种路由模式

  - `<BrowserRouter></BrowserRouter>`：history mode Router
  - `<HashRouter></HashRouter>`：hash mode Router

  ````jsx
  import { Link, BrowserRouterr } from 'react-router-dom';
  
  /*
  // link 组件需要包裹在 Router 组件下
  </BrowserRouter>
      <Link to="/about">About</Link>
  	<Link to="/home">Home</Link>
  </BrowserRouter>
  */
  	<Link to="/about">About</Link>
  	<Link to="/home">Home</Link>
  ````

#### 路由组件 `<Route/>`

- 使用 `<Route/>` **注册路由组件** 以监听路由的变化以渲染对应的组件

  ````jsx
  import { Route,  Routes } from 'react-router-dom';
  // 引入组件
  import Home from './pages/Home';
  import About from './pages/About';
  /*
  // Route 组件也要包裹在 Router 下
  // Router 仅监听自己组件实例包裹下的路由链接及注册路由组件的映射关系，所以 Link 和 Route 必须在同一个 // 		 Router 包裹下
  </BrowserRouter>
  	<Routes>
  		<Route path="/about" element={<About/>} />
  		<Route path="/home" element={<Home/>} />
  	</Routes>
  </BrowserRouter>
  */
  
  // Route 组件需要包裹在 Routes 组件里
  <Routes>
  	<Route path="/about" element={<About/>} />
  	<Route path="/home" element={<Home/>} />
  </Routes>
  ````

  - `path` 属性定义该注册的路由对应的路由键，`element` 属性指定该路由渲染的组件。

  - React-Router 6.* 版本中，`<Route>` 必须包裹在 `<Routes>` 组件下，被 `<Routes>` 组件管理，不能单独注册渲染。当 URL 发生变化时，`Routes` 会查看其所有子 `Route` 元素以找到最佳匹配并渲染组件。

  - `<Route> ` 也必须包裹在 `<Router>` 组件下使用，以监听触发路由。

  - `<Route> `  和 `<Link>` 必须包裹在同一个 `<Router>` 下才能完成对应的路由变化触发和路由渲染。换句话说，`<Router>` 管理着 `<Route> `  和 `<Link>`  的对应关系。

    > 因此应将所有路由链接和路由组件包裹在同一个 `<Router>` 下，以此实现项目内所有路由链接都能控制项目内所有注册路由的组件，可以考虑将项目的根组件包裹起来：
    >
    > ````jsx
    > import React from 'react';
    > import { createRoot } from 'react-dom/client';
    > import App from './App';
    > import { BrowserRouter } from 'react-router-dom';
    > 
    > const root = createRoot(document.querySelector('#root'));
    > root.render(
    >     <BrowserRouter>
    >         <App />
    >     </BrowserRouter>
    > );
    > ````

### 重定向 `<Navigate/>`

React-Router 6.* 中添加了 `<Navigate/>` 组件用于重定向，`<Navigate/>` 组件一旦**被渲染**，**页面**便会**刷新**发生重定向。

- `<Navigate to= "/home">` 中 属性 **to** 用于指定重定向的目标路由（依旧是路由发生变化而引发的路由组件渲染，但是页面会重新刷新）。
-  `<Navigate replace={boolean}>` 中 属性 `replace` 为重定向模式，其中 `boolean`：
  - **默认**为 `false` 即重定向为 `push` 模式，会留下回退记录。
  - `true` 重定向设置为 `replace` 模式，不会留下回退记录。

> 例 1 ：下面的代码中，如果 URL 路由为空时，页面会重定向至 `/about` 对应页面：
>
> ````jsx
> <div className="row">
>     <div className="col-xs-2 col-xs-offset-2">
>         <div className="list-group">
>             {/* 注册路由链接 */}
>             <NavLink className="list-group-item" to="/about">
>                 About
>             </NavLink>
>             <NavLink className="list-group-item" to="/home">
>                 Home
>             </NavLink>
>         </div>
>     </div>
>     <div className="col-xs-6">
>         <div className="panel">
>             <div className="panel-body">
>                 {/* 注册路由组件 */}
>                 <Routes>
>                     <Route path="/about" element={<About/>} /> 
>                     <Route path="/home" element={<Home/>} />
>                     {/* url 路由为空时，重定向至路由 /about 对应页面 */}
>                     <Route path='/' element={<Navigate to="/about"/>}/>
>                 </Routes>
>             </div>
>         </div>
>     </div>
> </div>
> ````
>
> 例 2 ：下面的代码中，当 count 增加至 3 时，页面会重定向至 `/home` 对应页面
>
> ````jsx
> export default function About() {
>     let [count, setCount] = useState(0)
>     return (
>         <div className="panel-body">
>             <h3>我是About的内容</h3>
>             <button onClick={() => setCount(++count)}>Clik me to add 1, meet 3 redirect to Home page, now is {count}</button>
>             {count >= 3 ? <Navigate to="/home" replace={true}/> : <></>}
>         </div>
>     );
> }
> ````

### 高亮路由链接 `<NavLink/>`

`<NavLink/>` 功能与 `Link` 相同，不同的地方在于，`<NavLink/>` 被点击时会默认给其自身编译后的 `<a/>` 标签添加上 active 类。

`<NaLink/>` 支持自定义点击切换类。

- `<NavLink/>` 的属性 `className` 可以接收一个回调函数函数，该回调函数每当本 `<NavLink/>` 被点击，或其他 `<NavLink/>` 被点击时被调用。
- 该回调函数入参为一个包含 `isActive` 属性的对象：`{isActive: boolean}`。
- 当本 `<NavLink>` 被点击时，入参为 `{isActive: true}`，否则为 `{isActive: false}`。
- `<NavLink/>` 会将 `className` 属性回调函数的返回值作为编译后 `<a/>` 的类名。

````jsx
function App() {
    // 自定义高亮路由链接样式回调函数
    function isActive({isActive}){
        return isActive ? 'list-group-item hightlight' : 'list-group-item'
    }

    return (
        <div id="root">
            <div>
                <div className="row">
                    <Header/> 
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            <NavLink className={isActive} to="/about">
                                About
                            </NavLink>
                            <NavLink className="list-group-item" to="/home">
                                Home
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Routes>
                                    <Route path="/about" element={<About/>} /> 
                                    <Route path="/home" element={<Home/>} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
````

### 路由表 `useRouter()`

手动写类似于下面的代码，如果路由映射较多的情况下会非常的麻烦且冗余。

````jsx
<Routes>
	<Route path="/about" element={<About/>} /> 
	<Route path="/home" element={<Home/>} />
	<Route path='/' element={<Navigate to="/about"/>}/>
</Routes>
````

在 React Router 6.* 中引入了路由表可以集中管理路由和组件的映射关系。

使用 `useRouter()` 创建路由表：

````jsx
const element = useRoutes(routes)
````

- `routes`：路由表配置对象，用于指定 URL 路由和所需渲染组件的对应关系，结构如下：

  ````javascript
  import { Navigate } from "react-router-dom"
  import About from "../pages/About/About"
  import Home from "../pages/Home/Home"
  
  const routes =  [{
      path:'/about',
      element: <About/>
  },{
      path:'/home',
      element: <Home/>
  },{
      path:'/',
      element: <Navigate to="/about"/>
  }]
  ````

- `useRouter()` 的返回值 `element` 为生成的路由代码，将其插入到路由组件希望渲染的地方即可：

  ````jsx
  function App() {
      // useRoute(routesMapping) 使用路由表，自动生成路由代码
      const element = useRoutes(routes)
      return (
          <div id="root">
              <div>
                  <div className="row">
                      <Header/> 
                  </div>
                  <div className="row">
                      <div className="col-xs-2 col-xs-offset-2">
                          <div className="list-group">
                              <NavLink className="list-group-item" to="/about">
                                  About
                              </NavLink>
                              <NavLink className="list-group-item" to="/home">
                                  Home
                              </NavLink>
                          </div>
                      </div>
                      <div className="col-xs-6">
                          <div className="panel">
                              <div className="panel-body">
                                  {element}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
  ````

### 嵌套路由

#### 嵌套路由路由表配置

很多时候，在路由组件中还需要使用一些路由变化决定该路由组件中显示什么内容，这就是嵌套路由。路由表提供了一种嵌套配置的方式对嵌套路由也实现了集中管理。

在路由表配置对象数组中的某一项中，通过 `childern` 属性指定嵌套路由，`children` 接收一个同路由表配置对象格式的一个数组配置对象，如下：

````javascript
const routes =  [{
    path:'/about',
    element: <About/>
},{
    path:'/home',
    element: <Home/>,
    children: [{
        path: 'news',
        element: <News/>
    },{
        path: 'message',
        element: <Message/>
    }]
},{
    path:'/',
    element: <Navigate to="/about"/>
}]
````

其中，嵌套路由的 `path` 属性有两种写法：

- 全路径 `"/home/news"`
- 缩写路径 `"news"`

#### 嵌套路由链接

对于在路由组件中定义的路由链接：

````jsx
<ul className="nav nav-tabs">
    <li>
        <NavLink className="list-group-item" to="news">News</NavLink>
    </li>
    <li>
        <NavLink className="list-group-item " to="message">Message</NavLink>
    </li>
</ul>
````

此处的 `NavLink` 组件中的 `to` 属性，由于其表示一个嵌套路由跳转路径，写法有三种：

- 全路径： `"/home/news"`

- 相对路径：`"./news"`
- 缩写路径：`"news"`

#### 嵌套路由的渲染位置

React Router 6.* 提供了一个 `Outlet` 组件用于声明嵌套组件的渲染位置，嵌套路由组件会被渲染在 `<Outlet/>`组件所在的位置：

````jsx
<div className="panel-body">
    <ul className="nav nav-tabs">
        <li>
            <NavLink className="list-group-item" to="news">News</NavLink>
        </li>
        <li>
            <NavLink className="list-group-item " to="message">Message</NavLink>
        </li>
    </ul>
    <Outlet></Outlet>
</div>
````

上面代码中，`news` 和 `message` 对应的组件会被渲染在 `Outlet` 所在的位置。

### 4.2.7. 路由的 params 参数 `useParams()`

在 URL 上除了定义路由键用作路由匹配，还可以添加一些参数。

> `http://localhost:3000/home/message/detail/003/message003/Demo_message_003`
>
> 其中 `detail` 为路由键，用于匹配路由组件。`003` ，`message003`，`Demo_message_003`均为 params 参数。

- 在定义路由链接时，可以通过模板字符串传递 params 参数

  ````jsx
  <div>
      <ul>
          {messages.map(message => (
              <li key={message.id}>
                  <Link to={`detail/${message.id}/${message.title}/${message.message}`}>{message.title}</Link>
              </li>
          ))}
      </ul>
      <Outlet/>
  </div>
  ````

- 在路由表中，定义路由匹配规则时，需要使用 `/:id` 来声明 URL 此片段为传递的参数

  ````jsx
  {
      path: 'message',
      element: <Message />,
      children: [
          {
              path: 'detail/:id/:title/:message',
              element: <Detail/>
          }
      ]
  }
  ````

- 在路由组件中，可以使用 `useParams()` Hook 来获取 URL 上传过来的 params 参数

  ````jsx
  import { useMatch, useParams } from "react-router-dom"
  
  export default function Detail(){
      // useParams() hook 可以获得 url 上带的参数 （推荐）
      const {id, title, message} = useParams()
  
      // useMatch(routePathString) 可以获得 match 对象，从 match 对象中的 params 也可以获得url参数 （不推荐）
      const match = useMatch('/home/message/detail/:id/:title/:message')
  
      console.log(match.params);
  
      return (
          <ul>
              <li>message_id: {id}</li>
              <li>message_title: {title}</li>
              <li>message_content: {message}</li>
          </ul>
      )
  }
  ````

### 路由中的 search 参数

除了 params 参数，还可以在 URL 路由键后添加 search 参数：

> `http://localhost:3000/home/message/detail?id=003&title=message003&message=Demo_message_003`
>
> 其中 `detail` 为路由键，用于匹配路由组件。`?` 后面的以 `&` 隔开的就是 search 参数。

- 在定义路由链接时，可以通过模板字符串传递 search 参数。

  ````jsx
  <ul>
      {messages.map(message => (
          <li key={message.id}>
              <Link to={`detail?id=${message.id}&title=${message.title}&message=${message.message}`}>{message.title}</Link>
          </li>
      ))}
  </ul>
  ````

- 在路由表中，定义路由匹配规则时，不需要额外声明参数

  ````jsx
  {
      path: 'message',
      element: <Message />,
      children: [
          {
              path: 'detail',
              element: <Detail/>
          }
      ]
  }
  ````

- 在路由组件中，可以使用 `useSearchParams()` Hook 来获取 search 参数：

  ````jsx
  import { useSearchParams, useLocation } from "react-router-dom"
  
  export default function Detail(){
  
      const [params, setParams] = useSearchParams()
  
      // 使用 useLication 也可以获得 search 参数
      const location = useLocation()
      // location 中有 search 属性，值即为 search 参数字符串
      console.log(location.search)
  
      return (
          <ul>
              <li>message_id: {params.get('id')}</li>
              <li>message_title: {params.get('title')}</li>
              <li>message_content: {params.get('message')}</li>
          </ul>
      )
  }
  ````

  `useSearchParams()`的返回值是一个数组，其中：

  - 第一个参数：search 参数对象，需要通过对象身上的 `get() 方法，根据方法传入的路径字符串获取到响应的参数值。
  - 第二个参数：修改 search 参数的方法，接收一个 search 参数形式的字符串，并将该字符串替换现有 search 参数。

### 路由中的 state 参数

不想再 URL 里拼接参数？那就通过路由传递 state 参数吧！

- `Link` 组件中可以传递 `state` 属性，该属性接收一个对象，该对象即为路由的 state 参数。

  ````jsx
  <ul>
      {messages.map(message => (
          <li key={message.id}>
              <Link to="detail" state={{
                  id: message.id,
                  title: message.title,
                  message: message.message
              }}>{message.title}</Link>
          </li>
      ))}
  </ul>
  ````

- 在路由组件中，可以使用 `useLocation()` Hook 来获取 state 参数

  ````jsx
  import { useLocation } from "react-router-dom"
  
  export default function Detail(){
  
      // 使用 useLication 可以获得 state 参数
      const location = useLocation()
      // location 中有 state 属性，值即为 state 参数对象
      const { state: {id, title, message}} = location
  
      return (
          <ul>
              <li>message_id: {id}</li>
              <li>message_title: {title}</li>
              <li>message_content: {message}</li>
          </ul>
      )
  }
  ````

  `location` 对象中，`state` 对象即为路由链接传递过来的 state 参数。

### 4.2.10. 编程式路由

React Router 6.* 提供了一种方式，能够实现不依赖 `Link` 组件也能实现 URL 路由变化。

`useNavigate()` Hook 会返回一个函数：`navigate`，可以使用该函数进行路由跳转：

````jsx
export default function Message() {
    const [messages] = useState([
        {
            id: '001',
            title: 'message001',
            message: 'Demo_message_001'
        },
        {
            id: '002',
            title: 'message002',
            message: 'Demo_message_002'
        },
        {
            id: '003',
            title: 'message003',
            message: 'Demo_message_003'
        }
    ]);

    const navigate = useNavigate()

    const openDeatil = (message) => 
         navigate("detail", {
            replace: false,
            state: {
                id: message.id,
                title: message.title,
                message: message.message
            }
        });
    ;

    return (
        <div>
            <ul>
                {messages.map(message => (
                    <li key={message.id}>
                        {message.title} <button onClick={() => openDeatil(message)}>Click here for details</button>
                    </li>
                ))}
            </ul>
            <Outlet />
        </div>
    );
}
````

`navigate(routePath, configObj)`

-  `routePath`：路由跳转路径
- `configObj`：配置对象，包含两个属性：
  - `replace`：跳转方式，默认为 false (push)
  - `state`：state 参数

`navigate(num)`：navigate 函数的入参也可以是一个数字

- `navigate(-1)`：浏览器后退
- `navigate(1)`：浏览器前进