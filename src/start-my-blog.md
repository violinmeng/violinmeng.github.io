# 开通博客始末
##

每个开发者，都会想要开个博客的吧。我们从大牛的博客里，学到新知识，新技术。也乐意将自己挖掘到的技术点，分享给其他人。

我也一样，之前也有过几次搭建博客的冲动，但大都无疾而终。而原因主要是，如果从头搭建，工作量以及对设计的要求，就足以让我压力山大了。当然使用博客模版是一个更加实际的方案，我确实尝试使用GitHub Pages搭建了一个网站，严格来说是一个网页的Demo，真正用来更新博客需要魔改，当时对Web的了解还不够。哦，对了我的本职是iOS开发的，最终也就不了了之了。

而最近我在学习Web相关的知识，刚开始是跟着[gui-challenges](https://github.com/argyleink/gui-challenges)做一些常见的UI Demo，比如侧边栏的实现。在开始Demo的时候，需要搭建脚手架，于是需要熟悉相关的package，接触到打包器Rollup。本来准备研究下Rollup的实现，早有耳闻它有着优秀的设计。在浏览文档的时候无意中发现其文档网站是用[VitePress](https://vitepress.dev/)搭建的。并且很多开源工具的文档栈都使用VitePress来构建。
## 为什么选VitePress
在体验Rollup的文档网站之后。有以下几点，让我觉得也许我能够用它搭建我的博客。

- 整体的版面设计，简洁美观。同时支持Light/Dark模式，并且展示效果都符合我个人审美，在大小屏幕上面的适配也很美观。

- 对文档的渲染，包括链接、代码块、语法高亮、文档的目录支持完善。这一部分就能够满足个人博客内容页面的需求了。

- 研究了文档站的github中的代码，了解到内容是通过markdown文件提供。这样每次发布新文章，只需要添加新的markdown文件就行，很方便。

但是默认的首页不太符合常见博客的外观，我预期是一个文章列表，点击进入详情页面。然后左边的文档列表侧边栏也不需要。
读了VitePress文档，工具支持对默认主题的扩展，甚至可以用Vue写自己的主题。似乎扩展默认主题就行了，那就开干！

Let's do it!

## 创建git仓库

vitepress的工程创建很简单，可以参考其[入门文档](https://vitepress.dev/guide/getting-started)。我这里仅用pnpm展示操作流程。
- 首先用包管理工具初始化blog工程。

``` sh
mkdir ElinBlog && cd ElinBlog
pnpm init
```

- 添加vitepress package

``` sh
pnpm add -D vitepress
```

- 使用vitepress创建模版工程。这里需要输入一些vitepress的元信息。构建最终工程。其中Theme，我这里选择`Default Theme + Customization`。
``` sh
pnpm vitepress init
```

这步完成之后，就能得到一个demo工程，执行`pnpm run docs:dev`就可以预览网页效果了。

> 查看package.json文件, 会发现还有，docs:build和docs:preview命令，这个两个命令是构建生产环境的产物命令，以及预览最终产物时机效果的命令。

下一步，将首页改为文章列表的样式。

## 定制首页
vitepress支持对默认主题的扩展，具体文档参考[Layout Slots](https://vitepress.dev/guide/extending-default-theme#layout-slots)。

首页的内容是通过`index.md`的数据定义的。可以将默认提供的`hero`和`features`内容删掉，那么首页内容就变成空白了，然后在默认主题上面提供的slot占位，就能插入我自定义的组件了。

关于自定义的组件，我是参考了默认主题的[VPFeatures](https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/components/VPFeatures.vue)的实现。屏蔽了在宽屏下分列显示，改为全都以行来显示。

- 组件的数据，可以在`index.md`中自定义，例如，下面是我的定义：
``` md
---
...

blogs:
  - title: Runtime API Examples
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    link: /api-examples

---

```
- 这些数据会作为全局数据传递给组件。如下是在组件中获取数据。

``` vue

<script setup lang="ts">
import { useData } from 'vitepress';
import ELBlogList from './ELBlogList.vue';

const { frontmatter: fm } = useData()

</script>

```

`fm.blogs`就能取到前面定义的数据。

- 最后，默认主题如何感知并加载自定义组件呢？答案是在`.vitepress/theme/index.ts`中，添加如下代码。

``` ts 5
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-hero-before': () => h(ELBlogListHome)
    })
  }
} satisfies Theme
```

我把自定义组件插入到`home-hero-before`这个扩展占位中了。

## 部署到github page

github pages默认会为每个用户分配一个`<username>.github.io`的域名，如果我们创建一个`<username>.github.io`的repository。那么我们就能通过`<username>.github.io`域名访问到站点。如果repository的名字，比如为base，那你将能通过`<username>.github.io/base`访问。

>我之前创建了一个repo，因为username拼写错误，导致要通过`<username>.github.io/<falseusername>github.io`这么长的域名访问。排查了好大一会儿才找到原因。

github pages部署的配置，参考这里的[文档](`[<username>.github.io](https://vitepress.dev/guide/deploy#github-pages)`)。
然后把本地的repo，推送到github上。这时候github会自动执行工作流的Actions，执行环境的准备，编译vitepress的生产环境产物，最后完成部署。整个流程可以通过仓库的[Actions Tab](https://github.com/violinmeng/violinmeng.github.io/actions)查看，如果失败也会能在这里找到具体的错误信息。

至此整个博客也就部署完成。

## 最后

写这篇文章，是首次真正的体验发布一篇新文章的工作流，通过`pnpm run docs:dev`，能够实时预览文章发布之后的界面，这点体验很棒。

文章完成，提交到github上，自动就能够部署发布，这样整个流程只需要关注文章内容，排除其他的干扰，这个和我设想中的博客更新很相符。

在搭建博客过程中，我也研究了vitepress的源码，基本了解了整个项目的运作方式，以及执行流程。后续我会写篇文章，总结自己的收获。