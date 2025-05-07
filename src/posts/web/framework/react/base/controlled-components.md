---
title: 受控组件
icon: icon-park-outline:control
order: 8
category:
    - React
---

- 原生 DOM 元素自身维护自己的状态，并根据用户的输入进行对应的更新
- React 组件有 `state` 属性，用于存储组件的状态，并只能使用 `setState()` 对组件状态进行更新。

将两者结合起来使得渲染表单的 React 组件，唯一的使用 `state` 对表单数据进行控制。这种以 React state 控制表单状态的组件叫做 **受控组件**。

````jsx
class LoginForm extends React.Component {
    state = {
        username: '',
        password: ''
    }
    render(){
        return (
            <form onSubmit={this.submitForm}>
                用户名：<input type="text" onChange={this.typingUsername}/>
                密码：<input type="password" onChange={this.typingPassword}/>
                <button>提交</button>
            </form>
        )
    }
    typingUsername = (event) => { // 通过回调函数会传入事件对象这个特性，从而拿到事件目标上的属性值
        this.setState({ //将表单属性更新到React 组件状态 state 中
            username: event.target.value
        })
    }
    typingPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    submitForm = (event) => {
        event.preventDefault();
        const {username, password} = this.state //从状态中取得表单状态
        alert(`username: ${username}  password: ${password}`)
    }
}
ReactDOM.render(<LoginForm/>, document.querySelector('#app'))
````