import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth, googleProvider, isFirebaseConfigured } from '../firebase'

const AuthContext = createContext(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // If Firebase is not configured, skip auth and show login page
    if (!isFirebaseConfigured || !auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser)
        setLoading(false)
      },
      (err) => {
        console.error('Auth state error:', err)
        setLoading(false)
      }
    )
    return unsubscribe
  }, [])

  const clearError = () => setError('')

  const signup = async (email, password, displayName) => {
    if (!isFirebaseConfigured) throw new Error('Firebase is not configured')
    setError('')
    const result = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) {
      await updateProfile(result.user, { displayName })
    }
    return result
  }

  const login = async (email, password) => {
    if (!isFirebaseConfigured) throw new Error('Firebase is not configured')
    setError('')
    return signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured) throw new Error('Firebase is not configured')
    setError('')
    return signInWithPopup(auth, googleProvider)
  }

  const logout = () => {
    if (!isFirebaseConfigured || !auth) return Promise.resolve()
    return signOut(auth)
  }

  const resetPassword = (email) => {
    if (!isFirebaseConfigured) throw new Error('Firebase is not configured')
    return sendPasswordResetEmail(auth, email)
  }

  const value = {
    user,
    loading,
    error,
    setError,
    clearError,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    isFirebaseConfigured,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
