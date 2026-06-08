import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1a6b3c, #2d9e5f)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '480px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚙️</div>
            <h2 style={{ color: '#1a6b3c', marginBottom: '8px', fontSize: '20px' }}>
              Configuration Required
            </h2>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px', lineHeight: '1.6' }}>
              The app failed to start. This usually means the Firebase environment
              variables are not set in Vercel.
            </p>
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #86efac',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'left',
              marginBottom: '16px'
            }}>
              <p style={{ color: '#166534', fontWeight: 'bold', fontSize: '13px', marginBottom: '8px' }}>
                Add these to Vercel → Settings → Environment Variables:
              </p>
              {[
                'VITE_FIREBASE_API_KEY',
                'VITE_FIREBASE_AUTH_DOMAIN',
                'VITE_FIREBASE_PROJECT_ID',
                'VITE_FIREBASE_STORAGE_BUCKET',
                'VITE_FIREBASE_MESSAGING_SENDER_ID',
                'VITE_FIREBASE_APP_ID',
              ].map(key => (
                <div key={key} style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  color: '#15803d',
                  padding: '2px 0'
                }}>
                  {key}
                </div>
              ))}
            </div>
            <p style={{ color: '#999', fontSize: '12px' }}>
              Error: {this.state.error?.message || 'Unknown error'}
            </p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
