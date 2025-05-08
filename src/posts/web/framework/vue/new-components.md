---
title: 新的组件
icon: mingcute:vue-line
order: 10
category:
    - Vue
---

## Fragment

-   在 Vue2 中：组件必须有一个根标签
-   在 Vue3 中：组件可以没有根标签，内部会将多个标签包含在一个 Fragment 虚拟元素中
-   好处：减少标签层级，减少内存占用

## Teleport

-   什么是 Teleport？ `Teleport` 是一种能够将组件 HTML 结构移动到指定位置的组件

    ```vue
    <!-- 将 Teleport 包裹的组件传送到 html 标签上去 to=选择器语法 -->
    <Teleport to="html">
                <div class="mask" v-if='isShowDialog'>
                    <div class="dialog">
                        <button @click="closeDialog">Close dialog</button>
                    </div>
                </div>
    
            </Teleport>
    ```

## Suspense

-   等待异步组件时，渲染一些额外的内容，让应用有更好的用户体验

-   使用步骤：

    -   异步引入组件

        ```javascript
        import {defineAsyncComponent} from 'vue'
        // defineAsyncComponent(() => import('...path')) 生成一个动态引入的组件
        const ChildComponent = defineAsyncComponent(() => import('./components/ChildComponent.vue')) // 动态引入组件
        ```

    -   使用 `Suspense` 包裹组件，并配置好 `defalut` 与 `fallback` 插槽

        ```vue
        <Suspense>
          <!-- Suspense 内置具名插槽，default 展示要渲染的组件 -->
          <template v-slot:default>
            <ChildComponent></ChildComponent>
          </template>
          <!-- Suspense 内置具名插槽，fallback 展示渲染组件没有准备好的时候的占位组件 -->
          <template v-slot:fallback>
            <h4>等一等</h4>
          </template>
        </Suspense>
        ```
