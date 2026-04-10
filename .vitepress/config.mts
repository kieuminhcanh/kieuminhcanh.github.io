import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Kieu Minh Canh",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Typing Translate AI', link: '/policies/typing-translate-ai' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kieuminhcanh' }
    ]
  }
})
