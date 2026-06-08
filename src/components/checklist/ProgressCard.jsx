import React from 'react'
import { useDhikr } from '../../contexts/DhikrContext'
import { useAuth } from '../../contexts/AuthContext'

export default function ProgressCard() {
  const {
    completedCount,
    totalCount,
    progressPercent,
    allCompleted,
    streak,
    markAllComplete,
    resetAll,
    celebrateAll,
  } = useDhikr()
  const { user } = useAuth()

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const getProgressMessage = () => {
    if (allCompleted) return '🎉 Alhamdulillah! All duas completed!'
    if (progressPercent >= 75) return '💪 Almost there! Keep going!'
    if (progressPercent >= 50) return '✨ Halfway through! Masha\'Allah!'
    if (progressPercent >= 25) return '🌱 Good start! Continue...'
    return '🌅 Begin your daily duas'
  }

  return (
    <div className={`card p-5 ${celebrateAll ? 'celebrate' : ''}`}>
      {/* Date + Greeting */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{today}</p>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
            {user?.displayName ? `السلام عليكم، ${user.displayName.split(' ')[0]}` : 'السلام عليكم'}
          </h2>
        </div>
        {streak > 0 && (
          <div className="flex flex-col items-center bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-2xl px-3 py-2">
            <span className="text-2xl">🔥</span>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400">{streak} day{streak !== 1 ? 's' : ''}</span>
            <span className="text-xs text-amber-600 dark:text-amber-500">streak</span>
          </div>
        )}
      </div>

      {/* Progress count */}
      <div className="flex items-end justify-between mb-2">
        <div>
          <span className="text-3xl font-bold text-islamic-green dark:text-islamic-green-light">
            {completedCount}
          </span>
          <span className="text-lg text-gray-400 dark:text-gray-500">/{totalCount}</span>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">duas completed</p>
        </div>
        <span className="text-2xl font-bold text-gray-300 dark:text-gray-600">
          {progressPercent}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="progress-bar mb-3">
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Status message */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-medium">
        {getProgressMessage()}
      </p>

      {/* Action buttons */}
      <div className="flex gap-2">
        {!allCompleted && (
          <button
            onClick={markAllComplete}
            className="flex-1 btn-primary text-sm py-2.5 flex items-center justify-center gap-2"
          >
            <span>✅</span>
            Mark All Done
          </button>
        )}
        {completedCount > 0 && (
          <button
            onClick={resetAll}
            className={`${allCompleted ? 'flex-1' : ''} btn-ghost text-sm py-2.5 flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600`}
          >
            <span>🔄</span>
            {allCompleted ? 'Reset for Today' : 'Reset'}
          </button>
        )}
      </div>

      {/* All completed celebration */}
      {allCompleted && (
        <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 text-center animate-fade-in">
          <p className="text-green-700 dark:text-green-300 font-semibold text-sm">
            بارك الله فيك
          </p>
          <p className="text-green-600 dark:text-green-400 text-xs mt-0.5">
            May Allah bless you for your remembrance today!
          </p>
        </div>
      )}
    </div>
  )
}
