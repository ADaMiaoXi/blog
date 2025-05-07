---
title: 创建 Vue3.0 工程
icon: material-icon-theme:folder-vuepress-open
order: 1
category:
  - Vue3
---

## 使用 vue-cli 创建

````shell
## 查看 @vue/cli 版本，确保 @vue/cli 版本在 4.5.0 以上
vue --version
## 安装或者升级 @vue/cli
npm install -g @vue/cli
## 创建一个 vue 项目
vue create vue_test
## 启动项目
cd vue_test
npm run serve
````

## 使用 vite 创建

````shell
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行工程
npm run dev
````