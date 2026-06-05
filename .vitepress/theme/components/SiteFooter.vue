<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { theme, lang } = useData()
const isVi = computed(() => lang.value.startsWith('vi'))
const social = computed(() => theme.value.socialLinks ?? [])
const year = 2026 // build-time constant; Date.* is avoided in SSR config land.

const name = computed(() => (isVi.value ? 'Kiều Minh Cảnh' : 'Canh Minh Kieu'))
const tagline = computed(() =>
  isVi.value ? 'Sản phẩm web, làm trọn từ đầu đến cuối.' : 'Web products, built end-to-end.',
)
const links = computed(() =>
  isVi.value
    ? [
        { text: 'Trang chủ', link: '/vi/' },
        { text: 'Dự án', link: '/vi/projects' },
        { text: 'Liên hệ', link: '/vi/#contact' },
      ]
    : [
        { text: 'Home', link: '/' },
        { text: 'Projects', link: '/projects' },
        { text: 'Contact', link: '/#contact' },
      ],
)
</script>

<template>
  <footer class="site-footer">
    <div class="shell grid">
      <div class="col">
        <p class="fname gradient-text">{{ name }}</p>
        <p class="ftag">{{ tagline }}</p>
      </div>
      <nav class="fnav" :aria-label="isVi ? 'Chân trang' : 'Footer'">
        <a v-for="l in links" :key="l.link" :href="withBase(l.link)">{{ l.text }}</a>
      </nav>
    </div>
    <div class="shell base">
      <span>© {{ year }} {{ name }}</span>
      <div class="fsocial">
        <a v-for="(s, i) in social" :key="i" :href="s.link" target="_blank" rel="noopener">
          {{ typeof s.icon === 'string' ? s.icon : 'link' }}
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: clamp(60px, 10vw, 120px);
  border-top: 1px solid var(--color-line);
  background: var(--color-surface);
  padding: 48px 0 28px;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: space-between;
  align-items: flex-start;
}
.fname { font-size: 1.3rem; font-weight: 800; margin: 0; letter-spacing: -0.02em; }
.ftag { margin: 6px 0 0; color: var(--color-fg-muted); }
.fnav { display: flex; flex-wrap: wrap; gap: 18px; }
.fnav a {
  font-weight: 600;
  color: var(--color-fg-muted);
  transition: color 0.18s ease;
}
.fnav a:hover { color: var(--color-brand); }
.base {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid var(--color-line);
  font-size: 0.85rem;
  color: var(--color-fg-faint);
}
.fsocial { display: inline-flex; gap: 14px; text-transform: capitalize; }
.fsocial a { transition: color 0.18s ease; }
.fsocial a:hover { color: var(--color-brand); }
</style>
