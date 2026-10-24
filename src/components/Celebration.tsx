import { Heart } from 'lucide-react'

const palette = ['#ff8fb1', '#e8577f', '#ffc2d4', '#ffffff']

/** Soft falling hearts, used for small celebratory moments. */
export default function Celebration({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <div className="celebration" aria-hidden="true">
      {Array.from({ length: 30 }, (_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 37 + 7) % 100}%`,
            color: palette[i % palette.length],
            animationDelay: `${(i % 9) * 0.12}s`,
            animationDuration: `${2.4 + (i % 5) * 0.25}s`,
          }}
        >
          <Heart size={12 + (i % 4) * 5} fill="currentColor" strokeWidth={0} />
        </span>
      ))}
    </div>
  )
}
