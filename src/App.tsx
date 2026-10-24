import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUp,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Eye,
  Feather,
  Flower2,
  Gem,
  Heart,
  Image as ImageIcon,
  Infinity as InfinityIcon,
  Laugh,
  Mail,
  Moon,
  Music2,
  Pause,
  Sparkle,
  Sparkles,
  Sun,
  Sunset,
  Wine,
  X,
  type LucideIcon,
} from 'lucide-react'
import { loveContent } from './data/loveContent'
import { useRelationshipTime } from './hooks/useRelationshipTime'
import SectionHeading from './components/SectionHeading'
import Celebration from './components/Celebration'
import AstraCursor from './components/AstraCursor'
import './styles.css'

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const iconMap: Record<string, LucideIcon> = {
  eye: Eye,
  sun: Sun,
  feather: Feather,
  gem: Gem,
  laugh: Laugh,
  heart: Heart,
  infinity: InfinityIcon,
  mail: Mail,
  moon: Moon,
  sparkle: Sparkle,
  flower: Flower2,
  sunset: Sunset,
  wine: Wine,
  camera: Camera,
}

function Icon({ name, size = 20, stroke = 1.75 }: { name: string; size?: number; stroke?: number }) {
  const Component = iconMap[name] ?? Heart
  return <Component size={size} strokeWidth={stroke} aria-hidden="true" />
}

function FilledHeart({ size = 16 }: { size?: number }) {
  return <Heart size={size} fill="currentColor" strokeWidth={0} aria-hidden="true" />
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay },
  }
}

function useEscape(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active, onClose])
}

const pad = (n: number) => String(n).padStart(2, '0')
const name = loveContent.shortName
const startDate = new Date(loveContent.relationshipStartDate)
const startLabel = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

/* ------------------------------------------------------------------ */
/* Opening                                                             */
/* ------------------------------------------------------------------ */

function FloatingHearts() {
  const hearts = [
    { left: '12%', top: '18%', size: 22, delay: 0 },
    { left: '82%', top: '22%', size: 30, delay: -1.5 },
    { left: '18%', top: '74%', size: 18, delay: -3 },
    { left: '78%', top: '70%', size: 24, delay: -2 },
    { left: '50%', top: '9%', size: 14, delay: -4 },
    { left: '6%', top: '46%', size: 14, delay: -2.5 },
    { left: '92%', top: '48%', size: 16, delay: -0.8 },
  ]
  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((h, i) => (
        <span key={i} style={{ left: h.left, top: h.top, animationDelay: `${h.delay}s` }}><FilledHeart size={h.size} /></span>
      ))}
    </div>
  )
}

function Opening({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div className="opening" exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.7 }}>
      <FloatingHearts />
      <motion.div className="opening-content" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
        <span className="eyebrow"><FilledHeart size={12} /> A little something for you</span>

        <div className="envelope" aria-hidden="true">
          <svg viewBox="0 0 200 130" className="envelope-svg">
            <rect x="0" y="0" width="200" height="130" rx="12" fill="#ffc9d8" />
            <path d="M0 130 L84 64 M200 130 L116 64" stroke="#f3a6bd" strokeWidth="2" fill="none" />
            <path d="M6 4 L100 80 L194 4" fill="#ffd9e4" stroke="#f3a6bd" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <div className="envelope-seal"><FilledHeart size={20} /></div>
        </div>

        <p className="opening-for">Hey, {name}</p>
        <h1>Someone made this<br /><em>just for you.</em></h1>
        <p className="opening-copy">A tiny corner of the internet filled with love, a few smiles, and pieces of our story.</p>
        <button className="button button-primary" onClick={onOpen}>
          Open your surprise <FilledHeart size={15} />
        </button>
      </motion.div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

const navLinks = [
  { id: 'story', label: 'Our story' },
  { id: 'reasons', label: 'Little things' },
  { id: 'letters', label: 'Love notes' },
  { id: 'memories', label: 'Memories' },
]

