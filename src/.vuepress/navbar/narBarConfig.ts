import {navbar} from 'vuepress-theme-hope'

export const zhNavbar = navbar([
    '/',
    {
        text: '代码不止',
        prefix: '/posts/coding-more/',
        icon: 'proicons:code',
        children: [
            {
                text: 'JavaScript',
                icon: 'https://www.runoob.com/wp-content/uploads/2013/07/js-logo.png',
                link: 'JavaScript/'
            },
            {
                text: 'React',
                icon: 'https://legacy.reactjs.org/favicon-32x32.png?v=f4d46f030265b4c48a05c999b8d93791',
                link: 'react/'
            },
            {
                text: '前端工程化',
                link: 'frontend-engineering/',
                icon: 'eos-icons:organisms'
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
            }
        ]
    },
    {
        text: '脑力涌现',
        prefix: 'posts/brain-boom/',
        icon: 'eos-icons:neural-network',
        children: [
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
