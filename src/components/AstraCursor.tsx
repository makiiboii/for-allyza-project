import { useEffect, useRef } from 'react'

export default function AstraCursor() {
  const headRef = useRef<HTMLDivElement>(null)
  const isHoveringRef = useRef(false)
  const isClickingRef = useRef(false)
  const trailContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Disable completely on touchscreens / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (!headRef.current) return

    let mouseX = -100
    let mouseY = -100
    let rafId: number
    let lastTrailTime = 0
    let isVisible = false

    const symbols = ['♥', '♡', '✦', '✧']
    const colors = ['#ff8fb1', '#e8577f', '#ffb8cc', '#ffffff', '#ffd0de']

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible && headRef.current) {
        isVisible = true
        headRef.current.style.opacity = '1'
        document.body.classList.add('custom-cursor-active')
      }

      // Check hover on clickable
      const target = e.target as HTMLElement | null
      const clickable = target?.closest('button, a, input, [role="button"]')
      isHoveringRef.current = !!clickable

      // Spawn trail particle directly without React state churn
      const now = performance.now()
      if (now - lastTrailTime > 65 && trailContainerRef.current) {
        lastTrailTime = now
        const p = document.createElement('span')
        p.className = 'astra-trail-particle'
        p.textContent = symbols[Math.floor(Math.random() * symbols.length)]
        p.style.left = `${mouseX + (Math.random() * 12 - 6)}px`
        p.style.top = `${mouseY + 12 + Math.random() * 6}px`
        p.style.color = colors[Math.floor(Math.random() * colors.length)]
        p.style.fontSize = `${Math.floor(Math.random() * 6) + 11}px`
        trailContainerRef.current.appendChild(p)

        setTimeout(() => {
          p.remove()
        }, 650)
      }
    }

    // Direct GPU-accelerated translate3d with 0ms input latency
    const updatePosition = () => {
      if (headRef.current && isVisible) {
        const scale = isClickingRef.current ? 0.85 : isHoveringRef.current ? 1.2 : 1
        const rotate = isHoveringRef.current ? 8 : 0
        headRef.current.style.transform = `translate3d(${mouseX - 18}px, ${mouseY - 18}px, 0) scale(${scale}) rotate(${rotate}deg)`
      }
      rafId = requestAnimationFrame(updatePosition)
    }

    const onMouseDown = (e: MouseEvent) => {
      isClickingRef.current = true
      if (trailContainerRef.current) {
        for (let i = 0; i < 5; i++) {
          const p = document.createElement('span')
          p.className = 'astra-trail-particle burst'
          p.textContent = '♥'
          p.style.left = `${e.clientX + (Math.random() * 20 - 10)}px`
          p.style.top = `${e.clientY + (Math.random() * 20 - 10)}px`
          p.style.color = colors[Math.floor(Math.random() * colors.length)]
          p.style.fontSize = `${Math.floor(Math.random() * 6) + 12}px`
          trailContainerRef.current.appendChild(p)
          setTimeout(() => p.remove(), 600)
        }
      }
    }

    const onMouseUp = () => {
      isClickingRef.current = false
    }

    const onMouseLeave = () => {
      isVisible = false
      if (headRef.current) headRef.current.style.opacity = '0'
      document.body.classList.remove('custom-cursor-active')
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    rafId = requestAnimationFrame(updatePosition)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafId)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  return (
    <div className="astra-cursor-container" aria-hidden="true">
      <div ref={trailContainerRef} className="astra-trail-container" />
      <div
        ref={headRef}
        className="astra-cursor-head"
        style={{ opacity: 0, willChange: 'transform' }}
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
      </div>
    </div>
  )
}
