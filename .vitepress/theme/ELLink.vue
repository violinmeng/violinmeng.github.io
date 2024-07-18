<script lang="ts" setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress/client'

const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i

function normalizeLink(url: string): string {
  const { pathname, search, hash, protocol } = new URL(url, 'http://a.com')

  function isExternal(path: string): boolean {
    return EXTERNAL_URL_RE.test(path)
  }

  if (
    isExternal(url) ||
    url.startsWith('#') ||
    !protocol.startsWith('http'))
    return url

  const { site } = useData()

  const normalizedPath =
    pathname.endsWith('/') || pathname.endsWith('.html')
      ? url
      : url.replace(
          /(?:(^\.+)\/)?.*$/,
          `$1${pathname.replace(
            /(\.md)?$/,
            site.value.cleanUrls ? '' : '.html'
          )}${search}${hash}`
        )

  return withBase(normalizedPath)
}

const props = defineProps<{
  tag?: string
  href?: string
  noIcon?: boolean
  target?: string
  rel?: string
}>()

const tag = computed(() => props.tag ?? (props.href ? 'a' : 'span'))
const isExternal = computed(
  () =>
    (props.href && EXTERNAL_URL_RE.test(props.href)) ||
    props.target === '_blank'
)
</script>

<template>
  <component
    :is="tag"
    class="VPLink"
    :class="{
      link: href,
      'vp-external-link-icon': isExternal,
      'no-icon': noIcon
    }"
    :href="href ? normalizeLink(href) : undefined"
    :target="target ?? (isExternal ? '_blank' : undefined)"
    :rel="rel ?? (isExternal ? 'noreferrer' : undefined)"
  >
    <slot />
  </component>
</template>
