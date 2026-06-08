import React, { useState } from 'react'
import { useDhikr } from '../../contexts/DhikrContext'
import { CATEGORY_COLORS } from '../../data/duas'

export default function TaskCard({ dua }) {
  const { checkedIds, toggleTask, viewMode, showTransliteration } = useDhikr()
  const [expanded, setExpanded] = useState(false)
  const isChecked = checkedIds.includes(dua.id)

  const handleToggle = (e) => {
    e.stopPropagation()
    toggleTask(dua.id)
  }

  const categoryGradient = CATEGORY_COLORS[dua.category] || 'from-gray-400 to-gray-500'

  return (
    <div
      className={`task-card animate-slide-up ${isChecked ? 'completed' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-3">
        {/* Category color dot + icon */}
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryGradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
          <span className="text-lg">{dua.icon}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Malayalam title */}
          {(viewMode === 'both' || viewMode === 'malayalam') && (
            <p className={`text-sm font-semibold malayalam-text leading-snug mb-1 ${
              isChecked
                ? 'text-islamic-green dark:text-islamic-green-light line-through opacity-70'
                : 'text-gray-800 dark:text-gray-100'
            }`}>
              {dua.malayalam}
            </p>
          )}

          {/* Arabic dua */}
          {(viewMode === 'both' || viewMode === 'arabic') && (
            <p className={`arabic-text text-lg leading-loose ${
              isChecked
                ? 'text-islamic-gold arabic-glow opacity-80'
                : 'text-gray-700 dark:text-gray-200'
            }`}>
              {dua.arabic}
            </p>
          )}

          {/* Transliteration (expandable) */}
          {expanded && showTransliteration && (
            <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-1 animate-fade-in">
              {dua.transliteration}
            </p>
          )}

          {/* Translation (expandable) */}
          {expanded && (
            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 animate-fade-in">
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                📖 {dua.translation}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`badge ${
                  dua.category === 'morning' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
                  dua.category === 'night' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' :
                  dua.category === 'meals' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' :
                  dua.category === 'travel' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' :
                  'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                }`}>
                  {dua.time}
                </span>
              </div>
            </div>
          )}

          {/* Expand hint */}
          {!expanded && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Tap to see translation ↓
            </p>
          )}
        </div>

        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={`checkbox-custom mt-1 ${isChecked ? 'checked' : ''}`}
          aria-label={isChecked ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {isChecked && (
            <svg className="w-3.5 h-3.5 text-white animate-check-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
