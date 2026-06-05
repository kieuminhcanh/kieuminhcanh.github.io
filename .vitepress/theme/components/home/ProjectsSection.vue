<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'vitepress'
import { useReveal } from '../../composables/useReveal'
import type { HomeContent } from '../../data/home'

defineProps<{ c: HomeContent['projects']; ctaLabel: string }>()

const root = ref<HTMLElement | null>(null)
useReveal(root, { items: '.proj', stagger: 0.09, y: 30 })
</script>

<template>
  <section class="projects">
    <div class="shell">
      <header class="head">
        <p class="eyebrow">{{ c.eyebrow }}</p>
        <h2 class="section-title">{{ c.title }}</h2>
      </header>

      <div ref="root" class="grid">
        <article v-for="p in c.items" :key="p.name" class="proj reveal-init">
          <a :href="p.href" target="_blank" rel="noopener" class="thumb" :aria-label="p.name">
            <img :src="withBase(p.image)" :alt="`${p.name} preview`" loading="lazy" width="640" height="400" >
          </a>
          <h3 class="name">{{ p.name }}</h3>
          <p class="body">{{ p.body }}</p>
          <ul class="tags">
            <li v-for="t in p.tags" :key="t">{{ t }}</li>
          </ul>
          <a :href="p.href" target="_blank" rel="noopener" class="link">{{ p.cta }} →</a>
        </article>
      </div>

      <div class="more">
        <a href="#contact" class="cta-primary">{{ ctaLabel }}</a>
        <a :href="withBase(c.moreHref)" class="more-link">{{ c.more }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects { padding: clamp(40px, 7vw, 90px) 0; }
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  margin-top: 40px;
}
@media (min-width: 640px) { .grid { grid-template-columns: repeat(2, 1fr); } }

.proj {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-line);
  border-radius: 18px;
  background: var(--color-surface-2);
  overflow: hidden;
  transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
}
.proj:hover {
  transform: translateY(-4px);
  border-color: var(--color-brand);
  box-shadow: var(--shadow-card);
}
.thumb {
  display: block;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-bottom: 1px solid var(--color-line);
  background: var(--color-surface-3);
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 0.4s ease;
}
.proj:hover .thumb img { transform: scale(1.04); }
.name { margin: 0; padding: 22px 24px 0; font-size: 1.18rem; font-weight: 700; letter-spacing: -0.01em; }
.body { margin: 12px 0 0; padding: 0 24px; color: var(--color-fg-muted); line-height: 1.6; }
.tags { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; margin: auto 0 0; padding: 18px 24px 0; }
.tags li {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-fg-muted);
  padding: 3px 9px;
  border: 1px solid var(--color-line);
  border-radius: 999px;
}
.link {
  margin-top: 20px;
  padding: 16px 24px 22px;
  border-top: 1px solid var(--color-line);
  font-weight: 700;
  color: var(--color-brand);
  transition: gap 0.18s ease;
}
.link:hover { color: var(--color-brand-2); }

.more {
  margin-top: 44px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 14px;
}
.cta-primary {
  display: inline-flex;
  padding: 12px 30px;
  border-radius: 999px;
  font-weight: 700;
  color: #06210f;
  background: linear-gradient(120deg, var(--color-brand), #4fd1a0);
  box-shadow: 0 10px 30px -12px rgba(66, 184, 131, 0.6);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.cta-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px -12px rgba(66, 184, 131, 0.8); }
.more-link {
  display: inline-flex;
  padding: 12px 40px;
  border-radius: 999px;
  font-weight: 700;
  color: var(--color-fg);
  border: 1px solid var(--color-line-strong);
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}
.more-link:hover { color: var(--color-brand); border-color: var(--color-brand); background: rgba(66, 184, 131, 0.08); }
</style>
