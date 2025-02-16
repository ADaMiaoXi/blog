import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
    "/",
    {
        text: "代码不止",
        prefix: "/posts/codingMore/",
        icon: "proicons:code",
        children: [
            {
                text: "JavaScript",
                icon: "https://www.runoob.com/wp-content/uploads/2013/07/js-logo.png",
                link: "javaScript/",
            },
        ],
    },
    {
        text: "不止代码",
        prefix: "/posts/moreThanCode/",
        icon: "eos-icons:neural-network",
        children: [
            {
                text: "浏览器",
                link: "browser/",
                icon: "eos-icons:application-window-outlined",
            },
            {
                text: "网络",
                link: "network/",
                icon: "line-md:spotify",
            },
            {
                text: "设计模式",
                link: "designMode/",
                icon: "mdi:lightbulb-on-10",
            },
        ],
    },
    // {
    //   text: "V2 文档",
    //   icon: "book",
    //   link: "https://theme-hope.vuejs.press/posts/",
    // },
]);
