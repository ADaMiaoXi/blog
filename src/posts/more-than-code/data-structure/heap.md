---
title: 堆
icon: mdi:family-tree
order: 7
category:
  - 数据结构与算法
---

堆是一种经过排序的完全二叉树，其中任一非终端节点的数据值均不大于（或不小于）其左子节点和右子节点的值。最大堆和最小堆是二叉堆的两种形式。

## 最小堆

根结点的键值是所有堆结点键值中最小者。

````javascript
import { compare, ComparisonResults, swap } from '../00.工具/utils.js'

export default class MinHeap {
    // 使用数组管理数据
    heap = []

    /**
     * 获取输入索引对应节点左侧枝叶节点的索引
     * @param {number} index 
     * @returns {number} leftIndex
     */
    getLeftIndex(index) {
        return 2 * index + 1
    }

    /**
     * 获取输入索引对应节点右侧枝叶节点的索引
     * @param {number} index 
     * @returns {number} rightIndex
     */
    getRightIndex(index) {
        return 2 * index + 2
    }

    /**
     * 获取输入索引对应节点的父节点的索引
     * @param {number} index 
     * @returns {number} parentIndex
     */
    getParentIndex(index) {
        return Math.floor((index - 1) / 2)
    }


    /**
     * 向最小堆中插入数据
     * @param {number} value
     * @returns {boolean} true/false
     */
    insert(value) {
        if (value != null) {
            //向堆中末尾插入数据
            this.heap.push(value)
            //从末尾开始捋顺堆（使堆的上层节点始终比下层节点小）
            this.shiftUp(this.heap.length - 1)
            return true
        }
        return false
    }

    /**
     * 从指定索引开始向上捋顺堆
     * @param {number} index 
     */
    shiftUp(index) {
        //获取该索引对应节点的父节点索引
        let parentIndex = this.getParentIndex(index)
        // 只要索引大于0（索引等于0表示已经找到最上层节点），比较该索引节点的值与父节点的值，如果发现比父节点值大，交换位置，继续向上比较，直到比到上层节点比该节点小为止
        while (index > 0 && compare(this.heap[parentIndex], this.heap[index]) === ComparisonResults.BIGGER) {
            swap(this.heap, parentIndex, index)
            index = parentIndex
            parentIndex = this.getParentIndex(parentIndex)
        }
    }

    size() {
        return this.heap.length
    }

    isEmpty() {
        return this.size() === 0
    }

    /**
     * 获取最小值
     * @returns {number} 最小值
     */
    findTarget() {
        return this.heap[0]
    }

    /**
     * 导出（返回并删除最小值）
     */
    extract() {
        if (this.isEmpty()) {
            return null
        }
        if (this.size() === 1) {
            return this.heap[0]
        }

        const removed = this.heap[0]
        //将堆内最末端的元素放到堆首（覆盖）
        this.heap[0] = this.heap.pop()
        //下捋，从堆首开始，将堆内最小的值重新捋到堆首，再将原堆首元素放到合适的位置
        this.shiftDown(0)
        return removed
    }

    /**
     * 从索引index开始向下捋顺(目的是将指定索引节点以下的最小值找出来放到指定节点上，再将该节点原先的值放到合适的位置)
     * 
     * @param {number} index 
     */
    shiftDown(index) {
        // current 为需要交换的位置
        let current = index
        const leftIndex = this.getLeftIndex(current)
        const rightIndex = this.getRightIndex(current)
        const heapSize = this.size()
        if (leftIndex <= heapSize && compare(this.heap[current], this.heap[leftIndex]) === ComparisonResults.BIGGER) {
            current = leftIndex
        }

        if (rightIndex <= heapSize && compare(this.heap[current], this.heap[rightIndex]) === ComparisonResults.BIGGER) {
            current = rightIndex
        }

        if (current !== index) {
            swap(this.heap, current, index)
            this.shiftDown(current)
        }
    }
}
````

## 最大堆

根结点的键值是所有堆结点键值中最大者。

最大堆的代码实现与最小堆几乎相同，除了对比大小的地方需要倒置。

````javascript
import { ComparisonResults, compare, swap } from "../00.工具/utils.js"

export default class MaxHeap {
    heap = []

    getLeftIndex(index) {
        return 2 * index + 1
    }

    getRightIndex(index) {
        return 2 * index + 2
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2)
    }

    insert(value) {
        if (value != null) {
            this.heap.push(value)
            this.shiftUp(this.heap.length - 1)
            return true
        }
        return false
    }

    shiftUp(index) {
        let currentIndex = index
        let parentIndex = this.getParentIndex(index)

        while (currentIndex > 0 && compare(this.heap[currentIndex], this.heap[parentIndex]) === ComparisonResults.BIGGER) {
            swap(this.heap, currentIndex, parentIndex)
            currentIndex = parentIndex
            parentIndex = this.getParentIndex(currentIndex)
        }
    }

    size() {
        return this.heap.length
    }

    isEmpty() {
        return this.size() === 0
    }

    extract() {
        if (this.isEmpty()) {
            return null
        }
        if(this.size() === 1){
            return this.heap.pop()
        }
        const removed = this.heap[0]
        this.heap[0] = this.heap.pop()
        this.shiftDown(0)
        return removed

    }

    shiftDown(index) {
        let current = index
        const leftIndex = this.getLeftIndex(current)
        const rightIndex = this.getRightIndex(current)
        const heapSize = this.size()

        if (leftIndex <= heapSize && compare(this.heap[leftIndex], this.heap[current]) === ComparisonResults.BIGGER) {
            current = leftIndex
        }

        if (rightIndex <= heapSize && compare(this.heap[rightIndex], this.heap[current]) === ComparisonResults.BIGGER) {
            current = rightIndex
        }

        if (index !== current) {
            swap(this.heap, index, current)
            this.shiftDown(current)
        }
    }
}
````