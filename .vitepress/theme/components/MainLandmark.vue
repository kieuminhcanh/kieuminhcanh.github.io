<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

// VitePress' home layout renders content inside a plain <div id="VPContent">
// with no <main> landmark, which fails the Lighthouse `landmark-one-main`
// audit. Promote that container to an ARIA main landmark on every route.
const route = useRoute()

function ensureMainLandmark() {
  const el = document.getElementById('VPContent')
  if (el && !el.hasAttribute('role')) {
    el.setAttribute('role', 'main')
  }
}

onMounted(ensureMainLandmark)
watch(() => route.path, () => requestAnimationFrame(ensureMainLandmark))
</script>

<template>
  <span style="display: none" aria-hidden="true" />
</template>
