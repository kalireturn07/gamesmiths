import { cn } from '../lib/cn.js'

/**
 * Cover art for game and event cards. Uses `image` if one is set (a path
 * in /public, no leading slash), otherwise draws poster-style art from an
 * icon + accent colour, so nothing depends on copyrighted key art.
 */
export default function CoverArt({ icon: Icon, accent = '#b23a2a', image, className }) {
  if (image) {
    return <img src={image} alt="" loading="lazy" decoding="async" className={cn('object-cover', className)} />
  }
  return (
    <div
      aria-hidden="true"
      className={cn('relative isolate overflow-hidden', className)}
      style={{
        background: `radial-gradient(130% 100% at 78% 12%, ${accent} 0%, color-mix(in oklab, ${accent}, #000 55%) 52%, #110e0c 100%)`,
      }}
    >
      {/* halftone */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(rgb(255_255_255/0.7)_1px,transparent_1.7px)] [background-size:7px_7px]" />
      {/* speed lines */}
      <div className="absolute inset-0 opacity-20 [background:repeating-linear-gradient(115deg,transparent_0_18px,rgb(255_255_255/0.25)_18px_20px)] [mask-image:linear-gradient(90deg,transparent,#000_60%)]" />
      {Icon && (
        <>
          <Icon className="absolute -right-[12%] -top-[8%] size-[78%] rotate-12 text-black/30" />
          <Icon className="absolute left-[9%] top-[10%] size-[30%] text-cream drop-shadow-[0_3px_0_rgb(0_0_0/0.35)]" />
        </>
      )}
    </div>
  )
}
