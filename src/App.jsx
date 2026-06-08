import React from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { DhikrProvider } from './contexts/DhikrContext'
import AuthPage from './components/auth/AuthPage'
import Dashboard from './pages/Dashboard'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-islamic-cream dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-islamic-green to-islamic-green-light mb-4 shadow-lg">
            <span className="text-4xl">☪️</span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-islamic-green animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-islamic-green animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-islamic-green animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 font-arabic">
            بِسْمِ اللَّهِ
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthPage />
  }

  return (
    <DhikrProvider>
      <Dashboard />
    </DhikrProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