function Nav({ active, scrolled }: { active: string; scrolled: boolean }) {
  return (
    <header className={scrolled ? 'site-nav is-scrolled' : 'site-nav'}>
      <button className="brand" onClick={() => scrollTo('home')} aria-label="Back to top">
        <span className="brand-heart"><FilledHeart size={15} /></span>
        <span className="brand-name">for {name.toLowerCase()}</span>
      </button>
      <nav aria-label="Sections">
        {navLinks.map((link) => (
          <button key={link.id} className={active === link.id ? 'nav-link is-active' : 'nav-link'} onClick={() => scrollTo(link.id)}>
            {link.label}
          </button>
        ))}
      </nav>
      <button className="nav-cta" onClick={() => scrollTo('final-letter')}>A little love <FilledHeart size={13} /></button>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="hero section-wrap" id="home">
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <span className="eyebrow"><FilledHeart size={12} /> A love note, just for you</span>
        <h1>
          {loveContent.heroTitle}
          <em>{loveContent.heroSubtitle}</em>
        </h1>
        <p className="hero-description">{loveContent.heroDescription}</p>
        <div className="hero-actions">
          <button className="button button-primary" onClick={() => scrollTo('story')}>
            See our story <ArrowRight size={16} strokeWidth={2} />
          </button>
          <button className="button button-soft" onClick={() => scrollTo('final-letter')}>Read my letter</button>
        </div>
        <div className="since-pill">
          <span className="since-heart"><FilledHeart size={14} /></span>
          <span>Officially us since <strong>{startLabel}</strong></span>
        </div>
      </motion.div>

      <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }} aria-hidden="true">
        <div className="hero-blob" />
        <span className="mini-heart mh-1"><FilledHeart size={18} /></span>
        <span className="mini-heart mh-2"><FilledHeart size={26} /></span>
        <span className="mini-heart mh-3"><FilledHeart size={14} /></span>
        <div className="hero-card">
          <div className="hero-card-photo-wrap">
            <img src={loveContent.heroPhoto} alt={`${name} & me`} className="hero-card-img" />
            <span className="hero-photo-badge"><FilledHeart size={13} /></span>
          </div>
          <div className="hero-card-content">
            <span className="hero-card-script">our little world</span>
            <div className="hero-card-foot">
              <span>you + me</span>
              <span className="hero-card-dot">•</span>
              <span>{startLabel}</span>
            </div>
          </div>
        </div>
        <div className="hero-tag tag-top">my favorite girl <FilledHeart size={12} /></div>
        <div className="hero-tag tag-bottom"><Sparkles size={14} strokeWidth={2} /> 100% my person</div>
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Counter                                                             */
/* ------------------------------------------------------------------ */

