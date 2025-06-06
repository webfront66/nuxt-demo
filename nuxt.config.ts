// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-05-15",
    devtools: { enabled: true },
    app: {
        head: {
            // charset: 'utf-8',
            // viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
            title: "demo",
            titleTemplate: "%s | auth@xjp",
            htmlAttrs: {
                lang: 'zh-CN', // 语言设置为中文
            },
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/cirnd-kifpn-001.ico' },
            ],
            meta: [
                { name: "description", content: "这是一个 Nuxt SEO 示例" },
                { property: "og:title", content: "我的 Nuxt 应用" },
                { property: "og:description", content: "这是一个 Nuxt SEO 示例" },
            ],
        },
    },
});
