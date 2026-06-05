import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

// https://vitepress.dev/reference/site-config
const SITE_URL = 'https://kieuminhcanh.github.io'
const SITE_TITLE = 'Canh Minh Kieu — Full-stack Developer'
const SITE_DESC = 'Full-stack developer · 18+ years building web products end-to-end'
const SITE_OG_IMAGE = `${SITE_URL}/og.png`
const PERSON_IMAGE = 'https://github.com/kieuminhcanh.png'
const SAME_AS = [
  'https://github.com/kieuminhcanh',
  'https://twitter.com/kieuminhcanh',
  'https://www.linkedin.com/in/kieuminhcanh',
]

// Per-locale Open Graph / Twitter metadata, injected via transformHead.
const OG_META: Record<string, { title: string; desc: string }> = {
  'en-US': { title: SITE_TITLE, desc: SITE_DESC },
  'vi-VN': {
    title: 'Kiều Minh Cảnh — Lập trình viên Full-stack',
    desc: 'Lập trình viên full-stack · hơn 18 năm xây dựng sản phẩm web từ đầu đến cuối',
  },
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Canh Minh Kieu — Full-stack Developer",
  description: SITE_DESC,
  // Force dark, slim.vn-style appearance (no light/dark toggle).
  appearance: 'force-dark',
  // Tailwind v4 via its Vite plugin (CSS-first config lives in theme/tailwind.css).
  vite: {
    plugins: [tailwindcss()],
  },
  sitemap: {
    hostname: SITE_URL,
    transformItems(items) {
      // Weight URLs by importance so crawlers prioritise the home/projects
      // pages over legal/policy content.
      const rank = (url: string): { priority: number; changefreq: 'weekly' | 'monthly' | 'yearly' } => {
        const path = url.replace(/^\/(vi\/)?/, '/')
        if (path === '/') return { priority: 1.0, changefreq: 'weekly' }
        if (path === '/projects.html') return { priority: 0.8, changefreq: 'weekly' }
        if (path.startsWith('/policies/')) return { priority: 0.3, changefreq: 'yearly' }
        return { priority: 0.5, changefreq: 'monthly' }
      }
      return items.map((item) => ({ ...item, ...rank(`/${item.url.replace(/^\//, '')}`) }))
    },
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: PERSON_IMAGE }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap' }],
    ['meta', { name: 'theme-color', content: '#42b883' }],
    ['meta', { name: 'author', content: 'Canh Minh Kieu' }],
    // Open Graph (title/description injected per-locale via transformHead)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Canh Minh Kieu' }],
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

    // Structured data graph: links Person <-> WebSite so search engines can
    // build a rich knowledge panel from a single source of truth.
    const personName = lang.startsWith('vi') ? 'Kiều Minh Cảnh' : 'Canh Minh Kieu'
    const ldGraph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: personName,
          alternateName: ['Canh Minh Kieu', 'Kiều Minh Cảnh'],
          url: SITE_URL,
          image: PERSON_IMAGE,
          jobTitle: 'Full-stack Developer',
          description: og.desc,
          sameAs: SAME_AS,
          knowsAbout: ['Vue.js', 'Vuetify', 'TypeScript', 'Full-stack web development'],
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: og.title,
          description: og.desc,
          inLanguage: lang,
          author: { '@id': `${SITE_URL}/#person` },
          publisher: { '@id': `${SITE_URL}/#person` },
        },
      ],
    }

    return [
      ['meta', { property: 'og:title', content: og.title }],
      ['meta', { property: 'og:description', content: og.desc }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:locale', content: lang.replace('-', '_') }],
      ['meta', { name: 'twitter:title', content: og.title }],
      ['meta', { name: 'twitter:description', content: og.desc }],
      ['link', { rel: 'canonical', href: url }],
      ['script', { type: 'application/ld+json' }, JSON.stringify(ldGraph)],
    ]
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        logo: 'https://github.com/kieuminhcanh.png',
        siteTitle: 'Canh Minh Kieu',
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
      title: 'Kiều Minh Cảnh — Lập trình viên Full-stack',
      themeConfig: {
        logo: 'https://github.com/kieuminhcanh.png',
        siteTitle: 'Kiều Minh Cảnh',
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
