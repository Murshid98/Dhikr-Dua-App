import React from 'react'
import { useDhikr } from '../contexts/DhikrContext'
import Header from '../components/layout/Header'
import ProgressCard from '../components/checklist/ProgressCard'
import TaskCard from '../components/checklist/TaskCard'
import QuoteCard from '../components/checklist/QuoteCard'
import NotificationBanner from '../components/checklist/NotificationBanner'

export default function Dashboard() {
  const { duas, showTransliteration, setShowTransliteration } = useDhikr()

  return (
    <div className="min-h-screen bg-islamic-cream dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-5 space-y-4 pb-20">
        {/* Notification Banner */}
        <NotificationBanner />

        {/* Daily Quote */}
        <QuoteCard />

        {/* Progress Card */}
        <ProgressCard />

        {/* Transliteration toggle */}
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">
            Daily Duas
            <span className="ml-2 text-xs font-normal text-gray-400 dark:text-gray-500">
              ({duas.length} total)
            </span>
          </h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-gray-500 dark:text-gray-400">Transliteration</span>
            <div
              onClick={() => setShowTransliteration(!showTransliteration)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                showTransliteration ? 'bg-islamic-green' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                showTransliteration ? 'translate-x-5' : 'translate-x-0.5'
              }`} />
            </div>
          </label>
        </div>

        {/* Task Cards */}
        <div className="space-y-3">
          {duas.map((dua) => (
            <TaskCard key={dua.id} dua={dua} />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-4 pb-2">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
          <p className="text-xs text-gray-300 dark:text-gray-700 mt-1">
            Resets automatically every new day
          </p>
        </div>
      </main>
    </div>
  )
}
