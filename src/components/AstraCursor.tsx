import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TrailParticle {
  id: number
  x: number
  y: number
  size: number
  symbol: string
  color: string
}

const symbols = ['♥', '♡', '✦', '✧']
const colors = ['#ff8fb1', '#e8577f', '#ffb8cc', '#ffffff', '#ffd0de']

export default function AstraCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState<TrailParticle[]>([])
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) return

    let counter = 0
    let lastTime = 0

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      const now = performance.now()
      if (now - lastTime > 65) {
        lastTime = now
        const newParticle: TrailParticle = {
          id: counter++,
          x: e.clientX + (Math.random() * 14 - 7),
          y: e.clientY + 12 + Math.random() * 6,
          size: Math.floor(Math.random() * 6) + 11,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        }
        setTrail((prev) => [...prev.slice(-18), newParticle])
      }

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null
      const clickable = target?.closest('button, a, input, [role="button"]')
      setIsHovering(!!clickable)
    }

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true)
      // Burst of particles on click
      const burst: TrailParticle[] = Array.from({ length: 7 }, () => ({
        id: counter++,
        x: e.clientX + (Math.random() * 24 - 12),
        y: e.clientY + (Math.random() * 24 - 12),
        size: Math.floor(Math.random() * 8) + 12,
        symbol: '♥',
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
      setTrail((prev) => [...prev.slice(-14), ...burst])
    }

    const onMouseUp = () => setIsClicking(false)
    const onMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)

    // Clean up old trail particles
    const cleanupInterval = setInterval(() => {
      setTrail((prev) => (prev.length > 0 ? prev.slice(1) : prev))
    }, 120)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      clearInterval(cleanupInterval)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="astra-cursor-container" aria-hidden="true">
      {/* Floating Sparkle & Heart Trail */}
      <AnimatePresence>
        {trail.map((p) => (
          <motion.span
            key={p.id}
            className="astra-trail-particle"
            initial={{ opacity: 0.9, scale: 1, y: 0 }}
            animate={{ opacity: 0, scale: 0.3, y: 16 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{
              left: p.x,
              top: p.y,
              fontSize: `${p.size}px`,
              color: p.color,
            }}
          >
            {p.symbol}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Astra (White Shih Tzu) Cursor */}
      <motion.div
        className="astra-cursor-head"
        animate={{
          x: pos.x - 18,
          y: pos.y - 18,
          scale: isClicking ? 0.85 : isHovering ? 1.25 : 1,
          rotate: isHovering ? 8 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 420,
          mass: 0.25,
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          {/* Subtle glow */}
          <circle cx="18" cy="18" r="16" fill="rgba(255, 230, 240, 0.45)" />

          {/* Floppy Shih Tzu Ears */}
          <ellipse
            cx="7"
            cy="19"
            rx="5.5"
            ry="8.5"
            fill="#ffffff"
            stroke="#f0d5de"
            strokeWidth="1"
            transform="rotate(14 7 19)"
          />
          <ellipse
            cx="29"
            cy="19"
            rx="5.5"
            ry="8.5"
            fill="#ffffff"
            stroke="#f0d5de"
            strokeWidth="1"
            transform="rotate(-14 29 19)"
          />

          {/* Fluffy Head Base */}
          <circle cx="18" cy="18" r="12" fill="#ffffff" stroke="#f0d5de" strokeWidth="1" />

          {/* Cute Pink Bow / Clip */}
          <ellipse cx="18" cy="7" rx="3.5" ry="2" fill="#ff7096" />
          <circle cx="18" cy="7" r="1.2" fill="#ffffff" />

          {/* Fluffy Muzzle */}
          <ellipse cx="18" cy="21.5" rx="6" ry="4.2" fill="#ffffff" />

          {/* Big Sparkly Black Eyes */}
          <circle cx="13" cy="16" r="2.5" fill="#24151a" />
          <circle cx="12.2" cy="15.2" r="0.9" fill="#ffffff" />
          <circle cx="23" cy="16" r="2.5" fill="#24151a" />
          <circle cx="22.2" cy="15.2" r="0.9" fill="#ffffff" />

          {/* Rosy Cheeks */}
          <ellipse cx="9.5" cy="20.5" rx="2.5" ry="1.5" fill="#ffaec5" opacity="0.75" />
          <ellipse cx="26.5" cy="20.5" rx="2.5" ry="1.5" fill="#ffaec5" opacity="0.75" />

          {/* Button Nose */}
          <path d="M16.5 19.8 Q18 19 19.5 19.8 Q18 21.4 16.5 19.8 Z" fill="#24151a" />

          {/* Cheerful Mouth & Tongue */}
          <path
            d="M16.8 21.6 Q18 22.4 19.2 21.6"
            stroke="#24151a"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M17.2 22.2 Q18 24.2 18.8 22.2 Z" fill="#ff5c8a" />
        </svg>

        {/* Tiny Floating "Astra" Label on hover */}
        {isHovering && (
          <span className="astra-cursor-badge">astra ♡</span>
        )}
      </motion.div>
    </div>
  )
}
