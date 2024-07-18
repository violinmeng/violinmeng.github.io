<script setup lang="ts">
import { useData } from 'vitepress';
import ELBlogList from './ELBlogList.vue';

const { frontmatter: fm } = useData()

console.log(fm);

</script>

<template>
  <ELBlogList
    v-if="fm.blogs"
    class="ELBlogListHome"
    :blogs="fm.blogs"
  />
</template>