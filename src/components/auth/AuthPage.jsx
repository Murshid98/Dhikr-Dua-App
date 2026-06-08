import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function AuthPage() {
  const [mode, setMode] = useState('login') // 'login' | 'register'

  return (
    <div className="min-h-screen bg-gradient-to-br from-islamic-green-dark via-islamic-green to-islamic-green-light dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-islamic-gold/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
            <span className="text-4xl">☪️</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">ദൈനംദിന ദിക്ർ</h1>
          <p className="text-white/70 text-sm">Daily Dhikr & Dua Tracker</p>
          <div className="mt-3 text-islamic-gold-light font-arabic text-xl">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>
        </div>

        {/* Auth Card */}
        <div className="card p-6 animate-slide-up">
          {/* Tab switcher */}
          <div className="flex rounded-xl bg-gray-100 dark:bg-gray-700 p-1 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === 'login'
                  ? 'bg-white dark:bg-gray-600 text-islamic-green dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === 'register'
                  ? 'bg-white dark:bg-gray-600 text-islamic-green dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Register
            </button>
          </div>

          {mode === 'login' ? (
            <LoginForm onSwitchToRegister={() => setMode('register')} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setMode('login')} />
          )}
        </div>

        <p className="text-center text-white/50 text-xs mt-6">
          Your data is private and secure 🔒
        </p>
      </div>
    </div>
  )
}
