---
title: 响应式原理
icon: ph:file-vue
order: 3
category:
  - Vue
---

## Vue2.*的响应式

- 实现原理：
  - 对象类型：通过 `Object.defineProperty()` 对属性的读取，修改进行拦截（数据劫持）。
  - 数据类型：通过重写更新数据的一系列方法来进行拦截（对数组变更方法进行了包裹）。
- 存在问题：
  - 薪资属性、删除属性，页面不会更新。
  - 直接通过下表修改数组，页面不会自动更新。

````vue
<template>
  <div id="app">
    <h2>这是 Vue2 测试页面</h2>
    <h4>姓名：{{ person.name }}</h4>
    <h4>年龄：{{ person.age }}</h4>
    <h4>兴趣爱好：{{ person.hobbies }}</h4>
    <h4 v-show="person.gender">性别：{{ person.gender }}</h4>
    <button @click="editHobbies">修改兴趣爱好</button>
    <button @click="addGender">添加性别</button>
    <button @click="deleteName">删除姓名</button>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'App',
  data() {
    return {
      person: {
        name: '张三',
        age: 88,
        hobbies: ['抽烟', '喝酒', '烫头']
      }
    }
  },
  methods: {
    editHobbies() {
      // Vue2 中对对象中数组直接进行修改也不会响应至页面
      // this.person.hobbies[0] = '吹水'
      // 需要通过 Vue 重写过的数组操作方法对数组进行操作才会响应至页面
      this.person.hobbies.splice(0,1, '吹水')
      console.log(this.person.hobbies)
    },
    addGender() {
      // Vue2 中对对象内直接添加属性，不会响应至页面，这个属性也不是响应式数据
      // this.gender = '男'
      // 需要使用 this.$set() 或者 Vue.set() 设置对属性才具备响应式
      Vue.set(this.person, 'gender', '男')
    },
    deleteName(){
      // Vue2 中对对象内直接删除属性，不会响应至页面
      //delete this.person.name
      // 需要使用 this.$delete() 或者 Vue.delete() 设置对属性进行删除才具备响应式
      this.$delete(this.person, 'name')
    }
  }
}
</script>

<style></style>
````

## Vue3.0 的响应式

- 实现原理
  - 通过 Proxy（代理）：拦截对象中任意属性的变化，包括：属性的读写、属性的添加、属性的删除。
  - 通过 Reflect（反射）：对代理对象的属性进行操作。

````javascript
const person = {
        name: '张三',
        age: 88,
        layer1: {
            layer2: {
                layer3: '你好'
            }
        }
    }

    const personProxy = new Proxy(person, {
        /**
         * 当代理对象上的属性被读取时触发 get 方法，并传入两个参数：
         * target: 目标对象
         * prop: 被读取的属性名
        */
        get(target, prop, receiver) {
            console.log(`person 对象上的 ${prop} 被读取了`)
            return Reflect.get(target, prop)
        },

        /**
         * 当代理对象上的属性被修改，或者添加属性时触发 set 方法，并传入三个参数
         * target: 目标对象
         * props: 被修改的属性名
         * value: 修改的值
         */
        set(target, prop, value) {
            console.log(`person 对象上的 ${prop} 被修改了`);
            Reflect.set(target, prop, value)
        },

        deleteProperty(target, prop) {
            console.log(`erson 对象上的 ${prop} 被删除了`);
            return Reflect.defineProperty(target, prop)
        }
    })
````