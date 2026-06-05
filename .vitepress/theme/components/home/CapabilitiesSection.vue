<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../../composables/useReveal'
import type { HomeContent } from '../../data/home'

defineProps<{ c: HomeContent['capabilities'] }>()

const root = ref<HTMLElement | null>(null)
useReveal(root, { items: '.cap', stagger: 0.1, y: 32 })
</script>

<template>
  <section class="caps">
    <div class="shell">
      <header class="head">
        <p class="eyebrow">{{ c.eyebrow }}</p>
        <h2 class="section-title">{{ c.title }}</h2>
        <p class="intro">{{ c.intro }}</p>
      </header>

      <div ref="root" class="grid">
        <article v-for="item in c.items" :key="item.num" class="cap reveal-init">
          <span class="num">{{ item.num }}</span>
          <h3 class="title">{{ item.title }}</h3>
          <p class="body">{{ item.body }}</p>
          <ul class="tags">
            <li v-for="t in item.tags" :key="t">{{ t }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.caps { padding: clamp(40px, 7vw, 90px) 0; }
.head { max-width: 56ch; }
.intro { margin: 16px 0 0; color: var(--color-fg-muted); font-size: 1.05rem; }

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  margin-top: 44px;
}
@media (min-width: 760px) { .grid { grid-template-columns: repeat(3, 1fr); } }

.cap {
  position: relative;
  padding: 28px 26px;
  border: 1px solid var(--color-line);
  border-radius: 18px;
  background: var(--color-surface-2);
  overflow: hidden;
  transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
}
.cap::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 2px;
  background: linear-gradient(90deg, var(--color-brand), var(--color-accent));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}
.cap:hover {
  transform: translateY(-4px);
  border-color: var(--color-line-strong);
  box-shadow: var(--shadow-card);
}
.cap:hover::before { transform: scaleX(1); }

.num {
  font-family: var(--font-mono);
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(120deg, var(--color-brand), var(--color-accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.cap .title { margin: 16px 0 0; font-size: 1.2rem; font-weight: 700; letter-spacing: -0.01em; }
.body { margin: 12px 0 0; color: var(--color-fg-muted); line-height: 1.65; }

.tags { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0 0; padding: 0; }
.tags li {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-fg-muted);
  padding: 3px 10px;
  border: 1px solid var(--color-line);
  border-radius: 999px;
}
</style>
