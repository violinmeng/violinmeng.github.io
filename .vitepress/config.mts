import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Elin's Blog",
  description: "To record and Share my ideas.",
  base: '/base/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Blog', link: '/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/violinmeng' }
    ]
  }
})
