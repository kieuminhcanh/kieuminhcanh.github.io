<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

/**
 * Scroll-reveal for home sections — slim.vn-style. Adds `.reveal` to every
 * `.home-section` and toggles `.is-visible` once it enters the viewport,
 * letting CSS handle the fade/rise. Client-only (SSR has no IntersectionObserver),
 * and respects prefers-reduced-motion by revealing everything immediately.
 */
const route = useRoute()
let observer: IntersectionObserver | null = null

function reveal() {
  if (typeof window === 'undefined') return

  const sections = Array.from(document.querySelectorAll<HTMLElement>('.home-section'))
  if (!sections.length) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !('IntersectionObserver' in window)) {
    sections.forEach((el) => el.classList.add('reveal', 'is-visible'))
    return
  }

  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
  )

  sections.forEach((el) => {
    el.classList.add('reveal')
    observer!.observe(el)
  })
}

onMounted(() => nextTick(reveal))
watch(() => route.path, () => requestAnimationFrame(() => nextTick(reveal)))
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <span style="display: none" aria-hidden="true" />
</template>
