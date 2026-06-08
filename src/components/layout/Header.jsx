import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useDhikr } from '../../contexts/DhikrContext'

export default function Header() {
  const { user, logout } = useAuth()
  const { darkMode, toggleDarkMode, viewMode, cycleViewMode, streak } = useDhikr()
  const [showMenu, setShowMenu] = useState(false)

  const viewLabels = {
    both: '🌐 Both',
    arabic: '🕌 Arabic',
    malayalam: '📖 Malayalam',
  }

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'صباح الخير'
    if (h < 17) return 'مرحباً'
    return 'مساء الخير'
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-islamic-green to-islamic-green-light flex items-center justify-center shadow-sm">
            <span className="text-lg">☪️</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
              ദൈനംദിന ദിക്ർ
            </h1>
            <p className="text-xs text-islamic-green dark:text-islamic-green-light font-arabic">
              {greeting()}
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          {/* Streak badge */}
          {streak > 0 && (
            <div className="hidden sm:flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-full px-2.5 py-1">
              <span className="text-sm">🔥</span>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400">{streak}</span>
            </div>
          )}

          {/* View mode toggle */}
          <button
            onClick={cycleViewMode}
            title="Toggle view mode"
            className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            {viewLabels[viewMode]}
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            title="Toggle dark mode"
            className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-9 h-9 rounded-xl bg-islamic-green flex items-center justify-center text-white font-bold text-sm hover:bg-islamic-green-dark transition-all shadow-sm"
            >
              {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-11 z-50 w-56 card p-2 shadow-xl animate-slide-up">
                  <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700 mb-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {user?.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={() => { logout(); setShowMenu(false) }}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <span>🚪</span> Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
