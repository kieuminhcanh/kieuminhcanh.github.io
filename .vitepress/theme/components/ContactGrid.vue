<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

/**
 * Contact grid — mono-label rows with brand icons (slim.vn style).
 *
 * Anti-scraping: the email and handle are stored reversed + base64-encoded so
 * neither the source nor the server-rendered HTML contains a literal address.
 * They are only decoded on the client once the section scrolls into view
 * (useIntersectionObserver). Until then a `•••` placeholder is shown and the
 * links carry no real href, so static-HTML and source-grep bots find nothing.
 */

// reverse(base64('kieuminhcanh')) — the GitHub/X/LinkedIn handle.
const H = 'o5WYjhmbp1Wdll2a'
// reverse(base64('minhcanhdn0704@gmail.com')) — the contact email.
const M = 't92YuwWah12ZARDM3AjbkhmbhNGaulWb'

function decode(reversed: string): string {
  // Undo the reverse, then base64-decode.
  const b64 = reversed.split('').reverse().join('')
  return typeof atob !== 'undefined' ? atob(b64) : ''
}

interface Row {
  key: 'email' | 'github'
  label: string
  value: string
  href: string
}

const PLACEHOLDER = '•••••••••'
const revealed = ref(false)

// Until revealed, rows show placeholders and inert hrefs.
const rows = shallowRef<Row[]>([
  { key: 'email', label: 'Email', value: PLACEHOLDER, href: '#contact' },
  { key: 'github', label: 'GitHub', value: PLACEHOLDER, href: '#contact' },
])

function reveal() {
  if (revealed.value) return
  const handle = decode(H)
  const email = decode(M)
  rows.value = [
    { key: 'email', label: 'Email', value: email, href: `mailto:${email}` },
    { key: 'github', label: 'GitHub', value: `github.com/${handle}`, href: `https://github.com/${handle}` },
  ]
  revealed.value = true
}

const root = shallowRef<HTMLElement | null>(null)
const { stop } = useIntersectionObserver(
  root,
  ([entry]) => {
    if (entry?.isIntersecting) {
      reveal()
      stop()
    }
  },
  { threshold: 0.25 },
)
</script>

<template>
  <div ref="root" class="contact-grid" :class="{ revealed }">
    <a
      v-for="row in rows"
      :key="row.key"
      class="contact-row"
      :class="{ inert: !revealed }"
      :href="row.href"
      :target="row.key === 'email' || !revealed ? undefined : '_blank'"
      :rel="row.key === 'email' || !revealed ? undefined : 'noopener'"
      :tabindex="revealed ? undefined : -1"
      :aria-hidden="!revealed"
    >
      <span class="contact-icon" aria-hidden="true">
        <!-- Email -->
        <svg v-if="row.key === 'email'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        <!-- GitHub -->
        <svg v-else viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1a11 11 0 0 0-3.48 21.44c.55.1.75-.24.75-.53v-1.86c-3.06.67-3.71-1.48-3.71-1.48-.5-1.27-1.22-1.61-1.22-1.61-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.69-1.47-2.45-.28-5.02-1.22-5.02-5.45 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.7.77 1.13 1.75 1.13 2.95 0 4.24-2.58 5.16-5.04 5.44.4.34.75 1 .75 2.03v3c0 .3.2.64.76.53A11 11 0 0 0 12 1Z" />
        </svg>
      </span>
      <span class="contact-meta">
        <span class="contact-label">{{ row.label }}</span>
        <span class="contact-value" :class="{ masked: !revealed }">{{ row.value }}</span>
      </span>
    </a>
  </div>
</template>
