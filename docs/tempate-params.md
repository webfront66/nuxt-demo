# Nuxt `useHead` 中的 `templateParams` 详解

## 核心概念

`templateParams` 是 Nuxt 3 的 `useHead` 组合式 API 中用于动态设置页面头部(Head)内容的参数系统。它通过将模板结构与动态数据分离，提供了更灵活、更易维护的头部管理方案。

## 核心优势

1. **关注点分离**：模板与数据解耦
2. **动态响应**：自动响应数据变化
3. **复用性强**：支持跨页面、跨组件复用
4. **多参数支持**：灵活处理复杂标题结构

## 复用场景与示例

### 1. 跨页面模板复用（全局模式）

**在 app.vue 或布局中设置基础模板**：
```javascript
// 设置全站标题后缀
useHead({
  titleTemplate: '%pageTitle - %siteName',
  templateParams: {
    siteName: '企业官网'
  }
})
```

**各页面只需提供差异部分**：
```javascript
// about.vue
useHead({
  templateParams: {
    pageTitle: '关于我们'  // 结果："关于我们 - 企业官网"
  }
})

// products.vue
useHead({
  templateParams: {
    pageTitle: '产品中心'  // 结果："产品中心 - 企业官网"
  }
})
```

### 2. 动态路由页面复用

```javascript
// pages/blog/[slug].vue
const { data } = await useAsyncData(`post-${route.params.slug}`, () => {
  return $fetch(`/api/posts/${route.params.slug}`)
})

useHead({
  titleTemplate: '%title - 技术博客',
  templateParams: {
    title: data.value?.title || '加载中...'
  },
  meta: [{
    name: 'description',
    content: data.value?.excerpt || '默认描述'
  }]
})
```

### 3. 组件级复用方案

**创建可复用 SEO 组件**：
```vue
<!-- components/SeoHead.vue -->
<script setup>
const props = defineProps({
  title: String,
  description: String,
  template: {
    type: String,
    default: '%title - %site'
  }
})

useHead({
  titleTemplate: props.template,
  templateParams: {
    title: props.title,
    site: '默认网站名'
  },
  meta: [{
    name: 'description',
    content: props.description
  }]
})
</script>
```

**在页面中使用**：
```vue
<SeoHead
  title="产品详情"
  description="我们的旗舰产品介绍"
  template="%title | %site"
/>
```

### 4. 高级组合式函数复用

```javascript
// composables/useSeo.ts
export default (params: {
  title: string
  description?: string
  template?: string
}) => {
  const siteName = useRuntimeConfig().public.siteName
  
  useHead({
    titleTemplate: params.template || '%title - %site',
    templateParams: {
      title: params.title,
      site: siteName
    },
    meta: [{
      name: 'description',
      content: params.description || ''
    }]
  })
}
```

**使用示例**：
```javascript
// 简单使用
useSeo({ title: '联系我们' })

// 完整使用
useSeo({
  title: '最新活动',
  description: '查看我们最新的促销活动',
  template: '%title | %site'
})
```

## 特殊场景处理

### 条件性标题部分

```javascript
const isSpecialPage = computed(() => route.query.special === '1')

useHead({
  titleTemplate: '%base%conditional',
  templateParams: {
    base: '主要标题',
    conditional: computed(() => 
      isSpecialPage.value ? ' (特别版)' : ''
    )
  }
})
```

### 多语言支持

```javascript
const { t } = useI18n()

useHead({
  titleTemplate: '%title%sep%site',
  templateParams: {
    title: t('page.title'),
    sep: t('seo.separator'),
    site: t('site.name')
  }
})
```

## 与传统方式的对比

| 场景               | templateParams 方案          | 直接拼接字符串方案        |
|--------------------|-----------------------------|-------------------------|
| 多页面统一风格      | ✅ 修改一处全局生效          | ❌ 每个页面单独修改       |
| 动态路由页面        | ✅ 自动响应路由变化          | ⚠️ 需要手动监听变化       |
| 多语言支持          | ✅ 轻松集成i18n              | ⚠️ 需要复杂字符串处理     |
| 组件化封装          | ✅ 天然支持                  | ❌ 难以封装               |
| 类型安全            | ✅ 完美支持TypeScript        | ⚠️ 类型提示有限           |

## 最佳实践建议

1. **项目级约定**：统一模板参数命名规范（如统一使用小驼峰）
2. **默认值处理**：在组合式函数中设置合理的默认值
3. **性能优化**：对高频变化的参数使用`computed`
4. **SSG友好**：确保模板参数在构建时可解析
5. **文档维护**：为团队维护模板参数使用文档

通过合理利用 `templateParams`，开发者可以构建出既灵活又易于维护的头部管理系统，特别适合中大型项目的SEO管理和多环境适配需求。