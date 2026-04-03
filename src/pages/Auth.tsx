import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BrandMark from '../components/layout/BrandMark'
import { Button } from '../components/ui/Button'
import { FieldWrap, TextInput } from '../components/ui/Field'
import { StatusAlert } from '../components/ui/States'
import { supabase } from '../utils/supabase'
import '../styles/Auth.css'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    async function checkExistingSession() {
      const { data } = await supabase.auth.getSession()
      if (mounted && data?.session) navigate('/portal', { replace: true })
    }
    void checkExistingSession()
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate('/portal', { replace: true })
    })
    return () => { mounted = false; authListener.subscription.unsubscribe() }
  }, [navigate])

  const handleGoogleLogin = async () => {
    setError(null); setNotice('')
    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/portal` },
    })
    if (googleError) setError(googleError.message)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null); setNotice(''); setIsSubmitting(true)
    try {
      if (isLogin) {
        const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
        if (loginError) { setError(loginError.message); return }
        navigate('/portal', { replace: true })
      } else {
        const { error: signupError } = await supabase.auth.signUp({ email, password })
        if (signupError) { setError(signupError.message); return }
        setNotice('Please check your email to verify your account.')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-page bg-[#050505]">
      <div className="auth-grain" />

      {/* ── Standard Centered Auth Layout ── */}
      <main className="auth-centered-container">
        
        {/* ── Brand / Header ── */}
        <header className="auth-header animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Link to="/" className="inline-block hover:opacity-80 transition-opacity mb-8">
            <BrandMark className="h-14 w-14 mx-auto" />
          </Link>
          <span className="section-label mb-2">Private Sanctuary</span>
          <h1 className="editorial-title" style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
            {isLogin ? 'Enter' : 'Create Account'}
          </h1>
          <p className="balanced-copy" style={{ fontSize: '0.9rem', opacity: 0.5 }}>
            Access your readings, history, and practice.
          </p>
        </header>

        {/* ── Form Card ── */}
        <div className="surface-panel-strong auth-form-card animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {error && <StatusAlert tone="error" className="mb-6">{error}</StatusAlert>}
          {notice && <StatusAlert tone="success" className="mb-6">{notice}</StatusAlert>}

          <form onSubmit={handleSubmit} className="auth-form">
            <FieldWrap label="Email signature">
              <TextInput 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="seeker@palisglobal.com"
                required 
              />
            </FieldWrap>

            <FieldWrap label="Secret key">
              <TextInput 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
              />
            </FieldWrap>

            <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
              {isSubmitting ? 'Verifying...' : isLogin ? 'Access Portal' : 'Register'}
            </Button>

            <div className="auth-divider">
              <span /><span className="text-[0.6rem] uppercase opacity-30 tracking-widest px-4">OR</span><span />
            </div>

            <Button type="button" variant="outline" onClick={handleGoogleLogin} className="w-full">
              Continue with Google
            </Button>
          </form>

          {/* ── Switcher (Corrected Styling) ── */}
          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="quiet-link"
              style={{ fontSize: '0.85rem', fontStyle: 'italic', borderBottom: '1px solid rgba(255,255,255,0.2)' }}
            >
              {isLogin ? "Need a new account? Register here." : "Already have access? Log in."}
            </button>
          </div>
        </div>

        <footer className="mt-12 text-center">
           <Link to="/" className="quiet-link text-[0.65rem] uppercase tracking-[0.3em] opacity-40 hover:opacity-100">
             Return to Home
           </Link>
        </footer>

      </main>
    </div>
  )
}
