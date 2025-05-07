---
title: Vue3 生命周期
icon: cuida:loop-outline
order: 7
category:
    - Vue3
---

![组件生命周期图示](../../../../.vuepress/public/assets/images/web/framework/vue3/lifecycle_zh-CN.W0MNXI0C.png)

- Vue3.0中可以继续使用Vue2.x中的声明周期钩子，但是有两个已更名：
  - `beforeDestory` 更名为 `beofreUnmount`
  - `destoryed` 更名为 `unmounted`

- Vue3.0也提供了 Composition API 形式的生命周期钩子，与 Vue2.x 中钩子对应如下：
  - `beforeCreate` => `setup()`
  - `created` => `setup()`
  - `beforeMount` => `beforeMount`
  - `mounted` => `onMounted`
  - `beforeUpdate` => `onBeforeUpdate`
  - `update` => `onUpdated`
  - `beforeUnmount` => `onBeforeUnmount`
  - `unmounted` => `onUnmounted`