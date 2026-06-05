<script setup lang="ts">
import StatItem from './StatItem.vue'
import type { HomeContent } from '../../data/home'

defineProps<{ c: HomeContent['credibility'] }>()

// Two tiers so the core-team credential isn't flattened next to app stores.
const trusted = ['Vuetify', 'Saturn Cloud']
const also = ['Chrome Web Store', 'Microsoft Store']
</script>

<template>
  <section class="cred">
    <div class="shell">
      <p class="eyebrow">{{ c.eyebrow }}</p>
      <div class="stats">
        <StatItem v-for="s in c.stats" :key="s.label" :stat="s" />
      </div>

      <div class="trusted">
        <span class="trusted-label">{{ c.trustedOn }}</span>
        <ul class="logos primary">
          <!-- PLACEHOLDER: swap text wordmarks for real greyscale SVG logos. -->
          <li v-for="l in trusted" :key="l">{{ l }}</li>
        </ul>
        <span class="trusted-label dim">{{ c.alsoOn }}</span>
        <ul class="logos">
          <li v-for="l in also" :key="l">{{ l }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cred { padding: clamp(40px, 6vw, 72px) 0; }
.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px 16px;
  margin-top: 28px;
  padding: clamp(28px, 4vw, 44px) clamp(16px, 3vw, 32px);
  border: 1px solid var(--color-line);
  border-radius: 20px;
  background:
    radial-gradient(circle at 50% 0%, rgba(66, 184, 131, 0.08), transparent 70%),
    var(--color-surface);
}
@media (min-width: 760px) { .stats { grid-template-columns: repeat(4, 1fr); } }

.trusted {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 28px;
  margin-top: 28px;
}
.trusted-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-fg-faint);
}
.logos {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  margin: 0;
  padding: 0;
}
.logos li {
  font-weight: 700;
  font-size: 0.96rem;
  color: var(--color-fg-faint);
  filter: grayscale(1);
  opacity: 0.7;
  transition: color 0.2s ease, opacity 0.2s ease;
}
.logos li:hover { color: var(--color-fg); opacity: 1; }
/* Tier 1 — core credential, brighter and a touch larger. */
.logos.primary li { color: var(--color-fg-muted); font-size: 1.05rem; opacity: 0.92; }
.trusted-label.dim { color: var(--color-line-strong); }
</style>
