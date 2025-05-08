---
title: toRef
icon: radix-icons:update
order: 9
category:
    - Vue
---

- 作用：创建一个 ref 对象，其 value 值只响应另一个对象中的某个属性

- 语法：`const name = toRef(person, 'name')`

- 应用：要将响应式对象中的某个属性单独提供给外部使用时。

- 拓展：`toRefs` 与 `toRef` 功能一致，但可以批量创建多个 ref 对象，语法：`toRefs(person)`

  ````vue
  <template>
      <div>姓名：{{ name }} <input type="text" @change="event => { name = event.target.value }"></div>
      <div>年龄：{{ age }} <input type="number" @change="event => { age = event.target.value }"></div>
      <div>职业： {{ job.type }} <input type="text" @change="event => { job.type = event.target.value }"></div>
      <div>详细：{{ job.details }} <button @click="() => {
          ob.details = {
              workDetails: '猪肉',
              salary: 'unknown'
          }
      }">更改</button></div>
  </template>
  
  <script>
  import { reactive, toRef, toRefs } from 'vue';
  
  export default {
      name: "Demo",
      setup() {
          const person = reactive({
              name: '张三',
              age: 88,
              job: {
                  type: '打工',
                  details: {
                      workDetails: '搬砖',
                      salary: '500'
                  }
              }
          })
  
          // 如果将响应式数据通过对象形式传出，再在 template 中直接对使用的地方的变量进行修改，并不会触发响应式，因为修改的并非是响应式对象本身，而是另外一个被赋值的变量。
          // return {
          //     name: person.name,
          //     age: person.age,
          //     jobType: person.job.type,
          //     jobDetails: person.job.details
          // }
  
          // 1. 使用 toRef(target, attributeName) 将指定响应式对象的属性转换至 ref 对象并嫁接至指定变量中，可实现响应式
          // return {
          //     name: toRef(person, 'name'),
          //     age: toRef(person, 'age'),
          //     jobType: toRef(person.job, 'type'),
          //     jobDetails: toRef(person.job, 'details')
          // }
  
          // 2. 使用 toRefs 可以将对象中所有的属性都进行 toRef 操作，并且返回一个同源对象具备相同 key 的对象，但是该对象的值都响应包装成了refImpl
          const refsObj = toRefs(person)
  
          return {
              ...refsObj
          }
      },
  };
  </script>
  
  <style></style>
  ````