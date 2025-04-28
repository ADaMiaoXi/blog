import {sidebar} from 'vuepress-theme-hope'

export const zhSidebar = sidebar({
    '/': [
        '',
        {
            text: '代码不止',
            icon: 'proicons:code',
            prefix: 'posts/coding-more/',
            collapsible: true,
            children: [
                {
                    text: 'JavaScript',
                    prefix: 'JavaScript',
                    icon: 'https://www.runoob.com/wp-content/uploads/2013/07/js-logo.png',
                    collapsible: true,
                    children: 'structure'
                },
                {
                    text: 'React',
                    prefix: 'react/',
                    icon: 'skill-icons:react-dark',
                    collapsible: true,
                    children: [
                        {
                            text: '基础',
                            prefix: 'base',
                            icon: 'material-symbols-light:menu-book-outline',
                            collapsible: true,
                            children: 'structure'
                        },
                        {
                            text: '进阶',
                            prefix: 'advance',
                            icon: 'game-icons:spell-book',
                            collapsible: true,
                            children: 'structure'
                        }
                    ]
                },
                {
                    text: 'Vue3',
                    icon: 'logos:vue',
                    prefix: 'vue3',
                    collapsible: true,
                    children: 'structure'
                },
                {
                    text: 'Mobx',
                    icon: 'devicon-plain:mobx',
                    link: 'mobx/'
                },
                {
                    text: '前端工程化',
                    prefix: 'frontend-engineering/',
                    icon: 'eos-icons:organisms',
                    collapsible: true,
                    children: [
                        {
                            text: 'Babel',
                            prefix: 'babel/',
                            icon: 'material-icon-theme:babel',
                            collapsible: true,
                            children: 'structure'
                        },
                        {
                            text: 'Webpack',
                            prefix: 'webpack/',
                            icon: 'material-icon-theme:webpack',
                            collapsible: true,
                            children: [
                                {
                                    text: '基础',
                                    prefix: 'base',
                                    icon: 'material-symbols-light:menu-book-outline',
                                    collapsible: true,
                                    children: 'structure'
                                },
                                {
                                    text: '进阶',
                                    prefix: 'advance',
                                    icon: 'game-icons:spell-book',
                                    collapsible: true,
                                    children: 'structure'
                                },
                                {
                                    text: '原理',
                                    prefix: 'principle',
                                    icon: 'hugeicons:ai-idea',
                                    collapsible: true,
                                    children: 'structure'
                                },
                                {
                                    text: 'webpack 项目',
                                    prefix: 'project',
                                    icon: 'ix:project',
                                    collapsible: true,
                                    children: 'structure'
                                }
                            ]
                        }
                    ]
                },
                {
                    text: 'Electron',
                    icon: 'skill-icons:electron',
                    link: 'electron/'
                },
            ]
        },
        {
            text: '不止代码',
            prefix: 'posts/more-than-code/',
            icon: 'material-symbols:code-off-rounded',
            collapsible: true,
            children: [
                {
                    text: '浏览器',
                    prefix: 'browser',
                    icon: 'eos-icons:application-window-outlined',
                    collapsible: true,
                    children: 'structure'
                },
                {
                    text: '网络',
                    prefix: 'network',
                    icon: 'line-md:spotify',
                    collapsible: true,
                    children: 'structure'
                }
            ]
        },
        {
            text: '脑力涌现',
            icon: 'eos-icons:neural-network',
            prefix: 'posts/brain-boom/',
            collapsible: true,
            children: [
                {
                    text: '数据结构与算法',
                    prefix: 'data-structure',
                    icon: '/assets/icon/data-structure.png',
                    collapsible: true,
                    children: 'structure'
                },
                {
                    text: '设计模式',
                    prefix: 'design-patterns/',
                    icon: 'mdi:lightbulb-on-10',
                    collapsible: true,
                    children: [
                        {
                            text: '创建型模式',
                            icon: 'material-symbols:new-window-rounded',
                            prefix: 'creational/',
                            collapsible: true,
                            children: 'structure'
                        },
                        {
                            text: '结构型模式',
                            icon: 'material-symbols:view-in-ar-outline-rounded',
                            prefix: 'structural/',
                            collapsible: true,
                            children: 'structure'
                        },
                        {
                            text: '行为型模式',
                            icon: 'material-symbols:partner-exchange-rounded',
                            prefix: 'behavioral/',
                            collapsible: true,
                            children: 'structure'
                        }
                    ]
                }
            ]
        }
    ]
})
