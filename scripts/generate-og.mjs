// Build-time Open Graph image generator.
// Renders an HTML/CSS layout with satori -> SVG, then rasterises to PNG with
// resvg. Output: public/og.png (1200x630), the standard OG/Twitter card size.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const NAME = 'Kieu Minh Canh'
const ROLE = 'Full-stack Developer'
const TAGLINE = '18+ years building web products end-to-end · Vuetify core team'
const HANDLE = '@kieuminhcanh'
const BRAND = '#42b883'

const fontRegular = readFileSync(resolve(__dirname, 'fonts/Inter-Regular.ttf'))
const fontBold = readFileSync(resolve(__dirname, 'fonts/Inter-Bold.ttf'))

// satori takes a React-like element tree (plain objects work without JSX).
const h = (type, props, ...children) => ({
  type,
  props: { ...props, children: children.length <= 1 ? children[0] : children },
})

const tree = h(
  'div',
  {
    style: {
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '80px',
      background: 'linear-gradient(135deg, #0b0e12 0%, #11202b 100%)',
      fontFamily: 'Inter',
      position: 'relative',
    },
  },
  // Top accent strip
  h('div', {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '12px',
      background: `linear-gradient(90deg, ${BRAND}, #1867c0)`,
    },
  }),
  // Eyebrow
  h(
    'div',
    {
      style: {
        display: 'flex',
        fontSize: '28px',
        fontWeight: 700,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: BRAND,
        marginBottom: '8px',
      },
    },
    ROLE,
  ),
  // Name
  h(
    'div',
    {
      style: {
        display: 'flex',
        fontSize: '92px',
        fontWeight: 700,
        color: '#ffffff',
        lineHeight: 1.05,
        marginBottom: '28px',
      },
    },
    NAME,
  ),
  // Tagline
  h(
    'div',
    {
      style: {
        display: 'flex',
        fontSize: '34px',
        fontWeight: 400,
        color: '#9aa7b3',
        maxWidth: '900px',
        lineHeight: 1.4,
      },
    },
    TAGLINE,
  ),
  // Handle pill
  h(
    'div',
    {
      style: {
        display: 'flex',
        marginTop: '44px',
        padding: '12px 28px',
        borderRadius: '999px',
        fontSize: '28px',
        fontWeight: 600,
        color: BRAND,
        background: 'rgba(66,184,131,0.16)',
        border: `1px solid ${BRAND}`,
      },
    },
    HANDLE,
  ),
)

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Inter', data: fontRegular, weight: 400, style: 'normal' },
    { name: 'Inter', data: fontBold, weight: 700, style: 'normal' },
  ],
})

const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
  .render()
  .asPng()

const outDir = resolve(root, 'public')
mkdirSync(outDir, { recursive: true })
const outFile = resolve(outDir, 'og.png')
writeFileSync(outFile, png)

console.log(`[og] wrote ${outFile} (${(png.length / 1024).toFixed(0)} KB)`)
