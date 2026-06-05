<script setup lang="ts">
import { computed } from 'vue'
import { Content, useData, useRoute, withBase } from 'vitepress'

/**
 * Shell for rendered markdown pages (projects, policies). Centered article with
 * an optional sidebar when the theme config defines one for the current path.
 */
const { theme } = useData()
const route = useRoute()

interface SidebarItem { text: string; link: string }
interface SidebarGroup { text: string; items: SidebarItem[] }

// Match theme.sidebar (keyed by path prefix) against the current route.
const sidebar = computed<SidebarGroup[]>(() => {
  const sb = theme.value.sidebar
  if (!sb || Array.isArray(sb)) return (sb as SidebarGroup[]) ?? []
  const path = route.path
  const key = Object.keys(sb).find((k) => path.startsWith(k))
  return key ? (sb[key] as SidebarGroup[]) : []
})

const hasSidebar = computed(() => sidebar.value.length > 0)

function isActive(link: string) {
  return route.path.replace(/\.html$/, '') === link.replace(/\.html$/, '')
}
</script>

<template>
  <main class="doc" :class="{ 'has-aside': hasSidebar }">
    <div class="shell layout">
      <aside v-if="hasSidebar" class="aside">
        <nav v-for="group in sidebar" :key="group.text" class="sb-group">
          <p class="sb-title">{{ group.text }}</p>
          <a
            v-for="item in group.items"
            :key="item.link"
            :href="withBase(item.link)"
            class="sb-link"
            :class="{ active: isActive(item.link) }"
          >{{ item.text }}</a>
        </nav>
      </aside>

      <article class="doc-body">
        <Content />
      </article>
    </div>
  </main>
</template>

<style scoped>
.doc { padding: clamp(40px, 7vw, 80px) 0; }
.layout { display: block; }
.doc.has-aside .layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}
@media (min-width: 960px) {
  .doc.has-aside .layout { grid-template-columns: 220px 1fr; gap: 56px; }
}
.doc-body { max-width: 760px; }

.aside { align-self: start; }
@media (min-width: 960px) { .aside { position: sticky; top: 88px; } }
.sb-group { margin-bottom: 24px; }
.sb-title {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-fg-faint);
  margin: 0 0 10px;
}
.sb-link {
  display: block;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--color-fg-muted);
  border-left: 2px solid transparent;
  transition: color 0.18s ease, border-color 0.18s ease;
}
.sb-link:hover { color: var(--color-fg); }
.sb-link.active { color: var(--color-brand); border-left-color: var(--color-brand); }
</style>
