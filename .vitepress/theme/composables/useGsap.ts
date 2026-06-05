import { inBrowser } from 'vitepress'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Register GSAP plugins exactly once, only in the browser. SSR never touches
 * ScrollTrigger (it reads window on use). GSAP is fully free incl. all plugins.
 */
let registered = false
export function useGsap() {
  if (inBrowser && !registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
  return { gsap, ScrollTrigger }
}

/** True when the user has not asked to reduce motion. */
export function motionOk(): boolean {
  return inBrowser && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
