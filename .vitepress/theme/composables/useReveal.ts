import { onMounted, onBeforeUnmount, type Ref } from 'vue'
import { useGsap, motionOk } from './useGsap'

interface RevealOptions {
  /** Child selector to stagger in (e.g. '.reveal-item'). Defaults to the root itself. */
  items?: string
  /** Stagger between items, seconds. */
  stagger?: number
  /** Vertical travel, px. */
  y?: number
  /** ScrollTrigger start. */
  start?: string
}

/**
 * Scroll-reveal a container (or its `.reveal-item` children) once it enters the
 * viewport. GSAP-driven, scoped via gsap.context so every trigger self-cleans on
 * unmount. Reduced-motion users get the final state instantly — content always
 * visible. Elements should carry `.reveal-init` so SSR/no-JS shows the end state.
 */
export function useReveal(root: Ref<HTMLElement | null>, opts: RevealOptions = {}) {
  const { gsap } = useGsap()
  let ctx: ReturnType<typeof gsap.context> | null = null

  onMounted(() => {
    const el = root.value
    if (!el) return

    const targets = opts.items ? el.querySelectorAll(opts.items) : [el]
    if (!targets.length) return

    if (!motionOk()) {
      gsap.set(targets, { clearProps: 'all', opacity: 1, y: 0 })
      el.querySelectorAll('.reveal-init').forEach((n) => n.classList.remove('reveal-init'))
      return
    }

    ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: opts.y ?? 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: opts.stagger ?? 0.08,
          scrollTrigger: { trigger: el, start: opts.start ?? 'top 82%' },
        },
      )
    }, el)
  })

  onBeforeUnmount(() => ctx?.revert())
}
