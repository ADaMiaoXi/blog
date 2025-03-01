import {navbar} from 'vuepress-theme-hope'

export const zhNavbar = navbar([
    '/',
    {
        text: '代码不止',
        prefix: '/posts/codingMore/',
        icon: 'proicons:code',
        children: [
            {
                text: 'JavaScript',
                icon: 'https://www.runoob.com/wp-content/uploads/2013/07/js-logo.png',
                link: 'JavaScript/'
            },
            {
                text: '前端工程化',
                link: 'frontendEngineering/',
                icon: 'eos-icons:organisms'
            }
        ]
    },
    {
        text: '不止代码',
        prefix: '/posts/moreThanCode/',
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
            }
        ]
    },
    {
        text: '脑力涌现',
        prefix: 'posts/brainBoom/',
        icon: 'eos-icons:neural-network',
        children: [
            {
                text: '数据结构与算法',
                icon: '/assets/icon/data-structure.png',
                link: 'dataStructure/'
            },
            {
                text: '设计模式',
                link: 'designPatterns/',
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
