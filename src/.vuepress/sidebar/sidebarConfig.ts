import {sidebar} from 'vuepress-theme-hope'

export const zhSidebar = sidebar({
    '/': [
        '',
        {
            text: '代码不止',
            icon: 'proicons:code',
            prefix: 'posts/codingMore/',
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
                    text: '前端工程化',
                    prefix: 'frontendEngineering',
                    icon: 'eos-icons:organisms',
                    collapsible: true,
                    children: 'structure'
                }
            ]
        },
        {
            text: '不止代码',
            prefix: 'posts/moreThanCode/',
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
            prefix: 'posts/brainBoom/',
            collapsible: true,
            children: [
                {
                    text: '数据结构与算法',
                    prefix: 'dataStructure',
                    icon: '/assets/icon/data-structure.png',
                    collapsible: true,
                    children: 'structure'
                },
                {
                    text: '设计模式',
                    prefix: 'designPatterns/',
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
