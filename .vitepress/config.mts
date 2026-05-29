import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
const SITE_URL = 'https://kieuminhcanh.github.io'
const SITE_TITLE = 'Kieu Minh Canh — Full-stack Developer'
const SITE_DESC = 'Full-stack developer · 18+ years building web products end-to-end'
const SITE_OG_IMAGE = `${SITE_URL}/og.png`

// Per-locale Open Graph / Twitter metadata, injected via transformHead.
const OG_META: Record<string, { title: string; desc: string }> = {
  'en-US': { title: SITE_TITLE, desc: SITE_DESC },
  'vi-VN': {
    title: 'Kieu Minh Canh — Lập trình viên Full-stack',
    desc: 'Lập trình viên full-stack · hơn 18 năm xây dựng sản phẩm web từ đầu đến cuối',
  },
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Kieu Minh Canh",
  description: SITE_DESC,
  sitemap: { hostname: SITE_URL },
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap' }],
    ['meta', { name: 'theme-color', content: '#42b883' }],
    ['meta', { name: 'author', content: 'Kieu Minh Canh' }],
    // Open Graph (title/description injected per-locale via transformHead)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Kieu Minh Canh' }],
    ['meta', { property: 'og:image', content: SITE_OG_IMAGE }],
    // Twitter / X
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@kieuminhcanh' }],
    ['meta', { name: 'twitter:image', content: SITE_OG_IMAGE }],
  ],
  transformHead({ pageData, siteData }) {
    const lang = pageData.frontmatter.lang || siteData.lang
    const og = OG_META[lang] ?? OG_META['en-US']
    const url = `${SITE_URL}/${pageData.relativePath.replace(/(index)?\.md$/, '')}`
    return [
      ['meta', { property: 'og:title', content: og.title }],
      ['meta', { property: 'og:description', content: og.desc }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:title', content: og.title }],
      ['meta', { name: 'twitter:description', content: og.desc }],
    ]
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Projects', link: '/projects' },
        ],
        sidebar: {
          '/policies/': [
            {
              text: 'Policies',
              items: [
                { text: 'Typing Translate AI', link: '/policies/typing-translate-ai' },
              ]
            }
          ]
        },
      },
    },
    vi: {
      label: 'Tiếng Việt',
      lang: 'vi-VN',
      link: '/vi/',
      themeConfig: {
        nav: [
          { text: 'Trang chủ', link: '/vi/' },
          { text: 'Dự án', link: '/vi/projects' },
        ],
        sidebar: {
          '/vi/policies/': [
            {
              text: 'Chính sách',
              items: [
                { text: 'Typing Translate AI', link: '/vi/policies/typing-translate-ai' },
              ]
            }
          ]
        },
        docFooter: { prev: 'Trang trước', next: 'Trang sau' },
        outline: { label: 'Mục lục' },
        lastUpdated: { text: 'Cập nhật' },
        langMenuLabel: 'Đổi ngôn ngữ',
        returnToTopLabel: 'Về đầu trang',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Giao diện',
        lightModeSwitchTitle: 'Chuyển sang giao diện sáng',
        darkModeSwitchTitle: 'Chuyển sang giao diện tối',
      },
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kieuminhcanh' },
      { icon: 'x', link: 'https://twitter.com/kieuminhcanh' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/kieuminhcanh' }
    ]
  }
})
