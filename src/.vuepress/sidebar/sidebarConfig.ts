import {sidebar} from 'vuepress-theme-hope'

export const zhSidebar = sidebar({
    '/': [
        '',
        {
            text: 'web 客户端',
            icon: 'fluent:card-ui-24-regular',
            prefix: 'posts/web/',
            collapsible: true,
            children: [
                {
                    text: '语言',
                    icon: '/assets/icon/js-ts.ico',
                    prefix: 'language/',
                    collapsible: true,
                    children: 'structure'
                },
                {
                    text: '工程化',
                    icon: 'streamline-ultimate:common-file-module-1',
                    prefix: 'frontend-engineering/',
                    collapsible: true,
                    children: 'structure'
                },
                {
                    text: '框架',
                    icon: 'mdi:electron-framework',
                    prefix: 'framework/',
                    collapsible: true,
                    children: [
                        {
                            text: 'React',
                            icon: 'skill-icons:react-dark',
                            prefix: 'react/',
                            collapsible: true,
                            children: 'structure'
                        },
                        {
                            text: 'Vue',
                            icon: 'logos:vue',
                            prefix: 'vue/',
                            collapsible: true,
                            children: 'structure'
                        },
                        {
                            text: '状态管理工具',
                            icon: 'eos-icons:cluster-management-outlined',
                            prefix: 'state-manager/',
                            collapsible: true,
                            children: 'structure'
                        }
                    ]
                }
            ]
        },
        {
            text: '服务端',
            prefix: 'posts/server/',
            icon: 'circum:server',
            collapsible: true,
            children: [
                {
                    text: 'Linux',
                    icon: 'devicon:linux',
                    prefix: 'linux/',
                    collapsible: true,
                    children: 'structure'
                },
                {
                    text: 'Maven',
                    icon: 'devicon:maven',
                    prefix: 'maven/',
                    collapsible: true,
                    children: 'structure'
                },
                {
                    text: 'Docker',
                    icon: 'devicon:docker-wordmark',
                    prefix: 'docker/',
                    collapsible: true,
                    children: 'structure'
                }
            ]
        },
        {
            text: '跨平台',
            prefix: '/posts/cross-platform/',
            icon: 'carbon:mobile-view-orientation',
            collapsible: true,
            children: [
                {
                    text: 'Electron',
                    icon: 'skill-icons:electron',
                    link: 'electron/'
                }
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
                },
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
