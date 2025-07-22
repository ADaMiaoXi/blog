import {navbar} from 'vuepress-theme-hope'

export const zhNavbar = navbar([
    '/',
    {
        text: 'web 客户端',
        prefix: '/posts/web/',
        icon: 'fluent:card-ui-24-regular',
        children: [
            {
                text: '语言',
                icon: '/assets/icon/js-ts.ico',
                link: 'language/'
            },
            {
                text: '工程化',
                icon: 'streamline-ultimate:common-file-module-1',
                link: 'frontend-engineering/'
            },
            {
                text: '框架',
                icon: 'mdi:electron-framework',
                link: 'framework/'
            }
        ]
    },
    {
        text: '服务端',
        prefix: '/posts/server/',
        icon: 'circum:server',
        children: [
            {
                text: 'Linux',
                icon: 'devicon:linux',
                link: 'linux/'
            },
            {
                text: 'Maven',
                icon: 'devicon:maven',
                link: 'maven/'
            },
            {
                text: 'Docker',
                icon: 'devicon:docker-wordmark',
                link: 'docker/'
            }
        ]
    },
    {
        text: '跨平台',
        prefix: '/posts/cross-platform/',
        icon: 'carbon:mobile-view-orientation',
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
        prefix: '/posts/more-than-code/',
        icon: 'material-symbols:code-off-rounded',
        children: [
            {
                text: '浏览器',
                link: 'browser/',
                icon: 'eos-icons:application-window-outlined'
            },
            {
                text: '网络',
                link: 'network/',
                icon: 'line-md:spotify'
            },
            {
                text: '数据结构与算法',
                icon: '/assets/icon/data-structure.png',
                link: 'data-structure/'
            },
            {
                text: '设计模式',
                link: 'design-patterns/',
                icon: 'mdi:lightbulb-on-10'
            }
        ]
    }
    // {
    //   text: "V2 文档",
    //   icon: "book",
    //   link: "https://theme-hope.vuejs.press/posts/",
    // },
])
