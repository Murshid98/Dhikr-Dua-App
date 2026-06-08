import React, { useState } from 'react'
import { useDhikr } from '../../contexts/DhikrContext'
import { MOTIVATIONAL_QUOTES } from '../../data/duas'

export default function QuoteCard() {
  const { dailyQuote } = useDhikr()
  const [quoteIndex, setQuoteIndex] = useState(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
    return dayOfYear % MOTIVATIONAL_QUOTES.length
  })

  const quote = MOTIVATIONAL_QUOTES[quoteIndex]

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length)
  }

  if (!quote) return null

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-islamic-green-dark via-islamic-green to-islamic-green-light p-5 shadow-lg">
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-islamic-gold/10" />

      <div className="relative">
        {/* Label */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
            ✨ Verse of the Day
          </span>
          <button
            onClick={nextQuote}
            className="text-white/60 hover:text-white transition-colors text-xs flex items-center gap-1"
            title="Next quote"
          >
            Next ↻
          </button>
        </div>

        {/* Arabic verse */}
        <p className="arabic-text text-2xl text-white leading-loose mb-3 arabic-glow">
          {quote.arabic}
        </p>

        {/* Divider */}
        <div className="h-px bg-white/20 mb-3" />

        {/* Translation */}
        <p className="text-white/90 text-sm leading-relaxed italic mb-2">
          "{quote.translation}"
        </p>

        {/* Reference */}
        <p className="text-islamic-gold-light text-xs font-semibold">
          — {quote.reference}
        </p>
      </div>
    </div>
  )
}
