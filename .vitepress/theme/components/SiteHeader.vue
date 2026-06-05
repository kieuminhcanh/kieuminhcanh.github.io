<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'

/**
 * Custom site header — avatar logo, localized nav, language toggle, social
 * links. Reads nav/logo/siteTitle/socialLinks from the (locale-merged) theme
 * config. Adds a translucent blurred bar that gains a hairline once scrolled.
 */
const { theme, site, lang } = useData()
const route = useRoute()

const isVi = computed(() => lang.value.startsWith('vi'))
const nav = computed(() => theme.value.nav ?? [])
const social = computed(() => theme.value.socialLinks ?? [])
const logo = computed(() => theme.value.logo as string | undefined)
const siteTitle = computed(() => (theme.value.siteTitle as string) || site.value.title)
const homeLink = computed(() => (isVi.value ? '/vi/' : '/'))

function isActive(link: string) {
  const path = route.path.replace(/\.html$/, '').replace(/\/$/, '')
  const target = link.replace(/\/$/, '')
  return path === target
}

// Language toggle — swap the /vi prefix, keep the rest of the path.
const otherLocale = computed(() => {
  const path = route.path
  if (isVi.value) return { label: 'EN', to: path.replace(/^\/vi\/?/, '/') || '/' }
  return { label: 'VI', to: '/vi' + (path === '/' ? '/' : path) }
})

// Brand SVG icons (GitHub / X / LinkedIn) for the social row.
const icons: Record<string, string> = {
  github: 'M12 1a11 11 0 0 0-3.48 21.44c.55.1.75-.24.75-.53v-1.86c-3.06.67-3.71-1.48-3.71-1.48-.5-1.27-1.22-1.61-1.22-1.61-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.69-1.47-2.45-.28-5.02-1.22-5.02-5.45 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.7.77 1.13 1.75 1.13 2.95 0 4.24-2.58 5.16-5.04 5.44.4.34.75 1 .75 2.03v3c0 .3.2.64.76.53A11 11 0 0 0 12 1Z',
  x: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.24 2.25h6.83l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z',
  linkedin: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45Z',
}
function iconKey(icon: unknown): string {
  return typeof icon === 'string' ? icon : (icon as { svg?: string })?.svg ? 'github' : 'github'
}

const scrolled = ref(false)
function onScroll() { scrolled.value = window.scrollY > 8 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="site-header" :class="{ scrolled }">
    <div class="shell bar">
      <a :href="withBase(homeLink)" class="brand" :aria-label="siteTitle">
        <img v-if="logo" :src="logo" alt="" class="brand-logo" width="30" height="30" >
        <span class="brand-name">{{ siteTitle }}</span>
      </a>

      <nav class="nav" :aria-label="isVi ? 'Điều hướng' : 'Primary'">
        <a
          v-for="item in nav"
          :key="item.link"
          :href="withBase(item.link)"
          class="nav-link"
          :class="{ active: isActive(item.link) }"
        >{{ item.text }}</a>
      </nav>

      <div class="actions">
        <a :href="withBase(otherLocale.to)" class="lang">{{ otherLocale.label }}</a>
        <span class="sep" aria-hidden="true" />
        <a
          v-for="(s, i) in social"
          :key="i"
          :href="s.link"
          target="_blank"
          rel="noopener"
          class="social"
          :aria-label="iconKey(s.icon)"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path :d="icons[iconKey(s.icon)] || icons.github" />
          </svg>
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  transition: background 0.25s ease, border-color 0.25s ease, backdrop-filter 0.25s ease;
  border-bottom: 1px solid transparent;
}
.site-header.scrolled {
  background: color-mix(in srgb, var(--color-ink) 72%, transparent);
  backdrop-filter: saturate(160%) blur(14px);
  border-bottom-color: var(--color-line);
}
.bar {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 64px;
}
.brand { display: inline-flex; align-items: center; gap: 10px; font-weight: 800; }
.brand-logo { border-radius: 50%; object-fit: cover; }
.brand-name { letter-spacing: -0.02em; font-size: 1.02rem; }

.nav { display: none; gap: 4px; margin-inline-start: 8px; }
@media (min-width: 768px) { .nav { display: inline-flex; } }
.nav-link {
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--color-fg-muted);
  transition: color 0.18s ease, background 0.18s ease;
}
.nav-link:hover { color: var(--color-fg); background: var(--color-surface-2); }
.nav-link.active { color: var(--color-brand); }

.actions { display: inline-flex; align-items: center; gap: 6px; margin-inline-start: auto; }
.lang {
  padding: 6px 10px;
  border-radius: 8px;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-fg-muted);
  border: 1px solid var(--color-line);
  transition: color 0.18s ease, border-color 0.18s ease;
}
.lang:hover { color: var(--color-brand); border-color: var(--color-brand); }
.sep { width: 1px; height: 20px; background: var(--color-line); margin: 0 4px; }
.social {
  display: inline-flex;
  padding: 7px;
  border-radius: 8px;
  color: var(--color-fg-muted);
  transition: color 0.18s ease, background 0.18s ease;
}
.social:hover { color: var(--color-fg); background: var(--color-surface-2); }
.social svg { width: 18px; height: 18px; }
</style>
