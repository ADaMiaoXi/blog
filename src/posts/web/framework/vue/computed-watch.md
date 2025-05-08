---
title: computed 和 watch
icon: oui:integration-observability
order: 6
category:
    - Vue
---

## computed函数

````vue
template>
    <div>firstName: <input type="text" v-model="person.firstName" /></div>
    <div>lastName: <input type="text" v-model="person.lastName" /></div>
    <div>fullName: <input type="text" v-model="person.fullName" /></div>
</template>
  
<script>
import { reactive, computed } from "vue";

export default {
    name: "Demo",

    setup() {
        const person = reactive({
            firstName: '张',
            lastName: '三'
        })

        // Vue3 计算属性的简写方法，不可修改
        // person.fullName = computed(() => {
        //     return `${person.firstName} - ${person.lastName}`
        // })

        // Vue3 计算属性完整写法，可以修改
        person.fullName = computed({
            get: () => {
                return `${person.firstName}-${person.lastName}`
            },
            set: value => {
                const splited = value.split('-')
                person.firstName = splited[0]
                person.lastName = splited[1]
            }
        })

        return {
            person
        }
    }
};
</script>
````

## watch 函数

- 与 Vue2.* 中配置功能一致

- 两个“坑”：

  - 监视 reactive 定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep 配置无效）
  - 监视 reactive 定义的响应式数据中某个属性时：deep 配置有效。

  ````vue
  <template>
      <h4>{{ sayHi }}</h4>
      <h4>{{ count }}</h4>
      <button @click="clickCallback">点击一下！</button>
      <button @click="count++">+1</button>
      <div>
          姓名：<input type="text" v-model="person.name">
      </div>
      <div>
          年龄：<input type="number" v-model="person.age">
      </div>
      <div>
          薪资：<input type="number" v-model="person.job.salary">
      </div>
  </template>
    
  <script>
  import { reactive, ref, watch } from "vue";
  
  export default {
      name: "Demo",
      // Vue2 watch 简写，仅能监视同名数据变化，并执行同名函数
      // watch: {
      //     sayHi(newValue, preValue) {
      //         console.log('new sayHi new value:', newValue);
      //         console.log('new sayHi old value:', preValue);
      //     }
      // },
  
      // Vue2 watch 完整写法
      // watch: {
      //     sayHi: {
      //         handler(newValue, preValue) { // 监视同名数据变化，并执行 handler 函数
      //             console.log('new sayHi new value:', newValue);
      //             console.log('new sayHi old value:', preValue);
      //         },
      //         deep: true, // 支持深层监视
      //         immediate: true // 页面挂载立刻触发一次
      //     }
      // },
  
      setup() {
          let sayHi = ref('你好呀!')
          let count = ref(0)
  
          const person = reactive({
              name: '张三',
              age: 44,
              job: {
                  salary: 5000
              }
          })
  
          // 情况一：监视 ref 所定义的一个响应式数据
          // Vue3 watch 完整写法
          // watch(sayHi, (newValue, preValue) => {
          //     console.log('new sayHi new value:', newValue);
          //     console.log('new sayHi old value:', preValue);
          // }, {
          //     immediate: true
          // })
  
          // 情况二：监视 ref 所定义的多个响应式数据
          // watch 函数的第一个参数可以接收一个数组，同时监视数组内所有数据的变化
          // watch([sayHi, count], (newValue, preValue) => {
          //     console.log('new value:', newValue); // newValue：最新值组成的数组
          //     console.log('old value:', preValue); // preValue: 旧值组成的数组
          // }, {
          //     immediate: true
          // })
  
          // 情况三：监视 reactive 所定义的一个响应式数据的全部属性
          /**
           * 问题一：当watch的是一个 reactive 对象的时候，newValue 和 preValue 都为最新的值
           * 问题二：深度监视默认开启，且关不掉（deep 配置项无效）
           */
          // watch(person, (newValue, preValue) => {
          //     console.log('new value:', newValue);
          //     console.log('old value:', preValue);
          // },{
          //     deep: false
          // })
  
          // 情况四： 监视 reactive 所定义的一个响应式数据的一个属性
          /**
           * 问题三：watch reactive 所定义的一个响应式数据的一个属性时，直接写 watch(person.name) 无效，需要写成函数，将想要监视的属性作为函数的返回值返回出来
           */
          // watch(() => person.name, (newValue, preValue) => {
          //     console.log('new value:', newValue);
          //     console.log('old value:', preValue);
          // })
  
          // 情况五： 监视 reactive 所定义的一个响应式数据的多个属性
          /**
           * 同问题三，watch reactive 所定义的一个响应式数据的多个属性时，直接写 watch([person.name, person.age]) 无效
           * 需要将想要监视的属性作为函数的返回值返回出来，并将这些函数装进数组内
           */
          // watch([() => person.name, () => person.age], (newValue, preValue) => {
          //     console.log('new value:', newValue);
          //     console.log('old value:', preValue);
          // })
  
          // 情况六：监视 reactive 所定义的一个响应式数据的一个属性，该属性是一个具有深层结构的对象
          /**
           * ，该对象的深层属性发生变化的时，需要设置 deep: true 才能监视到变化
           */
          watch(() => person.job, (newValue, preValue) => {
              console.log('new value:', newValue);
              console.log('old value:', preValue);
          },{
              deep: true
          })
  
          const clickCallback = () => {
              sayHi.value += '!'
          }
  
          return {
              sayHi,
              count,
              person,
              clickCallback
          }
      }
  };
  </script>
  ````


## watchEffect 函数

- watch：既要知名监视的属性，也要指明监视的回调。
- watchEffect：不用指明监视哪个属性，监视的回调中用到哪个属性，就监视哪个属性。
- watchEffect 与 computed：
  - computed 注重计算出来的值（回调函数的返回值），所以必须要写返回值。
  - watchEffect 注重函数内过程（回调函数的函数体），所以不用谢返回值

````vue
/**
 *  watchEffect
 * - 会自动扫描内部响应式数据，当响应式数据发生变化时，自动调用一次回调函数
 * - 组件挂载时自动调用一次
 */
 watchEffect(() => {
    const a = count.value
    const b = person.job.salary
    console.log("watchEffect 被调用了！")
})
````