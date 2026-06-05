<script setup lang="ts">
import ContactGrid from '../ContactGrid.vue'
import type { HomeContent } from '../../data/home'

defineProps<{ c: HomeContent['contact'] }>()
</script>

<template>
  <section id="contact" class="contact">
    <div class="shell inner">
      <p class="eyebrow center">{{ c.eyebrow }}</p>
      <h2 class="section-title">{{ c.title }}</h2>
      <p class="intro">{{ c.intro }}</p>
      <ContactGrid />
      <p class="reassure">{{ c.reassurance }}</p>
    </div>
  </section>
</template>

<style scoped>
.contact { padding: clamp(48px, 8vw, 100px) 0; }
.inner {
  max-width: 640px;
  text-align: center;
  padding: clamp(36px, 5vw, 56px) clamp(20px, 4vw, 40px);
  border: 1px solid var(--color-line);
  border-radius: 24px;
  background:
    radial-gradient(circle at 50% 0%, rgba(66, 184, 131, 0.12), transparent 70%),
    var(--color-surface);
}
.eyebrow.center { justify-content: center; }
.eyebrow.center::before { display: none; }
.intro { margin: 16px auto 0; max-width: 44ch; color: var(--color-fg-muted); }
.reassure {
  margin: 26px 0 0;
  font-size: 0.9rem;
  color: var(--color-fg-faint);
}
</style>
