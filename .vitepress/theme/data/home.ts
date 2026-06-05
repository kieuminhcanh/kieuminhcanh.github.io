/**
 * Bilingual home-page content. The custom Layout picks `en` or `vi` by locale
 * so the designed sections stay i18n-clean without juggling markdown slots.
 *
 * NOTE: values tagged `PLACEHOLDER` are not verified facts — the owner fills /
 * confirms them before launch (decision 4c). Do not present them as real.
 */

export interface Stat {
  label: string
  value: number
  suffix: string
  decimals?: number
  placeholder?: boolean
}
export interface Capability {
  num: string
  title: string
  body: string
  tags: string[]
}
export interface Project {
  name: string
  body: string
  impact: string
  tags: string[]
  href: string
  cta: string
  image: string
}
export interface Testimonial {
  quote: string
  author: string
  role: string
  company?: string
  href?: string
  placeholder?: boolean
}
export interface HomeContent {
  hero: {
    badge: string
    headline: string
    headlineAccent: string
    sub: string
    tagline: string
    ctaPrimary: string
    ctaSecondary: string
  }
  trust: string[]
  credibility: { eyebrow: string; stats: Stat[]; trustedOn: string; alsoOn: string }
  vuetify: {
    eyebrow: string
    title: string
    body: string
    bullets: string[]
    cta: string
    href: string
    softCta: string
  }
  capabilities: { eyebrow: string; title: string; intro: string; items: Capability[] }
  journey: { eyebrow: string; title: string; intro: string }
  projects: { eyebrow: string; title: string; items: Project[]; more: string; moreHref: string }
  testimonials: { eyebrow: string; title: string; items: Testimonial[] }
  contact: { eyebrow: string; title: string; intro: string; reassurance: string }
}

const en: HomeContent = {
  hero: {
    badge: 'Available for new projects',
    headline: 'I build web products end-to-end —',
    headlineAccent: 'and the tools other developers ship with.',
    sub: 'Senior full-stack developer, 18+ years. Vuetify core team and creator of Vuetify Studio. From design system to deploy, the whole product is mine to ship.',
    tagline: 'Fast. Accessible. Built to last.',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'See selected work',
  },
  trust: ['Vuetify core team', '18+ years full-stack', 'Used across the Vue ecosystem'],
  credibility: {
    eyebrow: 'By the numbers',
    stats: [
      { label: 'Years building for the web', value: 18, suffix: '+' },
      { label: 'Projects shipped', value: 120, suffix: '+', placeholder: true },
      { label: 'Years on Vuetify core', value: 5, suffix: '+', placeholder: true },
      { label: 'Open-source contributions', value: 2, suffix: 'k+', placeholder: true },
    ],
    trustedOn: 'Shipping on',
    alsoOn: 'Published on',
  },
  vuetify: {
    eyebrow: 'The credential',
    title: 'Core team — Vuetify',
    body: 'I help maintain Vuetify, the Vue UI framework used by teams across the ecosystem, and I created Vuetify Studio — its visual design tooling. The foundations under your app are ones I help shape.',
    bullets: [
      'Contributing to the framework core and developer experience',
      'Creator of Vuetify Studio — visual UI design tooling',
      'Built to the standard the whole ecosystem relies on',
    ],
    cta: 'Open Studio',
    href: 'https://studio.vuetifyjs.com/',
    softCta: 'Want something built to this standard? Let’s talk →',
  },
  capabilities: {
    eyebrow: 'What I do',
    title: 'One partner for the whole product',
    intro: 'One developer who takes a product from first sketch to production — and stays accountable for how it performs.',
    items: [
      {
        num: '01',
        title: 'Frontend & design systems',
        body: 'Fast, accessible interfaces — and the design system that keeps them consistent as you scale.',
        tags: ['Vue', 'Vuetify', 'Nuxt', 'TypeScript'],
      },
      {
        num: '02',
        title: 'Backend & product',
        body: 'Your idea becomes a shipped product: scalable APIs, sound data models, and the business logic behind them.',
        tags: ['Node.js', 'Laravel', 'Supabase', 'Architecture'],
      },
      {
        num: '03',
        title: 'AI integration',
        body: 'AI goes in only where it earns its place — real features, not demos, with UX that holds up.',
        tags: ['LLM', 'RAG', 'AI Agents', 'Embeddings'],
      },
    ],
  },
  journey: {
    eyebrow: 'The path',
    title: '18 years, end to end',
    intro: 'Eighteen years of work, and how the focus sharpened at each stage.',
  },
  projects: {
    eyebrow: 'Selected work',
    title: 'Things I’ve shipped',
    items: [
      {
        name: 'Saturn Cloud Dashboard',
        body: 'The admin dashboard for the Saturn Cloud platform, built across frontend, backend, and infrastructure.',
        impact: 'Powers day-to-day operations for the platform’s customers.',
        tags: ['Full-stack', 'Dashboard', 'Cloud'],
        href: 'https://saturncloud.io/',
        image: '/proj-saturn.png',
        cta: 'Visit site',
      },
      {
        name: 'MiniSiteHub',
        body: 'A productized web service: design, build, and launch a professional business website in a single day — for a flat price.',
        impact: 'Compresses a typical six-week agency workflow into 24 hours.',
        tags: ['SaaS', 'Web', 'Productized'],
        href: 'https://minisitehub.com/',
        image: '/client-minisitehub.png',
        cta: 'See how it works',
      },
      {
        name: 'Typing Translate AI',
        body: 'A Chrome extension that translates text as you type, powered by Google Gemini.',
        impact: 'Privacy-first — runs entirely in the browser, no user data collected.',
        tags: ['Chrome Extension', 'AI', 'Gemini'],
        href: 'https://chromewebstore.google.com/detail/mdbpmkfbjjmhckennjmcfjjkggejgkdn',
        image: '/proj-typing.png',
        cta: 'Add to Chrome',
      },
      {
        name: 'Pomodoro',
        body: 'A distraction-free focus timer on the Microsoft Store.',
        impact: 'A free, no-friction productivity tool built for the community.',
        tags: ['Windows App', 'Productivity', 'Free'],
        href: 'https://apps.microsoft.com/detail/9p2hprwrn6fb',
        image: '/proj-pomodoro.png',
        cta: 'Get the app',
      },
    ],
    more: 'See all projects',
    moreHref: '/projects',
  },
  testimonials: {
    eyebrow: 'In their words',
    title: 'What collaborators say',
    items: [
      {
        quote: 'Ken rewrote our MASSIVE Vue 2 frontend in Vue 3, while porting us away from Bulma to Nuxt. I was skeptical of this approach at first, but he did an amazing job. Our code base is so much better now than when we started this project. I highly recommend Ken for ALL frontend projects.',
        author: 'Hugo Shi',
        role: 'Founder & CTO',
        company: 'Saturn Cloud',
        href: 'https://saturncloud.io/',
      },
    ],
  },
  contact: {
    eyebrow: 'Let’s connect',
    title: 'It starts with a conversation.',
    intro: 'Got a product problem worth solving? Tell me about it.',
    reassurance: 'Available for new projects · I reply to every serious enquiry, usually within a day.',
  },
}

