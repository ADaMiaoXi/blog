---
title: 高阶函数 & 函数柯里化
icon: fad:filter-rez-highpass
order: 9
category:
    - React
---

受控组件中，每个表单元素都必须占用一个回调函数用于获取到该表单元素本身（`event.target`）。这种方式在表单元素过多的时候需要定义出大量的功能、结构类似的回调函数。有什么办法能够统一一个方法作为多个表单元素的回调，并且能够清晰的获取到是调用回调的表单元素想要修改 `state` 中的哪个状态呢？

有的，通过 **高阶函数** + **函数柯里化** 技术可以实现：

## 高阶函数

如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数：

- 若 A 函数，**接受**的参数是一个**函数**，那么 A 就可以被称之为高阶函数；

  **Example:** `Promise`， `setTimeout()`，`Arrray.map()` ...

- 若 A 函数，调用的返回值依然是一个函数，那么该函数就是高阶函数

  **Example:** `bind()` ...

## 函数柯里化

通过函数调用继续返回函数的方式，实现多次接收参数，最后统一处理的函数编码方式：

````javascript
// 求和案例：
function sum(a) {
    return (b) => (c) => a + b + c
}
let res = sum(1)(2)(3)
console.log(res); // 6
````

### 2.9.3. 使用高阶函数 + 函数柯里化实现事件回调函数统一

````jsx
class LoginForm extends React.Component {
    state = {
        username: '',
        password: ''
    }
    render(){
        return (
            <form onSubmit={this.submitForm}>
                用户名：<input type="text" onChange={this.handleTyping('username')}/>
                密码：<input type="password" onChange={this.handleTyping('password')}/>
                <button>提交</button>
            </form>
        )
    }
    // 柯里化高阶函数，事件回调函数在返回中，将 stateName 传入事件处理函数
    handleTyping = (stateName) => {
        return (event) => {
            this.setState({
                [stateName]: event.target.value
            })
        }
    }
        
    submitForm = (event) => {
        event.preventDefault();
        const {username, password} = this.state
        alert(`username: ${username}  password: ${password}`)
    }
}
ReactDOM.render(<LoginForm/>, document.querySelector('#app'))
````