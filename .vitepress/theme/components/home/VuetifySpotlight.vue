<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { withBase } from 'vitepress'
import { useReveal } from '../../composables/useReveal'
import { useGsap, motionOk } from '../../composables/useGsap'
import type { HomeContent } from '../../data/home'

defineProps<{ c: HomeContent['vuetify'] }>()

const root = ref<HTMLElement | null>(null)
const preview = ref<HTMLElement | null>(null)
useReveal(root, { items: '.reveal-item', stagger: 0.1 })

// Gentle scrub parallax on the Studio preview — this is the highest-trust
// moment, it earns one deliberate motion beat.
const { gsap } = useGsap()
let ctx: ReturnType<typeof gsap.context> | null = null
onMounted(() => {
  if (!preview.value || !motionOk()) return
  ctx = gsap.context(() => {
    gsap.fromTo(
      preview.value,
      { yPercent: 6 },
      {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )
  }, root.value!)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="spot">
    <div class="shell grid">
      <div class="copy">
        <p class="eyebrow reveal-item reveal-init">{{ c.eyebrow }}</p>
        <h2 class="section-title reveal-item reveal-init">
          <span class="gradient-text">{{ c.title }}</span>
        </h2>
        <p class="body reveal-item reveal-init">{{ c.body }}</p>
        <ul class="bullets reveal-item reveal-init">
          <li v-for="b in c.bullets" :key="b">
            <span class="tick" aria-hidden="true">✦</span>{{ b }}
          </li>
        </ul>
        <div class="acts reveal-item reveal-init">
          <a :href="c.href" target="_blank" rel="noopener" class="btn-brand">{{ c.cta }}</a>
          <a href="#contact" class="soft">{{ c.softCta }}</a>
        </div>
      </div>

      <div class="frame reveal-item reveal-init">
        <div ref="preview" class="preview">
          <div class="ph-bar">
            <span /><span /><span />
            <em>studio.vuetifyjs.com</em>
          </div>
          <a :href="c.href" target="_blank" rel="noopener" class="shot">
            <img :src="withBase('/vuetify-studio.png')" alt="Vuetify Studio interface" loading="lazy" width="1280" height="800" >
          </a>
        </div>
        <div class="frame-glow" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.spot { padding: clamp(56px, 9vw, 120px) 0; }
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 44px;
  align-items: center;
}
@media (min-width: 960px) { .grid { grid-template-columns: 1fr 1.05fr; gap: 64px; } }

.body { margin: 20px 0 0; color: var(--color-fg-muted); font-size: 1.05rem; line-height: 1.7; max-width: 46ch; }
.bullets { list-style: none; margin: 24px 0 0; padding: 0; display: grid; gap: 12px; }
.bullets li { display: flex; gap: 12px; color: var(--color-fg); font-weight: 500; }
.tick { color: var(--color-brand); flex: 0 0 auto; }

.acts { display: flex; flex-wrap: wrap; align-items: center; gap: 18px 24px; margin-top: 32px; }
.btn-brand {
  display: inline-flex;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 700;
  color: #06210f;
  background: linear-gradient(120deg, var(--color-brand), #4fd1a0);
  box-shadow: 0 10px 30px -12px rgba(66, 184, 131, 0.6);
  transition: box-shadow 0.18s ease, transform 0.18s ease;
}
.btn-brand:hover { transform: translateY(-2px); box-shadow: 0 16px 40px -12px rgba(66, 184, 131, 0.8); }
.soft { font-weight: 600; color: var(--color-accent); transition: color 0.18s ease; }
.soft:hover { color: var(--color-accent-2); }

.frame { position: relative; }
.preview {
  position: relative;
  z-index: 1;
  border: 1px solid var(--color-line-strong);
  border-radius: 16px;
  overflow: hidden;
  background: var(--color-surface-2);
  box-shadow: var(--shadow-card);
  aspect-ratio: 16 / 10;
  display: flex;
  flex-direction: column;
}
.ph-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-line);
  background: var(--color-surface-3);
}
.ph-bar span { width: 11px; height: 11px; border-radius: 50%; background: var(--color-line-strong); }
.ph-bar em {
  margin-left: 12px;
  font-style: normal;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--color-fg-faint);
}
.shot { flex: 1; display: block; overflow: hidden; background: var(--color-surface-3); }
.shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}
.frame-glow {
  position: absolute;
  inset: -12% -8% auto -8%;
  height: 70%;
  background: radial-gradient(circle at center, rgba(66, 184, 131, 0.22), transparent 65%);
  filter: blur(8px);
  z-index: 0;
  pointer-events: none;
}
</style>
