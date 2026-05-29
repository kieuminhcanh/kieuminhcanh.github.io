<script setup lang="ts">
import { ref } from 'vue'

/**
 * Event-badge card built with plain HTML — name, title, handle and a GitHub
 * avatar. @vueuse/motion handles the entrance + idle float; a small pointer
 * handler adds a 3D tilt. Decorative only (aria-hidden, pointer-events:none).
 */

const props = withDefaults(defineProps<{
  name?: string
  title?: string
  handle?: string
  github?: string
}>(), {
  name: 'Kieu Minh Canh',
  title: 'Full-stack Developer',
  handle: '@kieuminhcanh',
  github: 'kieuminhcanh',
})

const initials = props.name.split(' ').map(s => s[0]).slice(0, 2).join('')
const avatarOk = ref(true)

// Pointer-driven 3D tilt.
const tiltX = ref(0)
const tiltY = ref(0)
function onPointerMove(e: PointerEvent) {
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width - 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  tiltY.value = px * 16
  tiltX.value = -py * 16
}
function onPointerLeave() {
  tiltX.value = 0
  tiltY.value = 0
}
</script>

<template>
  <div
    class="badge-stage"
    aria-hidden="true"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <!-- Lanyard strap + clip -->
    <div class="badge-strap">
      <span class="strap-side strap-l" />
      <span class="strap-side strap-r" />
      <span class="badge-clip" />
    </div>

    <div
      class="badge-card"
      :style="{ transform: `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)` }"
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
    >
      <div class="badge-punch" />

      <div class="badge-avatar">
        <img
          v-if="avatarOk"
          :src="`https://github.com/${github}.png?size=200`"
          :alt="name"
          @error="avatarOk = false"
        >
        <span v-else class="badge-initials">{{ initials }}</span>
      </div>

      <div class="badge-name">{{ name }}</div>
      <div class="badge-title">{{ title }}</div>
      <div class="badge-handle">{{ handle }}</div>
    </div>
  </div>
</template>

<style scoped>
.badge-stage {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

/* Float the whole card group up and down forever. */
.badge-card,
.badge-strap {
  animation: badge-float 5s ease-in-out infinite;
}
@keyframes badge-float {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -10px; }
}

/* Strap */
.badge-strap {
  position: relative;
  width: 70px;
  height: 70px;
  margin-bottom: -10px;
  z-index: 1;
}
.strap-side {
  position: absolute;
  top: 0;
  width: 12px;
  height: 64px;
  background: linear-gradient(180deg, #2f8a5f, var(--brand, #42b883));
  border-radius: 4px;
}
.strap-l { left: 16px; transform: rotate(-14deg); transform-origin: top; }
.strap-r { right: 16px; transform: rotate(14deg); transform-origin: top; }
.badge-clip {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 22px;
  height: 16px;
  border: 3px solid var(--vp-c-border);
  border-radius: 4px;
  background: var(--vp-c-bg-elv);
}

/* Card */
.badge-card {
  position: relative;
  width: 230px;
  padding: 26px 22px 24px;
  border-radius: 18px;
  background: var(--vp-c-bg-soft);
  border: 1px solid rgba(66, 184, 131, 0.5);
  box-shadow:
    0 0 0 1px rgba(66, 184, 131, 0.15),
    0 18px 50px rgba(0, 0, 0, 0.25),
    0 0 40px rgba(66, 184, 131, 0.18);
  text-align: center;
  overflow: hidden;
  transition: transform 0.15s ease-out;
  will-change: transform;
}
/* Accent header strip */
.badge-card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 8px;
  background: linear-gradient(90deg, #42b883, #1867c0);
}

.badge-punch {
  width: 56px;
  height: 14px;
  margin: 2px auto 18px;
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.badge-avatar {
  width: 96px;
  height: 96px;
  margin: 0 auto 16px;
  border-radius: 50%;
  border: 2px solid #42b883;
  background: rgba(66, 184, 131, 0.16);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.badge-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.badge-initials {
  font-size: 38px;
  font-weight: 700;
  color: #42b883;
}

.badge-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.badge-title {
  margin-top: 4px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
.badge-handle {
  margin-top: 14px;
  display: inline-block;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: #42b883;
  background: rgba(66, 184, 131, 0.16);
}

@media (prefers-reduced-motion: reduce) {
  .badge-card,
  .badge-strap {
    animation: none;
  }
}
</style>
