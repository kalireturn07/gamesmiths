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
