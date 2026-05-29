<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

// Trust signals shown under the hero CTAs to build credibility at first glance.
const { lang } = useData()

const items = computed(() =>
  lang.value.startsWith('vi')
    ? ['Core team Vuetify', '18 năm full-stack', 'Được dùng khắp cộng đồng Vue']
    : ['Vuetify core team', '18 years full-stack', 'Used across the Vue ecosystem'],
)
</script>

<template>
  <ul class="hero-trust" aria-label="Highlights">
    <li v-for="(item, i) in items" :key="item">
      <span class="dot" v-if="i > 0" aria-hidden="true">·</span>
      {{ item }}
    </li>
  </ul>
</template>

<style scoped>
.hero-trust {
  list-style: none;
  margin: 22px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 0;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--vp-c-text-2);
}
.hero-trust li {
  display: inline-flex;
  align-items: center;
}
.hero-trust .dot {
  margin: 0 10px;
  color: var(--vp-c-brand-1);
  opacity: 0.7;
}

/* Center under the hero text when the layout stacks (matches name/tagline). */
@media (max-width: 959px) {
  .hero-trust {
    justify-content: center;
  }
}
</style>
