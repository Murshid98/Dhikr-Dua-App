import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginForm({ onSwitchToRegister }) {
  const { login, loginWithGoogle, resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) return setError('Please fill in all fields.')
    setLoading(true)
    setError('')
    try {
      await login(email, password)
    } catch (err) {
      console.error('Login error full object:', JSON.stringify(err, Object.getOwnPropertyNames(err)))
      console.error('Login error code:', err.code)
      console.error('Login error message:', err.message)
      console.error('Login error name:', err.name)
      setError(getFriendlyError(err.code, err.message, err.name))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setLoading(true)
    setError('')
    try {
      await loginWithGoogle()
    } catch (err) {
      console.error('Google login error full:', JSON.stringify(err, Object.getOwnPropertyNames(err)))
      setError(getFriendlyError(err.code, err.message, err.name))
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    if (!email) return setError('Enter your email above to reset password.')
    setLoading(true)
    setError('')
    try {
      await resetPassword(email)
      setResetSent(true)
    } catch (err) {
      console.error('Reset error full:', JSON.stringify(err, Object.getOwnPropertyNames(err)))
      setError(getFriendlyError(err.code, err.message, err.name))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl px-4 py-3 text-sm animate-fade-in">
          {error}
        </div>
      )}
      {resetSent && (
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-xl px-4 py-3 text-sm animate-fade-in">
          ✅ Password reset email sent! Check your inbox.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-islamic-green focus:border-transparent transition-all"
            autoComplete="email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-islamic-green focus:border-transparent transition-all pr-12"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
        <span className="text-xs text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
      </div>

      <button
        onClick={handleGoogle}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium transition-all duration-200 disabled:opacity-60"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center justify-between text-sm">
        <button
          onClick={handleReset}
          className="text-islamic-green dark:text-islamic-green-light hover:underline"
        >
          Forgot password?
        </button>
        <button
          onClick={onSwitchToRegister}
          className="text-islamic-green dark:text-islamic-green-light hover:underline font-medium"
        >
          Create account →
        </button>
      </div>
    </div>
  )
}

function getFriendlyError(code, message = '', name = '') {
  const map = {
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
    'auth/network-request-failed': 'Network error. Check your internet connection.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
    'auth/popup-blocked': 'Popup was blocked by your browser. Please allow popups.',
    'auth/cancelled-popup-request': 'Sign-in was cancelled.',
    'auth/invalid-api-key': '⚙️ Firebase API key is invalid. Check your environment variables in Vercel.',
    'auth/configuration-not-found': '⚙️ Firebase is not configured. Check your environment variables in Vercel.',
    'auth/app-not-authorized': '⚙️ This domain is not authorized in Firebase. Add your Vercel URL to Firebase → Authentication → Authorized domains.',
    'auth/operation-not-allowed': '⚙️ Email/Password sign-in is not enabled. Go to Firebase Console → Authentication → Sign-in method → Enable Email/Password.',
    'auth/unauthorized-domain': '⚙️ This domain is not authorized. Go to Firebase Console → Authentication → Settings → Authorized domains → Add your Vercel URL.',
    'auth/user-disabled': 'This account has been disabled.',
  }

  if (map[code]) return map[code]

  // Detect common issues from error message text
  const msg = (message || '').toLowerCase()
  if (msg.includes('operation-not-allowed') || msg.includes('not enabled')) {
    return '⚙️ Email/Password sign-in is not enabled. Go to Firebase Console → Authentication → Sign-in method → Enable Email/Password.'
  }
  if (msg.includes('unauthorized') || msg.includes('not authorized')) {
    return '⚙️ This domain is not authorized in Firebase. Add your Vercel URL to Firebase → Authentication → Settings → Authorized domains.'
  }
  if (msg.includes('network') || msg.includes('fetch')) {
    return 'Network error. Check your internet connection.'
  }

  // Show the raw error details to help diagnose
  const detail = code || name || 'unknown'
  const msgSnippet = message ? ` — ${message.slice(0, 120)}` : ''
  return `Sign-in failed (${detail})${msgSnippet}`
}
