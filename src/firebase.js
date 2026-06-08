import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Log env vars at build time (will show in Vercel build logs)
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID

console.log('[Firebase] apiKey present:', !!apiKey)
console.log('[Firebase] authDomain present:', !!authDomain)
console.log('[Firebase] projectId present:', !!projectId)

const firebaseConfig = {
  apiKey: apiKey || 'AIzaSyA2LaNzc6uNRBAX6CogCxMv2KcEyCksSJ8',
  authDomain: authDomain || 'dhikr-app-42967.firebaseapp.com',
  projectId: projectId || 'dhikr-app-42967',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'dhikr-app-42967.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '516091661973',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:516091661973:web:986905fac010846c5f559c',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-C2C67TPBW4',
}

// Always initialize — use env vars if available, fallback to hardcoded values
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
export const isFirebaseConfigured = true

export default app
