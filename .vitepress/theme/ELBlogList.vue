
<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import { computed } from 'vue'
import ELBlogItem from './ELBlogItem.vue'

export interface BlogItem {
  icon?: DefaultTheme.FeatureIcon
  title: string
  details: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
}

const props = defineProps<{
  blogs: BlogItem[]
}>()

const grid = computed(() => {
  const length = props.blogs.length

  if (!length) {
    return
  } else if (length === 2) {
    return 'grid-2'
  } else if (length === 3) {
    return 'grid-3'
  } else if (length % 3 === 0) {
    return 'grid-6'
  } else if (length > 3) {
    return 'grid-4'
  }
})
</script>

<template>
  <div v-if="blogs" class="VPFeatures">
    <div class="container">
      <div class="items">
        <div
          v-for="blog in blogs"
          :key="blog.title"
          class="item"
          :class="[grid]"
        >
          <ELBlogItem
            :icon="blog.icon"
            :title="blog.title"
            :details="blog.details"
            :link="blog.link"
            :link-text="blog.linkText"
            :rel="blog.rel"
            :target="blog.target"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPFeatures {
  position: relative;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .VPFeatures {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .VPFeatures {
    padding: 0 64px;
  }
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;;
  margin: 32px;
}

.item {
  padding: 8px;
  width: 80%;
}

/* @media (min-width: 640px) {
  .item.grid-2,
  .item.grid-4,
  .item.grid-6 {
    width: calc(100% / 2);
  }
}

@media (min-width: 768px) {
  .item.grid-2,
  .item.grid-4 {
    width: calc(100% / 2);
  }

  .item.grid-3,
  .item.grid-6 {
    width: calc(100% / 3);
  }
}

@media (min-width: 960px) {
  .item.grid-4 {
    width: calc(100% / 4);
  }
} */
</style>
