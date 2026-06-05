import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'
import { useGsap, motionOk } from './useGsap'

/**
 * Animate a number from 0 to `target` once the element scrolls into view, a
 * single time (no looping — looping reads as decoration, not fact). Returns the
 * live display string. Reduced-motion users see the final value immediately.
 */
export function useCounter(root: Ref<HTMLElement | null>, target: number, decimals = 0) {
  const display = ref(decimals > 0 ? (0).toFixed(decimals) : '0')
  const { gsap } = useGsap()
  let ctx: ReturnType<typeof gsap.context> | null = null

  onMounted(() => {
    const el = root.value
    if (!el) return

    if (!motionOk()) {
      display.value = target.toFixed(decimals)
      return
    }

    const obj = { v: 0 }
    ctx = gsap.context(() => {
      gsap.to(obj, {
        v: target,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => { display.value = obj.v.toFixed(decimals) },
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    }, el)
  })

  onBeforeUnmount(() => ctx?.revert())
  return display
}
