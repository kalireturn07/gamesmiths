/*
 * Generates the paper/wall texture tiles in src/assets/textures/ as small PNGs.
 * Seeded, so re-running produces identical files. No dependencies:
 *   node scripts/generate-textures.mjs
 *
 * (Pre-made bitmaps are much cheaper for browsers to paint than live SVG
 * noise filters, which is what the site used before.)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import zlib from 'node:zlib'

const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/assets/textures')

// ---------- tiny PNG encoder (RGBA, 8-bit) ----------
const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})
function crc32(buf) {
  let c = 0xffffffff
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}
function encodePng(width, height, rgba) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // RGBA
  // "Sub" filter on every row: constant colour channels become zeros and compress away.
  const stride = width * 4
  const raw = Buffer.alloc((stride + 1) * height)
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 1
    for (let x = 0; x < stride; x++) {
      const cur = rgba[y * stride + x]
      const left = x >= 4 ? rgba[y * stride + x - 4] : 0
      raw[y * (stride + 1) + 1 + x] = (cur - left) & 0xff
    }
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// ---------- seeded noise ----------
function rng(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Tileable fractal value noise in 0..1, `cells` lattice cells across the base octave. */
function fbm(size, cells, octaves, seed) {
  const r = rng(seed)
  const layers = []
  for (let o = 0; o < octaves; o++) {
    const n = cells * 2 ** o
    layers.push({ n, grid: Float32Array.from({ length: n * n }, () => r()), amp: 0.5 ** o })
  }
  const smooth = (t) => t * t * (3 - 2 * t)
  const out = new Float32Array(size * size)
  const total = layers.reduce((s, l) => s + l.amp, 0)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let v = 0
      for (const { n, grid, amp } of layers) {
        const fx = (x / size) * n
        const fy = (y / size) * n
        const x0 = Math.floor(fx) % n
        const y0 = Math.floor(fy) % n
        const x1 = (x0 + 1) % n
        const y1 = (y0 + 1) % n
        const tx = smooth(fx - Math.floor(fx))
        const ty = smooth(fy - Math.floor(fy))
        const a = grid[y0 * n + x0] + (grid[y0 * n + x1] - grid[y0 * n + x0]) * tx
        const b = grid[y1 * n + x0] + (grid[y1 * n + x1] - grid[y1 * n + x0]) * tx
        v += (a + (b - a) * ty) * amp
      }
      out[y * size + x] = v / total
    }
  }
  return out
}

/** Fine grain: roughly normal per-pixel noise around 0.5. */
function grain(size, seed) {
  const r = rng(seed)
  return Float32Array.from({ length: size * size }, () => (r() + r() + r()) / 3)
}

/** Colour + alpha = clamp(gain * noise + offset) * opacity, quantised so it compresses. */
function texture(name, size, noise, [red, green, blue], gain, offset, opacity, levels = 24) {
  const rgba = Buffer.alloc(size * size * 4)
  for (let i = 0; i < size * size; i++) {
    const a = Math.min(1, Math.max(0, gain * noise[i] + offset)) * opacity
    rgba[i * 4] = red
    rgba[i * 4 + 1] = green
    rgba[i * 4 + 2] = blue
    rgba[i * 4 + 3] = Math.round((Math.round(a * levels) / levels) * 255)
  }
  const png = encodePng(size, size, rgba)
  fs.writeFileSync(path.join(outDir, name), png)
  console.log(`${name.padEnd(20)} ${size}×${size}  ${(png.length / 1024).toFixed(1)} kB`)
}

// Same colours and strengths as the original SVG noise filters.
texture('paper-grain.png', 128, grain(128, 1), [56, 41, 28], 2.4, -1.28, 0.5)
texture('wall-grain.png', 128, grain(128, 2), [242, 230, 214], 2.4, -1.3, 0.32)
texture('paper-stains.png', 192, fbm(192, 4, 4, 7), [128, 92, 51], 1.5, -0.62, 0.45, 32)
texture('wall-stains.png', 192, fbm(192, 4, 4, 12), [140, 56, 36], 1.4, -0.62, 0.35, 32)