const vi: HomeContent = {
  hero: {
    badge: 'Đang nhận dự án mới',
    headline: 'Mình làm sản phẩm web trọn vẹn —',
    headlineAccent: 'và cả những công cụ mà lập trình viên khác dùng để ship.',
    sub: 'Lập trình viên full-stack, hơn 18 năm. Thành viên core team Vuetify và người tạo ra Vuetify Studio. Từ design system tới khi deploy, mình làm chủ trọn sản phẩm.',
    tagline: 'Đơn giản. Hiệu quả. Bền theo thời gian.',
    ctaPrimary: 'Bắt đầu một dự án',
    ctaSecondary: 'Xem dự án tiêu biểu',
  },
  trust: ['Core team Vuetify', 'Hơn 18 năm full-stack', 'Được dùng khắp cộng đồng Vue'],
  credibility: {
    eyebrow: 'Bằng những con số',
    stats: [
      { label: 'Năm làm cho web', value: 18, suffix: '+' },
      { label: 'Dự án đã ship', value: 120, suffix: '+', placeholder: true },
      { label: 'Năm trong core Vuetify', value: 5, suffix: '+', placeholder: true },
      { label: 'Đóng góp mã nguồn mở', value: 2, suffix: 'k+', placeholder: true },
    ],
    trustedOn: 'Đang chạy trên',
    alsoOn: 'Phát hành trên',
  },
  vuetify: {
    eyebrow: 'Bằng chứng',
    title: 'Core team — Vuetify',
    body: 'Mình góp phần duy trì Vuetify — framework UI cho Vue được nhiều đội ngũ trong cộng đồng tin dùng, và tạo ra Vuetify Studio — bộ công cụ thiết kế trực quan của nó. Cái nền mà ứng dụng của bạn đứng trên, mình có góp phần dựng nên.',
    bullets: [
      'Đóng góp cho core framework và trải nghiệm lập trình viên',
      'Người tạo ra Vuetify Studio — công cụ thiết kế UI trực quan',
      'Làm theo chuẩn mà cả cộng đồng dựa vào',
    ],
    cta: 'Mở Studio',
    href: 'https://studio.vuetifyjs.com/',
    softCta: 'Muốn một sản phẩm chỉn chu như vậy? Cùng trao đổi →',
  },
  capabilities: {
    eyebrow: 'Mình làm gì',
    title: 'Một người đồng hành, trọn cả sản phẩm',
    intro: 'Một người làm trọn sản phẩm — từ định hướng, kỹ thuật, đến khi đồng hành cùng bạn vận hành.',
    items: [
      {
        num: '01',
        title: 'Frontend & design system',
        body: 'Mình mang đến giao diện nhanh, dễ tiếp cận — và design system giữ chúng nhất quán khi bạn mở rộng.',
        tags: ['Vue', 'Vuetify', 'Nuxt', 'TypeScript'],
      },
      {
        num: '02',
        title: 'Backend & sản phẩm',
        body: 'Mình đưa ý tưởng của bạn thành sản phẩm chạy thật — API mở rộng được, mô hình dữ liệu chắc và logic nghiệp vụ phía sau.',
        tags: ['Node.js', 'Laravel', 'Supabase', 'Kiến trúc'],
      },
      {
        num: '03',
        title: 'Tích hợp AI',
        body: 'Mình đưa AI vào đúng chỗ nó tạo giá trị — tính năng thực dụng, không phải bản demo, với trải nghiệm người dùng chắc chắn.',
        tags: ['LLM', 'RAG', 'AI Agents', 'Embeddings'],
      },
    ],
  },
  journey: {
    eyebrow: 'Hành trình',
    title: '18 năm, từ đầu đến cuối',
    intro: 'Mười tám năm làm nghề, và trọng tâm sắc lại qua từng chặng.',
  },
  projects: {
    eyebrow: 'Dự án tiêu biểu',
    title: 'Những thứ mình đã ship',
    items: [
      {
        name: 'Saturn Cloud Dashboard',
        body: 'Trang quản trị cho nền tảng Saturn Cloud, làm xuyên suốt frontend, backend đến hạ tầng.',
        impact: 'Vận hành công việc hằng ngày cho khách hàng của nền tảng.',
        tags: ['Full-stack', 'Dashboard', 'Cloud'],
        href: 'https://saturncloud.io/',
        image: '/proj-saturn.png',
        cta: 'Ghé thăm',
      },
      {
        name: 'MiniSiteHub',
        body: 'Dịch vụ web đóng gói: thiết kế, dựng và khởi chạy một website doanh nghiệp chuyên nghiệp chỉ trong một ngày — giá trọn gói.',
        impact: 'Nén quy trình agency thường mất sáu tuần xuống còn 24 giờ.',
        tags: ['SaaS', 'Web', 'Đóng gói'],
        href: 'https://minisitehub.com/',
        image: '/client-minisitehub.png',
        cta: 'Xem cách hoạt động',
      },
      {
        name: 'Typing Translate AI',
        body: 'Tiện ích Chrome dịch văn bản ngay khi bạn gõ, dùng Google Gemini.',
        impact: 'Ưu tiên riêng tư — chạy hoàn toàn trong trình duyệt, không thu thập dữ liệu.',
        tags: ['Chrome Extension', 'AI', 'Gemini'],
        href: 'https://chromewebstore.google.com/detail/mdbpmkfbjjmhckennjmcfjjkggejgkdn',
        image: '/proj-typing.png',
        cta: 'Thêm vào Chrome',
      },
      {
        name: 'Pomodoro',
        body: 'Đồng hồ tập trung không gây xao nhãng trên Microsoft Store.',
        impact: 'Công cụ tăng năng suất miễn phí, không rườm rà, làm cho cộng đồng.',
        tags: ['Windows App', 'Năng suất', 'Miễn phí'],
        href: 'https://apps.microsoft.com/detail/9p2hprwrn6fb',
        image: '/proj-pomodoro.png',
        cta: 'Tải ứng dụng',
      },
    ],
    more: 'Xem tất cả dự án',
    moreHref: '/vi/projects',
  },
  testimonials: {
    eyebrow: 'Họ nói gì',
    title: 'Cộng sự nói gì về mình',
    items: [
      {
        quote: 'Ken rewrote our MASSIVE Vue 2 frontend in Vue 3, while porting us away from Bulma to Nuxt. I was skeptical of this approach at first, but he did an amazing job. Our code base is so much better now than when we started this project. I highly recommend Ken for ALL frontend projects.',
        author: 'Hugo Shi',
        role: 'Founder & CTO',
        company: 'Saturn Cloud',
        href: 'https://saturncloud.io/',
      },
    ],
  },
  contact: {
    eyebrow: 'Kết nối',
    title: 'Bắt đầu từ một cuộc trò chuyện.',
    intro: 'Bạn có bài toán sản phẩm đáng giải? Kể mình nghe.',
    reassurance: 'Đang nhận dự án mới · Mình trả lời mọi yêu cầu nghiêm túc, thường trong vòng một ngày.',
  },
}

export function homeContent(lang: string): HomeContent {
  return lang.startsWith('vi') ? vi : en
}
