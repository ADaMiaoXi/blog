---
title: 自定义 hook 函数
icon: mdi:hook
order: 8
category:
    - Vue
---

- 什么是 hook? --- 本质是一个函数，把 setup 函数中使用的 Composition API 进行了封装。
- 类似于  Vue2.* 中的 mixin。
- 自定义 hook 的优势：复用代码，让 setup 中的逻辑更清楚易懂。

useMouseClickedPosition.js

````javascript
import { reactive, onMounted, onUnmounted } from "vue"
export default () => {
    const position = reactive({ positionX: 0, positionY: 0 })
    const setPosition = event => {
        position.positionX = event.pageX
        position.positionY = event.pageY
    }
    onMounted(() => {
        window.addEventListener('click', setPosition)
    })

    onUnmounted(() => {
        window.removeEventListener('click', setPosition)
    })

    return position

}
````

Demo.vue

````vue
<template>
    <h5>当前鼠标点击的坐标为：{{ position.positionX }}，{{ position.positionY }}</h5>
</template>

<script>
import useMouseClickedPosition from '../hooks/useMouseClickedPosition'

export default {
    name: "Demo",
    setup() {
        const position = useMouseClickedPosition()

        return {
            position
        }
    },
};
</script>
````