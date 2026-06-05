<script setup lang="ts">
import { ref } from 'vue'
import { useCounter } from '../../composables/useCounter'
import type { Stat } from '../../data/home'

const props = defineProps<{ stat: Stat }>()
const root = ref<HTMLElement | null>(null)
const display = useCounter(root, props.stat.value, props.stat.decimals ?? 0)
</script>

<template>
  <div ref="root" class="stat reveal-item">
    <div class="num">
      <span class="val gradient-text">{{ display }}</span><span class="suf">{{ stat.suffix }}</span>
    </div>
    <div class="label">{{ stat.label }}</div>
  </div>
</template>

<style scoped>
.stat { text-align: center; padding: 8px; }
.num { display: inline-flex; align-items: baseline; font-weight: 800; letter-spacing: -0.03em; }
.val { font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1; font-variant-numeric: tabular-nums; }
.suf {
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 800;
  color: var(--color-accent);
  margin-left: 2px;
}
.label {
  margin-top: 12px;
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--color-fg-muted);
  text-wrap: balance;
}
</style>