function Counter() {
  const time = useRelationshipTime(loveContent.relationshipStartDate)
  const blocks = [
    { value: time.days.toLocaleString(), label: 'days' },
    { value: pad(time.hours), label: 'hours' },
    { value: pad(time.minutes), label: 'minutes' },
    { value: pad(time.seconds), label: 'seconds' },
  ]
  return (
    <section className="counter-section" id="counter">
      <div className="counter-inner">
        <motion.div className="counter-copy" {...fadeUp()}>
          <span className="eyebrow"><FilledHeart size={12} /> Since {startLabel}</span>
          <h2>Look how far<br /><em>we have come.</em></h2>
          <p>Every second since that day is another little piece of our story.</p>
        </motion.div>
        <motion.div className="counter-card" {...fadeUp(0.1)}>
          <div className="counter-head">Time spent being us <FilledHeart size={14} /></div>
          <div className="counter-grid">
            {blocks.map((block) => (
              <div className="counter-unit" key={block.label}>
                <strong>{block.value}</strong>
                <span>{block.label}</span>
              </div>
            ))}
          </div>
          <div className="counter-foot"><span className="pulse-dot" /> and still counting, love</div>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Story                                                               */
/* ------------------------------------------------------------------ */

function Story() {
  return (
    <section className="section section-wrap" id="story">
      <SectionHeading
        eyebrow="Our story"
        title={<>Every love story has <em>a beginning.</em></>}
        subtitle="A tiny timeline of our little world. More memories to add soon."
      />
      <div className="timeline">
        {loveContent.timeline.map((item, i) => (
          <motion.article className={i % 2 ? 'timeline-item timeline-right' : 'timeline-item'} key={item.title} {...fadeUp(i * 0.08)}>
            <div className="timeline-marker">{i + 1}</div>
            <div className="timeline-card">
              <span className="timeline-label">{item.label}</span>
              <span className="timeline-date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.image ? (
                <img className="timeline-image" src={item.image} alt={item.title} />
              ) : (
                <div className="photo-placeholder timeline-image">
                  <ImageIcon size={24} strokeWidth={1.6} />
                  <small>Your photo here</small>
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
      <motion.p className="timeline-end" {...fadeUp()}>and this is only the beginning...</motion.p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Reasons                                                             */
/* ------------------------------------------------------------------ */

function Reasons() {
  const reasons = loveContent.loveReasons
  const [revealed, setRevealed] = useState<number[]>([])
  const [spotlight, setSpotlight] = useState<number | null>(null)

  const reveal = (i: number) => {
    setRevealed((old) => (old.includes(i) ? old : [...old, i]))
    setSpotlight(i)
  }
  const revealRandom = () => {
    const hidden = reasons.map((_, i) => i).filter((i) => !revealed.includes(i))
    const pool = hidden.length ? hidden : reasons.map((_, i) => i)
    reveal(pool[Math.floor(Math.random() * pool.length)])
  }

  return (
    <section className="section reasons-section" id="reasons">
      <div className="section-wrap">
        <SectionHeading
          eyebrow="The little things"
          title={<>A few reasons I <em>adore you.</em></>}
          subtitle="Tap a card to open a tiny reminder. Some things are too lovely not to say out loud."
        />
        <div className="reasons-grid">
          {reasons.map((reason, i) => {
            const open = revealed.includes(i)
            const classes = ['reason-card', reason.featured ? 'reason-featured' : '', open ? 'is-open' : ''].filter(Boolean).join(' ')
            return (
              <motion.button key={reason.title} className={classes} onClick={() => reveal(i)} aria-expanded={open} {...fadeUp(i * 0.05)}>
                {reason.featured && <span className="reason-watermark" aria-hidden="true"><Icon name={reason.icon} size={220} stroke={1} /></span>}
                <span className="reason-icon"><Icon name={reason.icon} size={reason.featured ? 24 : 20} /></span>
                {reason.featured && <span className="reason-kicker">my favorite</span>}
                <span className="reason-title">{reason.title}</span>
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.span key="text" className="reason-text" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                      {reason.text}
                    </motion.span>
                  ) : (
                    <motion.span key="hint" className="reason-hint" exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                      tap to open <FilledHeart size={11} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>

        <motion.div className="surprise-row" {...fadeUp()}>
          <div>
            <span className="surprise-title">Need a random little reminder?</span>
            <p>Let the love-note machine pick one for you.</p>
          </div>
          <button className="button button-soft" onClick={revealRandom}>
            <Sparkles size={16} strokeWidth={2} /> Surprise me
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {spotlight !== null && (
            <motion.div className="reason-toast" key={spotlight} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}>
              <span className="toast-icon"><Icon name={reasons[spotlight].icon} size={20} /></span>
              <div>
                <strong>{reasons[spotlight].title}</strong>
                <p>{reasons[spotlight].text}</p>
              </div>
              <button aria-label="Close message" onClick={() => setSpotlight(null)}><X size={16} strokeWidth={2} /></button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Letters                                                             */
/* ------------------------------------------------------------------ */

function Letters() {
  const [selected, setSelected] = useState<number | null>(null)
  const close = () => setSelected(null)
  useEscape(selected !== null, close)
  const letter = selected !== null ? loveContent.letters[selected] : null

  return (
    <section className="section section-wrap letters-section" id="letters">
      <SectionHeading
        eyebrow="Love notes"
        title={<>Little letters, <em>just for you.</em></>}
        subtitle="Open one whenever you need a hug, a smile, or a reminder that someone is thinking of you."
      />
      <div className="letters-grid">
        {loveContent.letters.map((item, i) => (
          <motion.button key={item.title} className={`letter-card letter-${i + 1}`} onClick={() => setSelected(i)} {...fadeUp(i * 0.07)}>
            <span className="letter-icon"><Icon name={item.icon} /></span>
            <span className="letter-no">Note {pad(i + 1)}</span>
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
            <span className="letter-open">Open this letter <ArrowRight size={14} strokeWidth={2} /></span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {letter && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}>
            <motion.div
              className="letter-modal"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="letter-title"
            >
              <button className="modal-close" aria-label="Close letter" onClick={close}><X size={18} strokeWidth={2} /></button>
              <span className="modal-icon"><Icon name={letter.icon} size={24} /></span>
              <span className="eyebrow"><FilledHeart size={12} /> A little note for you</span>
              <h3 id="letter-title">{letter.title}</h3>
              <p className="letter-message">{letter.message}</p>
              <span className="signoff">always yours</span>
              <button className="button button-primary" onClick={close}>Keep this close <FilledHeart size={15} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Quiz                                                                */
/* ------------------------------------------------------------------ */

function Quiz() {
  const quiz = loveContent.quiz
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [finished, setFinished] = useState(false)
  const [celebrate, setCelebrate] = useState(false)

  const current = quiz[questionIndex]
  const score = answers.reduce((total, answer, i) => total + (answer === quiz[i].answer ? 1 : 0), 0)

  const answer = (choice: number) => {
    setAnswers((old) => [...old.slice(0, questionIndex), choice])
    if (questionIndex < quiz.length - 1) setQuestionIndex((i) => i + 1)
    else {
      setFinished(true)
      setCelebrate(true)
      window.setTimeout(() => setCelebrate(false), 3000)
    }
  }
  const reset = () => { setQuestionIndex(0); setAnswers([]); setFinished(false) }

  return (
    <section className="quiz-section" id="quiz">
      <Celebration active={celebrate} />
      <div className="quiz-inner">
        <motion.div className="quiz-intro" {...fadeUp()}>
          <span className="eyebrow"><FilledHeart size={12} /> A very important quiz</span>
          <h2>How well do you know<br /><em>our little world?</em></h2>
          <p>No pressure, pretty girl. This quiz is 100% for fun and 200% full of love.</p>
        </motion.div>

        <motion.div className="quiz-card" {...fadeUp(0.1)}>
          {!finished ? (
            <>
              <div className="quiz-progress">
                <span>Question {questionIndex + 1} of {quiz.length}</span>
                <div className="progress-dots">
                  {quiz.map((_, i) => <span key={i} className={i <= questionIndex ? 'dot is-filled' : 'dot'} />)}
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={questionIndex} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.3 }}>
                  <h3>{current.question}</h3>
                  <div className="quiz-options">
                    {current.options.map((option, i) => (
                      <button key={option} onClick={() => answer(i)}>
                        <span className="option-key">{String.fromCharCode(65 + i)}</span>
                        <span>{option}</span>
                        <ArrowRight className="option-arrow" size={16} strokeWidth={2} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <motion.div className="quiz-result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="result-heart"><FilledHeart size={44} /></div>
              <span className="result-score">{score} / {quiz.length}</span>
              <h3>{score === quiz.length ? 'Look at you, love!' : 'And the winner is... us.'}</h3>
              <p>Honestly, the best part is that we get to keep making this story together.</p>
              <button className="button button-primary" onClick={reset}>Play again <FilledHeart size={15} /></button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

function Gallery() {
  const gallery = loveContent.gallery
  const [selected, setSelected] = useState<number | null>(null)
  const close = () => setSelected(null)
  useEscape(selected !== null, close)

  return (
    <section className="section gallery-section" id="memories">
      <div className="section-wrap">
        <SectionHeading
          eyebrow="Our memories"
          title={<>Our tiny <em>memory lane.</em></>}
          subtitle="A place for the photos that make us say, remember this?"
        />
        <div className="gallery-grid">
          {gallery.map((item, i) => (
            <motion.button className={`polaroid polaroid-${(i % 12) + 1}`} key={item.title} onClick={() => setSelected(i)} {...fadeUp(i * 0.05)}>
              <div className="polaroid-photo">
                {item.image ? (
                  <img src={item.image} alt={item.title} loading="lazy" />
                ) : (
                  <div className="photo-placeholder">
                    <Camera size={24} strokeWidth={1.6} />
                    <small>Your photo here</small>
                  </div>
                )}
              </div>
              <span className="polaroid-title">{item.title}</span>
              <span className="polaroid-caption">{item.caption}</span>
            </motion.button>
          ))}
        </div>
        <motion.p className="gallery-note" {...fadeUp()}><FilledHeart size={14} /> Real moments over perfect moments. Keep the blurry, silly, beautiful ones too.</motion.p>

        <AnimatePresence>
          {selected !== null && (
            <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}>
              <motion.div className="photo-modal" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.97, opacity: 0 }} role="dialog" aria-modal="true">
                <button className="modal-close" aria-label="Close photo" onClick={close}><X size={18} strokeWidth={2} /></button>
                <div className="photo-stage">
                  {gallery[selected].image ? (
                    <img src={gallery[selected].image} alt={gallery[selected].title} />
                  ) : (
                    <div className="photo-placeholder">
                      <Camera size={30} strokeWidth={1.5} />
                      <small>Your photo here</small>
                    </div>
                  )}
                  <button className="photo-nav photo-prev" aria-label="Previous photo" onClick={() => setSelected((selected + gallery.length - 1) % gallery.length)}>
                    <ChevronLeft size={20} strokeWidth={2} />
                  </button>
                  <button className="photo-nav photo-next" aria-label="Next photo" onClick={() => setSelected((selected + 1) % gallery.length)}>
                    <ChevronRight size={20} strokeWidth={2} />
                  </button>
                </div>
                <h3>{gallery[selected].title}</h3>
                <p>{gallery[selected].caption}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Future plans                                                        */
/* ------------------------------------------------------------------ */

function FuturePlans() {
  return (
    <section className="section future-section">
      <div className="section-wrap">
        <SectionHeading
          eyebrow="Someday soon"
          title={<>So many little things <em>left to do.</em></>}
          subtitle="A tiny wishlist for all the memories we have not made yet."
        />
        <div className="future-grid">
          {loveContent.futurePlans.map((plan, i) => (
            <motion.div className="future-card" key={plan.title} {...fadeUp(i * 0.1)}>
              <span className="future-icon"><Icon name={plan.icon} size={24} /></span>
              <h3>{plan.title}</h3>
              <p>{plan.description}</p>
              <span className="future-foot">one day, together <FilledHeart size={12} /></span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Final letter                                                        */
/* ------------------------------------------------------------------ */

function FinalLetter() {
  const [opened, setOpened] = useState(false)
  const [celebrate, setCelebrate] = useState(false)
  const [copied, setCopied] = useState(false)

  const open = () => {
    setOpened(true)
    setCelebrate(true)
    window.setTimeout(() => setCelebrate(false), 3000)
  }
  const copy = () => {
    void navigator.clipboard?.writeText(loveContent.finalLetter)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="final-section" id="final-letter">
      <Celebration active={celebrate} />
      <div className="final-inner">
        <motion.div {...fadeUp()}>
          <span className="eyebrow eyebrow-light"><FilledHeart size={12} /> The last little thing</span>
          <div className="final-heart"><FilledHeart size={40} /></div>
          <h2>One last thing,<br /><em>my {name}.</em></h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div key="closed" exit={{ opacity: 0, y: -8 }}>
              <p className="final-intro">There is something I want you to remember, on the big days and the ordinary ones.</p>
              <button className="button button-white" onClick={open}>Read my letter <Mail size={16} strokeWidth={2} /></button>
            </motion.div>
          ) : (
            <motion.div key="open" className="final-letter-paper" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="letter-dear">Dear {name},</span>
              {loveContent.finalLetter.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <span className="final-signature">always yours</span>
              <button className="button button-soft" onClick={copy}>
                {copied ? <Check size={15} strokeWidth={2} /> : <Copy size={15} strokeWidth={2} />}
                {copied ? 'Copied with love' : 'Keep this letter'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="final-footer-note">To my favorite person. Always.</div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  const [showSecret, setShowSecret] = useState(false)
  return (
    <footer className="site-footer">
      <button className="footer-heart" onClick={() => setShowSecret((v) => !v)} aria-label="Reveal a secret message"><FilledHeart size={18} /></button>
      <p>made with love for <strong>{name}</strong></p>
      <span className="footer-est">our little corner of the internet, since {startLabel}</span>
      <AnimatePresence>
        {showSecret && (
          <motion.div className="footer-secret" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {loveContent.secretMessage}
          </motion.div>
        )}
      </AnimatePresence>
      <button className="back-top" onClick={() => scrollTo('home')}><ArrowUp size={15} strokeWidth={2} /> back to the top</button>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  const [entered, setEntered] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const [musicNotice, setMusicNotice] = useState(false)
  const [musicMessage, setMusicMessage] = useState('')
  const audioRef = useRef<HTMLAudioElement>(null)
  const noticeTimer = useRef<number>()

  useEffect(() => {
    document.body.style.overflow = entered ? '' : 'hidden'
  }, [entered])

  useEffect(() => {
    const ids = navLinks.map((l) => l.id)
    const update = () => {
      setScrolled(window.scrollY > 20)
      const current = ids
        .map((id) => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top ?? 9999 }))
        .filter((x) => x.top < window.innerHeight * 0.45)
        .sort((a, b) => b.top - a.top)[0]
      setActive(current?.id ?? '')
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (musicOn) {
      audio.pause()
      setMusicOn(false)
      setMusicMessage('Music paused.')
    } else {
      try {
        await audio.play()
        setMusicOn(true)
        setMusicMessage('Now playing: Sixpence None The Richer - Kiss Me')
      } catch {
        setMusicMessage('Tap again to play our song.')
      }
    }
    setMusicNotice(true)
    window.clearTimeout(noticeTimer.current)
    noticeTimer.current = window.setTimeout(() => setMusicNotice(false), 3800)
  }

  return (
    <>
      <AstraCursor />
      <audio ref={audioRef} src="/music/our-song.mp3" loop preload="none" />
      <AnimatePresence>
        {!entered && <Opening onOpen={() => { setEntered(true); window.setTimeout(() => scrollTo('home'), 80) }} />}
      </AnimatePresence>

      <main className={entered ? 'site is-entered' : 'site'}>
        <Nav active={active} scrolled={scrolled} />
        <Hero />
        <Counter />
        <Story />
        <Reasons />
        <Letters />
        <Quiz />
        <Gallery />
        <FuturePlans />
        <FinalLetter />
        <Footer />
      </main>

      <div className="music-control-wrap">
        <button className="music-control" onClick={toggleMusic} aria-label={musicOn ? 'Pause music' : 'Play music'}>
          <span className="music-icon">{musicOn ? <Pause size={15} strokeWidth={2} /> : <Music2 size={15} strokeWidth={2} />}</span>
          <span className="music-label">{musicOn ? 'Music on' : 'Our song'}</span>
          <span className={musicOn ? 'music-bars is-playing' : 'music-bars'}><i /><i /><i /><i /></span>
        </button>
        <AnimatePresence>
          {musicNotice && (
            <motion.div className="music-tip" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {musicMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
