import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

type Props = { eyebrow: string; title: ReactNode; subtitle?: string }

export default function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <span className="eyebrow"><Heart size={12} fill="currentColor" strokeWidth={0} /> {eyebrow}</span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </motion.div>
  )
}
