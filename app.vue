<template>
  <div>
    <h1>{{ title }}</h1>
    <p>
      useHead 和 useSeoMeta 是 Nuxt 3 中用于设置页面头部信息和 SEO
      元数据的组合。
    </p>

    <p>
      useHead 用于设置页面的标题、meta 标签、body 属性等，而 useSeoMeta 则专注于
      SEO 相关的元数据，
    </p>

    <p>当使用 useHead 和 useSeoMeta 同时存在时，后声明的会覆盖前者的设置。</p>
    <p>
      示例当中，useHead useSeoMeta 都设置了标题和描述信息， 最终页面将使用
      useSeoMeta 中的标题和描述信息。
    </p>
    <p>
        如果在 vue.template 中使用了 `Meta` 组件，则会覆盖 useHead 和 useSeoMeta 的设置。
    </p>
          <Meta name="custom-description" :content="title" />

  </div>
</template>

<script setup>
import { ref } from "vue";
const route = useRoute()
const title = ref("Nuxt demo1 示例");
useHead({
  title: "首页", // 当前页面标题
  meta: [{ name: "description", content: "这是首页的描述" }],
  templateParams: {
    siteName: "demo", // 模板参数
    separator: " | ", // 模板参数
  }, // 模板参数
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}  %separator` : '%siteName';
  },
  bodyAttrs: {
    // body 标签的属性
    "data-theme": "light", // 设置主题
    class: "my-app",
  },
  script: [
    { innerHTML: "console.log('你好世界')" },// 页面内联脚本
   
    { src: 'https://www.head.com', tagPosition: 'head'}, // 在head标签中添加脚本
    { src: 'https://bodyClose.com', tagPosition: 'bodyClose'}, // 在body标签的末尾添加脚本
    { src: 'https://bodyOpen.com', tagPosition: 'bodyOpen'}, // 在body标签的开头添加脚本
  ],
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://www.example.com/style.css',
      crossorigin: ''
    }
  ]
});

useSeoMeta({
  title: title.value,
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} %separator %siteName` : "nuxt3-demo";
  },
  ogTitle: "我的精彩网站",
 
  description: "这是我的精彩网站，让我为您介绍。",
  customDescription: "他会被 Meta 组件覆盖", // 这个会被 Meta 组件覆盖
  ogDescription: "这是我的精彩网站，让我为您介绍。",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});
</script>
