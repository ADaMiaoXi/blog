import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/blog/",

  locales: {
    "/": {
      lang: "en-US",
      title: "ADaMiaoXi's tech store",
      description: "You found a place for ADaMiaoXi!",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "大喵喜的技术杂货铺",
      description: "你发现了一块大喵喜的自留地！",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
