<script setup lang="ts">
import EventBadge from './EventBadge.vue'
</script>

<template>
  <div class="badge-hero">
    <EventBadge />
  </div>
</template>

<style scoped>
/* Fills the VitePress hero image slot (right column). */
.badge-hero {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 420px;
  /* Decorative only — let clicks reach the hero buttons. */
  pointer-events: none;
}
</style>
