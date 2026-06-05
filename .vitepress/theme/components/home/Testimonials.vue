<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../../composables/useReveal'
import type { HomeContent } from '../../data/home'

defineProps<{ c: HomeContent['testimonials'] }>()

const root = ref<HTMLElement | null>(null)
useReveal(root, { items: '.quote', stagger: 0.1 })
</script>

<template>
  <section class="testi">
    <div class="shell">
      <header class="head">
        <p class="eyebrow">{{ c.eyebrow }}</p>
        <h2 class="section-title">{{ c.title }}</h2>
      </header>

      <div ref="root" class="grid">
        <!-- Placeholder-gated: cards carry a visible PLACEHOLDER badge until
             real quotes are supplied (decision 4c). Never ship a fake quote. -->
        <figure
          v-for="(t, i) in c.items"
          :key="i"
          class="quote reveal-init"
          :class="{ ph: t.placeholder }"
        >
          <span v-if="t.placeholder" class="badge">PLACEHOLDER</span>
          <blockquote>“{{ t.quote }}”</blockquote>
          <figcaption>
            <span class="author">{{ t.author }}</span>
            <span class="role">
              {{ t.role }}<template v-if="t.company"> ·
                <a v-if="t.href" :href="t.href" target="_blank" rel="noopener" class="company">{{ t.company }}</a>
                <span v-else class="company">{{ t.company }}</span>
              </template>
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testi { padding: clamp(40px, 7vw, 90px) 0; }
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  margin-top: 40px;
}
@media (min-width: 760px) { .grid { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); } }

.quote {
  position: relative;
  padding: 30px 28px;
  border: 1px solid var(--color-line);
  border-radius: 18px;
  background:
    radial-gradient(circle at 0% 0%, rgba(66, 184, 131, 0.07), transparent 55%),
    var(--color-surface-2);
}
.quote.ph { border-style: dashed; }
.badge {
  position: absolute;
  top: 14px;
  right: 14px;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 50%, transparent);
  border-radius: 6px;
  padding: 2px 7px;
}
blockquote {
  margin: 0;
  font-size: 1.08rem;
  line-height: 1.6;
  color: var(--color-fg);
}
figcaption { margin-top: 22px; display: flex; flex-direction: column; gap: 2px; }
.author { font-weight: 700; }
.role { font-size: 0.84rem; color: var(--color-fg-muted); }
.company { color: var(--color-brand); font-weight: 600; }
.company:hover { text-decoration: underline; }
</style>
