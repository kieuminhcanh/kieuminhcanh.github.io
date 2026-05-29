import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import EventBadgeHero from './components/EventBadgeHero.vue'
import HeroTrust from './components/HeroTrust.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(MotionPlugin)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(EventBadgeHero),
      'home-hero-actions-after': () => h(HeroTrust),
    })
  },
}
