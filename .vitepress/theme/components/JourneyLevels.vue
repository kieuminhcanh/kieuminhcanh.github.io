<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

/**
 * Interactive journey timeline — mirrors slim.vn's "6 cấp độ trưởng thành"
 * section. A row of clickable stage chips drives a detail panel that swaps
 * its characteristics / focus copy. Content reframed as an 18-year
 * full-stack journey instead of an AI maturity model.
 */
const { lang } = useData()
const isVi = computed(() => lang.value.startsWith('vi'))

interface Stage {
  tag: string
  title: string
  short: string
  trait: string
  focus: string
}

const stages = computed<Stage[]>(() =>
  isVi.value
    ? [
        { tag: 'S0', title: 'Nền tảng web', short: 'HTML · CSS · JS thuần', trait: 'Bắt đầu từ những trang web tĩnh, nắm chắc nền tảng của web mở.', focus: 'Hiểu sâu cách trình duyệt, mạng và markup ngữ nghĩa vận hành.' },
        { tag: 'S1', title: 'Backend & dữ liệu', short: 'API, cơ sở dữ liệu, server', trait: 'Xây API và mô hình dữ liệu cho ứng dụng chạy thật.', focus: 'Node.js, Laravel, Supabase, Firebase — logic nghiệp vụ mở rộng được.' },
        { tag: 'S2', title: 'Frontend hiện đại', short: 'Vue, component-driven', trait: 'Chuyển sang giao diện component, hiệu năng cao, UX-first.', focus: 'Vue, Nuxt, TypeScript và tư duy thiết kế hệ thống.' },
        { tag: 'S3', title: 'Design system', short: 'Core team Vuetify', trait: 'Góp phần duy trì design system Vue được dùng khắp cộng đồng.', focus: 'API mà lập trình viên thích dùng, accessibility, developer experience.' },
        { tag: 'S4', title: 'Sản phẩm trọn vẹn', short: 'Từ ý tưởng đến deploy', trait: 'Bàn giao sản phẩm full-stack từ đầu đến cuối.', focus: 'Kiến trúc, hạ tầng, vận hành — một mình đi hết vòng đời sản phẩm.' },
        { tag: 'S5', title: 'AI vào sản phẩm', short: 'LLM, RAG, AI agents', trait: 'Đưa AI vào sản phẩm thật một cách đơn giản, hiệu quả, dễ duy trì.', focus: 'Tích hợp LLM, embeddings và prompt engineering vào UX hằng ngày.' },
      ]
    : [
        { tag: 'S0', title: 'Web foundations', short: 'Vanilla HTML · CSS · JS', trait: 'Started from static pages, with a firm grasp of the open web.', focus: 'Deep understanding of browsers, networking, and semantic markup.' },
        { tag: 'S1', title: 'Backend & data', short: 'APIs, databases, servers', trait: 'Building APIs and data models for real-world applications.', focus: 'Node.js, Laravel, Supabase, Firebase — scalable business logic.' },
        { tag: 'S2', title: 'Modern frontend', short: 'Vue, component-driven', trait: 'Moved to component-based, high-performance, UX-first interfaces.', focus: 'Vue, Nuxt, TypeScript, and design-systems thinking.' },
        { tag: 'S3', title: 'Design systems', short: 'Vuetify core team', trait: 'Helping maintain a Vue design system used across the ecosystem.', focus: 'APIs developers enjoy, accessibility, developer experience.' },
        { tag: 'S4', title: 'End-to-end product', short: 'From idea to deploy', trait: 'Delivering full-stack products from start to finish.', focus: 'Architecture, infrastructure, operations — the whole lifecycle.' },
        { tag: 'S5', title: 'AI into products', short: 'LLMs, RAG, AI agents', trait: 'Bringing AI into real products — simple, effective, maintainable.', focus: 'Integrating LLMs, embeddings, and prompt engineering into everyday UX.' },
      ],
)

const labels = computed(() =>
  isVi.value
    ? { eyebrow: 'Hành trình', characteristics: 'Đặc điểm', work: 'Trọng tâm' }
    : { eyebrow: 'Journey', characteristics: 'Characteristics', work: 'Focus' },
)

const active = ref(0)
const current = computed(() => stages.value[active.value])
</script>

<template>
  <div class="journey">
    <div class="journey-rail" role="tablist" :aria-label="labels.eyebrow">
      <button
        v-for="(stage, i) in stages"
        :key="stage.tag"
        class="journey-chip"
        :class="{ active: i === active }"
        role="tab"
        :aria-selected="i === active"
        @click="active = i"
      >
        <span class="chip-tag">{{ stage.tag }}</span>
        <span class="chip-title">{{ stage.title }}</span>
        <span class="chip-short">{{ stage.short }}</span>
      </button>
    </div>

    <div class="journey-panel" role="tabpanel">
      <div class="panel-head">
        <span class="panel-tag">{{ current.tag }}</span>
        <h3 class="panel-title">{{ current.title }}</h3>
      </div>
      <div class="panel-body">
        <div class="panel-col">
          <span class="panel-label">{{ labels.characteristics }}</span>
          <p>{{ current.trait }}</p>
        </div>
        <div class="panel-col">
          <span class="panel-label">{{ labels.work }}</span>
          <p>{{ current.focus }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.journey {
  margin-top: 8px;
}

/* Stage chip rail — horizontal scroll on small screens. */
.journey-rail {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  /* Top padding (offset by negative margin) gives the hover lift room so
     the rail's overflow clip doesn't cut off the chip's raised top edge. */
  padding: 8px 0 6px;
  margin-top: -8px;
  scrollbar-width: thin;
}

.journey-chip {
  flex: 1 0 150px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 16px 16px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
}
.journey-chip:hover {
  transform: translateY(-3px);
  border-color: var(--vp-c-brand-1);
}
.journey-chip.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 12px 30px -20px var(--vp-c-brand-1);
}

.chip-tag {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}
.chip-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
}
.chip-short {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

/* Detail panel */
.journey-panel {
  margin-top: 22px;
  padding: 28px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background:
    radial-gradient(circle at 0% 0%, var(--vp-c-brand-soft), transparent 55%),
    var(--vp-c-bg-soft);
}

.panel-head {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.panel-tag {
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  padding: 4px 10px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
}
.panel-title {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  border: none;
  padding: 0;
}

.panel-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
  margin-top: 20px;
}
@media (min-width: 720px) {
  .panel-body {
    grid-template-columns: 1fr 1fr;
  }
}

.panel-label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
}
.panel-col p {
  margin: 0;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

@media (prefers-reduced-motion: reduce) {
  .journey-chip { transition: none; }
}
</style>
