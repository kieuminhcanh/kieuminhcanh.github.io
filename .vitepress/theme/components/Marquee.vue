<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

/**
 * Infinite horizontal marquee of trait keywords — mirrors the
 * "Đơn giản · Hiệu quả · Dễ duy trì" strip on slim.vn. The track is
 * duplicated so the CSS translate loop has no visible seam. Decorative.
 */
const { lang } = useData()

const items = computed(() =>
  lang.value.startsWith('vi')
    ? ['Hiệu năng', 'Accessibility', 'Trải nghiệm Dev', 'Mã nguồn mở', 'Thiết kế hệ thống', 'Chú trọng chi tiết']
    : ['Performance', 'Accessibility', 'Developer Experience', 'Open Source', 'Design Systems', 'Attention to Detail'],
)
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee-track">
      <span v-for="(item, i) in items" :key="`a-${i}`" class="marquee-item">
        {{ item }}<span class="marquee-sep">✦</span>
      </span>
      <span v-for="(item, i) in items" :key="`b-${i}`" class="marquee-item">
        {{ item }}<span class="marquee-sep">✦</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 18px 0;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.marquee-track {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  will-change: transform;
  animation: marquee-scroll 28s linear infinite;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  font-size: clamp(1.1rem, 2.6vw, 1.7rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.marquee-sep {
  margin: 0 28px;
  font-size: 0.7em;
  color: var(--vp-c-brand-1);
}

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}
</style>
