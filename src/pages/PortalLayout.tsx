import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import BrandMark from '../components/layout/BrandMark'
import { LoadingState } from '../components/ui/States'
import { supabase } from '../utils/supabase'
import '../styles/PortalLayout.css'

const navItems = [
  { label: 'Readings',  href: '/portal',           glyph: '◎' },
  { label: 'Insights',  href: '/portal/ritual',     glyph: '✦' },
  { label: 'History',   href: '/portal/grimoire',   glyph: '≡' },
  { label: 'Shop',      href: '/merch',             glyph: '⚚' },
  { label: 'Settings',  href: '/portal/settings',   glyph: '⚙' },
]

export default function PortalLayout() {
  const location = useLocation()
  const navigate  = useNavigate()
  const [authReady, setAuthReady] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    let mounted = true

    async function bootstrapSession() {
      const { data } = await supabase.auth.getSession()
      if (!mounted) return
      if (!data?.session) {
        setAuthReady(true)
        navigate('/auth', { replace: true })
        return
      }
      setUserEmail(data.session.user?.email || '')
      setAuthReady(true)
    }

    void bootstrapSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return
      if (session) { setUserEmail(session.user?.email || ''); setAuthReady(true); return }
      if (event === 'SIGNED_OUT') {
        setUserEmail('')
        setAuthReady(true)
        navigate('/auth', { replace: true })
      }
    })

    return () => { mounted = false; authListener.subscription.unsubscribe() }
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/auth', { replace: true })
  }

  if (!authReady) {
    return (
      <div className="portal-loading">
        <LoadingState title="Opening your sanctuary" copy="Restoring your session and preparing the private workspace." />
      </div>
    )
  }

  return (
    <div className="portal-root lp-root" style={{ background: '#080808' }}>
      <div className="lp-grain" />
      
      {/* ── Sidebar ── */}
      <aside className="portal-sidebar surface-panel" style={{ borderTop: 'none', borderBottom: 'none', borderLeft: 'none' }}>
        <div className="portal-sidebar__top">
          <Link to="/" className="portal-brand">
            <BrandMark className="h-9 w-9" />
            <div>
              <p className="section-label" style={{ marginBottom: '0.1rem', fontSize: '0.6rem' }}>Private guidance</p>
              <span className="portal-brand__name" style={{ fontFamily: 'Cinzel', fontSize: '1.1rem', letterSpacing: '0.1em' }}>Palis Global</span>
            </div>
          </Link>

          <div className="portal-account surface-panel" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', marginBottom: '2.5rem' }}>
            <p className="section-label" style={{ marginBottom: '0.4rem', fontSize: '0.55rem' }}>Current account</p>
            <p className="portal-account__email" style={{ fontSize: '0.8rem', opacity: 0.6 }}>{userEmail || '—'}</p>
          </div>

          <nav className="portal-nav" aria-label="Dashboard navigation">
            {navItems.map(item => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`portal-nav__item ${isActive ? 'portal-nav__item--active' : ''}`}
                  style={{ fontFamily: 'Cinzel', letterSpacing: '0.12em', fontSize: '0.75rem', padding: '0.8rem 1.2rem' }}
                >
                  <span className="portal-nav__glyph" aria-hidden="true" style={{ fontSize: '1.1rem', marginRight: '0.8rem' }}>{item.glyph}</span>
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <button 
          onClick={handleLogout} 
          className="portal-logout-btn"
          style={{ opacity: 0.4, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}
        >
          Close Session
        </button>
      </aside>

      {/* ── Main View ── */}
      <main className="portal-main">
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3.5rem 2rem' }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
