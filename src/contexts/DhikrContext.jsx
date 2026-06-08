import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { DUAS, MOTIVATIONAL_QUOTES } from '../data/duas'
import { useAuth } from './AuthContext'

const DhikrContext = createContext(null)

export function useDhikr() {
  const ctx = useContext(DhikrContext)
  if (!ctx) throw new Error('useDhikr must be used within DhikrProvider')
  return ctx
}

const getTodayKey = () => new Date().toISOString().split('T')[0] // "YYYY-MM-DD"

const getStorageKey = (uid) => `dhikr_${uid || 'guest'}`

function loadState(uid) {
  try {
    const key = getStorageKey(uid)
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveState(uid, data) {
  try {
    localStorage.setItem(getStorageKey(uid), JSON.stringify(data))
  } catch {}
}

export function DhikrProvider({ children }) {
  const { user } = useAuth()
  const uid = user?.uid || null

  const [checkedIds, setCheckedIds] = useState([])
  const [streak, setStreak] = useState(0)
  const [lastCompletedDate, setLastCompletedDate] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [viewMode, setViewMode] = useState('both') // 'both' | 'arabic' | 'malayalam'
  const [showTransliteration, setShowTransliteration] = useState(false)
  const [dailyQuote, setDailyQuote] = useState(null)
  const [celebrateAll, setCelebrateAll] = useState(false)

  // Load persisted state on mount / user change
  useEffect(() => {
    const today = getTodayKey()
    const saved = loadState(uid)

    if (saved) {
      // Reset if it's a new day
      if (saved.date !== today) {
        // Check streak: if yesterday was completed, increment
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayKey = yesterday.toISOString().split('T')[0]

        let newStreak = saved.streak || 0
        if (saved.lastCompletedDate === yesterdayKey && saved.allCompleted) {
          newStreak = newStreak + 1
        } else if (saved.lastCompletedDate !== yesterdayKey) {
          newStreak = 0
        }

        setCheckedIds([])
        setStreak(newStreak)
        setLastCompletedDate(saved.lastCompletedDate || null)
      } else {
        setCheckedIds(saved.checkedIds || [])
        setStreak(saved.streak || 0)
        setLastCompletedDate(saved.lastCompletedDate || null)
      }
    }

    // Dark mode preference
    const savedDark = localStorage.getItem('dhikr_darkmode')
    if (savedDark === 'true') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }

    // View mode preference
    const savedView = localStorage.getItem('dhikr_viewmode')
    if (savedView) setViewMode(savedView)

    // Daily quote (rotate by day of year)
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
    setDailyQuote(MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length])
  }, [uid])

  // Persist state whenever checkedIds changes
  useEffect(() => {
    const today = getTodayKey()
    const allCompleted = checkedIds.length === DUAS.length

    const newLastCompleted = allCompleted ? today : lastCompletedDate

    saveState(uid, {
      date: today,
      checkedIds,
      streak,
      lastCompletedDate: newLastCompleted,
      allCompleted,
    })

    if (allCompleted && checkedIds.length > 0) {
      setLastCompletedDate(today)
    }
  }, [checkedIds, uid, streak])

  // Dark mode toggle
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('dhikr_darkmode', String(next))
      return next
    })
  }, [])

  // View mode toggle
  const cycleViewMode = useCallback(() => {
    setViewMode((prev) => {
      const modes = ['both', 'arabic', 'malayalam']
      const next = modes[(modes.indexOf(prev) + 1) % modes.length]
      localStorage.setItem('dhikr_viewmode', next)
      return next
    })
  }, [])

  const toggleTask = useCallback((id) => {
    setCheckedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id)
      }
      const next = [...prev, id]
      // Trigger celebration if all done
      if (next.length === DUAS.length) {
        setCelebrateAll(true)
        setTimeout(() => setCelebrateAll(false), 2000)
      }
      return next
    })
  }, [])

  const markAllComplete = useCallback(() => {
    setCheckedIds(DUAS.map((d) => d.id))
    setCelebrateAll(true)
    setTimeout(() => setCelebrateAll(false), 2000)
  }, [])

  const resetAll = useCallback(() => {
    setCheckedIds([])
  }, [])

  const completedCount = checkedIds.length
  const totalCount = DUAS.length
  const progressPercent = Math.round((completedCount / totalCount) * 100)
  const allCompleted = completedCount === totalCount

  const value = {
    duas: DUAS,
    checkedIds,
    toggleTask,
    markAllComplete,
    resetAll,
    completedCount,
    totalCount,
    progressPercent,
    allCompleted,
    streak,
    lastCompletedDate,
    darkMode,
    toggleDarkMode,
    viewMode,
    cycleViewMode,
    showTransliteration,
    setShowTransliteration,
    dailyQuote,
    celebrateAll,
  }

  return (
    <DhikrContext.Provider value={value}>
      {children}
    </DhikrContext.Provider>
  )
}
