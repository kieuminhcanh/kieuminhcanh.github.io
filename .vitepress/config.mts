import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
const SITE_URL = 'https://kieuminhcanh.github.io'
const SITE_TITLE = 'Kieu Minh Canh — Full-stack Developer'
const SITE_DESC = 'Full-stack developer · 18+ years building web products end-to-end'
const SITE_OG_IMAGE = `${SITE_URL}/og.png`

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Kieu Minh Canh",
  description: SITE_DESC,
  lang: 'en-US',
  sitemap: { hostname: SITE_URL },
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap' }],
    ['meta', { name: 'theme-color', content: '#42b883' }],
    ['meta', { name: 'author', content: 'Kieu Minh Canh' }],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Kieu Minh Canh' }],
    ['meta', { property: 'og:title', content: SITE_TITLE }],
    ['meta', { property: 'og:description', content: SITE_DESC }],
    ['meta', { property: 'og:url', content: SITE_URL }],
    ['meta', { property: 'og:image', content: SITE_OG_IMAGE }],
    // Twitter / X
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@kieuminhcanh' }],
    ['meta', { name: 'twitter:title', content: SITE_TITLE }],
    ['meta', { name: 'twitter:description', content: SITE_DESC }],
    ['meta', { name: 'twitter:image', content: SITE_OG_IMAGE }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kieuminhcanh' },
      { icon: 'x', link: 'https://twitter.com/kieuminhcanh' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/kieuminhcanh' }
    ]
  }
})
