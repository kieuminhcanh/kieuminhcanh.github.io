import type { Theme } from 'vitepress'
import { MotionPlugin } from '@vueuse/motion'
import Layout from './Layout.vue'
import ObfuscatedEmail from './components/ObfuscatedEmail.vue'
import './tailwind.css'

// Fully custom theme — own Layout, no DefaultTheme. @vueuse/motion powers the
// declarative micro-interactions; GSAP (via composables) drives scroll motion.
export default {
  Layout,
  enhanceApp({ app }) {
    app.use(MotionPlugin)
    // Used inside policy markdown pages.
    app.component('ObfuscatedEmail', ObfuscatedEmail)
  },
} satisfies Theme
