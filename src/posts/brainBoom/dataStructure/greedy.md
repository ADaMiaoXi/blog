---
title: 贪心(登山)算法
icon: gears
order: 12
category:
  - 数据结构与算法
---

> 在求解问题时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，他所做出的仅是在某种意义上的局部最优解。贪心算法不是对所有问题都能得到整体最优解，但是对范围相当广泛的问题能够产生整体最优解或者是整体最优解的近似解。

## 背包（可拆分）问题

![](../../../.vuepress/public/assets/images/dataStructure/image-20240121200223773.png)

![](../../../.vuepress/public/assets/images/dataStructure/image-20240121200245365.png)

思路：算出每个物品的性价比（价值/重量），按照性价比从高到低放入背包，放不进了就切开来放，放满为止。

````javascript
/**
 * 【贪心算法】背包问题
 * @param {Array<number>} weights 
 * @param {Array<number>} values 
 * @param {number} capacity
 * @returns {number}
 */
export const knapSack = (weights, values, capacity) => {
    const objectList = []
    // 遍历物品，构建物品的详细信息（算出性价比）
    for (let i = 0; i < weights.length; i++) {
        objectList.push({
            index: i,
            weight: weights[i],
            value: values[i],
            costEffient: values[i] / weights[i]
        })
    }
    // 按照性价比给物品排序
    objectList.sort((a, b) => b.costEffient - a.costEffient)

    const knapSack = {
        productInKnapSack: [],
        value: 0,
        weight: 0,
        capacity: capacity
    }

    // 将物品按照性价比由高到低放入背包，放不下的切开来放进去能放进去的部分
    for (let i = 0; i < objectList.length; i++) {
        if (knapSack.capacity >= objectList[i].weight) {
            knapSack.productInKnapSack.push({ ...objectList[i], ratio: 1 })
            knapSack.value += objectList[i].value
            knapSack.weight += objectList[i].weight
            knapSack.capacity -= objectList[i].weight
        } else if (knapSack.capacity > 0) {
            const ratio = knapSack.capacity / objectList[i].weight
            knapSack.productInKnapSack.push({ ...objectList[i], ratio })
            knapSack.value += (objectList[i].value * ratio)
            knapSack.weight += objectList[i].weight * ratio
            knapSack.capacity -= objectList[i].weight * ratio
            break
        } else {
            break
        }
    }

    console.log('knapSack:', knapSack)
    return knapSack.value
}
````