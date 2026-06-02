<script setup lang="ts">
import { ref, onMounted } from 'vue'

/**
 * Renders a contact email that never appears in the static HTML or source in
 * plain form. The address is stored reversed + base64-encoded and only decoded
 * on the client in onMounted, so SSR output and source-grep bots see only a
 * placeholder. Falls back to a non-mailto label until decoded.
 */

// reverse(base64('minhcanhdn0704@gmail.com'))
const M = 't92YuwWah12ZARDM3AjbkhmbhNGaulWb'

const email = ref('')
const href = ref('#')

onMounted(() => {
  const b64 = M.split('').reverse().join('')
  const addr = typeof atob !== 'undefined' ? atob(b64) : ''
  if (addr) {
    email.value = addr
    href.value = `mailto:${addr}`
  }
})
</script>

<template>
  <a v-if="email" :href="href">{{ email }}</a>
  <span v-else aria-hidden="true">email</span>
</template>
