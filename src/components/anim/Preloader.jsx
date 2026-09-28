import { useEffect, useState } from 'react'

/*
 * Intro screen: the pillars flash up one by one, then the panels slide away
 * like stairs. Pure CSS (see "PRELOADER" in index.css), so it also plays
 * without JavaScript and never blocks the page. Hidden for reduced motion.
 */
const WORDS = [
  { text: 'Play', className: 'text-ember' },
  { text: 'Build', className: 'text-blue-light' },
  { text: 'Create', className: 'text-gold-light' },
  { text: 'Jam', className: 'text-purple-light' },
]

export default function Preloader() {
  // Once it has played, take it out of the page entirely (CSS already hides
  // it; this also frees the layers its animations were holding).
  const [done, setDone] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 3200)
    return () => clearTimeout(timer)
  }, [])
  if (done) return null

  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-stairs">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} style={{ '--i': i }} />
        ))}
      </div>
      <div className="preloader-words font-marker">
        {WORDS.map((word, i) => (
          <span key={word.text} className={`preloader-word ${word.className}`} style={{ '--i': i }}>
            {word.text}
          </span>
        ))}
        <span className="preloader-word preloader-final text-cream">Gamesmiths</span>
      </div>
    </div>
  )
}
