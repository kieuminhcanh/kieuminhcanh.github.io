<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'vitepress'
import EventBadge from '../EventBadge.vue'
import { useMagnetic } from '../../composables/useMagnetic'
import type { HomeContent } from '../../data/home'

defineProps<{
  c: HomeContent['hero']
  trust: string[]
  projectsHref: string
}>()

const primary = ref<HTMLElement | null>(null)
useMagnetic(primary)
</script>

<template>
  <section class="hero">
    <div class="glow" aria-hidden="true" />
    <div class="shell grid">
      <div class="lead">
        <span
          class="avail"
          v-motion
          :initial="{ opacity: 0, y: 12 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        >
          <span class="pulse" aria-hidden="true" />{{ c.badge }}
        </span>

        <h1
          class="title"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 80 } }"
        >
          {{ c.headline }} <span class="gradient-text">{{ c.headlineAccent }}</span>
        </h1>

        <p
          class="sub"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 200 } }"
        >{{ c.sub }}</p>

        <div
          class="cta"
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 340 } }"
        >
          <a ref="primary" href="#contact" class="btn btn-brand">{{ c.ctaPrimary }}</a>
          <a :href="withBase(projectsHref)" class="btn btn-ghost">{{ c.ctaSecondary }}</a>
        </div>

        <ul
          class="trust"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { duration: 600, delay: 480 } }"
        >
          <li v-for="(t, i) in trust" :key="t">
            <span v-if="i > 0" class="dot" aria-hidden="true">·</span>{{ t }}
          </li>
        </ul>

        <p class="tagline">{{ c.tagline }}</p>
      </div>

      <div class="art" aria-hidden="true">
        <EventBadge />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: clamp(48px, 9vw, 110px) 0 clamp(40px, 6vw, 72px);
  overflow: hidden;
}
.glow {
  position: absolute;
  top: -20%;
  left: 50%;
  width: 1000px;
  height: 1000px;
  max-width: 130vw;
  transform: translateX(-50%);
  background: radial-gradient(circle at center, rgba(66, 184, 131, 0.16) 0%, transparent 62%);
  pointer-events: none;
  z-index: 0;
}
.grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;
}
@media (min-width: 960px) {
  .grid { grid-template-columns: 1.55fr 1fr; gap: 56px; }
}

.avail {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--color-line);
  background: var(--color-surface-2);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-fg-muted);
}
.pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-brand);
  box-shadow: 0 0 0 0 rgba(66, 184, 131, 0.6);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(66, 184, 131, 0.55); }
  70% { box-shadow: 0 0 0 9px rgba(66, 184, 131, 0); }
  100% { box-shadow: 0 0 0 0 rgba(66, 184, 131, 0); }
}

.title {
  margin: 22px 0 0;
  font-size: clamp(2.3rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.03em;
  text-wrap: balance;
}
.sub {
  margin: 22px 0 0;
  max-width: 40ch;
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  color: var(--color-fg-muted);
  line-height: 1.65;
}

.cta { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 26px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.98rem;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, border-color 0.18s ease;
  will-change: transform;
}
.btn-brand {
  color: #06210f;
  background: linear-gradient(120deg, var(--color-brand), #4fd1a0);
  box-shadow: 0 10px 30px -10px rgba(66, 184, 131, 0.6);
}
.btn-brand:hover { box-shadow: 0 16px 40px -12px rgba(66, 184, 131, 0.75); }
.btn-ghost {
  color: var(--color-fg);
  border: 1px solid var(--color-line-strong);
  background: var(--color-surface-2);
}
.btn-ghost:hover { border-color: var(--color-brand); color: var(--color-brand); transform: translateY(-2px); }

.trust {
  list-style: none;
  margin: 26px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--color-fg-muted);
}
.trust li { display: inline-flex; align-items: center; }
.trust .dot { margin: 0 10px; color: var(--color-brand); opacity: 0.7; }

.tagline {
  margin: 22px 0 0;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  color: var(--color-fg-faint);
}

.art {
  position: relative;
  min-height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 959px) {
  .art { min-height: 320px; transform: scale(0.9); order: -1; }
}
</style>
