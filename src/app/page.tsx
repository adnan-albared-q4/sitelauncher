'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simple client-side validation (in production, this would be server-side)
    if (username === process.env.NEXT_PUBLIC_ADMIN_USERNAME && 
        password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      // For now, just redirect to a blank page
      router.push('/dashboard')
    } else {
      setError('Invalid credentials')
    }
    
    setIsLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--brand-bg-section)'
    }}>
      {/* Fixed width container */}
      <div style={{ width: '330px', margin: '0 auto', padding: '0 16px' }}>
        {/* Card container with brand styling */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '3px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          padding: '32px',
          border: '1px solid #e5e7eb'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px',
              marginBottom: '8px'
            }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'var(--brand-text-primary)'
              }}>
                orchestrator
              </h2>
              <span style={{ fontSize: '24px' }}>
              <img 
                  src="/logo.svg"
                  alt="Orchestrator Icon" 
                  style={{ width: '120px'}}
                />
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Username Field */}
            <div>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="input-field"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div>

              <input
                id="password"
                name="password"
                type="password"
                required
                className="input-field"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                color: '#ef4444',
                fontSize: '14px',
                textAlign: 'center',
                backgroundColor: '#fef2f2',
                padding: '12px',
                borderRadius: '3px',
                border: '1px solid #fecaca'
              }}>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 