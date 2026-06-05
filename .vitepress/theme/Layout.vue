<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import HomeView from './components/home/HomeView.vue'
import DocView from './components/DocView.vue'

const { frontmatter, page, lang } = useData()

const isHome = computed(() => frontmatter.value.layout === 'home')
const isNotFound = computed(() => page.value.isNotFound)
const isVi = computed(() => lang.value.startsWith('vi'))
const homeLink = computed(() => (isVi.value ? '/vi/' : '/'))
</script>

<template>
  <div class="site">
    <a class="skip" :href="'#main'">{{ isVi ? 'Bỏ qua tới nội dung' : 'Skip to content' }}</a>
    <SiteHeader />

    <template v-if="isNotFound">
      <main id="main" class="notfound">
        <div class="shell">
          <p class="code gradient-text">404</p>
          <h1>{{ isVi ? 'Không tìm thấy trang' : 'Page not found' }}</h1>
          <a :href="withBase(homeLink)" class="back">{{ isVi ? '← Về trang chủ' : '← Back home' }}</a>
        </div>
      </main>
    </template>

    <template v-else-if="isHome">
      <main id="main">
        <HomeView />
      </main>
    </template>

    <template v-else>
      <DocView id="main" />
    </template>

    <SiteFooter />
  </div>
</template>

<style scoped>
.site { display: flex; flex-direction: column; min-height: 100vh; }
.site > :deep(main),
.site > .notfound { flex: 1 0 auto; }

.skip {
  position: absolute;
  left: -999px;
  top: 8px;
  z-index: 100;
  padding: 10px 16px;
  border-radius: 8px;
  background: var(--color-surface-3);
  color: var(--color-fg);
  font-weight: 600;
}
.skip:focus { left: 8px; }

.notfound { padding: 120px 0; text-align: center; }
.code { font-size: clamp(4rem, 14vw, 8rem); font-weight: 800; line-height: 1; }
.notfound h1 { font-size: 1.6rem; font-weight: 700; margin: 8px 0 28px; }
.back {
  display: inline-flex;
  padding: 12px 28px;
  border-radius: 12px;
  font-weight: 700;
  color: var(--color-brand);
  border: 1px solid var(--color-line-strong);
  transition: border-color 0.18s ease;
}
.back:hover { border-color: var(--color-brand); }
</style>
