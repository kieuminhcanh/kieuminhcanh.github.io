import { onMounted, onBeforeUnmount, type Ref } from 'vue'
import { useGsap, motionOk } from './useGsap'

/**
 * Magnetic pointer-follow for a button/element — it leans toward the cursor on
 * hover and springs back on leave. Pointer-only (skipped on coarse/touch and
 * for reduced-motion). Self-cleaning.
 */
export function useMagnetic(el: Ref<HTMLElement | null>, strength = 0.35) {
  const { gsap } = useGsap()
  let quickX: ((v: number) => void) | null = null
  let quickY: ((v: number) => void) | null = null

  function move(e: PointerEvent) {
    const node = el.value
    if (!node || !quickX || !quickY) return
    const r = node.getBoundingClientRect()
    quickX((e.clientX - (r.left + r.width / 2)) * strength)
    quickY((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function reset() {
    quickX?.(0)
    quickY?.(0)
  }

  onMounted(() => {
    const node = el.value
    if (!node || !motionOk()) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    quickX = gsap.quickTo(node, 'x', { duration: 0.4, ease: 'power3.out' })
    quickY = gsap.quickTo(node, 'y', { duration: 0.4, ease: 'power3.out' })
    node.addEventListener('pointermove', move)
    node.addEventListener('pointerleave', reset)
  })

  onBeforeUnmount(() => {
    const node = el.value
    node?.removeEventListener('pointermove', move)
    node?.removeEventListener('pointerleave', reset)
  })
}
