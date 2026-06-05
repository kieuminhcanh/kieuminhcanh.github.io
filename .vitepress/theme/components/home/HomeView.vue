<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { homeContent } from '../../data/home'

import HeroSection from './HeroSection.vue'
import Marquee from '../Marquee.vue'
import CredibilityBar from './CredibilityBar.vue'
import VuetifySpotlight from './VuetifySpotlight.vue'
import CapabilitiesSection from './CapabilitiesSection.vue'
import JourneyLevels from '../JourneyLevels.vue'
import ProjectsSection from './ProjectsSection.vue'
import ContactSection from './ContactSection.vue'

const { lang } = useData()
const c = computed(() => homeContent(lang.value))
</script>

<template>
  <div class="home">
    <HeroSection :c="c.hero" :trust="c.trust" :projects-href="c.projects.moreHref" />
    <Marquee />
    <VuetifySpotlight :c="c.vuetify" />
    <CredibilityBar :c="c.credibility" />
    <CapabilitiesSection :c="c.capabilities" />

    <section class="journey-section">
      <div class="shell">
        <header class="head">
          <p class="eyebrow">{{ c.journey.eyebrow }}</p>
          <h2 class="section-title">{{ c.journey.title }}</h2>
          <p class="intro">{{ c.journey.intro }}</p>
        </header>
        <JourneyLevels />
      </div>
    </section>

    <ProjectsSection :c="c.projects" :cta-label="c.hero.ctaPrimary" />
    <!-- Testimonials hidden until there are more quotes (Hugo Shi shown on /projects). -->
    <ContactSection :c="c.contact" />
  </div>
</template>

<style scoped>
.journey-section { padding: clamp(40px, 7vw, 90px) 0; }
.head { max-width: 56ch; margin-bottom: 36px; }
.intro { margin: 16px 0 0; color: var(--color-fg-muted); font-size: 1.05rem; }
</style>
