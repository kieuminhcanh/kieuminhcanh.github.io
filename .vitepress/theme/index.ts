import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import { h } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import EventBadgeHero from './components/EventBadgeHero.vue'
import HeroTrust from './components/HeroTrust.vue'
import MainLandmark from './components/MainLandmark.vue'
import Marquee from './components/Marquee.vue'
import JourneyLevels from './components/JourneyLevels.vue'
import ScrollReveal from './components/ScrollReveal.vue'
import ContactGrid from './components/ContactGrid.vue'
import ObfuscatedEmail from './components/ObfuscatedEmail.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(MotionPlugin)
    // Register components used inside markdown.
    app.component('JourneyLevels', JourneyLevels)
    app.component('ContactGrid', ContactGrid)
    app.component('ObfuscatedEmail', ObfuscatedEmail)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(EventBadgeHero),
      'home-hero-actions-after': () => h(HeroTrust),
      'home-hero-after': () => h(Marquee),
      'layout-top': () => [h(MainLandmark), h(ScrollReveal)],
    })
  },
}
