import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Elin's Blog",
  description: "To record and share my ideas.",
  lastUpdated: true,
  ignoreDeadLinks: true,
  sitemap: {
    hostname: "https://violinmeng.github.io"
  },
  head: [
    ['link', { rel: 'icon', href: '/favorite.ico' }],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=GTM-KDFF455F' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GTM-KDFF455F');`
    ]
  ],
  themeConfig: {
    logo: { src: '/favorite.ico', width: 24, height: 24 },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Blog', link: '/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/violinmeng' }
    ]
  }
})
